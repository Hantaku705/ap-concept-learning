import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createGmailClient, searchEmails, getEmailContent, EmailContent } from '@/lib/gmail/client';
import { parseEmail } from '@/lib/gmail/parser';
import { Subscription } from '@/types/subscription';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface DetectedInvoice {
  serviceName: string;
  amount: number;
  date: string;
  email: EmailContent;
  subscription: Partial<Subscription>;
}

const tools: OpenAI.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'search_invoices',
      description: '指定された期間のGmail請求書メールを検索します。日本語の月名（1月、2月など）や「先月」「今月」などの表現を解釈できます。',
      parameters: {
        type: 'object',
        properties: {
          start_date: {
            type: 'string',
            description: '検索開始日（YYYY-MM-DD形式）',
          },
          end_date: {
            type: 'string',
            description: '検索終了日（YYYY-MM-DD形式）',
          },
          service_name: {
            type: 'string',
            description: 'サービス名（オプション、特定のサービスを検索する場合）',
          },
        },
        required: ['start_date', 'end_date'],
      },
    },
  },
];

async function searchInvoices(
  accessToken: string,
  startDate: string,
  endDate: string,
  serviceName?: string
): Promise<DetectedInvoice[]> {
  const gmail = await createGmailClient(accessToken);

  // 日付範囲を調整（Gmailのafter/beforeは排他的なので前後1日ずつ広げる）
  const startDateObj = new Date(startDate);
  startDateObj.setDate(startDateObj.getDate() - 1);
  const adjustedStartDate = startDateObj.toISOString().split('T')[0];

  const endDateObj = new Date(endDate);
  endDateObj.setDate(endDateObj.getDate() + 1);
  const adjustedEndDate = endDateObj.toISOString().split('T')[0];

  let query: string;

  if (serviceName) {
    // サービス名が指定された場合、そのサービスからのメールを広く検索
    query = [
      `(from:${serviceName} OR subject:${serviceName} OR ${serviceName})`,
      `after:${adjustedStartDate}`,
      `before:${adjustedEndDate}`,
    ].join(' ');
  } else {
    // サービス名がない場合、請求書キーワードで検索
    query = [
      '(subject:(請求 OR 領収 OR お支払い OR invoice OR receipt OR billing OR 明細 OR ご利用) OR (請求 OR 領収 OR invoice))',
      `after:${adjustedStartDate}`,
      `before:${adjustedEndDate}`,
    ].join(' ');
  }

  const messages = await searchEmails(gmail, query, 50);
  const results: DetectedInvoice[] = [];

  for (const msg of messages) {
    if (msg.id) {
      const content = await getEmailContent(gmail, msg.id);
      if (content) {
        const parsed = parseEmail({
          id: content.id,
          subject: content.subject,
          from: content.from,
          date: content.date,
          body: content.body,
          hasPdfAttachment: content.hasPdfAttachment,
          attachments: content.attachments,
        });

        if (parsed) {
          results.push({
            serviceName: parsed.subscription.serviceName || 'Unknown',
            amount: parsed.subscription.amount || 0,
            date: content.date,
            email: content,
            subscription: parsed.subscription,
          });
        } else if (serviceName) {
          // パターンマッチしなくても、サービス名検索の場合は直接追加
          const amount = extractAmountFromText(content.body) || extractAmountFromText(content.subject) || 0;
          results.push({
            serviceName: extractServiceNameFromEmail(content.from, content.subject) || serviceName,
            amount,
            date: content.date,
            email: content,
            subscription: {
              serviceName: extractServiceNameFromEmail(content.from, content.subject) || serviceName,
              category: 'other',
              amount,
              currency: 'JPY',
              billingCycle: 'monthly',
              nextBillingDate: calculateNextMonth(content.date),
              startDate: content.date.split('T')[0] || new Date().toISOString().split('T')[0],
              status: 'active',
              source: 'gmail',
              senderEmail: content.from,
              emailSubject: content.subject,
              emailBody: content.body.slice(0, 500),
              messageId: content.id,
              hasPdfAttachment: content.hasPdfAttachment,
            },
          });
        }
      }
    }
  }

  return results;
}

// メール本文/件名から金額を抽出
function extractAmountFromText(text: string): number | null {
  const patterns = [
    /¥([\d,]+)/,
    /([\d,]+)円/,
    /合計.*?([\d,]+)/,
    /請求金額.*?([\d,]+)/,
    /金額.*?([\d,]+)/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const num = parseInt(match[1].replace(/,/g, ''), 10);
      if (!isNaN(num) && num > 0 && num < 10000000) {
        return num;
      }
    }
  }
  return null;
}

// メールからサービス名を抽出
function extractServiceNameFromEmail(from: string, subject: string): string | null {
  // 送信元の表示名を抽出
  const displayNameMatch = from.match(/^([^<]+)</);
  if (displayNameMatch) {
    const name = displayNameMatch[1].trim();
    if (name.length > 1 && name.length < 50) {
      return name;
    }
  }

  // ドメインから抽出
  const domainMatch = from.match(/@([^.]+)\./);
  if (domainMatch) {
    const name = domainMatch[1];
    if (!['gmail', 'yahoo', 'outlook', 'noreply', 'mail'].includes(name.toLowerCase())) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }

  return null;
}

// 翌月の日付を計算
function calculateNextMonth(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  } catch {
    const now = new Date();
    now.setMonth(now.getMonth() + 1);
    return now.toISOString().split('T')[0];
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, accessToken, history = [] } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'メッセージが必要です' }, { status: 400 });
    }

    if (!accessToken) {
      return NextResponse.json({ error: 'Gmail認証が必要です' }, { status: 401 });
    }

    const today = new Date();
    const systemMessage = `あなたはサブスクリプション管理アシスタントです。ユーザーの質問に基づいてGmailから請求書メールを検索し、結果を分かりやすく報告します。

今日の日付: ${today.toISOString().split('T')[0]}
現在の年: ${today.getFullYear()}年

ユーザーが「1月」「2月」などと言った場合は、現在の年を使用してください。
「先月」は前月、「今月」は今月を意味します。

検索結果を報告する際は:
1. 見つかった請求書の数
2. 各請求書のサービス名、金額、日付
3. ユーザーが「追加」できるようにリスト形式で表示`;

    const messages: OpenAI.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemMessage },
      ...history.map((h: ChatMessage) => ({ role: h.role, content: h.content })),
      { role: 'user', content: message },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      tools,
      tool_choice: 'auto',
    });

    const responseMessage = response.choices[0].message;

    if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
      const toolCall = responseMessage.tool_calls[0] as { type: 'function'; id: string; function: { name: string; arguments: string } };
      if (toolCall.type === 'function' && toolCall.function.name === 'search_invoices') {
        const args = JSON.parse(toolCall.function.arguments);

        const invoices = await searchInvoices(
          accessToken,
          args.start_date,
          args.end_date,
          args.service_name
        );

        const toolMessages: OpenAI.ChatCompletionMessageParam[] = [
          ...messages,
          responseMessage,
          {
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify({
              found: invoices.length,
              invoices: invoices.map((inv) => ({
                serviceName: inv.serviceName,
                amount: inv.amount,
                date: inv.date,
                hasPdf: inv.email.hasPdfAttachment,
              })),
            }),
          },
        ];

        const finalResponse = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: toolMessages,
        });

        return NextResponse.json({
          message: finalResponse.choices[0].message.content,
          invoices,
        });
      }
    }

    return NextResponse.json({
      message: responseMessage.content,
      invoices: [],
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'AIチャットでエラーが発生しました' },
      { status: 500 }
    );
  }
}

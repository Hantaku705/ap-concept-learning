import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface GeneratedCancellationGuide {
  serviceName: string;
  url: string;
  steps: string[];
  notes?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  generatedAt: string;
}

export async function POST(request: NextRequest) {
  try {
    const { serviceName } = await request.json();

    if (!serviceName) {
      return NextResponse.json(
        { error: 'サービス名が必要です' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI APIキーが設定されていません' },
        { status: 500 }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `あなたはサブスクリプションサービスの解約方法に詳しいアシスタントです。
ユーザーが指定したサービスの解約方法を、以下のJSON形式で返してください。

{
  "serviceName": "サービス名",
  "url": "解約ページのURL（公式サイトの解約・退会ページ）",
  "steps": ["手順1", "手順2", ...],
  "notes": ["注意事項1", "注意事項2", ...],
  "difficulty": "easy" | "medium" | "hard",
  "estimatedTime": "所要時間（例: 2分）"
}

注意：
- 必ず有効なJSONのみを返してください
- URLは公式サイトの解約・退会・キャンセル関連ページを指定
- 手順は具体的に、画面遷移がわかるように記載
- 難易度は easy（Webで簡単）、medium（複数ステップ）、hard（電話必須など）
- 不明なサービスでも、一般的な解約方法を推測して回答してください`
        },
        {
          role: 'user',
          content: `「${serviceName}」の解約方法を教えてください。`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: '解約方法を取得できませんでした' },
        { status: 500 }
      );
    }

    // JSONをパース（コードブロックを除去）
    let jsonString = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonString = jsonMatch[1];
    }

    const guide = JSON.parse(jsonString.trim()) as GeneratedCancellationGuide;
    guide.generatedAt = new Date().toISOString();

    return NextResponse.json({ guide });
  } catch (error) {
    console.error('Cancellation guide API error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: '解約方法の解析に失敗しました。再度お試しください。' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: '解約方法の取得に失敗しました' },
      { status: 500 }
    );
  }
}

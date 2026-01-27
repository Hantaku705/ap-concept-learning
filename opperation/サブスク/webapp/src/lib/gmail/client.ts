import { google, gmail_v1 } from 'googleapis';
import { getOAuth2Client } from '@/lib/auth/oauth';

// 期間に応じた日付クエリを生成
function getDateQuery(periodDays?: number): string {
  if (!periodDays) {
    return 'newer_than:1y'; // デフォルト: 過去1年
  }

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - periodDays);

  // Gmail形式: after:YYYY/MM/DD
  const year = startDate.getFullYear();
  const month = String(startDate.getMonth() + 1).padStart(2, '0');
  const day = String(startDate.getDate()).padStart(2, '0');

  return `after:${year}/${month}/${day}`;
}

// PDF添付ファイル付き請求書メール（優先）
function getPdfBillingQuery(periodDays?: number): string {
  return [
    'has:attachment filename:pdf',
    'subject:(請求 OR 領収 OR お支払い OR invoice OR receipt OR 明細 OR ご利用)',
    getDateQuery(periodDays),
  ].join(' ');
}

// 通常の請求書メール
function getBillingQuery(periodDays?: number): string {
  return [
    'subject:(請求 OR 領収 OR お支払い OR invoice OR receipt OR billing OR subscription OR サブスクリプション OR 月額)',
    'from:(-no-reply@accounts.google.com)',  // Googleアカウント通知を除外
    getDateQuery(periodDays),
  ].join(' ');
}

export async function createGmailClient(accessToken: string): Promise<gmail_v1.Gmail> {
  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials({ access_token: accessToken });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

export async function searchEmails(
  gmail: gmail_v1.Gmail,
  query: string,
  maxResults: number = 100
): Promise<gmail_v1.Schema$Message[]> {
  const response = await gmail.users.messages.list({
    userId: 'me',
    q: query,
    maxResults,
  });

  return response.data.messages || [];
}

export interface AttachmentInfo {
  filename: string;
  mimeType: string;
  attachmentId?: string;
}

export interface EmailContent {
  id: string;
  subject: string;
  from: string;
  date: string;
  body: string;
  hasPdfAttachment: boolean;
  attachments: AttachmentInfo[];
}

export async function getEmailContent(
  gmail: gmail_v1.Gmail,
  messageId: string
): Promise<EmailContent | null> {
  try {
    const response = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format: 'full',
    });

    const message = response.data;
    const headers = message.payload?.headers || [];

    const subject = headers.find(h => h.name?.toLowerCase() === 'subject')?.value || '';
    const from = headers.find(h => h.name?.toLowerCase() === 'from')?.value || '';
    const date = headers.find(h => h.name?.toLowerCase() === 'date')?.value || '';

    // 添付ファイル情報を抽出
    const attachments = extractAttachments(message.payload?.parts || []);
    const hasPdfAttachment = attachments.some(a =>
      a.mimeType === 'application/pdf' || a.filename.toLowerCase().endsWith('.pdf')
    );

    // 本文抽出
    let body = '';
    if (message.payload?.body?.data) {
      body = Buffer.from(message.payload.body.data, 'base64').toString('utf-8');
    } else if (message.payload?.parts) {
      const textPart = findTextPart(message.payload.parts);
      if (textPart?.body?.data) {
        body = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
      }
    }

    // HTMLタグを除去
    body = body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    return {
      id: messageId,
      subject,
      from,
      date,
      body: body.slice(0, 5000), // 本文は5000文字まで
      hasPdfAttachment,
      attachments,
    };
  } catch (error) {
    console.error('Failed to get email content:', messageId, error);
    return null;
  }
}

// 添付ファイル情報を再帰的に抽出（attachmentId含む）
function extractAttachments(parts: gmail_v1.Schema$MessagePart[]): AttachmentInfo[] {
  const attachments: AttachmentInfo[] = [];

  for (const part of parts) {
    if (part.filename && part.filename.length > 0) {
      attachments.push({
        filename: part.filename,
        mimeType: part.mimeType || 'application/octet-stream',
        attachmentId: part.body?.attachmentId || undefined,
      });
    }
    if (part.parts) {
      attachments.push(...extractAttachments(part.parts));
    }
  }

  return attachments;
}

// 再帰的にtext/plainまたはtext/htmlパートを探す
function findTextPart(parts: gmail_v1.Schema$MessagePart[]): gmail_v1.Schema$MessagePart | null {
  for (const part of parts) {
    if (part.mimeType === 'text/plain' || part.mimeType === 'text/html') {
      return part;
    }
    if (part.parts) {
      const found = findTextPart(part.parts);
      if (found) return found;
    }
  }
  return null;
}

export async function scanForSubscriptions(
  accessToken: string,
  periodDays?: number,
  onProgress?: (current: number, total: number) => void
): Promise<EmailContent[]> {
  const gmail = await createGmailClient(accessToken);

  // PDF添付ファイル付きメールを優先的に取得
  const pdfMessages = await searchEmails(gmail, getPdfBillingQuery(periodDays), 50);
  const regularMessages = await searchEmails(gmail, getBillingQuery(periodDays), 50);

  // 重複を除去してマージ（PDF優先）
  const seenIds = new Set<string>();
  const allMessages: gmail_v1.Schema$Message[] = [];

  for (const msg of pdfMessages) {
    if (msg.id && !seenIds.has(msg.id)) {
      seenIds.add(msg.id);
      allMessages.push(msg);
    }
  }
  for (const msg of regularMessages) {
    if (msg.id && !seenIds.has(msg.id)) {
      seenIds.add(msg.id);
      allMessages.push(msg);
    }
  }

  const results: EmailContent[] = [];

  for (let i = 0; i < allMessages.length; i++) {
    const msg = allMessages[i];
    if (msg.id) {
      const content = await getEmailContent(gmail, msg.id);
      if (content) {
        results.push(content);
      }
    }
    onProgress?.(i + 1, allMessages.length);
  }

  // PDF添付ファイル付きを先頭にソート
  results.sort((a, b) => {
    if (a.hasPdfAttachment && !b.hasPdfAttachment) return -1;
    if (!a.hasPdfAttachment && b.hasPdfAttachment) return 1;
    return 0;
  });

  return results;
}

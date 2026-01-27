import { v4 as uuidv4 } from 'uuid';
import { servicePatterns } from '@/data/service-patterns';
import { Subscription, ServicePattern } from '@/types/subscription';
import { EmailContent } from '@/lib/gmail/client';

interface ParsedEmail {
  id: string;
  subject: string;
  from: string;
  date: string;
  body: string;
  hasPdfAttachment?: boolean;
  attachments?: { filename: string; mimeType: string; attachmentId?: string }[];
}

interface DetectedSubscription {
  subscription: Partial<Subscription>;
  confidence: number;        // 0-1
  matchedPattern: ServicePattern;
  rawEmail: ParsedEmail;
}

export function parseEmail(email: ParsedEmail): DetectedSubscription | null {
  const fromLower = email.from.toLowerCase();
  const subjectLower = email.subject.toLowerCase();
  const hasPdf = email.hasPdfAttachment || false;

  for (const pattern of servicePatterns) {
    // PDF専用パターンはPDF添付がある場合のみマッチ
    if (pattern.isPdfPattern && !hasPdf) continue;

    // 送信元マッチング
    const senderMatch = pattern.senderPatterns.length === 0 ||
      pattern.senderPatterns.some(p => fromLower.includes(p.toLowerCase()));

    if (!senderMatch && pattern.senderPatterns.length > 0) continue;

    // 件名マッチング
    const subjectMatch = pattern.subjectPatterns.some(p => {
      const regex = new RegExp(p, 'i');
      return regex.test(email.subject);
    });

    if (!subjectMatch) continue;

    // 金額抽出
    const amount = extractAmount(email.body, pattern.amountPatterns) ||
                   extractAmount(email.subject, pattern.amountPatterns);

    // 請求日推定
    const billingDate = extractDate(email.date);

    // 信頼度計算
    let confidence = 0.5;
    if (senderMatch && pattern.senderPatterns.length > 0) confidence += 0.3;
    if (subjectMatch) confidence += 0.1;
    if (amount) confidence += 0.1;
    if (hasPdf) confidence += 0.2; // PDF添付があれば信頼度UP

    const now = new Date().toISOString();

    // サービス名を決定
    let serviceName = pattern.serviceName;
    if (serviceName === 'Unknown Subscription' || serviceName === 'PDF Invoice' || serviceName === 'Embedded Invoice') {
      serviceName = extractServiceName(email.from, email.subject, email.attachments);
    }

    // PDF添付ファイル情報を抽出
    const pdfAttachments = email.attachments?.filter(a =>
      a.filename.toLowerCase().endsWith('.pdf')
    ) || [];
    const pdfFilenames = pdfAttachments.map(a => a.filename);
    const attachmentIds = pdfAttachments
      .map(a => a.attachmentId)
      .filter((id): id is string => !!id);

    return {
      subscription: {
        id: uuidv4(),
        serviceName,
        category: pattern.category,
        amount: amount || 0,
        currency: 'JPY',
        billingCycle: 'monthly',
        nextBillingDate: calculateNextBillingDate(billingDate),
        startDate: billingDate,
        status: 'active',
        source: 'gmail',
        email: email.from,
        senderEmail: email.from,
        logoUrl: pattern.logoUrl,
        cancellationUrl: pattern.cancellationUrl,
        lastDetectedAt: now,
        hasPdfAttachment: hasPdf,
        pdfFilenames: pdfFilenames.length > 0 ? pdfFilenames : undefined,
        emailSubject: email.subject,
        messageId: email.id,
        attachmentIds: attachmentIds.length > 0 ? attachmentIds : undefined,
        emailBody: email.body.slice(0, 500), // 本文抜粋（500文字）
        createdAt: now,
        updatedAt: now,
      },
      confidence,
      matchedPattern: pattern,
      rawEmail: email,
    };
  }

  return null;
}

function extractAmount(text: string, patterns: string[]): number | null {
  for (const p of patterns) {
    const regex = new RegExp(p, 'g');
    const matches = text.matchAll(regex);
    for (const match of matches) {
      if (match[1]) {
        const numStr = match[1].replace(/,/g, '');
        const num = parseFloat(numStr);
        if (!isNaN(num) && num > 0 && num < 1000000) {
          return num;
        }
      }
    }
  }
  return null;
}

function extractDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
  } catch {
    // ignore
  }
  return new Date().toISOString().split('T')[0];
}

function extractServiceName(
  from: string,
  subject: string,
  attachments?: { filename: string; mimeType: string }[]
): string {
  // 送信元の表示名を抽出（"Company Name <email@example.com>" 形式）
  const displayNameMatch = from.match(/^([^<]+)</);
  if (displayNameMatch) {
    const displayName = displayNameMatch[1].trim();
    if (displayName.length > 1 && displayName.length < 50) {
      return displayName;
    }
  }

  // ドメインからサービス名を推測
  const domainMatch = from.match(/@([^.]+)\./);
  if (domainMatch) {
    const name = domainMatch[1];
    // 一般的なドメインは除外
    if (!['gmail', 'yahoo', 'outlook', 'hotmail', 'noreply', 'no-reply', 'mail'].includes(name.toLowerCase())) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }

  // PDF添付ファイル名から推測
  if (attachments) {
    for (const att of attachments) {
      if (att.filename.toLowerCase().endsWith('.pdf')) {
        // ファイル名から日付や番号を除去してサービス名を抽出
        const cleanName = att.filename
          .replace(/\.pdf$/i, '')
          .replace(/[_-]?\d{4,}/g, '')  // 日付・番号除去
          .replace(/[_-]/g, ' ')
          .trim();
        if (cleanName.length > 2 && cleanName.length < 50) {
          return cleanName;
        }
      }
    }
  }

  // 件名から推測
  const words = subject.split(/[\s　]+/).filter(w => w.length > 2);
  if (words.length > 0) {
    return words[0];
  }

  return 'Unknown Service';
}

function calculateNextBillingDate(lastBillingDate: string): string {
  const date = new Date(lastBillingDate);
  date.setMonth(date.getMonth() + 1);
  return date.toISOString().split('T')[0];
}

export function mergeDetectedSubscriptions(
  existing: Subscription[],
  detected: DetectedSubscription[]
): { merged: Subscription[]; newCount: number; updatedCount: number } {
  const result = [...existing];
  let newCount = 0;
  let updatedCount = 0;

  // サービス名でグループ化（重複除去）
  const groupedDetected = new Map<string, DetectedSubscription>();
  for (const det of detected) {
    const key = det.subscription.serviceName?.toLowerCase() || '';
    const existing = groupedDetected.get(key);
    // より新しいものを優先
    if (!existing || (det.rawEmail.date > existing.rawEmail.date)) {
      groupedDetected.set(key, det);
    }
  }

  for (const det of groupedDetected.values()) {
    // 同じサービスが既に存在するか確認
    const existingIndex = result.findIndex(
      s => s.serviceName.toLowerCase() === det.subscription.serviceName?.toLowerCase()
    );

    if (existingIndex >= 0) {
      // 更新（PDF関連フィールドも含む）
      result[existingIndex] = {
        ...result[existingIndex],
        amount: det.subscription.amount || result[existingIndex].amount,
        nextBillingDate: det.subscription.nextBillingDate || result[existingIndex].nextBillingDate,
        lastDetectedAt: det.subscription.lastDetectedAt,
        // PDF/メール関連フィールドを更新
        hasPdfAttachment: det.subscription.hasPdfAttachment || result[existingIndex].hasPdfAttachment,
        pdfFilenames: det.subscription.pdfFilenames || result[existingIndex].pdfFilenames,
        messageId: det.subscription.messageId || result[existingIndex].messageId,
        attachmentIds: det.subscription.attachmentIds || result[existingIndex].attachmentIds,
        emailSubject: det.subscription.emailSubject || result[existingIndex].emailSubject,
        emailBody: det.subscription.emailBody || result[existingIndex].emailBody,
        senderEmail: det.subscription.senderEmail || result[existingIndex].senderEmail,
        updatedAt: new Date().toISOString(),
      };
      updatedCount++;
    } else {
      // 新規追加
      result.push(det.subscription as Subscription);
      newCount++;
    }
  }

  return { merged: result, newCount, updatedCount };
}

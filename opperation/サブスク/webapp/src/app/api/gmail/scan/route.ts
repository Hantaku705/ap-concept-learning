import { NextRequest, NextResponse } from 'next/server';
import { scanForSubscriptions } from '@/lib/gmail/client';
import { parseEmail, mergeDetectedSubscriptions } from '@/lib/gmail/parser';

export async function POST(request: NextRequest) {
  try {
    const { accessToken, existingSubscriptions = [], periodDays } = await request.json();

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token required' },
        { status: 401 }
      );
    }

    // メールスキャン（期間指定あり）
    const emails = await scanForSubscriptions(accessToken, periodDays);

    // 解析
    const detected = emails
      .map(email => parseEmail(email))
      .filter((d): d is NonNullable<typeof d> => d !== null && d.confidence >= 0.5);

    // マージ
    const { merged, newCount, updatedCount } = mergeDetectedSubscriptions(
      existingSubscriptions,
      detected
    );

    return NextResponse.json({
      subscriptions: merged,
      stats: {
        scannedEmails: emails.length,
        detectedServices: detected.length,
        newSubscriptions: newCount,
        updatedSubscriptions: updatedCount,
      },
    });
  } catch (error) {
    console.error('Scan error:', error);
    return NextResponse.json(
      { error: 'Scan failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

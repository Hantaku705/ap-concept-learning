import { NextRequest, NextResponse } from 'next/server';
import { createGmailClient } from '@/lib/gmail/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get('accessToken');
    const messageId = searchParams.get('messageId');
    const attachmentId = searchParams.get('attachmentId');
    const filename = searchParams.get('filename') || 'attachment.pdf';

    if (!accessToken || !messageId || !attachmentId) {
      return NextResponse.json(
        { error: 'Missing required parameters: accessToken, messageId, attachmentId' },
        { status: 400 }
      );
    }

    const gmail = await createGmailClient(accessToken);

    // 添付ファイルを取得
    const response = await gmail.users.messages.attachments.get({
      userId: 'me',
      messageId,
      id: attachmentId,
    });

    const attachmentData = response.data.data;

    if (!attachmentData) {
      return NextResponse.json(
        { error: 'Attachment not found' },
        { status: 404 }
      );
    }

    // Base64デコード（URL-safeからstandardへ変換）
    const base64Data = attachmentData.replace(/-/g, '+').replace(/_/g, '/');
    const binaryData = Buffer.from(base64Data, 'base64');

    // PDFとしてレスポンス
    return new NextResponse(binaryData, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
        'Content-Length': binaryData.length.toString(),
      },
    });
  } catch (error) {
    console.error('Attachment download error:', error);
    return NextResponse.json(
      { error: 'Failed to download attachment', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromCode, getOAuth2Client } from '@/lib/auth/oauth';
import { google } from 'googleapis';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=${error}`
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=no_code`
    );
  }

  try {
    const tokens = await getTokensFromCode(code);

    // ユーザー情報取得
    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: userInfo } = await oauth2.userinfo.get();

    // トークンをクエリパラメータで渡す
    const redirectUrl = new URL('/auth/callback', process.env.NEXT_PUBLIC_APP_URL);
    redirectUrl.searchParams.set('access_token', tokens.access_token || '');
    redirectUrl.searchParams.set('refresh_token', tokens.refresh_token || '');
    redirectUrl.searchParams.set('expires_at', String(tokens.expiry_date || 0));
    redirectUrl.searchParams.set('email', userInfo.email || '');

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error('OAuth callback error:', err);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=auth_failed`
    );
  }
}

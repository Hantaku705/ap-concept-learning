import { google } from 'googleapis';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MCPサーバーのディレクトリに移動して依存関係を使う
process.chdir('/Users/hantaku/mcp-googledocs-server');

// 認証情報を読み込む
const tokenPath = './token.json';
const credentialsPath = './credentials.json';

let authClient;

try {
  const token = JSON.parse(readFileSync(tokenPath, 'utf8'));
  const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));
  
  const { OAuth2Client } = google.auth;
  authClient = new OAuth2Client(
    credentials.installed.client_id,
    credentials.installed.client_secret,
    credentials.installed.redirect_uris[0]
  );
  
  authClient.setCredentials(token);
} catch (error) {
  console.error('認証エラー:', error.message);
  process.exit(1);
}

// スプレッドシートIDを抽出
const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1eZ8F3FjQXz0dnpfkTJZ0utKB3YU4BA24fKEFfnZ4YYk/edit?gid=626730899#gid=626730899';
const spreadsheetId = '1eZ8F3FjQXz0dnpfkTJZ0utKB3YU4BA24fKEFfnZ4YYk';
const gid = '626730899';

async function readSpreadsheet() {
  try {
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    
    // スプレッドシートのメタデータを取得
    const metadata = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    
    console.log('=== スプレッドシート情報 ===');
    console.log('タイトル:', metadata.data.properties.title);
    console.log('シート数:', metadata.data.sheets.length);
    console.log('\n=== シート一覧 ===');
    
    // 指定されたgidのシートを探す
    let targetSheet = null;
    for (const sheet of metadata.data.sheets) {
      console.log(`- ${sheet.properties.title} (gid: ${sheet.properties.sheetId})`);
      if (sheet.properties.sheetId.toString() === gid) {
        targetSheet = sheet;
      }
    }
    
    if (!targetSheet) {
      console.log(`\n警告: gid ${gid} のシートが見つかりません。最初のシートを読み取ります。`);
      targetSheet = metadata.data.sheets[0];
    }
    
    const sheetName = targetSheet.properties.title;
    console.log(`\n=== 読み取り対象シート: ${sheetName} ===`);
    
    // シート全体を読み取る
    const range = `${sheetName}!A:ZZ`;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    
    const values = response.data.values || [];
    
    if (values.length === 0) {
      console.log('シートは空です。');
      return;
    }
    
    console.log(`\n=== データ (${values.length}行) ===\n`);
    
    // データを整形して表示
    values.forEach((row, index) => {
      const rowData = row.map(cell => cell || '').join(' | ');
      console.log(`行${index + 1}: ${rowData}`);
    });
    
    // データをJSONファイルに保存
    const outputPath = join(__dirname, 'sheet-data.json');
    writeFileSync(outputPath, JSON.stringify({
      spreadsheetId,
      title: metadata.data.properties.title,
      sheetName,
      gid,
      data: values,
      metadata: {
        rowCount: values.length,
        columnCount: values[0]?.length || 0,
      }
    }, null, 2), 'utf8');
    
    console.log(`\nデータを ${outputPath} に保存しました。`);
    
  } catch (error) {
    console.error('エラー:', error.message);
    if (error.response) {
      console.error('詳細:', error.response.data);
    }
    process.exit(1);
  }
}

readSpreadsheet();

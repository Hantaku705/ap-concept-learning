import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.production') });
dotenv.config({ path: resolve(process.cwd(), '.env.local'), override: true });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 王道カテゴリのキーワード（これらを除外して「その他」を抽出）
const MAINSTREAM_KEYWORDS = {
  '添加物': ['添加物', 'msg', 'グルタミン酸', '毒', '体に悪い'],
  'ステマ': ['ステマ', '案件', '親善大使'],
  '株価': ['株価', 'ストップ安', '下落', '業績', '決算'],
  'リュウジ': ['リュウジ', 'りゅうじ'],
  '価格': ['値上げ', '高い', '価格'],
  '味': ['まずい', '美味しくない', '味が'],
  'サービス': ['対応', '問い合わせ', 'カスタマー'],
  'CM': ['cm', '広告'],
  '環境': ['環境', 'プラスチック', 'エコ', 'sdgs'],
  '国産': ['中国', '韓国', '外国'],
};

function isMainstreamCategory(text: string): boolean {
  const lowerText = text.toLowerCase();
  for (const keywords of Object.values(MAINSTREAM_KEYWORDS)) {
    for (const kw of keywords) {
      if (lowerText.includes(kw)) return true;
    }
  }
  return false;
}

async function analyzeDeep() {
  const { data: posts, error } = await supabase
    .from('sns_posts')
    .select('id, content, likes_count, retweets_count, url')
    .eq('is_corporate', true)
    .eq('sentiment', 'negative')
    .order('likes_count', { ascending: false })
    .limit(500);

  if (error) throw error;

  console.log('=== 「その他」カテゴリ 深掘り分析 ===\n');

  // その他のみ抽出
  const otherPosts = (posts || []).filter(p => !isMainstreamCategory(p.content || ''));
  console.log(`「その他」投稿数: ${otherPosts.length}件\n`);

  // 新しいパターンを探索
  const newPatterns: Record<string, { keywords: string[]; count: number; examples: any[] }> = {
    '人工甘味料・アスパルテーム': {
      keywords: ['アスパルテーム', 'ネオテーム', '人工甘味料', 'アセスルファム', 'ファイザー', 'モンサント'],
      count: 0, examples: []
    },
    'SNS運用・企業姿勢批判': {
      keywords: ['公式', 'ツイート', '投稿', 'バズ', 'ミーム', '炎上', '企業アカ', 'pr戦略'],
      count: 0, examples: []
    },
    'BDS・社会運動': {
      keywords: ['bds', 'イスラエル', 'ボイコット', 'パレスチナ', '不買', '運動'],
      count: 0, examples: []
    },
    '投資失敗・損失報告': {
      keywords: ['損', '損切', '失敗', '買った', '売った', '投資', 'ナンピン', '塩漬け'],
      count: 0, examples: []
    },
    '健康被害・アレルギー': {
      keywords: ['アレルギー', '体調', '具合悪', '気持ち悪', '頭痛', '下痢', '吐き気'],
      count: 0, examples: []
    },
    'グローバル批判・多国籍': {
      keywords: ['グローバル', '多国籍', '外資', '海外', '進出', 'タイ', '東南アジア'],
      count: 0, examples: []
    },
    '労働・ブラック企業': {
      keywords: ['ブラック', '残業', '労働', '働き方', '退職', '辞めた', '社員'],
      count: 0, examples: []
    },
    '陰謀論・都市伝説': {
      keywords: ['陰謀', '闇', '裏', '真実', '隠', 'やばい', 'ディープ', '支配'],
      count: 0, examples: []
    },
    '旧ブランド・懐古': {
      keywords: ['昔', '以前', '変わった', 'リニューアル', '前の方', '旧', '改悪'],
      count: 0, examples: []
    },
    '競合比較・乗り換え': {
      keywords: ['乗り換え', '変えた', '他社', '比較', 'キッコーマン', 'ヤマサ', 'ミツカン'],
      count: 0, examples: []
    },
  };

  // パターンマッチング
  for (const post of otherPosts) {
    const text = (post.content || '').toLowerCase();
    let matched = false;

    for (const [patternName, pattern] of Object.entries(newPatterns)) {
      for (const kw of pattern.keywords) {
        if (text.includes(kw.toLowerCase())) {
          pattern.count++;
          if (pattern.examples.length < 3) {
            pattern.examples.push({
              text: post.content?.slice(0, 250),
              likes: post.likes_count,
              url: post.url
            });
          }
          matched = true;
          break;
        }
      }
      if (matched) break;
    }
  }

  // 結果出力（件数順）
  const sorted = Object.entries(newPatterns)
    .filter(([, p]) => p.count > 0)
    .sort((a, b) => b[1].count - a[1].count);

  console.log('=== 隠れたパターン（件数順）===\n');

  for (const [name, pattern] of sorted) {
    console.log(`【${name}】${pattern.count}件`);
    for (const ex of pattern.examples) {
      console.log(`  └ [${ex.likes}いいね] ${ex.text}...`);
    }
    console.log('');
  }

  // マッチしなかった投稿も確認
  const unmatched = otherPosts.filter(post => {
    const text = (post.content || '').toLowerCase();
    for (const pattern of Object.values(newPatterns)) {
      for (const kw of pattern.keywords) {
        if (text.includes(kw.toLowerCase())) return false;
      }
    }
    return true;
  });

  console.log(`\n=== 未分類（${unmatched.length}件）- 上位10件 ===\n`);
  for (const post of unmatched.slice(0, 10)) {
    console.log(`[${post.likes_count}いいね] ${post.content?.slice(0, 200)}...`);
    console.log(`URL: ${post.url}`);
    console.log('---');
  }
}

analyzeDeep().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

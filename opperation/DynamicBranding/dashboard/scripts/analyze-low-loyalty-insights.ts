/**
 * ロイヤリティ低層（sentiment='negative'）の隠れたインサイト分析
 *
 * 5つのインサイトカテゴリでキーワード分類し、代表投稿を抽出
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim(),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim()
);

interface Post {
  id: number;
  content: string;
  url: string;
  likes_count: number;
  published: string;
}

interface CategoryResult {
  name: string;
  count: number;
  posts: Post[];
  keywords: string[];
}

// 5つのインサイトカテゴリとキーワード定義
const INSIGHT_CATEGORIES: Record<string, { keywords: string[]; label: string }> = {
  Q1_品質味: {
    label: '品質・味への信頼喪失',
    keywords: ['まずい', '美味しくない', '味が変わ', '品質', 'リニューアル', '不味', '失敗', '劣化']
  },
  Q2_コスパ代替: {
    label: 'コスパ不満・代替品シフト',
    keywords: ['値上げ', '高い', '代わり', '代替', '乗り換え', 'コスパ', '高くなった', '別の']
  },
  Q3_スキャンダル: {
    label: '企業スキャンダル反応',
    keywords: ['不祥事', '問題', '謝罪', '隠蔽', '説明責任', '炎上', '批判', '許せない']
  },
  Q4_ホワイト企業: {
    label: 'ホワイト企業イメージギャップ',
    keywords: ['ブラック', '労働', '残業', '採用', '落ちた', '福利厚生', '年収', '嘘', '実際']
  },
  Q5_ポートフォリオ: {
    label: 'ポートフォリオ混乱批判',
    keywords: ['半導体', '多角化', '本業', '事業拡大', '迷走', '何屋', '関係ない']
  },
  既知_添加物: {
    label: '添加物懸念（既知）',
    keywords: ['msg', 'グルタミン酸', '毒', '体に悪い', '添加物', '化学', '人工', '危険']
  },
  既知_ステマ: {
    label: 'ステマ・PR批判（既知）',
    keywords: ['ステマ', '案件', '親善大使', 'pr', 'プロモ', 'リュウジ', 'インフルエンサー']
  },
  既知_株価: {
    label: '株価・業績批判（既知）',
    keywords: ['ストップ安', '株価下落', '業績悪化', '売上減', '赤字', '減配', '配当']
  }
};

async function analyzeNegativePosts(): Promise<void> {
  console.log('🔍 ロイヤリティ低層（negative）の隠れたインサイト分析\n');
  console.log('='.repeat(60));

  // 全ネガティブ投稿を取得
  const { data, error } = await supabase
    .from('sns_posts')
    .select('id, content, url, likes_count, published')
    .eq('is_corporate', true)
    .eq('sentiment', 'negative')
    .order('likes_count', { ascending: false });

  if (error) {
    console.error('❌ エラー:', error);
    return;
  }

  console.log(`\n📊 総件数: ${data?.length} 件\n`);

  // カテゴリ別に分類
  const results: Record<string, CategoryResult> = {};
  const categorizedIds = new Set<number>();

  for (const [catKey, catDef] of Object.entries(INSIGHT_CATEGORIES)) {
    results[catKey] = {
      name: catDef.label,
      count: 0,
      posts: [],
      keywords: catDef.keywords
    };
  }

  // 各投稿をカテゴリに分類
  data?.forEach((post: Post) => {
    const content = post.content.toLowerCase();
    const matchedCategories: string[] = [];

    for (const [catKey, catDef] of Object.entries(INSIGHT_CATEGORIES)) {
      const matched = catDef.keywords.some(kw => content.includes(kw.toLowerCase()));
      if (matched) {
        matchedCategories.push(catKey);
        results[catKey].posts.push(post);
        categorizedIds.add(post.id);
      }
    }
  });

  // カウント更新
  for (const catKey of Object.keys(results)) {
    results[catKey].count = results[catKey].posts.length;
  }

  // 未分類の投稿数
  const uncategorizedCount = (data?.length || 0) - categorizedIds.size;

  // 結果出力
  console.log('📈 カテゴリ別カウント（降順）\n');
  console.log('| カテゴリ | 件数 | 割合 |');
  console.log('|----------|------|------|');

  const sortedResults = Object.entries(results)
    .sort((a, b) => b[1].count - a[1].count);

  for (const [catKey, result] of sortedResults) {
    const pct = ((result.count / (data?.length || 1)) * 100).toFixed(1);
    const prefix = catKey.startsWith('既知') ? '📌' : '🆕';
    console.log(`| ${prefix} ${result.name} | ${result.count} | ${pct}% |`);
  }

  console.log(`| ❓ 未分類 | ${uncategorizedCount} | ${((uncategorizedCount / (data?.length || 1)) * 100).toFixed(1)}% |`);
  console.log('');

  // 新インサイト（既知以外）の詳細出力
  console.log('='.repeat(60));
  console.log('\n🆕 新インサイトカテゴリの代表投稿\n');

  const newInsightKeys = Object.keys(results).filter(k => !k.startsWith('既知'));

  for (const catKey of newInsightKeys) {
    const result = results[catKey];
    if (result.count === 0) continue;

    console.log(`\n【${result.name}】 ${result.count}件`);
    console.log(`キーワード: ${result.keywords.join(', ')}`);
    console.log('-'.repeat(50));

    // 上位5件を表示
    result.posts.slice(0, 5).forEach((post, i) => {
      const contentPreview = post.content.slice(0, 100).replace(/\n/g, ' ');
      console.log(`  ${i + 1}. [${post.likes_count} likes] ${contentPreview}...`);
      if (post.url) {
        console.log(`     URL: ${post.url}`);
      }
    });
  }

  // JSON出力用データ作成
  const outputData = {
    summary: {
      total: data?.length || 0,
      categorized: categorizedIds.size,
      uncategorized: uncategorizedCount,
      analyzedAt: new Date().toISOString()
    },
    categories: sortedResults.map(([key, result]) => ({
      key,
      name: result.name,
      count: result.count,
      percentage: ((result.count / (data?.length || 1)) * 100).toFixed(1),
      isNew: !key.startsWith('既知'),
      keywords: result.keywords,
      topPosts: result.posts.slice(0, 5).map(p => ({
        id: p.id,
        content: p.content.slice(0, 200),
        likes: p.likes_count,
        url: p.url,
        published: p.published
      }))
    }))
  };

  // JSONファイル出力
  const fs = await import('fs');
  const outputPath = 'output/low-loyalty-insights.json';
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
  console.log(`\n\n✅ 結果をJSONに出力: ${outputPath}`);

  // サマリー
  console.log('\n' + '='.repeat(60));
  console.log('📋 分析サマリー\n');

  const newInsights = sortedResults.filter(([k]) => !k.startsWith('既知'));
  const newInsightTotal = newInsights.reduce((sum, [, r]) => sum + r.count, 0);

  console.log(`  新インサイト発見数: ${newInsightTotal}件（${((newInsightTotal / (data?.length || 1)) * 100).toFixed(1)}%）`);
  console.log(`  既知パターン: ${categorizedIds.size - newInsightTotal}件`);
  console.log(`  未分類: ${uncategorizedCount}件（さらなる分析が必要）`);

  // 重複分析
  const duplicateCount = Object.values(results).reduce((sum, r) => sum + r.count, 0) - categorizedIds.size;
  console.log(`  重複分類: ${duplicateCount}件（複数カテゴリに該当）`);
}

// 実行
analyzeNegativePosts().catch(console.error);

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.production') });
dotenv.config({ path: resolve(process.cwd(), '.env.local'), override: true });

console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30) + '...');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function analyze() {
  const { data: posts, error } = await supabase
    .from('sns_posts')
    .select('id, content, likes_count, retweets_count, corporate_topic, url')
    .eq('is_corporate', true)
    .eq('sentiment', 'negative')
    .order('likes_count', { ascending: false })
    .limit(400);

  if (error) throw error;

  console.log('=== ロイヤリティ低層 ネガティブ投稿分析 ===');
  console.log('総件数:', posts?.length);
  console.log('');

  const categories: Record<string, { count: number; examples: any[] }> = {};

  for (const post of posts || []) {
    const text = post.content?.toLowerCase() || '';
    let category = 'その他';

    if (text.includes('添加物') || text.includes('msg') || text.includes('グルタミン酸') || text.includes('毒') || text.includes('体に悪い')) {
      category = '① 添加物懸念（王道）';
    } else if (text.includes('ステマ') || text.includes('案件') || text.includes('親善大使')) {
      category = '② ステマ・PR批判（王道）';
    } else if (text.includes('株価') || text.includes('ストップ安') || text.includes('下落') || text.includes('業績')) {
      category = '③ 株価・業績批判（王道）';
    } else if (text.includes('リュウジ') || text.includes('りゅうじ')) {
      category = '④ リュウジ関連';
    } else if (text.includes('値上げ') || text.includes('高い') || text.includes('価格')) {
      category = '⑤ 価格・値上げ批判';
    } else if (text.includes('まずい') || text.includes('美味しくない') || text.includes('味が')) {
      category = '⑥ 味・品質批判';
    } else if (text.includes('対応') || text.includes('問い合わせ') || text.includes('カスタマー')) {
      category = '⑦ サービス対応批判';
    } else if (text.includes('cm') || text.includes('広告')) {
      category = '⑧ CM・広告批判';
    } else if (text.includes('環境') || text.includes('プラスチック') || text.includes('エコ') || text.includes('sdgs')) {
      category = '⑨ 環境・サステナ批判';
    } else if (text.includes('中国') || text.includes('韓国') || text.includes('外国')) {
      category = '⑩ 国産・外国産批判';
    }

    if (!categories[category]) {
      categories[category] = { count: 0, examples: [] };
    }
    categories[category].count++;
    if (categories[category].examples.length < 5) {
      categories[category].examples.push({
        id: post.id,
        text: post.content?.slice(0, 200),
        likes: post.likes_count
      });
    }
  }

  const sorted = Object.entries(categories).sort((a, b) => b[1].count - a[1].count);

  for (const [cat, data] of sorted) {
    console.log('---');
    console.log('【' + cat + '】', data.count + '件');
    for (const ex of data.examples) {
      console.log('  ・[' + ex.likes + 'いいね] ' + ex.text + '...');
    }
  }
}

analyze().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

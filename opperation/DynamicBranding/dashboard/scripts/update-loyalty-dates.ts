/**
 * corporate_loyaltyのrepresentative_postsにposted_at日付を追加するスクリプト
 *
 * 実行方法:
 * npx tsx scripts/update-loyalty-dates.ts
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";
import fs from "fs";
import path from "path";

// Try .env.local first, then .env.production
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env.production") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\\n/g, "").trim() || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.replace(/\\n/g, "").trim() || "";

const supabase = createClient(supabaseUrl, supabaseKey);

interface LoyaltyPost {
  id: number;
  content: string;
  topic: string | null;
  likes: number;
  posted_at?: string;
}

interface LoyaltyLevel {
  level: string;
  name: string;
  description: string;
  count: number;
  percentage: string;
  color: string;
  representative_posts: LoyaltyPost[];
}

interface FansData {
  segments: unknown[];
  total_fans: number;
  health_score: number;
  generated_at: string;
  corporate_loyalty: {
    total: number;
    levels: LoyaltyLevel[];
    generated_at: string;
  };
}

async function main() {
  console.log("=".repeat(60));
  console.log("Update Loyalty Posts with Dates");
  console.log("=".repeat(60));

  const corpId = 1;
  const filePath = path.resolve(process.cwd(), `output/corporate/${corpId}-fans.json`);

  // 1. 既存JSONを読み込み
  console.log("\n1. Loading existing JSON...");
  if (!fs.existsSync(filePath)) {
    console.error(`  Error: File not found: ${filePath}`);
    process.exit(1);
  }

  const fansData: FansData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  console.log(`  Loaded: ${filePath}`);

  if (!fansData.corporate_loyalty) {
    console.error("  Error: corporate_loyalty not found in JSON");
    process.exit(1);
  }

  // 2. すべてのpost IDを収集
  console.log("\n2. Collecting post IDs...");
  const allPostIds: number[] = [];
  for (const level of fansData.corporate_loyalty.levels) {
    for (const post of level.representative_posts) {
      allPostIds.push(post.id);
    }
  }
  console.log(`  Total post IDs: ${allPostIds.length}`);

  // 3. DBから日付を取得（バッチ処理）
  console.log("\n3. Fetching dates from database...");

  // ID -> date マップを作成
  const dateMap = new Map<number, string>();

  // 500件ずつバッチで取得（Supabaseの制限対応）
  const BATCH_SIZE = 500;
  for (let i = 0; i < allPostIds.length; i += BATCH_SIZE) {
    const batchIds = allPostIds.slice(i, i + BATCH_SIZE);
    const { data: posts, error } = await supabase
      .from("sns_posts")
      .select("id, published")
      .in("id", batchIds);

    if (error) {
      console.error(`  Error fetching batch ${Math.floor(i / BATCH_SIZE) + 1}:`, error);
      continue;
    }

    for (const post of posts || []) {
      if (post.published) {
        // YYYY-MM-DD形式に変換
        const date = new Date(post.published);
        const dateStr = date.toISOString().split("T")[0];
        dateMap.set(post.id, dateStr);
      }
    }
    console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${posts?.length || 0} posts`);
  }
  console.log(`  Total: Found dates for ${dateMap.size} posts`);

  // 4. JSONを更新
  console.log("\n4. Updating JSON with dates...");
  let updatedCount = 0;
  for (const level of fansData.corporate_loyalty.levels) {
    for (const post of level.representative_posts) {
      const date = dateMap.get(post.id);
      if (date) {
        post.posted_at = date;
        updatedCount++;
      }
    }
  }
  console.log(`  Updated ${updatedCount} posts with dates`);

  // 5. 統計表示
  console.log("\n5. Date distribution:");
  const monthCounts: Record<string, number> = {};
  for (const level of fansData.corporate_loyalty.levels) {
    for (const post of level.representative_posts) {
      if (post.posted_at) {
        const month = post.posted_at.substring(0, 7);
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      }
    }
  }
  const sortedMonths = Object.entries(monthCounts).sort((a, b) => b[0].localeCompare(a[0]));
  for (const [month, count] of sortedMonths.slice(0, 10)) {
    console.log(`  ${month}: ${count}件`);
  }
  if (sortedMonths.length > 10) {
    console.log(`  ... and ${sortedMonths.length - 10} more months`);
  }

  // 6. 保存
  console.log("\n6. Saving updated JSON...");
  fansData.corporate_loyalty.generated_at = new Date().toISOString();
  fs.writeFileSync(filePath, JSON.stringify(fansData, null, 2));
  console.log(`  Saved: ${filePath}`);

  console.log("\n" + "=".repeat(60));
  console.log("Done!");
  console.log("=".repeat(60));
}

main().catch(console.error);

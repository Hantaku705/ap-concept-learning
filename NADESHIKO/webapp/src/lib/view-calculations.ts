/**
 * 再生数データの集計・分析関数
 */

import { ViewRecord } from '@/data/views-data';

// 月別サマリー
export interface MonthlyViewSummary {
  month: string;
  totalViews: number;
  avgViews: number;
  postCount: number;
  totalLikes: number;
  totalComments: number;
  avgEngagementRate: number;
  avgRetentionRate: number;
}

// アカウント別ランキング
export interface AccountViewRanking {
  accountName: string;
  totalViews: number;
  avgViews: number;
  postCount: number;
  avgEngagementRate: number;
  trend: 'up' | 'down' | 'stable';
}

// 担当者別ランキング
export interface ManagerViewRanking {
  manager: string;
  totalViews: number;
  avgViews: number;
  postCount: number;
  accountCount: number;
}

// プラットフォーム別サマリー
export interface PlatformViewSummary {
  platform: string;
  totalViews: number;
  postCount: number;
  percentage: number;
}

// アカウント別サマリー（円グラフ用）
export interface AccountViewSummary {
  accountName: string;
  totalViews: number;
  postCount: number;
  percentage: number;
}

// 期間オプション
export interface ViewPeriodOption {
  value: string;
  label: string;
  group: string;
}

/**
 * 期間文字列から月のリストを取得
 */
export function periodToMonths(records: ViewRecord[], period: string): string[] {
  const allMonths = [...new Set(records.map(r => r.month))].sort();

  if (period === 'all') {
    return allMonths;
  }

  // 年 (例: "2024", "2025")
  if (/^\d{4}$/.test(period)) {
    return allMonths.filter(m => m.startsWith(period));
  }

  // 四半期 (例: "2024-Q1")
  const qMatch = period.match(/^(\d{4})-Q(\d)$/);
  if (qMatch) {
    const year = qMatch[1];
    const q = parseInt(qMatch[2]);
    const startMonth = (q - 1) * 3 + 1;
    const months = [1, 2, 3].map(i => {
      const m = startMonth + i - 1;
      return `${year}-${m.toString().padStart(2, '0')}`;
    });
    return allMonths.filter(m => months.includes(m));
  }

  // 月 (例: "2024-04")
  if (/^\d{4}-\d{2}$/.test(period)) {
    return allMonths.filter(m => m === period);
  }

  return allMonths;
}

/**
 * 期間でフィルタ
 */
export function filterByPeriod(records: ViewRecord[], period: string): ViewRecord[] {
  const months = periodToMonths(records, period);
  return records.filter(r => months.includes(r.month));
}

/**
 * 複数期間でフィルタ
 */
export function filterByPeriods(records: ViewRecord[], periods: string[]): ViewRecord[] {
  if (periods.length === 0 || periods.includes('all')) {
    return records;
  }
  const allMonths = new Set<string>();
  for (const period of periods) {
    const months = periodToMonths(records, period);
    months.forEach(m => allMonths.add(m));
  }
  return records.filter(r => allMonths.has(r.month));
}

/**
 * 月別集計
 */
export function calculateMonthlyViews(records: ViewRecord[]): MonthlyViewSummary[] {
  const monthMap = new Map<string, ViewRecord[]>();

  for (const record of records) {
    const existing = monthMap.get(record.month) || [];
    existing.push(record);
    monthMap.set(record.month, existing);
  }

  const summaries: MonthlyViewSummary[] = [];

  for (const [month, monthRecords] of monthMap) {
    const totalViews = monthRecords.reduce((sum, r) => sum + (r.views || 0), 0);
    const totalLikes = monthRecords.reduce((sum, r) => sum + (r.likes || 0), 0);
    const totalComments = monthRecords.reduce((sum, r) => sum + (r.comments || 0), 0);

    const engagementRates = monthRecords
      .filter(r => r.likeRate !== null)
      .map(r => r.likeRate!);
    const avgEngagement = engagementRates.length > 0
      ? engagementRates.reduce((a, b) => a + b, 0) / engagementRates.length
      : 0;

    const retentionRates = monthRecords
      .filter(r => r.retentionRate !== null)
      .map(r => r.retentionRate!);
    const avgRetention = retentionRates.length > 0
      ? retentionRates.reduce((a, b) => a + b, 0) / retentionRates.length
      : 0;

    summaries.push({
      month,
      totalViews,
      avgViews: monthRecords.length > 0 ? totalViews / monthRecords.length : 0,
      postCount: monthRecords.length,
      totalLikes,
      totalComments,
      avgEngagementRate: avgEngagement,
      avgRetentionRate: avgRetention,
    });
  }

  return summaries.sort((a, b) => a.month.localeCompare(b.month));
}

/**
 * アカウント別ランキング
 */
export function calculateAccountViewRanking(
  records: ViewRecord[],
  limit: number = 10
): AccountViewRanking[] {
  const accountMap = new Map<string, ViewRecord[]>();

  for (const record of records) {
    const existing = accountMap.get(record.accountName) || [];
    existing.push(record);
    accountMap.set(record.accountName, existing);
  }

  const rankings: AccountViewRanking[] = [];

  for (const [accountName, accountRecords] of accountMap) {
    const totalViews = accountRecords.reduce((sum, r) => sum + (r.views || 0), 0);

    const engagementRates = accountRecords
      .filter(r => r.likeRate !== null)
      .map(r => r.likeRate!);
    const avgEngagement = engagementRates.length > 0
      ? engagementRates.reduce((a, b) => a + b, 0) / engagementRates.length
      : 0;

    // トレンド計算（直近月 vs 前月）
    const sortedByDate = [...accountRecords].sort((a, b) =>
      b.postDate.localeCompare(a.postDate)
    );
    const recentMonth = sortedByDate[0]?.month;
    const prevMonth = getPreviousMonth(recentMonth);

    const recentViews = accountRecords
      .filter(r => r.month === recentMonth)
      .reduce((sum, r) => sum + (r.views || 0), 0);
    const prevViews = accountRecords
      .filter(r => r.month === prevMonth)
      .reduce((sum, r) => sum + (r.views || 0), 0);

    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (prevViews > 0) {
      const change = (recentViews - prevViews) / prevViews;
      if (change > 0.1) trend = 'up';
      else if (change < -0.1) trend = 'down';
    }

    rankings.push({
      accountName,
      totalViews,
      avgViews: accountRecords.length > 0 ? totalViews / accountRecords.length : 0,
      postCount: accountRecords.length,
      avgEngagementRate: avgEngagement,
      trend,
    });
  }

  return rankings
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, limit);
}

/**
 * 担当者別ランキング
 */
export function calculateManagerViewRanking(
  records: ViewRecord[],
  limit: number = 10
): ManagerViewRanking[] {
  const managerMap = new Map<string, ViewRecord[]>();

  for (const record of records) {
    const existing = managerMap.get(record.manager) || [];
    existing.push(record);
    managerMap.set(record.manager, existing);
  }

  const rankings: ManagerViewRanking[] = [];

  for (const [manager, managerRecords] of managerMap) {
    const totalViews = managerRecords.reduce((sum, r) => sum + (r.views || 0), 0);
    const accounts = new Set(managerRecords.map(r => r.accountName));

    rankings.push({
      manager,
      totalViews,
      avgViews: managerRecords.length > 0 ? totalViews / managerRecords.length : 0,
      postCount: managerRecords.length,
      accountCount: accounts.size,
    });
  }

  return rankings
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, limit);
}

/**
 * プラットフォーム別集計
 */
export function calculatePlatformViews(records: ViewRecord[]): PlatformViewSummary[] {
  const platformMap = new Map<string, { views: number; count: number }>();

  for (const record of records) {
    const existing = platformMap.get(record.platform) || { views: 0, count: 0 };
    existing.views += record.views || 0;
    existing.count += 1;
    platformMap.set(record.platform, existing);
  }

  const totalViews = records.reduce((sum, r) => sum + (r.views || 0), 0);

  const summaries: PlatformViewSummary[] = [];

  for (const [platform, data] of platformMap) {
    summaries.push({
      platform,
      totalViews: data.views,
      postCount: data.count,
      percentage: totalViews > 0 ? (data.views / totalViews) * 100 : 0,
    });
  }

  return summaries.sort((a, b) => b.totalViews - a.totalViews);
}

/**
 * アカウント別集計（円グラフ用、上位10件）
 */
export function calculateAccountViews(records: ViewRecord[], limit: number = 10): AccountViewSummary[] {
  const accountMap = new Map<string, { views: number; count: number }>();

  for (const record of records) {
    const existing = accountMap.get(record.accountName) || { views: 0, count: 0 };
    existing.views += record.views || 0;
    existing.count += 1;
    accountMap.set(record.accountName, existing);
  }

  const totalViews = records.reduce((sum, r) => sum + (r.views || 0), 0);

  const summaries: AccountViewSummary[] = [];

  for (const [accountName, data] of accountMap) {
    summaries.push({
      accountName,
      totalViews: data.views,
      postCount: data.count,
      percentage: totalViews > 0 ? (data.views / totalViews) * 100 : 0,
    });
  }

  // 上位N件 + その他
  const sorted = summaries.sort((a, b) => b.totalViews - a.totalViews);
  if (sorted.length <= limit) {
    return sorted;
  }

  const top = sorted.slice(0, limit);
  const others = sorted.slice(limit);
  const othersTotal = others.reduce((sum, a) => sum + a.totalViews, 0);
  const othersCount = others.reduce((sum, a) => sum + a.postCount, 0);

  top.push({
    accountName: 'その他',
    totalViews: othersTotal,
    postCount: othersCount,
    percentage: totalViews > 0 ? (othersTotal / totalViews) * 100 : 0,
  });

  return top;
}

/**
 * 中央値計算
 */
export function calculateMedianViews(records: ViewRecord[]): number {
  if (records.length === 0) return 0;
  const sorted = [...records].map(r => r.views).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * KPI計算
 */
export function calculateViewsKPI(records: ViewRecord[]) {
  const totalViews = records.reduce((sum, r) => sum + (r.views || 0), 0);
  const totalLikes = records.reduce((sum, r) => sum + (r.likes || 0), 0);
  const postCount = records.length;
  const medianViews = calculateMedianViews(records);

  const engagementRates = records
    .filter(r => r.likeRate !== null)
    .map(r => r.likeRate!);
  const avgEngagement = engagementRates.length > 0
    ? engagementRates.reduce((a, b) => a + b, 0) / engagementRates.length
    : 0;

  const retentionRates = records
    .filter(r => r.retentionRate !== null)
    .map(r => r.retentionRate!);
  const avgRetention = retentionRates.length > 0
    ? retentionRates.reduce((a, b) => a + b, 0) / retentionRates.length
    : 0;

  return {
    totalViews,
    avgViews: postCount > 0 ? totalViews / postCount : 0,
    medianViews,
    postCount,
    totalLikes,
    avgEngagement,
    avgRetention,
  };
}

/**
 * 期間オプションを生成
 */
export function generatePeriodOptions(records: ViewRecord[]): ViewPeriodOption[] {
  const months = [...new Set(records.map(r => r.month))].sort();
  const years = [...new Set(months.map(m => m.slice(0, 4)))].sort();

  const options: ViewPeriodOption[] = [
    { value: 'all', label: '全期間', group: '全期間' },
  ];

  // 年オプション
  for (const year of years.reverse()) {
    options.push({ value: year, label: `${year}年`, group: '年' });
  }

  // 四半期オプション
  for (const year of years) {
    for (let q = 1; q <= 4; q++) {
      const qValue = `${year}-Q${q}`;
      const qMonths = periodToMonths(records, qValue);
      if (qMonths.length > 0) {
        options.push({ value: qValue, label: `${year}年Q${q}`, group: '四半期' });
      }
    }
  }

  // 月オプション（全期間、新しい順）
  const allMonths = [...months].reverse();
  for (const month of allMonths) {
    const [y, m] = month.split('-');
    options.push({ value: month, label: `${y}年${parseInt(m)}月`, group: '月' });
  }

  return options;
}

/**
 * 前月を取得
 */
function getPreviousMonth(month: string): string {
  if (!month) return '';
  const [y, m] = month.split('-').map(Number);
  if (m === 1) {
    return `${y - 1}-12`;
  }
  return `${y}-${(m - 1).toString().padStart(2, '0')}`;
}

// ============================================
// 日別再生数トラッキング用
// ============================================

// 日別サマリー（1アカウント・1日）
export interface DailyViewSummary {
  date: string;          // "2026-01-15"
  accountName: string;
  totalViews: number;
  postCount: number;
  avgViews: number;
  totalLikes: number;
  totalSaves: number;
}

// 日別集計結果（複数アカウント比較用）
export interface DailyViewData {
  date: string;
  [accountName: string]: number | string;
}

/**
 * 日付範囲でフィルタ
 */
export function filterByDateRange(
  records: ViewRecord[],
  startDate: string,
  endDate: string
): ViewRecord[] {
  return records.filter(r => {
    const date = r.postDate.slice(0, 10); // "YYYY-MM-DD"
    return date >= startDate && date <= endDate;
  });
}

/**
 * 直近N日のレコードを取得
 */
export function filterByLastNDays(
  records: ViewRecord[],
  days: number
): ViewRecord[] {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - days);

  const startStr = startDate.toISOString().slice(0, 10);
  const endStr = today.toISOString().slice(0, 10);

  return filterByDateRange(records, startStr, endStr);
}

/**
 * 直近N投稿を取得（新しい順にN件）
 */
export function filterByLastNPosts(
  records: ViewRecord[],
  count: number
): ViewRecord[] {
  // 投稿日時で降順ソート → 直近N件取得 → 昇順に戻す
  const sorted = [...records].sort((a, b) =>
    b.postDate.localeCompare(a.postDate)
  );
  return sorted.slice(0, count).reverse();
}

/**
 * 日別集計（単一アカウント詳細）
 */
export function calculateDailyViewsForAccount(
  records: ViewRecord[],
  accountName: string
): DailyViewSummary[] {
  const filtered = records.filter(r => r.accountName === accountName);
  const dayMap = new Map<string, ViewRecord[]>();

  for (const record of filtered) {
    const date = record.postDate.slice(0, 10);
    const existing = dayMap.get(date) || [];
    existing.push(record);
    dayMap.set(date, existing);
  }

  const summaries: DailyViewSummary[] = [];

  for (const [date, dayRecords] of dayMap) {
    const totalViews = dayRecords.reduce((sum, r) => sum + (r.views || 0), 0);
    const totalLikes = dayRecords.reduce((sum, r) => sum + (r.likes || 0), 0);
    const totalSaves = dayRecords.reduce((sum, r) => sum + (r.saves || 0), 0);

    summaries.push({
      date,
      accountName,
      totalViews,
      postCount: dayRecords.length,
      avgViews: dayRecords.length > 0 ? totalViews / dayRecords.length : 0,
      totalLikes,
      totalSaves,
    });
  }

  return summaries.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * 日別集計（複数アカウント比較用）
 */
export function calculateDailyViewsMultiAccount(
  records: ViewRecord[],
  accountNames: string[]
): DailyViewData[] {
  const filtered = records.filter(r => accountNames.includes(r.accountName));
  const dayMap = new Map<string, Map<string, number>>();

  // 日付一覧を収集
  const allDates = new Set<string>();

  for (const record of filtered) {
    const date = record.postDate.slice(0, 10);
    allDates.add(date);

    if (!dayMap.has(date)) {
      dayMap.set(date, new Map());
    }
    const accountMap = dayMap.get(date)!;
    const current = accountMap.get(record.accountName) || 0;
    accountMap.set(record.accountName, current + (record.views || 0));
  }

  // 結果を整形
  const result: DailyViewData[] = [];
  const sortedDates = [...allDates].sort();

  for (const date of sortedDates) {
    const accountMap = dayMap.get(date) || new Map();
    const row: DailyViewData = { date };

    for (const name of accountNames) {
      row[name] = accountMap.get(name) || 0;
    }

    result.push(row);
  }

  return result;
}

// ============================================
// 投稿単位データ・移動平均（散布図用）
// ============================================

// 投稿単位データ（散布図用：1投稿 = 1点）
export interface PostViewRecord {
  postIndex: number;       // 時系列インデックス（X軸用）
  postDate: string;        // "2026-01-15"
  postDateTime: string;    // "2026-01-15 10:30:00"
  accountName: string;
  views: number;
  likes: number;
  title: string;
}

// 移動平均付きデータ
export interface PostWithMA {
  postIndex: number;
  postDate: string;
  accountName: string;
  views: number;
  title: string;
  ma7: number | null;      // 7投稿移動平均（短期）
  ma14: number | null;     // 14投稿移動平均
  ma28: number | null;     // 28投稿移動平均
  ma42: number | null;     // 42投稿移動平均
  ma56: number | null;     // 56投稿移動平均（長期）
  ma100: number | null;    // 100投稿移動平均（超長期）
}

/**
 * 投稿単位データ取得（散布図用）
 * アカウント名を指定しない場合は全アカウント
 */
export function getPostViewRecords(
  records: ViewRecord[],
  accountName?: string
): PostViewRecord[] {
  const filtered = accountName
    ? records.filter(r => r.accountName === accountName)
    : records;

  // 投稿日時でソート
  const sorted = [...filtered].sort((a, b) =>
    a.postDate.localeCompare(b.postDate)
  );

  return sorted.map((r, index) => ({
    postIndex: index,
    postDate: r.postDate.slice(0, 10),
    postDateTime: r.postDate,
    accountName: r.accountName,
    views: r.views || 0,
    likes: r.likes || 0,
    title: r.title || '',
  }));
}

/**
 * 移動平均を計算
 * @param data 投稿データ配列（時系列順）
 * @param window 移動平均の期間（投稿数）
 */
export function calculateMovingAverage(
  data: PostViewRecord[],
  window: number
): (number | null)[] {
  const result: (number | null)[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < window - 1) {
      result.push(null);
    } else {
      let sum = 0;
      for (let j = 0; j < window; j++) {
        sum += data[i - j].views;
      }
      result.push(sum / window);
    }
  }

  return result;
}

/**
 * 投稿単位データに移動平均を付与
 */
export function getPostsWithMovingAverage(
  records: ViewRecord[],
  accountName?: string
): PostWithMA[] {
  const posts = getPostViewRecords(records, accountName);
  const ma7 = calculateMovingAverage(posts, 7);
  const ma14 = calculateMovingAverage(posts, 14);
  const ma28 = calculateMovingAverage(posts, 28);
  const ma42 = calculateMovingAverage(posts, 42);
  const ma56 = calculateMovingAverage(posts, 56);
  const ma100 = calculateMovingAverage(posts, 100);

  return posts.map((post, i) => ({
    postIndex: post.postIndex,
    postDate: post.postDate,
    accountName: post.accountName,
    views: post.views,
    title: post.title,
    ma7: ma7[i],
    ma14: ma14[i],
    ma28: ma28[i],
    ma42: ma42[i],
    ma56: ma56[i],
    ma100: ma100[i],
  }));
}

/**
 * パーセンタイルを計算
 * @param values 数値配列
 * @param percentile パーセンタイル (0-100)
 */
export function calculatePercentile(values: number[], percentile: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil(sorted.length * (percentile / 100)) - 1;
  return sorted[Math.max(0, index)];
}

// ============================================
// アカウント別MAトレンド一覧
// ============================================

// アカウント別MAトレンドデータ
export interface AccountMATrend {
  accountName: string;
  postCount: number;          // 投稿数
  latestMA14: number | null;  // 最新の14投稿MA（短期）
  latestMA28: number | null;  // 最新の28投稿MA（約1ヶ月）
  latestMA42: number | null;  // 最新の42投稿MA（中期）
  latestMA100: number | null; // 最新の100投稿MA（長期）
  trend14: 'up' | 'down' | 'stable' | null;   // 14MAトレンド（短期）
  trend28: 'up' | 'down' | 'stable' | null;   // 28MAトレンド（約1ヶ月）
  trend42: 'up' | 'down' | 'stable' | null;   // 42MAトレンド（中期）
  trend100: 'up' | 'down' | 'stable' | null;  // 100MAトレンド（長期）
  change14: number | null;    // 14MA変化率(%)
  change28: number | null;    // 28MA変化率(%)
  change42: number | null;    // 42MA変化率(%)
  change100: number | null;   // 100MA変化率(%)
}

/**
 * 全アカウントのMAトレンドを計算
 * @param records 全レコード
 * @param lookbackPosts トレンド判定用の比較投稿数（デフォルト: 7）
 * @param threshold 変化率閾値（デフォルト: 5% = 0.05）
 */
export function calculateAccountMATrends(
  records: ViewRecord[],
  lookbackPosts: number = 7,
  threshold: number = 0.05
): AccountMATrend[] {
  // トレンド判定関数（共通で使用）
  const getTrend = (
    current: number | null,
    previous: number | null,
    thresh: number
  ): { trend: 'up' | 'down' | 'stable' | null; change: number | null } => {
    if (current === null || previous === null || previous === 0) {
      return { trend: null, change: null };
    }
    const changeRate = (current - previous) / previous;
    let trend: 'up' | 'down' | 'stable';
    if (changeRate > thresh) {
      trend = 'up';
    } else if (changeRate < -thresh) {
      trend = 'down';
    } else {
      trend = 'stable';
    }
    return { trend, change: changeRate * 100 };
  };

  // 1. アカウント一覧を取得
  const accounts = [...new Set(records.map(r => r.accountName))].sort();

  // 2. 各アカウントごとにMAを計算
  const results: AccountMATrend[] = [];

  // 3. 「全員」（全アカウント合算）を先頭に追加
  const allPostsWithMA = getPostsWithMovingAverage(records, undefined);
  if (allPostsWithMA.length > 0) {
    const latestAll = allPostsWithMA[allPostsWithMA.length - 1];
    // 各MAに応じた期間で比較（14MA→14投稿前、28MA→28投稿前、42MA→42投稿前、100MA→100投稿前）
    const compare14All = allPostsWithMA[Math.max(0, allPostsWithMA.length - 1 - 14)];
    const compare28All = allPostsWithMA[Math.max(0, allPostsWithMA.length - 1 - 28)];
    const compare42All = allPostsWithMA[Math.max(0, allPostsWithMA.length - 1 - 42)];
    const compare100All = allPostsWithMA[Math.max(0, allPostsWithMA.length - 1 - 100)];

    const trend14All = getTrend(latestAll.ma14, compare14All.ma14, threshold);
    const trend28All = getTrend(latestAll.ma28, compare28All.ma28, threshold);
    const trend42All = getTrend(latestAll.ma42, compare42All.ma42, threshold);
    const trend100All = getTrend(latestAll.ma100, compare100All.ma100, threshold);

    results.push({
      accountName: '全員',
      postCount: allPostsWithMA.length,
      latestMA14: latestAll.ma14,
      latestMA28: latestAll.ma28,
      latestMA42: latestAll.ma42,
      latestMA100: latestAll.ma100,
      trend14: trend14All.trend,
      trend28: trend28All.trend,
      trend42: trend42All.trend,
      trend100: trend100All.trend,
      change14: trend14All.change,
      change28: trend28All.change,
      change42: trend42All.change,
      change100: trend100All.change,
    });
  }

  for (const accountName of accounts) {
    const accountRecords = records.filter(r => r.accountName === accountName);
    // 既にフィルタ済みなのでaccountNameは不要（冗長なフィルタ回避）
    const postsWithMA = getPostsWithMovingAverage(accountRecords, undefined);

    if (postsWithMA.length === 0) {
      results.push({
        accountName,
        postCount: 0,
        latestMA14: null,
        latestMA28: null,
        latestMA42: null,
        latestMA100: null,
        trend14: null,
        trend28: null,
        trend42: null,
        trend100: null,
        change14: null,
        change28: null,
        change42: null,
        change100: null,
      });
      continue;
    }

    // 最新データ
    const latest = postsWithMA[postsWithMA.length - 1];

    // 各MAに応じた期間で比較（14MA→14投稿前、28MA→28投稿前、42MA→42投稿前、100MA→100投稿前）
    const compare14 = postsWithMA[Math.max(0, postsWithMA.length - 1 - 14)];
    const compare28 = postsWithMA[Math.max(0, postsWithMA.length - 1 - 28)];
    const compare42 = postsWithMA[Math.max(0, postsWithMA.length - 1 - 42)];
    const compare100 = postsWithMA[Math.max(0, postsWithMA.length - 1 - 100)];

    const trend14Result = getTrend(latest.ma14, compare14.ma14, threshold);
    const trend28Result = getTrend(latest.ma28, compare28.ma28, threshold);
    const trend42Result = getTrend(latest.ma42, compare42.ma42, threshold);
    const trend100Result = getTrend(latest.ma100, compare100.ma100, threshold);

    results.push({
      accountName,
      postCount: postsWithMA.length,
      latestMA14: latest.ma14,
      latestMA28: latest.ma28,
      latestMA42: latest.ma42,
      latestMA100: latest.ma100,
      trend14: trend14Result.trend,
      trend28: trend28Result.trend,
      trend42: trend42Result.trend,
      trend100: trend100Result.trend,
      change14: trend14Result.change,
      change28: trend28Result.change,
      change42: trend42Result.change,
      change100: trend100Result.change,
    });
  }

  return results;
}

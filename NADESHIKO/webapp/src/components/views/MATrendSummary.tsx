'use client';

import { useState, useMemo } from 'react';
import { ViewRecord } from '@/data/views-data';
import { calculateAccountMATrends, AccountMATrend } from '@/lib/view-calculations';

interface MATrendSummaryProps {
  data: ViewRecord[];
}

// ソート可能なカラム
type SortKey =
  | 'accountName'
  | 'postCount'
  | 'latestMA14'
  | 'change14'
  | 'latestMA28'
  | 'change28'
  | 'latestMA42'
  | 'change42'
  | 'latestMA100'
  | 'change100';

type SortDirection = 'asc' | 'desc';

// ソートアイコン
function SortIcon({ active, direction }: { active: boolean; direction: SortDirection }) {
  if (!active) {
    return (
      <svg className="w-3 h-3 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }
  if (direction === 'asc') {
    return (
      <svg className="w-3 h-3 text-blue-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  }
  return (
    <svg className="w-3 h-3 text-blue-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ソート可能なヘッダー
function SortableHeader({
  label,
  sortKey,
  currentKey,
  direction,
  onSort,
  align = 'left',
}: {
  label: string;
  sortKey: SortKey;
  currentKey: SortKey;
  direction: SortDirection;
  onSort: (key: SortKey) => void;
  align?: 'left' | 'right' | 'center';
}) {
  const isActive = currentKey === sortKey;
  const alignClass = align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start';

  return (
    <th
      className={`px-3 py-2 font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none`}
      onClick={() => onSort(sortKey)}
    >
      <div className={`flex items-center ${alignClass}`}>
        <span>{label}</span>
        <SortIcon active={isActive} direction={direction} />
      </div>
    </th>
  );
}

// トレンドアイコン
function TrendIcon({ trend, change }: { trend: 'up' | 'down' | 'stable' | null; change: number | null }) {
  if (trend === null) {
    return <span className="text-gray-400">-</span>;
  }

  const changeText = change !== null ? `${change >= 0 ? '+' : ''}${change.toFixed(1)}%` : '';

  if (trend === 'up') {
    return (
      <span className="inline-flex items-center gap-1 text-green-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span className="text-xs">{changeText}</span>
      </span>
    );
  }

  if (trend === 'down') {
    return (
      <span className="inline-flex items-center gap-1 text-red-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <span className="text-xs">{changeText}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-gray-500">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
      <span className="text-xs">{changeText}</span>
    </span>
  );
}

// MA値フォーマット
function formatMA(value: number | null): string {
  if (value === null) return '-';
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return Math.round(value).toLocaleString();
}

// 総合トレンド判定（3つのMAから）
function getOverallTrend(trends: AccountMATrend): 'good' | 'warning' | 'bad' | 'neutral' {
  const trendValues = [trends.trend14, trends.trend42, trends.trend100].filter(t => t !== null);
  if (trendValues.length === 0) return 'neutral';

  const upCount = trendValues.filter(t => t === 'up').length;
  const downCount = trendValues.filter(t => t === 'down').length;

  if (upCount >= 2) return 'good';
  if (downCount >= 2) return 'bad';
  if (downCount === 1) return 'warning';
  return 'neutral';
}

export default function MATrendSummary({ data }: MATrendSummaryProps) {
  const [sortKey, setSortKey] = useState<SortKey>('postCount');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // MAトレンドを計算
  const trends = useMemo(() => {
    return calculateAccountMATrends(data, 7, 0.05);
  }, [data]);

  // ソート処理
  const sortedTrends = useMemo(() => {
    const sorted = [...trends].sort((a, b) => {
      let aVal: number | string | null;
      let bVal: number | string | null;

      switch (sortKey) {
        case 'accountName':
          aVal = a.accountName;
          bVal = b.accountName;
          break;
        case 'postCount':
          aVal = a.postCount;
          bVal = b.postCount;
          break;
        case 'latestMA14':
          aVal = a.latestMA14;
          bVal = b.latestMA14;
          break;
        case 'change14':
          aVal = a.change14;
          bVal = b.change14;
          break;
        case 'latestMA28':
          aVal = a.latestMA28;
          bVal = b.latestMA28;
          break;
        case 'change28':
          aVal = a.change28;
          bVal = b.change28;
          break;
        case 'latestMA42':
          aVal = a.latestMA42;
          bVal = b.latestMA42;
          break;
        case 'change42':
          aVal = a.change42;
          bVal = b.change42;
          break;
        case 'latestMA100':
          aVal = a.latestMA100;
          bVal = b.latestMA100;
          break;
        case 'change100':
          aVal = a.change100;
          bVal = b.change100;
          break;
        default:
          aVal = a.postCount;
          bVal = b.postCount;
      }

      // null値の処理（nullは最後に）
      if (aVal === null && bVal === null) return 0;
      if (aVal === null) return 1;
      if (bVal === null) return -1;

      // 文字列比較
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const cmp = aVal.localeCompare(bVal, 'ja');
        return sortDirection === 'asc' ? cmp : -cmp;
      }

      // 数値比較
      const cmp = (aVal as number) - (bVal as number);
      return sortDirection === 'asc' ? cmp : -cmp;
    });

    return sorted;
  }, [trends, sortKey, sortDirection]);

  // ソートハンドラ
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  // サマリー統計
  const summary = useMemo(() => {
    const good = sortedTrends.filter(t => getOverallTrend(t) === 'good').length;
    const bad = sortedTrends.filter(t => getOverallTrend(t) === 'bad').length;
    const warning = sortedTrends.filter(t => getOverallTrend(t) === 'warning').length;
    return { good, bad, warning, total: sortedTrends.length };
  }, [sortedTrends]);

  if (sortedTrends.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">アカウント別MAトレンド一覧</h3>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            好調: {summary.good}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            注意: {summary.warning}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            低迷: {summary.bad}
          </span>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-3">
        ※ 短期14MA（約2週間）/ 28MA（約1ヶ月）/ 中期42MA（約1.5ヶ月）/ 長期100MA（約3-4ヶ月）｜変化率5%以上で判定｜ヘッダーをクリックでソート
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <SortableHeader
                label="アカウント"
                sortKey="accountName"
                currentKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
                align="left"
              />
              <SortableHeader
                label="投稿数"
                sortKey="postCount"
                currentKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
                align="right"
              />
              <SortableHeader
                label="14MA"
                sortKey="latestMA14"
                currentKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
                align="right"
              />
              <SortableHeader
                label="短期トレンド"
                sortKey="change14"
                currentKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
                align="center"
              />
              <SortableHeader
                label="28MA"
                sortKey="latestMA28"
                currentKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
                align="right"
              />
              <SortableHeader
                label="28MAトレンド"
                sortKey="change28"
                currentKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
                align="center"
              />
              <SortableHeader
                label="42MA"
                sortKey="latestMA42"
                currentKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
                align="right"
              />
              <SortableHeader
                label="中期トレンド"
                sortKey="change42"
                currentKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
                align="center"
              />
              <SortableHeader
                label="100MA"
                sortKey="latestMA100"
                currentKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
                align="right"
              />
              <SortableHeader
                label="長期トレンド"
                sortKey="change100"
                currentKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
                align="center"
              />
            </tr>
          </thead>
          <tbody>
            {sortedTrends.map((account, i) => {
              const overall = getOverallTrend(account);
              const rowBg = overall === 'good'
                ? 'bg-green-50'
                : overall === 'bad'
                  ? 'bg-red-50'
                  : overall === 'warning'
                    ? 'bg-yellow-50'
                    : i % 2 === 0 ? 'bg-white' : 'bg-gray-50';

              return (
                <tr key={account.accountName} className={rowBg}>
                  <td className="px-3 py-2 whitespace-nowrap font-medium">{account.accountName}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{account.postCount}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{formatMA(account.latestMA14)}</td>
                  <td className="px-3 py-2 text-center whitespace-nowrap">
                    <TrendIcon trend={account.trend14} change={account.change14} />
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{formatMA(account.latestMA28)}</td>
                  <td className="px-3 py-2 text-center whitespace-nowrap">
                    <TrendIcon trend={account.trend28} change={account.change28} />
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{formatMA(account.latestMA42)}</td>
                  <td className="px-3 py-2 text-center whitespace-nowrap">
                    <TrendIcon trend={account.trend42} change={account.change42} />
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{formatMA(account.latestMA100)}</td>
                  <td className="px-3 py-2 text-center whitespace-nowrap">
                    <TrendIcon trend={account.trend100} change={account.change100} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-xs text-gray-400">
        全 {sortedTrends.length} アカウント
      </div>
    </div>
  );
}

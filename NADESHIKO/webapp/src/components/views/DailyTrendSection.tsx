'use client';

import { useState, useMemo } from 'react';
import { ViewRecord } from '@/data/views-data';
import {
  filterByLastNDays,
  filterByLastNPosts,
  filterByDateRange,
  getPostsWithMovingAverage,
} from '@/lib/view-calculations';
import AccountSelector from './AccountSelector';
import DailyTrendChart from './DailyTrendChart';
import MATrendSummary from './MATrendSummary';

interface DailyTrendSectionProps {
  data: ViewRecord[];
}

type PeriodOption =
  | '30' | '60' | '90' | '120' | '365' | '720' | 'custom'  // 日数ベース
  | '30posts' | '60posts' | '90posts' | '120posts';        // 投稿数ベース

export default function DailyTrendSection({ data }: DailyTrendSectionProps) {
  const [period, setPeriod] = useState<PeriodOption>('30');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(true);  // デフォルトで「全員」選択
  const [prTypeFilter, setPrTypeFilter] = useState<'all' | 'PR' | '通常'>('通常');  // デフォルト: 通常

  // アカウント一覧
  const accountOptions = useMemo(() => {
    return [...new Set(data.map(r => r.accountName))].sort();
  }, [data]);

  // PR/通常でフィルタしたデータ
  const prFilteredData = useMemo(() => {
    if (prTypeFilter === 'all') return data;
    return data.filter(r => r.prType === prTypeFilter);
  }, [data, prTypeFilter]);

  // 期間でフィルタしたデータ
  const filteredData = useMemo(() => {
    if (period === 'custom' && customStart && customEnd) {
      return filterByDateRange(prFilteredData, customStart, customEnd);
    }

    // 投稿数ベース（例: '30posts'）
    if (period.endsWith('posts')) {
      const count = parseInt(period);
      return filterByLastNPosts(prFilteredData, count);
    }

    // 日数ベース
    const days = parseInt(period);
    return filterByLastNDays(prFilteredData, days);
  }, [prFilteredData, period, customStart, customEnd]);

  // グラフデータ（PostWithMA形式）
  const chartData = useMemo(() => {
    if (!isAllSelected && selectedAccounts.length === 0) return null;

    if (isAllSelected) {
      return getPostsWithMovingAverage(filteredData, undefined);
    }

    // 複数アカウント選択時: 選択アカウントのみフィルタ
    const accountFiltered = filteredData.filter(r =>
      selectedAccounts.includes(r.accountName)
    );
    return getPostsWithMovingAverage(accountFiltered, undefined);
  }, [filteredData, selectedAccounts, isAllSelected]);

  // アカウント選択ハンドラ
  const handleAccountChange = (accounts: string[]) => {
    setIsAllSelected(false);
    setSelectedAccounts(accounts);
  };

  // 「全員」選択ハンドラ
  const handleAllSelect = () => {
    setIsAllSelected(true);
    setSelectedAccounts([]);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold">投稿別再生数トラッキング</h3>

        {/* PR/通常フィルター */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">種別:</label>
          <select
            value={prTypeFilter}
            onChange={(e) => setPrTypeFilter(e.target.value as 'all' | 'PR' | '通常')}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="通常">通常</option>
            <option value="PR">PR</option>
            <option value="all">全て</option>
          </select>
        </div>

        {/* 期間選択 */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">期間:</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as PeriodOption)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <optgroup label="日数">
              <option value="30">直近30日</option>
              <option value="60">直近60日</option>
              <option value="90">直近90日</option>
              <option value="120">直近120日</option>
              <option value="365">直近1年</option>
              <option value="720">直近2年</option>
              <option value="custom">カスタム</option>
            </optgroup>
            <optgroup label="投稿数">
              <option value="30posts">直近30投稿</option>
              <option value="60posts">直近60投稿</option>
              <option value="90posts">直近90投稿</option>
              <option value="120posts">直近120投稿</option>
            </optgroup>
          </select>
        </div>

        {/* カスタム期間入力 */}
        {period === 'custom' && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="border rounded-lg px-2 py-1 text-sm"
            />
            <span className="text-gray-500">〜</span>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="border rounded-lg px-2 py-1 text-sm"
            />
          </div>
        )}

        {/* アカウント選択 */}
        <AccountSelector
          accounts={accountOptions}
          selectedAccounts={selectedAccounts}
          onSelectionChange={handleAccountChange}
          maxSelection={10}
          mode="multi"
          showAllOption={true}
          isAllSelected={isAllSelected}
          onAllSelect={handleAllSelect}
        />
      </div>

      {/* グラフエリア */}
      {chartData && chartData.length > 0 ? (
        <DailyTrendChart
          data={chartData}
          accountName={selectedAccounts.length === 1 ? selectedAccounts[0] : undefined}
          isAllAccounts={isAllSelected || selectedAccounts.length > 1}
        />
      ) : (
        <div className="text-center text-gray-500 py-12">
          {!isAllSelected && selectedAccounts.length === 0
            ? 'アカウントを選択してください（「全員」で全アカウント表示）'
            : 'データがありません'}
        </div>
      )}

      {/* アカウント別MAトレンド一覧 */}
      <MATrendSummary data={filteredData} />

      {/* 期間内の件数表示 */}
      <div className="mt-2 text-sm text-gray-500 text-right">
        期間内: {filteredData.length.toLocaleString()} 件
      </div>
    </div>
  );
}

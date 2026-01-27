"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscriptions } from '@/contexts/SubscriptionContext';
import { format, startOfMonth, differenceInDays } from 'date-fns';
import { ja } from 'date-fns/locale';

// スキャン期間オプション
type ScanPeriod = 'this_month' | 'last_month' | '90_days' | '180_days' | '1_year';

interface PeriodOption {
  value: ScanPeriod;
  label: string;
  getDays: () => number;
}

const periodOptions: PeriodOption[] = [
  {
    value: 'this_month',
    label: '今月',
    getDays: () => {
      const today = new Date();
      const monthStart = startOfMonth(today);
      return differenceInDays(today, monthStart) + 1;
    },
  },
  {
    value: 'last_month',
    label: '先月から',
    getDays: () => {
      const today = new Date();
      const lastMonthStart = startOfMonth(new Date(today.getFullYear(), today.getMonth() - 1, 1));
      return differenceInDays(today, lastMonthStart) + 1;
    },
  },
  { value: '90_days', label: '3ヶ月', getDays: () => 90 },
  { value: '180_days', label: '6ヶ月（180日）', getDays: () => 180 },
  { value: '1_year', label: '1年', getDays: () => 365 },
];

export function ScannerContent() {
  const { isAuthenticated, login } = useAuth();
  const { isScanning, lastScanAt, lastScanStats, scanEmails } = useSubscriptions();
  const [selectedPeriod, setSelectedPeriod] = useState<ScanPeriod>('this_month');

  const handleScan = () => {
    const option = periodOptions.find(o => o.value === selectedPeriod);
    const periodDays = option ? option.getDays() : undefined;
    scanEmails(periodDays);
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Gmailと連携してスキャン</h3>
        <p className="text-gray-500 mb-6">
          Gmailの請求書メールを自動的に検出し、<br />
          サブスクリプションを登録します
        </p>
        <button
          onClick={login}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Gmailでログイン
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* スキャンボタン */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">メールスキャン</h3>
              <p className="text-sm text-gray-500 mt-1">
                Gmailから請求書メールを検出します
              </p>
            </div>
            <button
              onClick={handleScan}
              disabled={isScanning}
              className={`px-6 py-3 rounded-lg font-medium ${
                isScanning
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isScanning ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                  スキャン中...
                </span>
              ) : (
                '📧 スキャン開始'
              )}
            </button>
          </div>

          {/* 期間選択 */}
          <div className="flex items-center gap-3">
            <label htmlFor="scan-period" className="text-sm font-medium text-gray-700">
              スキャン期間:
            </label>
            <select
              id="scan-period"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as ScanPeriod)}
              disabled={isScanning}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {lastScanAt && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              最終スキャン: {format(new Date(lastScanAt), 'yyyy/M/d HH:mm', { locale: ja })}
            </p>
          </div>
        )}
      </div>

      {/* スキャン結果 */}
      {lastScanStats && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">スキャン結果</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{lastScanStats.scannedEmails}</p>
              <p className="text-sm text-gray-500">スキャンしたメール</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{lastScanStats.detectedServices}</p>
              <p className="text-sm text-gray-500">検出したサービス</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{lastScanStats.newSubscriptions}</p>
              <p className="text-sm text-gray-500">新規追加</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{lastScanStats.updatedSubscriptions}</p>
              <p className="text-sm text-gray-500">更新</p>
            </div>
          </div>
        </div>
      )}

      {/* 検出対象サービス */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">自動検出対象サービス</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Netflix', 'Amazon Prime', 'Spotify', 'YouTube Premium', 'Apple Music',
            'Disney+', 'U-NEXT', 'Adobe', 'Microsoft 365', 'Notion', 'Slack',
            'ChatGPT Plus', 'GitHub', 'Google One', 'iCloud+', 'Dropbox',
            'PlayStation Plus', 'Nintendo Switch Online', 'Xbox Game Pass',
          ].map((name) => (
            <span
              key={name}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          上記以外のサービスも「サブスクリプション」「請求」などのキーワードで検出を試みます
        </p>
      </div>
    </div>
  );
}

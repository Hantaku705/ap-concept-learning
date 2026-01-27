"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscriptions } from '@/contexts/SubscriptionContext';

export function SettingsContent() {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const { subscriptions } = useSubscriptions();
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');

  const handleExport = () => {
    if (subscriptions.length === 0) {
      alert('エクスポートするデータがありません');
      return;
    }

    let content: string;
    let filename: string;
    let mimeType: string;

    if (exportFormat === 'json') {
      content = JSON.stringify(subscriptions, null, 2);
      filename = 'subscriptions.json';
      mimeType = 'application/json';
    } else {
      // CSV形式
      const headers = ['サービス名', 'カテゴリ', '金額', '請求サイクル', '次回請求日', 'ステータス'];
      const rows = subscriptions.map(s => [
        s.serviceName,
        s.category,
        s.amount.toString(),
        s.billingCycle,
        s.nextBillingDate,
        s.status,
      ]);
      content = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      filename = 'subscriptions.csv';
      mimeType = 'text/csv';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    if (confirm('すべてのデータを削除しますか？この操作は取り消せません。')) {
      localStorage.removeItem('subscription_tracker_data');
      localStorage.removeItem('subscription_tracker_auth');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* アカウント情報 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">アカウント</h3>
        {isAuthenticated ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">{userEmail}</p>
              <p className="text-sm text-green-600">✓ Gmail連携済み</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <p className="text-gray-500">未ログイン</p>
        )}
      </div>

      {/* データエクスポート */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">データエクスポート</h3>
        <p className="text-sm text-gray-500 mb-4">
          登録されているサブスクリプションデータをエクスポートします
        </p>
        <div className="flex items-center gap-4">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            エクスポート
          </button>
        </div>
      </div>

      {/* データ削除 */}
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
        <h3 className="text-lg font-semibold text-red-600 mb-4">危険な操作</h3>
        <p className="text-sm text-gray-500 mb-4">
          すべてのデータを削除します。この操作は取り消せません。
        </p>
        <button
          onClick={handleClearData}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
        >
          すべてのデータを削除
        </button>
      </div>

      {/* 情報 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">情報</h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">登録サブスク数</dt>
            <dd className="text-gray-900">{subscriptions.length}件</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">データ保存先</dt>
            <dd className="text-gray-900">ブラウザ（LocalStorage）</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">バージョン</dt>
            <dd className="text-gray-900">0.1.0</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

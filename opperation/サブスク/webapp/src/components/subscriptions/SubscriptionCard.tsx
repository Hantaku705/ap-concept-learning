"use client";

import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Subscription, categoryLabels, categoryColors } from '@/types/subscription';
import { cancellationGuides } from '@/data/cancellation-guides';

interface SubscriptionCardProps {
  subscription: Subscription;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSave: (updates: Partial<Subscription>) => void;
  onDelete: () => void;
}

export function SubscriptionCard({
  subscription,
  isEditing,
  onEdit,
  onCancelEdit,
  onSave,
  onDelete,
}: SubscriptionCardProps) {
  const guide = cancellationGuides[subscription.serviceName];
  const categoryColor = categoryColors[subscription.category];

  const billingCycleLabel = {
    monthly: '月額',
    yearly: '年額',
    weekly: '週額',
    quarterly: '四半期',
  }[subscription.billingCycle];

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-4">
        <p className="text-sm text-gray-500 mb-2">編集中...</p>
        <div className="flex gap-2">
          <button
            onClick={onCancelEdit}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            キャンセル
          </button>
          <button
            onClick={() => onSave({ status: subscription.status === 'active' ? 'cancelled' : 'active' })}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ステータス変更
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-4 ${
      subscription.status === 'cancelled' ? 'border-gray-300 opacity-60' : 'border-gray-200'
    }`}>
      {/* ヘッダー */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{subscription.serviceName}</h4>
          <span
            className="inline-block px-2 py-0.5 text-xs rounded-full mt-1"
            style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
          >
            {categoryLabels[subscription.category]}
          </span>
        </div>
        <span className={`px-2 py-1 text-xs rounded ${
          subscription.status === 'active'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-500'
        }`}>
          {subscription.status === 'active' ? '契約中' : '解約済み'}
        </span>
      </div>

      {/* 金額 */}
      <div className="mb-3">
        <p className="text-2xl font-bold text-gray-900">
          ¥{subscription.amount.toLocaleString()}
          <span className="text-sm font-normal text-gray-500 ml-1">/{billingCycleLabel}</span>
        </p>
      </div>

      {/* 詳細 */}
      <div className="text-sm text-gray-500 space-y-1 mb-4">
        <p>次回請求: {format(new Date(subscription.nextBillingDate), 'yyyy/M/d', { locale: ja })}</p>
        {subscription.source === 'gmail' && (
          <p className="text-xs">📧 Gmailから検出</p>
        )}
        {subscription.emailSubject && (
          <p className="text-xs text-gray-400 truncate" title={subscription.emailSubject}>
            件名: {subscription.emailSubject}
          </p>
        )}
      </div>

      {/* PDF添付ファイル */}
      {subscription.hasPdfAttachment && subscription.pdfFilenames && subscription.pdfFilenames.length > 0 && (
        <div className="bg-red-50 rounded-lg p-3 mb-3">
          <p className="text-xs font-medium text-red-700 mb-1 flex items-center gap-1">
            📄 PDF添付ファイル
          </p>
          <div className="space-y-1">
            {subscription.pdfFilenames.map((filename, idx) => (
              <p key={idx} className="text-xs text-red-600 truncate" title={filename}>
                {filename}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 解約ガイド */}
      {guide && subscription.status === 'active' && (
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <p className="text-xs font-medium text-gray-700 mb-1">解約方法</p>
          <a
            href={guide.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            {guide.url.replace('https://', '').slice(0, 40)}...
          </a>
          <p className="text-xs text-gray-500 mt-1">
            難易度: {guide.difficulty === 'easy' ? '簡単' : guide.difficulty === 'medium' ? '普通' : '難しい'}
            ・所要時間: {guide.estimatedTime}
          </p>
        </div>
      )}

      {/* アクション */}
      <div className="flex gap-2 pt-3 border-t border-gray-100">
        <button
          onClick={onEdit}
          className="flex-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
        >
          編集
        </button>
        {subscription.cancellationUrl && subscription.status === 'active' && (
          <a
            href={subscription.cancellationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-1.5 text-sm text-center text-red-600 border border-red-300 rounded hover:bg-red-50"
          >
            解約ページ
          </a>
        )}
        <button
          onClick={onDelete}
          className="px-3 py-1.5 text-sm text-gray-400 hover:text-red-600"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

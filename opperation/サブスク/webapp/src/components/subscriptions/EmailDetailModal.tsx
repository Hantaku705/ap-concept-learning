"use client";

import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Subscription } from '@/types/subscription';

interface EmailDetailModalProps {
  subscription: Subscription;
  onClose: () => void;
}

export function EmailDetailModal({ subscription, onClose }: EmailDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* ヘッダー */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">メール詳細</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* コンテンツ */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          {/* 件名 */}
          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">件名</label>
            <div className="text-gray-900 font-medium">
              {subscription.emailSubject || '（件名なし）'}
            </div>
          </div>

          {/* 送信元 */}
          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">送信元</label>
            <div className="text-gray-700">
              {subscription.senderEmail || subscription.email || '（不明）'}
            </div>
          </div>

          {/* 検出日時 */}
          {subscription.lastDetectedAt && (
            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-1">検出日時</label>
              <div className="text-gray-700">
                {format(new Date(subscription.lastDetectedAt), 'yyyy年M月d日 HH:mm', { locale: ja })}
              </div>
            </div>
          )}

          {/* PDF添付 */}
          {subscription.hasPdfAttachment && subscription.pdfFilenames && subscription.pdfFilenames.length > 0 && (
            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-1">添付ファイル</label>
              <div className="flex flex-wrap gap-2">
                {subscription.pdfFilenames.map((filename, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded text-sm"
                  >
                    📄 {filename}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 本文抜粋 */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">本文（抜粋）</label>
            <div className="bg-gray-50 rounded p-3 text-sm text-gray-700 whitespace-pre-wrap max-h-64 overflow-y-auto">
              {subscription.emailBody || '（本文なし）'}
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}

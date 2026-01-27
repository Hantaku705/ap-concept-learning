"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Subscription, categoryLabels, categoryColors } from '@/types/subscription';
import { cancellationGuides } from '@/data/cancellation-guides';
import { useAuth } from '@/contexts/AuthContext';
import { useCancellationGuide } from '@/contexts/CancellationGuideContext';
import { EmailDetailModal } from './EmailDetailModal';
import { CancellationGuideModal } from './CancellationGuideModal';

type SortKey = 'serviceName' | 'category' | 'amount' | 'nextBillingDate' | 'status';
type SortOrder = 'asc' | 'desc';

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
}

export function SubscriptionTable({ subscriptions, onEdit, onDelete }: SubscriptionTableProps) {
  const { tokens } = useAuth();
  const { getGuide, fetchGuide, isLoading } = useCancellationGuide();
  const [sortKey, setSortKey] = useState<SortKey>('nextBillingDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [emailModal, setEmailModal] = useState<Subscription | null>(null);
  const [guideModal, setGuideModal] = useState<Subscription | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    let comparison = 0;
    switch (sortKey) {
      case 'serviceName':
        comparison = a.serviceName.localeCompare(b.serviceName, 'ja');
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'nextBillingDate':
        comparison = new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime();
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handlePdfDownload = async (sub: Subscription) => {
    if (!tokens?.accessToken || !sub.messageId || !sub.attachmentIds?.length) return;

    const attachmentId = sub.attachmentIds[0];
    const filename = sub.pdfFilenames?.[0] || 'attachment.pdf';

    const url = `/api/gmail/attachment?accessToken=${encodeURIComponent(tokens.accessToken)}&messageId=${encodeURIComponent(sub.messageId)}&attachmentId=${encodeURIComponent(attachmentId)}&filename=${encodeURIComponent(filename)}`;

    window.open(url, '_blank');
  };

  const SortIcon = ({ active, order }: { active: boolean; order: SortOrder }) => (
    <span className="ml-1 text-xs">
      {active ? (order === 'asc' ? '▲' : '▼') : '△'}
    </span>
  );

  const billingCycleLabel: Record<string, string> = {
    monthly: '月額',
    yearly: '年額',
    weekly: '週額',
    quarterly: '四半期',
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('serviceName')}
              >
                サービス名
                <SortIcon active={sortKey === 'serviceName'} order={sortOrder} />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('category')}
              >
                カテゴリ
                <SortIcon active={sortKey === 'category'} order={sortOrder} />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('amount')}
              >
                金額
                <SortIcon active={sortKey === 'amount'} order={sortOrder} />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('nextBillingDate')}
              >
                次回請求
                <SortIcon active={sortKey === 'nextBillingDate'} order={sortOrder} />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                ステータス
                <SortIcon active={sortKey === 'status'} order={sortOrder} />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                PDF
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                メール
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                解約方法
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedSubscriptions.map((sub) => {
              const guide = cancellationGuides[sub.serviceName];
              const categoryColor = categoryColors[sub.category];

              return (
                <tr key={sub.id} className={sub.status === 'cancelled' ? 'opacity-50' : ''}>
                  {/* サービス名 */}
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-gray-900">{sub.serviceName}</div>
                      {sub.senderEmail && (
                        <div className="text-xs text-gray-400 truncate max-w-[200px]" title={sub.senderEmail}>
                          {sub.senderEmail}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* カテゴリ */}
                  <td className="px-4 py-3">
                    <span
                      className="inline-block px-2 py-0.5 text-xs rounded-full"
                      style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
                    >
                      {categoryLabels[sub.category]}
                    </span>
                  </td>

                  {/* 金額 */}
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-900">
                      ¥{sub.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      /{billingCycleLabel[sub.billingCycle]}
                    </div>
                  </td>

                  {/* 次回請求 */}
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {format(new Date(sub.nextBillingDate), 'yyyy/M/d', { locale: ja })}
                  </td>

                  {/* ステータス */}
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded ${
                      sub.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {sub.status === 'active' ? '契約中' : '解約済み'}
                    </span>
                  </td>

                  {/* PDF */}
                  <td className="px-4 py-3">
                    {sub.hasPdfAttachment && sub.attachmentIds?.length ? (
                      <button
                        onClick={() => handlePdfDownload(sub)}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                        title={sub.pdfFilenames?.join(', ')}
                      >
                        📄 DL
                      </button>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>

                  {/* メール */}
                  <td className="px-4 py-3">
                    {sub.emailSubject ? (
                      <button
                        onClick={() => setEmailModal(sub)}
                        className="text-xs text-blue-600 hover:underline truncate max-w-[150px] block text-left"
                        title={sub.emailSubject}
                      >
                        {sub.emailSubject.slice(0, 20)}...
                      </button>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>

                  {/* 解約方法 */}
                  <td className="px-4 py-3">
                    {(() => {
                      // 静的ガイドがあれば優先
                      if (guide) {
                        return (
                          <button
                            onClick={() => setGuideModal(sub)}
                            className={`px-2 py-1 text-xs rounded ${
                              guide.difficulty === 'easy'
                                ? 'bg-green-100 text-green-700'
                                : guide.difficulty === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {guide.difficulty === 'easy' ? '簡単' : guide.difficulty === 'medium' ? '普通' : '難'}
                          </button>
                        );
                      }

                      // 動的取得済みガイドがあれば使用
                      const cachedGuide = getGuide(sub.serviceName);
                      if (cachedGuide) {
                        return (
                          <button
                            onClick={() => setGuideModal(sub)}
                            className={`px-2 py-1 text-xs rounded ${
                              cachedGuide.difficulty === 'easy'
                                ? 'bg-green-100 text-green-700'
                                : cachedGuide.difficulty === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                            title="AI生成"
                          >
                            {cachedGuide.difficulty === 'easy' ? '簡単' : cachedGuide.difficulty === 'medium' ? '普通' : '難'}
                            <span className="ml-1 text-[10px]">*</span>
                          </button>
                        );
                      }

                      // ローディング中
                      if (isLoading(sub.serviceName)) {
                        return (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-500">
                            <span className="animate-spin h-3 w-3 border-2 border-gray-300 border-t-blue-600 rounded-full"></span>
                            取得中
                          </span>
                        );
                      }

                      // 取得ボタンを表示
                      return (
                        <button
                          onClick={async () => {
                            setFetchError(null);
                            try {
                              await fetchGuide(sub.serviceName);
                            } catch (err) {
                              setFetchError(err instanceof Error ? err.message : '取得失敗');
                            }
                          }}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        >
                          取得
                        </button>
                      );
                    })()}
                  </td>

                  {/* 操作 */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(sub)}
                        className="px-2 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => onDelete(sub.id)}
                        className="px-2 py-1 text-xs text-red-600 hover:text-red-800"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {sortedSubscriptions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            サブスクリプションがありません
          </div>
        )}
      </div>

      {/* メール詳細モーダル */}
      {emailModal && (
        <EmailDetailModal
          subscription={emailModal}
          onClose={() => setEmailModal(null)}
        />
      )}

      {/* 解約ガイドモーダル */}
      {guideModal && (
        <CancellationGuideModal
          subscription={guideModal}
          onClose={() => setGuideModal(null)}
        />
      )}
    </>
  );
}

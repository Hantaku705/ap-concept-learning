"use client";

import { Subscription } from '@/types/subscription';
import { cancellationGuides, CancellationGuide } from '@/data/cancellation-guides';
import { useCancellationGuide } from '@/contexts/CancellationGuideContext';
import { GeneratedCancellationGuide } from '@/app/api/cancellation-guide/route';

interface CancellationGuideModalProps {
  subscription: Subscription;
  onClose: () => void;
}

export function CancellationGuideModal({ subscription, onClose }: CancellationGuideModalProps) {
  const { getGuide: getCachedGuide } = useCancellationGuide();

  // 静的ガイドを優先、なければ動的取得ガイドを使用
  const staticGuide: CancellationGuide | undefined = cancellationGuides[subscription.serviceName];
  const dynamicGuide: GeneratedCancellationGuide | undefined = getCachedGuide(subscription.serviceName);

  const guide = staticGuide || dynamicGuide;
  const isGenerated = !staticGuide && !!dynamicGuide;

  const difficultyLabel: Record<string, string> = {
    easy: '簡単',
    medium: '普通',
    hard: '難しい',
  };

  const difficultyColor: Record<string, string> = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* ヘッダー */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {subscription.serviceName} の解約方法
            </h2>
            {isGenerated && (
              <span className="text-xs text-gray-500">
                AI生成 ({dynamicGuide?.generatedAt ? new Date(dynamicGuide.generatedAt).toLocaleDateString('ja-JP') : ''})
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* コンテンツ */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          {guide ? (
            <>
              {/* AI生成の場合の注意書き */}
              {isGenerated && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-700">
                    この情報はAIが生成したものです。最新の手順は公式サイトでご確認ください。
                  </p>
                </div>
              )}

              {/* 難易度・所要時間 */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-2 py-1 text-xs rounded ${difficultyColor[guide.difficulty]}`}>
                  難易度: {difficultyLabel[guide.difficulty]}
                </span>
                <span className="text-sm text-gray-500">
                  所要時間: 約{guide.estimatedTime}
                </span>
              </div>

              {/* 解約手順 */}
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">解約手順</h3>
                <ol className="space-y-2">
                  {guide.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                        {idx + 1}
                      </span>
                      <span className="text-gray-700 pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* 注意事項 */}
              {guide.notes && guide.notes.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">注意事項</h3>
                  <ul className="space-y-1">
                    {guide.notes.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-yellow-500">⚠️</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 解約ページへのリンク */}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href={guide.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  解約ページを開く
                  <span>↗</span>
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                このサービスの解約ガイドは登録されていません。
              </p>
              {subscription.cancellationUrl ? (
                <a
                  href={subscription.cancellationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  解約ページを開く
                  <span>↗</span>
                </a>
              ) : (
                <p className="text-sm text-gray-400">
                  解約ページのURLも登録されていません。<br />
                  サービスの公式サイトで「解約」を検索してください。
                </p>
              )}
            </div>
          )}
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

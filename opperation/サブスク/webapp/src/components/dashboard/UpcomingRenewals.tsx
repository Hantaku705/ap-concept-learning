"use client";

import { format, differenceInDays } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useSubscriptions } from '@/contexts/SubscriptionContext';

export function UpcomingRenewals() {
  const { getUpcomingRenewals } = useSubscriptions();
  const upcoming = getUpcomingRenewals(30);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">今後30日の更新予定</h3>

      {upcoming.length === 0 ? (
        <p className="text-gray-500 text-center py-8">今後30日以内の更新予定はありません</p>
      ) : (
        <div className="space-y-3">
          {upcoming.slice(0, 5).map((sub) => {
            const daysUntil = differenceInDays(new Date(sub.nextBillingDate), new Date());
            const isUrgent = daysUntil <= 7;

            return (
              <div
                key={sub.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isUrgent ? 'bg-red-50' : 'bg-gray-50'
                }`}
              >
                <div>
                  <p className="font-medium text-gray-900">{sub.serviceName}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(sub.nextBillingDate), 'M月d日(E)', { locale: ja })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ¥{sub.amount.toLocaleString()}
                  </p>
                  <p className={`text-sm ${isUrgent ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                    {daysUntil === 0 ? '今日' : `あと${daysUntil}日`}
                  </p>
                </div>
              </div>
            );
          })}

          {upcoming.length > 5 && (
            <p className="text-sm text-gray-500 text-center pt-2">
              他 {upcoming.length - 5} 件
            </p>
          )}
        </div>
      )}
    </div>
  );
}

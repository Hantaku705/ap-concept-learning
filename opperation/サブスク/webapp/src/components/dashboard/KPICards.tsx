"use client";

import { useSubscriptions } from '@/contexts/SubscriptionContext';

export function KPICards() {
  const { subscriptions, getTotalMonthlyAmount, getActiveSubscriptions, getByCategory } = useSubscriptions();

  const totalMonthly = getTotalMonthlyAmount();
  const activeCount = getActiveSubscriptions().length;
  const categoryCount = Object.keys(getByCategory()).length;
  const yearlyEstimate = totalMonthly * 12;

  const cards = [
    {
      label: '月額合計',
      value: `¥${totalMonthly.toLocaleString()}`,
      subtext: `年間 ¥${yearlyEstimate.toLocaleString()}`,
      color: 'blue',
    },
    {
      label: '契約中サービス',
      value: `${activeCount}件`,
      subtext: `全${subscriptions.length}件中`,
      color: 'green',
    },
    {
      label: 'カテゴリ数',
      value: `${categoryCount}種類`,
      subtext: 'アクティブなカテゴリ',
      color: 'purple',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6`}
        >
          <p className="text-sm text-gray-500 mb-1">{card.label}</p>
          <p className={`text-3xl font-bold text-${card.color}-600`}>{card.value}</p>
          <p className="text-xs text-gray-400 mt-1">{card.subtext}</p>
        </div>
      ))}
    </div>
  );
}

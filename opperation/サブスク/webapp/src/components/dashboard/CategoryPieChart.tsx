"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useSubscriptions } from '@/contexts/SubscriptionContext';
import { categoryLabels, categoryColors, ServiceCategory } from '@/types/subscription';

export function CategoryPieChart() {
  const { getByCategory, getTotalMonthlyAmount } = useSubscriptions();
  const byCategory = getByCategory();

  const data = Object.entries(byCategory).map(([category, subs]) => {
    const amount = subs.reduce((sum, s) => {
      if (s.billingCycle === 'yearly') return sum + s.amount / 12;
      if (s.billingCycle === 'quarterly') return sum + s.amount / 3;
      if (s.billingCycle === 'weekly') return sum + s.amount * 4;
      return sum + s.amount;
    }, 0);

    return {
      name: categoryLabels[category as ServiceCategory] || category,
      value: Math.round(amount),
      color: categoryColors[category as ServiceCategory] || '#6b7280',
      count: subs.length,
    };
  });

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">カテゴリ別支出</h3>
        <p className="text-gray-500 text-center py-8">データがありません</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">カテゴリ別支出</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [
              `¥${Number(value).toLocaleString()}`,
              name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

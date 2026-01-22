'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { budgetAllocation } from '@/data/proposal-data';

const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b'];

export default function BudgetPieChart() {
  const data = budgetAllocation.byMedia.map((item) => ({
    name: item.category,
    value: item.amount,
    percentage: item.percentage,
  }));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">媒体別予算配分</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ payload }) => `${(payload as { percentage: number }).percentage}%`}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${(value as number).toLocaleString()}万円`, '予算']}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-xs text-gray-600">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center">
        <div className="text-2xl font-bold text-gray-900">
          {budgetAllocation.total.toLocaleString()}万円
        </div>
        <div className="text-xs text-gray-500">総予算</div>
      </div>
    </div>
  );
}

'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { marketInsight } from '@/data/proposal-data';

export default function SentimentChart() {
  const data = marketInsight.competitorSentiment
    .filter((item) => item.airline !== 'ANA')
    .map((item) => ({
      name: item.airline,
      sentiment: item.sentiment,
      postCount: item.postCount,
    }))
    .sort((a, b) => a.sentiment - b.sentiment);

  const getColor = (sentiment: number) => {
    if (sentiment < -2) return '#ef4444';
    if (sentiment < -1) return '#f97316';
    if (sentiment < 0) return '#eab308';
    return '#22c55e';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">競合航空会社センチメント</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              domain={[-3, 1.5]}
              tickFormatter={(value) => value.toFixed(1)}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11 }}
              width={75}
            />
            <Tooltip
              formatter={(value) => [(value as number).toFixed(2), 'Sentiment']}
              labelFormatter={(label) => `${label}`}
            />
            <ReferenceLine x={0} stroke="#9ca3af" strokeDasharray="3 3" />
            <Bar dataKey="sentiment" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.sentiment)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className="text-gray-600">非常にネガティブ</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-orange-500" />
          <span className="text-gray-600">ネガティブ</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span className="text-gray-600">中立</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-gray-600">ポジティブ</span>
        </div>
      </div>
    </div>
  );
}

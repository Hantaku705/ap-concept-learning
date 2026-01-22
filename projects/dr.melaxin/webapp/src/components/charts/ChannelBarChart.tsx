"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { channelSalesData } from "@/data/strategy-data";

export default function ChannelBarChart() {
  const data = channelSalesData;
  const total = data.reduce((sum, d) => sum + d.sales, 0);

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: { channel: string; sales: number; color: string } }>;
  }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = ((item.sales / total) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{item.channel}</p>
          <p className="text-gray-600">
            売上: <span className="font-bold text-sky-600">{item.sales}億円</span>
          </p>
          <p className="text-gray-600">
            構成比: <span className="font-bold">{percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3 className="card-header">チャネル別売上目標（73.6億円）</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickFormatter={(value) => `${value}億`}
          />
          <YAxis
            type="category"
            dataKey="channel"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="sales" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4">
        <div className="alert alert-info">
          <p className="text-sm">
            <strong>Qoo10が売上の38%</strong>を占める最重要チャネル。
            メガ割のタイミングでの売上最大化が鍵。
          </p>
        </div>
      </div>
    </div>
  );
}

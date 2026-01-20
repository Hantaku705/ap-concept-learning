"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { financialData } from "@/data/proposal-data";

export default function SalesChart() {
  const data = financialData.cumulativeSales;

  return (
    <div className="chart-container">
      <h3 className="card-header">累計売上推移（目標）</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickFormatter={(value) => `${value}億`}
            domain={[0, 130]}
          />
          <Tooltip
            formatter={(value) => [`${value as number}億円`, "累計売上"]}
            labelStyle={{ fontWeight: 600 }}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <ReferenceLine
            y={120}
            stroke="#16a34a"
            strokeDasharray="5 5"
            label={{
              value: "目標: 120億円",
              position: "right",
              fill: "#16a34a",
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="cumulative"
            stroke="#0369a1"
            strokeWidth={3}
            dot={{ fill: "#0369a1", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#0369a1" }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-sky-600"></div>
          <span>累計売上</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-green-600" style={{ borderStyle: "dashed" }}></div>
          <span>目標ライン</span>
        </div>
      </div>
    </div>
  );
}

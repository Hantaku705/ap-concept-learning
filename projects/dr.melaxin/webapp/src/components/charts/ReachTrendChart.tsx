"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { monthlyReachTrend } from "@/data/matrix-data";

export default function ReachTrendChart() {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{
      value: number;
      name: string;
      color: string;
      dataKey: string;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum, item) => sum + (item.value || 0), 0);
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-sm text-gray-600">
              {item.name}:{" "}
              <span className="font-medium" style={{ color: item.color }}>
                {(item.value / 10000).toFixed(0)}万UU
              </span>
            </p>
          ))}
          <p className="text-sm font-semibold text-gray-900 mt-2 pt-2 border-t border-gray-200">
            合計: {(total / 10000).toFixed(0)}万UU
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3 className="card-header">月別Reach推移</h3>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={monthlyReachTrend}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickFormatter={(value) => `${(value / 10000).toFixed(0)}万`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => <span className="text-gray-700">{value}</span>}
          />
          <Area
            type="monotone"
            dataKey="tiktok"
            name="TikTok"
            stackId="1"
            stroke="#000000"
            fill="#000000"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="x"
            name="X"
            stackId="1"
            stroke="#1da1f2"
            fill="#1da1f2"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="instagram"
            name="Instagram"
            stackId="1"
            stroke="#e4405f"
            fill="#e4405f"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="youtube"
            name="YouTube"
            stackId="1"
            stroke="#ff0000"
            fill="#ff0000"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="tts"
            name="TikTok Shop"
            stackId="1"
            stroke="#69c9d0"
            fill="#69c9d0"
            fillOpacity={0.8}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Monthly summary */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        <div className="text-center p-2 bg-sky-50 rounded-lg">
          <p className="text-xs text-gray-500">Q1 Reach</p>
          <p className="text-lg font-bold text-sky-600">約1.2億UU</p>
        </div>
        <div className="text-center p-2 bg-amber-50 rounded-lg">
          <p className="text-xs text-gray-500">Q2 Reach</p>
          <p className="text-lg font-bold text-amber-600">約2.2億UU</p>
        </div>
        <div className="text-center p-2 bg-emerald-50 rounded-lg">
          <p className="text-xs text-gray-500">Q3 Reach</p>
          <p className="text-lg font-bold text-emerald-600">約1.5億UU</p>
        </div>
        <div className="text-center p-2 bg-purple-50 rounded-lg">
          <p className="text-xs text-gray-500">Q4 Reach</p>
          <p className="text-lg font-bold text-purple-600">約1.7億UU</p>
        </div>
      </div>

      <div className="mt-4 alert alert-info">
        <p className="text-sm">
          <strong>メガ割月にReach集中</strong>: 3月・6月・9月・11月のメガ割タイミングで集中投下し、効率的なリーチ獲得を実現
        </p>
      </div>
    </div>
  );
}

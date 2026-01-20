"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  ZAxis,
} from "recharts";
import { snsSummary, tacticSummary } from "@/data/matrix-data";

interface EfficiencyData {
  name: string;
  budget: number;
  reach: number;
  efficiency: number;
  type: "sns" | "tactic";
}

const SNS_COLORS: Record<string, string> = {
  TikTok: "#000000",
  X: "#1da1f2",
  Instagram: "#e4405f",
  YouTube: "#ff0000",
  "TikTok Shop": "#69c9d0",
};

export default function ReachEfficiencyChart() {
  // SNSデータ
  const snsData: EfficiencyData[] = snsSummary
    .filter((item) => item.budget > 0)
    .map((item) => ({
      name: item.sns,
      budget: item.budget / 10000, // 億円
      reach: item.reach / 10000, // 万UU
      efficiency: item.budget > 0 ? item.reach / item.budget : 0,
      type: "sns" as const,
    }));

  // 施策データ（上位5つ）
  const tacticData: EfficiencyData[] = tacticSummary
    .filter((item) => item.budget > 0)
    .sort((a, b) => b.budget - a.budget)
    .slice(0, 5)
    .map((item) => ({
      name: item.tactic,
      budget: item.budget / 10000,
      reach: item.reach / 10000,
      efficiency: item.budget > 0 ? item.reach / item.budget : 0,
      type: "tactic" as const,
    }));

  const allData = [...snsData, ...tacticData];
  const avgEfficiency =
    allData.reduce((sum, d) => sum + d.efficiency, 0) / allData.length;

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      payload: EfficiencyData;
    }>;
  }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{item.name}</p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600">
              予算:{" "}
              <span className="font-medium text-amber-600">
                {item.budget.toFixed(1)}億円
              </span>
            </p>
            <p className="text-gray-600">
              Reach:{" "}
              <span className="font-medium text-purple-600">
                {item.reach.toFixed(0)}万UU
              </span>
            </p>
            <p className="text-gray-600 pt-1 border-t border-gray-100">
              効率:{" "}
              <span
                className={`font-medium ${
                  item.efficiency > avgEfficiency
                    ? "text-emerald-600"
                    : "text-rose-600"
                }`}
              >
                {(item.efficiency * 100).toFixed(0)} UU/万円
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3 className="card-header">投資効率分析（予算 vs Reach）</h3>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            type="number"
            dataKey="budget"
            name="予算"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickFormatter={(value) => `${value}億`}
            label={{
              value: "予算（億円）",
              position: "bottom",
              offset: 0,
              style: { fontSize: 12, fill: "#64748b" },
            }}
          />
          <YAxis
            type="number"
            dataKey="reach"
            name="Reach"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickFormatter={(value) => `${value}万`}
            label={{
              value: "Reach（万UU）",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 12, fill: "#64748b" },
            }}
          />
          <ZAxis type="number" dataKey="efficiency" range={[100, 500]} />
          <Tooltip content={<CustomTooltip />} />

          {/* Reference line for average efficiency */}
          <ReferenceLine
            stroke="#94a3b8"
            strokeDasharray="5 5"
            segment={[
              { x: 0, y: 0 },
              { x: 5, y: 5 * avgEfficiency * 100 },
            ]}
          />

          {/* SNS points */}
          <Scatter name="SNS" data={snsData}>
            {snsData.map((entry) => (
              <Cell
                key={entry.name}
                fill={SNS_COLORS[entry.name] || "#94a3b8"}
                stroke="white"
                strokeWidth={2}
              />
            ))}
          </Scatter>

          {/* Tactic points */}
          <Scatter name="施策" data={tacticData} fill="#6366f1">
            {tacticData.map((entry) => (
              <Cell
                key={entry.name}
                fill="#6366f1"
                stroke="white"
                strokeWidth={2}
                opacity={0.7}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {snsData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: SNS_COLORS[item.name] || "#94a3b8" }}
            />
            <span className="text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500 opacity-70" />
          <span className="text-sm text-gray-600">施策</span>
        </div>
      </div>

      {/* Efficiency ranking */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">効率ランキング</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[...snsData]
            .sort((a, b) => b.efficiency - a.efficiency)
            .map((item, idx) => (
              <div
                key={item.name}
                className={`p-3 rounded-lg text-center ${
                  idx === 0
                    ? "bg-emerald-50 border border-emerald-200"
                    : "bg-gray-50"
                }`}
              >
                <p className="text-xs text-gray-500">#{idx + 1}</p>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p
                  className={`text-lg font-bold ${
                    idx === 0 ? "text-emerald-600" : "text-gray-700"
                  }`}
                >
                  {(item.efficiency * 100).toFixed(0)}
                </p>
                <p className="text-xs text-gray-400">UU/万円</p>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-4 alert alert-info">
        <p className="text-sm">
          <strong>X（Twitter）が最も効率的</strong>: RT部隊活用により、1万円あたりの獲得UUが最大。TikTokは認知形成の柱として必要不可欠。
        </p>
      </div>
    </div>
  );
}

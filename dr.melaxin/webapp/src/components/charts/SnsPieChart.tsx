"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, PieLabelRenderProps } from "recharts";
import { snsSummary } from "@/data/matrix-data";

const SNS_COLORS: Record<string, string> = {
  TikTok: "#000000",
  X: "#1da1f2",
  Instagram: "#e4405f",
  YouTube: "#ff0000",
  "TikTok Shop": "#69c9d0",
};

interface ChartData {
  name: string;
  value: number;
  budget: number;
  reach: number;
  [key: string]: unknown;
}

interface SnsPieChartProps {
  mode?: "budget" | "reach";
}

export default function SnsPieChart({ mode = "budget" }: SnsPieChartProps) {
  const data: ChartData[] = snsSummary.map((item) => ({
    name: item.sns,
    value: mode === "budget" ? item.budget : item.reach,
    budget: item.budget,
    reach: item.reach,
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      payload: ChartData;
    }>;
  }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = ((item.value / total) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-1">{item.name}</p>
          <p className="text-sm text-gray-600">
            {mode === "budget" ? "予算" : "Reach"}:{" "}
            <span className="font-medium">
              {mode === "budget"
                ? `${(item.value / 10000).toFixed(0)}億円`
                : `${(item.value / 10000).toFixed(0)}万UU`}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            シェア: <span className="font-medium">{percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    if (
      typeof cx !== "number" ||
      typeof cy !== "number" ||
      typeof midAngle !== "number" ||
      typeof innerRadius !== "number" ||
      typeof outerRadius !== "number" ||
      typeof percent !== "number"
    ) {
      return null;
    }
    if (percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-4">
        <h3 className="card-header mb-0">
          SNS別{mode === "budget" ? "予算" : "Reach"}配分
        </h3>
        <div className="text-right">
          <p className="text-xs text-gray-500">
            {mode === "budget" ? "年間予算" : "年間Reach"}
          </p>
          <p className="text-lg font-bold text-gray-900">
            {mode === "budget"
              ? `${(total / 10000).toFixed(1)}億円`
              : `${(total / 10000).toFixed(0)}万UU`}
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            innerRadius={50}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={SNS_COLORS[entry.name] || "#94a3b8"}
                stroke="white"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => <span className="text-gray-700">{value}</span>}
            layout="vertical"
            align="right"
            verticalAlign="middle"
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Summary table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">SNS</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">予算</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Reach</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">効率</th>
            </tr>
          </thead>
          <tbody>
            {snsSummary.map((item) => {
              const efficiency = item.budget > 0
                ? ((item.reach / item.budget) * 100).toFixed(0)
                : 0;
              return (
                <tr key={item.sns} className="border-b border-gray-100">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: SNS_COLORS[item.sns] || "#94a3b8" }}
                      />
                      <span className="font-medium text-gray-900">{item.sns}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right text-gray-700 tabular-nums">
                    {(item.budget / 10000).toFixed(1)}億円
                  </td>
                  <td className="px-3 py-2 text-right text-gray-700 tabular-nums">
                    {(item.reach / 10000).toFixed(0)}万UU
                  </td>
                  <td className="px-3 py-2 text-right">
                    <span className={`font-medium ${
                      Number(efficiency) > 100 ? "text-emerald-600" : "text-amber-600"
                    }`}>
                      {efficiency}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">UU/万円</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

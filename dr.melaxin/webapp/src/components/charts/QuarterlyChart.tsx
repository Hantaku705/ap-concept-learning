"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { gtmData } from "@/data/proposal-data";

export default function QuarterlyChart() {
  const data = gtmData.quarterly;

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
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const quarter = data.find((d) => d.quarter === label);
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">
            {label} ({quarter?.period})
          </p>
          {payload.map((item, index) => (
            <p key={index} className="text-gray-600">
              {item.name}:{" "}
              <span className="font-bold" style={{ color: item.color }}>
                {item.value}億円
              </span>
            </p>
          ))}
          <p className="text-gray-600 mt-1 pt-1 border-t border-gray-200">
            ROAS:{" "}
            <span className="font-bold text-emerald-600">
              {quarter?.roas}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3 className="card-header">四半期別 投資 vs 売上</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="quarter"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickFormatter={(value) => `${value}億`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => <span className="text-gray-700">{value}</span>}
          />
          <Bar
            dataKey="investment"
            name="投資額"
            fill="#f59e0b"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
          <Line
            type="monotone"
            dataKey="sales"
            name="売上"
            stroke="#0369a1"
            strokeWidth={3}
            dot={{ fill: "#0369a1", strokeWidth: 2, r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {data.map((q) => (
          <div
            key={q.quarter}
            className={`text-center p-2 rounded-lg ${
              q.roas < 100 ? "bg-amber-50" : "bg-emerald-50"
            }`}
          >
            <p className="text-xs text-gray-500">{q.quarter} ROAS</p>
            <p
              className={`text-lg font-bold ${
                q.roas < 100 ? "text-amber-600" : "text-emerald-600"
              }`}
            >
              {q.roas}%
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 alert alert-warning">
        <p className="text-sm">
          <strong>Q1は投資先行</strong>（Ambassador 10億円、TV CM 1.5億円等）でROASが低いが、Q2以降で回収
        </p>
      </div>
    </div>
  );
}

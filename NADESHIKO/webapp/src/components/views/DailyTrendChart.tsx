'use client';

import { useMemo } from 'react';
import {
  ComposedChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PostWithMA, calculatePercentile } from '@/lib/view-calculations';

// カラーパレット（最大10色）
const COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#06B6D4', '#F97316', '#84CC16', '#6366F1',
];

// MA設定タイプ
interface MAConfig {
  key: keyof PostWithMA;
  name: string;
  stroke: string;
  strokeWidth: number;
  strokeDasharray?: string;
}

interface DailyTrendChartProps {
  data: PostWithMA[];
  accountName?: string;
  isAllAccounts?: boolean;
}

// カスタムツールチップ
function CustomTooltip({
  active,
  payload,
  maConfigs
}: {
  active?: boolean;
  payload?: Array<{ payload: PostWithMA }>;
  maConfigs: MAConfig[];
}) {
  if (!active || !payload || !payload.length) return null;

  const point = payload[0]?.payload as PostWithMA | undefined;
  if (!point) return null;

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border text-sm">
      <p className="font-medium text-gray-900">{point.postDate}</p>
      <p className="text-gray-600">{point.accountName}</p>
      <p className="font-medium text-blue-600">
        再生数: {point.views.toLocaleString()}
      </p>
      {maConfigs.map(config => {
        const value = point[config.key] as number | null;
        if (value !== null) {
          return (
            <p key={config.key} className="text-gray-500">
              {config.name}: {Math.round(value).toLocaleString()}
            </p>
          );
        }
        return null;
      })}
      {point.title && (
        <p className="text-xs text-gray-400 mt-1 max-w-[200px] truncate">
          {point.title}
        </p>
      )}
    </div>
  );
}

export default function DailyTrendChart({ data, accountName, isAllAccounts }: DailyTrendChartProps) {
  // 5種類のMA全て表示（固定）
  const maConfigs: MAConfig[] = useMemo(() => {
    return [
      { key: 'ma7', name: '7投稿MA', stroke: '#10B981', strokeWidth: 2 },
      { key: 'ma14', name: '14投稿MA', stroke: '#F59E0B', strokeWidth: 2 },
      { key: 'ma28', name: '28投稿MA', stroke: '#EF4444', strokeWidth: 2, strokeDasharray: '5 5' },
      { key: 'ma42', name: '42投稿MA', stroke: '#8B5CF6', strokeWidth: 2 },
      { key: 'ma100', name: '100投稿MA', stroke: '#3B82F6', strokeWidth: 3, strokeDasharray: '8 4' },
    ];
  }, []);

  // 左Y軸: 再生数用（95パーセンタイル）
  const viewsYAxisMax = useMemo(() => {
    const views = data.map(d => d.views);
    const percentile95 = calculatePercentile(views, 95);
    return Math.ceil(percentile95 * 1.1);
  }, [data]);

  // 右Y軸: MA用（直近30件の選択されたMAの中央値×1.5でスケール）
  const maYAxisMax = useMemo(() => {
    if (data.length === 0) {
      return viewsYAxisMax;
    }

    const recentCount = Math.min(30, data.length);
    const recentData = data.slice(-recentCount);
    const recentMAValues = recentData
      .flatMap(d => maConfigs.map(config => d[config.key] as number | null))
      .filter((v): v is number => v !== null);

    if (recentMAValues.length === 0) {
      return viewsYAxisMax;
    }

    const sortedMA = [...recentMAValues].sort((a, b) => a - b);
    const medianMA = sortedMA[Math.floor(sortedMA.length / 2)];
    return Math.ceil(medianMA * 1.5);
  }, [data, viewsYAxisMax, maConfigs]);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  const xAxisInterval = useMemo(() => {
    if (data.length > 500) return Math.floor(data.length / 12);
    if (data.length > 200) return Math.floor(data.length / 10);
    if (data.length > 100) return Math.floor(data.length / 8);
    return 'preserveStartEnd';
  }, [data.length]);

  const chartHeight = useMemo(() => {
    if (data.length > 500) return 450;
    if (data.length > 200) return 400;
    return 350;
  }, [data.length]);

  const dotSize = useMemo(() => {
    if (data.length > 500) return 3;
    if (data.length > 200) return 4;
    return 5;
  }, [data.length]);

  const formatXAxis = (index: number) => {
    const point = data[index];
    if (!point) return '';
    const parts = point.postDate.split('-');
    if (parts.length >= 3) {
      if (data.length > 200) {
        return `${parts[0].slice(2)}/${parseInt(parts[1])}`;
      }
      return `${parseInt(parts[1])}/${parseInt(parts[2])}`;
    }
    return point.postDate;
  };

  const accountColors = new Map<string, string>();
  if (isAllAccounts) {
    const accounts = [...new Set(data.map(d => d.accountName))];
    accounts.forEach((name, i) => {
      accountColors.set(name, COLORS[i % COLORS.length]);
    });
  }

  const scatterData = data.map(d => ({
    ...d,
    fill: isAllAccounts
      ? accountColors.get(d.accountName) || COLORS[0]
      : COLORS[0],
  }));

  const title = isAllAccounts
    ? '全アカウント - 投稿別再生数 + 移動平均'
    : `${accountName || ''} - 投稿別再生数 + 移動平均`;

  // MA凡例テキスト
  const maLegendText = maConfigs.map(c => c.name).join(' / ');

  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-xs text-gray-500 mb-2">
        ● 各点 = 1投稿（左軸） / ━ {maLegendText}（右軸）
      </div>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <ComposedChart data={scatterData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="postIndex"
            tickFormatter={formatXAxis}
            tick={{ fontSize: 10 }}
            interval={xAxisInterval}
          />
          <YAxis
            yAxisId="left"
            tickFormatter={formatYAxis}
            tick={{ fontSize: 11 }}
            domain={[0, viewsYAxisMax]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={formatYAxis}
            tick={{ fontSize: 11, fill: '#10B981' }}
            domain={[0, maYAxisMax]}
            stroke="#10B981"
          />
          <Tooltip content={<CustomTooltip maConfigs={maConfigs} />} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Scatter
            name="投稿"
            dataKey="views"
            yAxisId="left"
            shape={(props: { cx?: number; cy?: number; payload?: { fill?: string } }) => (
              <circle
                cx={props.cx}
                cy={props.cy}
                r={dotSize}
                fill={props.payload?.fill || COLORS[0]}
                opacity={0.6}
              />
            )}
          />
          {/* 動的MA線 */}
          {maConfigs.map(config => (
            <Line
              key={config.key}
              name={config.name}
              type="monotone"
              dataKey={config.key}
              yAxisId="right"
              stroke={config.stroke}
              strokeWidth={config.strokeWidth}
              strokeDasharray={config.strokeDasharray}
              dot={false}
              connectNulls={false}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
      <div className="text-xs text-gray-400 mt-2">
        投稿数: {data.length}件
        {maConfigs.map(config => {
          const lastValue = data.length > 0 ? data[data.length - 1][config.key] as number | null : null;
          if (lastValue !== null) {
            return (
              <span key={config.key} className="ml-4">
                {config.name.replace('投稿MA', 'MA')}: {Math.round(lastValue).toLocaleString()}
              </span>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

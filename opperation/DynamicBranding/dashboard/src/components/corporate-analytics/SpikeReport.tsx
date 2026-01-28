"use client";

import { AlertTriangle, TrendingUp, ExternalLink } from "lucide-react";

export interface SpikeEvent {
  week: string; // YYYY-MM-DD (week start)
  title: string;
  summary: string;
  impact: "positive" | "negative" | "neutral";
  category: "炎上" | "キャンペーン" | "ニュース" | "その他";
  sources?: { label: string; url: string }[];
  keywords?: string[];
}

// スパイクイベントデータベース
export const SPIKE_EVENTS: SpikeEvent[] = [
  {
    week: "2025-07-28",
    title: "リュウジ「味噌汁沸騰」炎上事件",
    summary:
      "料理研究家リュウジ氏が「味噌汁は沸騰させた方が旨い」検証動画を投稿。一般ユーザーの投稿を引用し「晒し上げ」したことで大炎上。2,200件以上のコメント殺到。味の素推奨派として知られるリュウジ氏への批判が「味の素」の言及にも波及。",
    impact: "negative",
    category: "炎上",
    sources: [
      {
        label: "J-CAST（検証報道）",
        url: "https://www.j-cast.com/2025/07/27506183.html",
      },
      {
        label: "J-CAST（炎上波紋）",
        url: "https://www.j-cast.com/2025/07/30506293.html",
      },
      { label: "Togetter まとめ", url: "https://togetter.com/li/2581936" },
    ],
    keywords: ["リュウジ", "味噌汁", "沸騰", "炎上", "味の素"],
  },
  {
    week: "2024-08-19",
    title: "夏季レシピ需要ピーク",
    summary:
      "夏休みシーズンに伴う家庭料理需要の増加。「簡単レシピ」「時短料理」関連の投稿が急増。",
    impact: "positive",
    category: "その他",
    keywords: ["夏休み", "簡単レシピ", "時短"],
  },
];

interface SpikeReportProps {
  currentWeek?: string; // 現在表示中の週（オプション）
  trends?: { week: string; count: number }[];
}

export function SpikeReport({ trends }: SpikeReportProps) {
  // トレンドデータからスパイクを検出
  const detectSpikes = () => {
    if (!trends || trends.length < 4) return [];

    // 平均と標準偏差を計算
    const counts = trends.map((t) => t.count);
    const avg = counts.reduce((a, b) => a + b, 0) / counts.length;
    const stdDev = Math.sqrt(
      counts.reduce((sum, c) => sum + Math.pow(c - avg, 2), 0) / counts.length
    );

    // 平均 + 2σ 以上をスパイクとみなす
    const threshold = avg + 2 * stdDev;

    return trends
      .filter((t) => t.count > threshold)
      .map((t) => ({
        week: t.week,
        count: t.count,
        deviation: ((t.count - avg) / stdDev).toFixed(1),
      }));
  };

  const spikes = detectSpikes();

  // スパイク週に対応するイベントを検索
  const getEventForWeek = (week: string): SpikeEvent | undefined => {
    return SPIKE_EVENTS.find((event) => {
      // 週の範囲内かチェック（±7日）
      const eventDate = new Date(event.week);
      const targetDate = new Date(week);
      const diffDays = Math.abs(
        (eventDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return diffDays <= 7;
    });
  };

  const relevantEvents = spikes
    .map((spike) => ({
      spike,
      event: getEventForWeek(spike.week),
    }))
    .filter((item) => item.event !== undefined);

  if (relevantEvents.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">スパイク要因レポート</h3>
        <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-0.5 rounded">
          {relevantEvents.length}件検出
        </span>
      </div>

      <div className="space-y-4">
        {relevantEvents.map(({ spike, event }) => (
          <div
            key={spike.week}
            className={`p-4 rounded-lg border-l-4 ${
              event?.impact === "negative"
                ? "bg-red-50 border-red-500"
                : event?.impact === "positive"
                  ? "bg-green-50 border-green-500"
                  : "bg-gray-50 border-gray-400"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {event?.impact === "negative" && (
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                )}
                <span className="font-medium">{event?.title}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    event?.category === "炎上"
                      ? "bg-red-100 text-red-700"
                      : event?.category === "キャンペーン"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {event?.category}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {spike.week.slice(5)} / {spike.count}件 (+{spike.deviation}σ)
              </div>
            </div>

            <p className="text-sm text-gray-700 mt-2 leading-relaxed">
              {event?.summary}
            </p>

            {event?.keywords && (
              <div className="flex flex-wrap gap-1 mt-2">
                {event.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-xs bg-white px-2 py-0.5 rounded border"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}

            {event?.sources && event.sources.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {event.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {source.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

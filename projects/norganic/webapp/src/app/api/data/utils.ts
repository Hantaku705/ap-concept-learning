import * as fs from "fs/promises";
import * as path from "path";

// データファイルのパスを取得
export function getDataFilePath(file: string): string {
  const dataDir = path.join(process.cwd(), "src", "data");
  return path.join(dataDir, `${file}-data.ts`);
}

// 数値をフォーマット済み文字列に変換
export function formatBudget(amount: number): string {
  if (amount === 0) return "-";
  const man = amount / 10000;
  if (man >= 10000) {
    return `${(man / 10000).toFixed(1)}億円`;
  }
  return `${man.toLocaleString()}万円`;
}

export function formatImp(imp: number): string {
  if (imp === 0) return "-";
  if (imp >= 1000000000) {
    return `${(imp / 1000000000).toFixed(1)}B`;
  }
  if (imp >= 1000000) {
    return `${(imp / 1000000).toFixed(2)}M`;
  }
  if (imp >= 1000) {
    return `${(imp / 1000).toFixed(0)}K`;
  }
  return imp.toString();
}

// JavaScriptの値をTypeScriptソースコード文字列に変換
function serializeValue(value: unknown, indent: number = 0): string {
  const spaces = "  ".repeat(indent);
  const innerSpaces = "  ".repeat(indent + 1);

  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") return value.toString();
  if (typeof value === "boolean") return value.toString();

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((item) => `${innerSpaces}${serializeValue(item, indent + 1)}`);
    return `[\n${items.join(",\n")},\n${spaces}]`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const props = entries.map(([key, val]) => {
      // キーが有効な識別子かどうかチェック
      const needsQuotes = !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
      const keyStr = needsQuotes ? JSON.stringify(key) : key;
      return `${innerSpaces}${keyStr}: ${serializeValue(val, indent + 1)}`;
    });
    return `{\n${props.join(",\n")},\n${spaces}}`;
  }

  return String(value);
}

// エクスポート定義
export interface ExportDef {
  name: string;
  type?: "const" | "interface" | "type";
}

// データをTypeScriptファイルとして書き出す
export async function writeDataFile(
  filePath: string,
  exports: { name: string; value: unknown }[],
  header?: string
): Promise<void> {
  let content = "";

  // ヘッダーコメント
  if (header) {
    content += `// ${header}\n\n`;
  }

  // 各エクスポートを書き出す
  for (const exp of exports) {
    content += `export const ${exp.name} = ${serializeValue(exp.value, 0)};\n\n`;
  }

  await fs.writeFile(filePath, content, "utf-8");
}

// concept-data.ts用のエクスポート名リスト
export const CONCEPT_EXPORTS = [
  "conceptMeta",
  "mainConcept",
  "usageCopy",
  "evaluation14",
  "reframingFormula",
  "whyThisWorks",
  "rejectedCandidates",
  "improvements",
];

// strategy-data.ts用のエクスポート名リスト
export const STRATEGY_EXPORTS = [
  "strategyMeta",
  "targets",
  "attackStrategy",
  "messaging",
  "messageHierarchy",
  "tactics",
  "phases",
  "tkoData",
  "spReasons",
  "tlRejectReasons",
  "fqCalculation",
  "kpis",
  "timeline",
];

// calendar-data.ts用のエクスポート名リスト
export const CALENDAR_EXPORTS = [
  "calendarWeeks",
  "rowLabels",
  "tacticTimeline",
  "tacticWeeklyBudgets",
  "calendarSummary",
];

// 既存のデータファイルを読み込む（動的インポート用）
export async function readDataFile(file: string): Promise<Record<string, unknown>> {
  // 動的インポートは使えないので、ファイルを読んでパースする必要がある
  // ただし、TSファイルなので単純なJSONパースはできない
  // 代わりに、現在のエクスポートされた値を使う
  throw new Error("Use direct imports instead of readDataFile");
}

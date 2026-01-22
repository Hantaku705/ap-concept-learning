import { NextRequest, NextResponse } from "next/server";
import { writeDataFile, getDataFilePath, CONCEPT_EXPORTS, STRATEGY_EXPORTS, CALENDAR_EXPORTS } from "../utils";

// サポートされるファイル
const SUPPORTED_FILES = ["concept", "strategy", "calendar"];

// ファイルごとのエクスポート名リスト
const EXPORTS_MAP: Record<string, string[]> = {
  concept: CONCEPT_EXPORTS,
  strategy: STRATEGY_EXPORTS,
  calendar: CALENDAR_EXPORTS,
};

// ファイルごとのヘッダーコメント
const HEADERS: Record<string, string> = {
  concept: "N organic Soothing Cleansing Gel - Concept Data",
  strategy: "N organic - Strategy Data",
  calendar: "N organic Activation Calendar Data",
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  // 開発環境のみ許可
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Write operations are disabled in production" },
      { status: 403 }
    );
  }

  const { file } = await params;

  // ファイル名バリデーション
  if (!SUPPORTED_FILES.includes(file)) {
    return NextResponse.json(
      { error: `Unsupported file: ${file}. Supported: ${SUPPORTED_FILES.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const data = await request.json();

    // データの検証
    const exportNames = EXPORTS_MAP[file];
    const exports: { name: string; value: unknown }[] = [];

    for (const name of exportNames) {
      if (data[name] === undefined) {
        return NextResponse.json(
          { error: `Missing required export: ${name}` },
          { status: 400 }
        );
      }
      exports.push({ name, value: data[name] });
    }

    // ファイルに書き込み
    const filePath = getDataFilePath(file);
    await writeDataFile(filePath, exports, HEADERS[file]);

    return NextResponse.json({
      success: true,
      file: filePath,
      exports: exportNames,
    });
  } catch (error) {
    console.error("Error writing data file:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;

  if (!SUPPORTED_FILES.includes(file)) {
    return NextResponse.json(
      { error: `Unsupported file: ${file}` },
      { status: 400 }
    );
  }

  // 現在のデータは静的インポートなので、クライアント側で取得する必要がある
  // このエンドポイントは情報のみ返す
  return NextResponse.json({
    file,
    exports: EXPORTS_MAP[file],
    writable: process.env.NODE_ENV === "development",
  });
}

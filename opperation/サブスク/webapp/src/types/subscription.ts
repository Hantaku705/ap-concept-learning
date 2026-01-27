// サービスカテゴリ
export type ServiceCategory =
  | 'streaming'      // 動画・音楽ストリーミング
  | 'software'       // ソフトウェア・SaaS
  | 'cloud'          // クラウドストレージ
  | 'gaming'         // ゲーム
  | 'news'           // ニュース・メディア
  | 'fitness'        // フィットネス
  | 'food'           // 食品・デリバリー
  | 'shopping'       // ECサブスク
  | 'finance'        // 金融サービス
  | 'education'      // 教育
  | 'other';         // その他

// 請求サイクル
export type BillingCycle = 'monthly' | 'yearly' | 'weekly' | 'quarterly';

// サブスクリプション
export interface Subscription {
  id: string;
  serviceName: string;           // サービス名
  category: ServiceCategory;     // カテゴリ
  amount: number;                // 金額（円）
  currency: string;              // 通貨
  billingCycle: BillingCycle;    // 請求サイクル
  nextBillingDate: string;       // 次回請求日 (ISO8601)
  startDate: string;             // 開始日
  status: 'active' | 'paused' | 'cancelled';
  source: 'gmail' | 'manual';    // データソース
  email?: string;                // 検出元メールアドレス
  senderEmail?: string;          // 送信元
  logoUrl?: string;              // サービスロゴURL
  cancellationUrl?: string;      // 解約ページURL
  notes?: string;                // メモ
  lastDetectedAt?: string;       // 最終検出日時
  // PDF関連
  hasPdfAttachment?: boolean;    // PDF添付あり
  pdfFilenames?: string[];       // PDFファイル名一覧
  emailSubject?: string;         // メール件名
  // メール/添付ファイル参照用
  messageId?: string;            // GmailメッセージID
  attachmentIds?: string[];      // 添付ファイルID一覧
  emailBody?: string;            // メール本文（抜粋）
  createdAt: string;
  updatedAt: string;
}

// 検出パターン
export interface ServicePattern {
  serviceName: string;
  senderPatterns: string[];      // 送信元パターン（正規表現）
  subjectPatterns: string[];     // 件名パターン（正規表現）
  bodyPatterns?: string[];       // 本文パターン
  amountPatterns: string[];      // 金額抽出パターン
  category: ServiceCategory;
  cancellationUrl?: string;
  logoUrl?: string;
  isPdfPattern?: boolean;        // PDF請求書用の汎用パターン
  isEmbeddedInvoice?: boolean;   // 埋め込み形式請求書用パターン（PDF不要）
}

// 月別サマリー
export interface MonthlySummary {
  month: string;
  totalAmount: number;
  subscriptionCount: number;
  byCategory: Record<ServiceCategory, number>;
}

// カテゴリ表示名
export const categoryLabels: Record<ServiceCategory, string> = {
  streaming: '動画・音楽',
  software: 'ソフトウェア',
  cloud: 'クラウド',
  gaming: 'ゲーム',
  news: 'ニュース',
  fitness: 'フィットネス',
  food: 'フード',
  shopping: 'ショッピング',
  finance: '金融',
  education: '教育',
  other: 'その他',
};

// カテゴリカラー
export const categoryColors: Record<ServiceCategory, string> = {
  streaming: '#e11d48',
  software: '#2563eb',
  cloud: '#0891b2',
  gaming: '#7c3aed',
  news: '#ea580c',
  fitness: '#16a34a',
  food: '#ca8a04',
  shopping: '#db2777',
  finance: '#059669',
  education: '#4f46e5',
  other: '#6b7280',
};

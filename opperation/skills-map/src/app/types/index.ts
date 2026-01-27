/**
 * Skills Map - Type Definitions
 *
 * Claude Code設定アイテム（skills, commands, agents, rules）の型定義
 */

// =============================================================================
// Enums & Union Types
// =============================================================================

/**
 * アイテムのカテゴリ
 */
export type CategoryType = 'skills' | 'commands' | 'agents' | 'rules';

/**
 * アイテムのソース（プロジェクトローカル or グローバル）
 */
export type SourceType = 'project' | 'global';

/**
 * エージェントが使用可能なツール
 */
export type AgentTool =
  | 'Read'
  | 'Write'
  | 'Edit'
  | 'Grep'
  | 'Glob'
  | 'Bash'
  | 'Task'
  | 'WebFetch'
  | 'WebSearch'
  | 'NotebookEdit';

/**
 * エージェントのモデル指定
 */
export type AgentModel = 'opus' | 'sonnet' | 'haiku' | 'inherit';

// =============================================================================
// Base Types
// =============================================================================

/**
 * 全アイテム共通の基底型
 */
export interface BaseItem {
  /** 一意識別子（カテゴリ + ファイル名から生成） */
  id: string;

  /** アイテム名（frontmatterのnameまたはファイル名から取得） */
  name: string;

  /** 説明文（frontmatterのdescription） */
  description: string;

  /** ファイルパス（絶対パス） */
  filePath: string;

  /** ソース（project: AP/_claude-code/, global: ~/.claude/） */
  source: SourceType;

  /** カテゴリ */
  category: CategoryType;

  /** ファイル名（拡張子なし） */
  fileName: string;

  /** 最終更新日時（ISO 8601形式） */
  updatedAt?: string;
}

// =============================================================================
// Category-Specific Types
// =============================================================================

/**
 * スキルアイテム
 *
 * 場所: _claude-code/skills/ または ~/.claude/skills/
 * 用途: 知識・パターン・ガイドライン（参照用）
 *
 * frontmatter例:
 * ```yaml
 * ---
 * name: concept-design
 * description: 商品コンセプト設計の原則...
 * ---
 * ```
 */
export interface SkillItem extends BaseItem {
  category: 'skills';

  /** タグ（任意、分類用） */
  tags?: string[];

  /** 使用例（任意） */
  usage?: string;
}

/**
 * コマンドアイテム
 *
 * 場所: _claude-code/commands/ または ~/.claude/commands/
 * 用途: `/command-name` で実行可能なスラッシュコマンド
 *
 * frontmatter例:
 * ```yaml
 * ---
 * description: "Build and Fix - ビルドエラーの自動修正"
 * ---
 * ```
 */
export interface CommandItem extends BaseItem {
  category: 'commands';

  /** スラッシュコマンド名（例: /build-fix） */
  slashCommand: string;

  /** 使用例（任意） */
  usage?: string;

  /** 引数の説明（任意） */
  args?: string;
}

/**
 * エージェントアイテム
 *
 * 場所: _claude-code/agents/ または ~/.claude/agents/
 * 用途: Subagentとして委託実行される専門家
 *
 * frontmatter例:
 * ```yaml
 * ---
 * name: planner
 * description: Expert planning specialist...
 * tools: Read, Grep, Glob
 * model: opus
 * ---
 * ```
 */
export interface AgentItem extends BaseItem {
  category: 'agents';

  /** 使用可能なツール一覧 */
  tools: AgentTool[];

  /** 使用するモデル（opus/sonnet/haiku/inherit） */
  model: AgentModel;

  /** 役割の詳細説明（任意） */
  role?: string;
}

/**
 * ルールアイテム
 *
 * 場所: _claude-code/rules/ または ~/.claude/rules/
 * 用途: 常時適用されるガイドライン・ポリシー
 *
 * frontmatterなしが一般的、タイトルから名前を取得
 */
export interface RuleItem extends BaseItem {
  category: 'rules';

  /** ルールの優先度（任意） */
  priority?: 'critical' | 'high' | 'medium' | 'low';

  /** 適用条件（任意、例: "*.ts files", "git operations"） */
  appliesTo?: string[];
}

// =============================================================================
// Union Types
// =============================================================================

/**
 * 全アイテムのユニオン型
 */
export type ConfigItem = SkillItem | CommandItem | AgentItem | RuleItem;

// =============================================================================
// Collection Types
// =============================================================================

/**
 * カテゴリ別アイテムコレクション
 */
export interface ItemCollection {
  skills: SkillItem[];
  commands: CommandItem[];
  agents: AgentItem[];
  rules: RuleItem[];
}

/**
 * ソース別アイテムコレクション
 */
export interface ItemsBySource {
  project: ConfigItem[];
  global: ConfigItem[];
}

// =============================================================================
// Frontmatter Types (for parsing)
// =============================================================================

/**
 * スキルのfrontmatter
 */
export interface SkillFrontmatter {
  name?: string;
  description?: string;
  tags?: string[];
}

/**
 * コマンドのfrontmatter
 */
export interface CommandFrontmatter {
  description?: string;
  args?: string;
}

/**
 * エージェントのfrontmatter
 */
export interface AgentFrontmatter {
  name?: string;
  description?: string;
  tools?: string;
  model?: string;
}

/**
 * ルールのfrontmatter
 */
export interface RuleFrontmatter {
  name?: string;
  description?: string;
  priority?: string;
  appliesTo?: string[];
}

/**
 * 汎用frontmatter型（パース時に使用）
 */
export type Frontmatter =
  | SkillFrontmatter
  | CommandFrontmatter
  | AgentFrontmatter
  | RuleFrontmatter;

// =============================================================================
// API Response Types
// =============================================================================

/**
 * アイテム取得APIのレスポンス
 */
export interface GetItemsResponse {
  items: ConfigItem[];
  total: number;
  byCategory: {
    skills: number;
    commands: number;
    agents: number;
    rules: number;
  };
  bySource: {
    project: number;
    global: number;
  };
}

/**
 * 検索結果
 */
export interface SearchResult {
  item: ConfigItem;
  /** マッチしたフィールド */
  matchedFields: ('name' | 'description' | 'content')[];
  /** 検索スコア（0-1） */
  score: number;
}

// =============================================================================
// Filter & Sort Types
// =============================================================================

/**
 * フィルター条件
 */
export interface ItemFilter {
  categories?: CategoryType[];
  sources?: SourceType[];
  searchQuery?: string;
}

/**
 * ソート条件
 */
export interface ItemSort {
  field: 'name' | 'category' | 'source' | 'updatedAt';
  direction: 'asc' | 'desc';
}

// =============================================================================
// Utility Types
// =============================================================================

/**
 * IDからアイテムを取得する際のパラメータ
 */
export interface GetItemByIdParams {
  id: string;
}

/**
 * カテゴリに基づく型の絞り込み
 */
export type ItemByCategory<C extends CategoryType> = C extends 'skills'
  ? SkillItem
  : C extends 'commands'
    ? CommandItem
    : C extends 'agents'
      ? AgentItem
      : C extends 'rules'
        ? RuleItem
        : never;

/**
 * アイテム作成用の入力型（idは自動生成）
 */
export type CreateItemInput<T extends ConfigItem> = Omit<T, 'id'>;

/**
 * アイテム更新用の入力型（部分更新）
 */
export type UpdateItemInput<T extends ConfigItem> = Partial<Omit<T, 'id' | 'category'>>;

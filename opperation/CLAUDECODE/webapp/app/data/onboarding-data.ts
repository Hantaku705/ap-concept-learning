// Claude Code Onboarding Data

export interface Step {
  id: string;
  title: string;
  duration: string;
  content: string;
  code?: string;
  tips?: string[];
}

export interface Feature {
  id: string;
  name: string;
  category: 'skill' | 'command' | 'agent' | 'rule';
  description: string;
  usage?: string;
}

export interface Example {
  id: string;
  category: string;
  title: string;
  prompt: string;
  explanation: string;
}

export interface Tip {
  id: string;
  title: string;
  content: string;
  code?: string;
}

export interface RecommendedSkill {
  id: string;
  name: string;
  category: 'session' | 'git' | 'quality' | 'dev';
  description: string;
  definition: string;
}

export interface ArchitectureElement {
  id: string;
  name: string;
  definition: string;
  role: string;
  location: string;
  example: string;
  icon: string;
}

// Getting Started Steps
export const gettingStartedSteps: Step[] = [
  {
    id: 'what-is',
    title: 'Claude Codeとは？',
    duration: '1分',
    content: 'ターミナル（黒い画面）で動くAIアシスタント。自然な日本語でコードを書いたり、修正したり、実行したりできます。',
    tips: [
      'ChatGPTのターミナル版みたいなもの',
      'ファイルを直接編集できる',
      'gitコマンドも実行できる',
    ],
  },
  {
    id: 'install',
    title: 'インストール',
    duration: '3分',
    content: 'macOSの場合、Homebrewまたはnpmでインストールできます。',
    code: `# Homebrew（推奨）
brew install claude-code

# または npm
npm install -g @anthropic-ai/claude-code`,
    tips: [
      'CursorのAI画面（Composer）で実行するのがおすすめ（エラー時にAIがサポート）',
      'Homebrewがなければ先にインストール',
      'npmの場合はNode.js 18以上が必要',
    ],
  },
  {
    id: 'auth',
    title: '認証',
    duration: '2分',
    content: 'インストール後、claudeコマンドを実行すると認証画面が開きます。',
    code: `# ターミナルで実行
claude

# → ブラウザが開く
# → Anthropicアカウントでログイン
# → 認証完了！`,
    tips: [
      'Anthropicアカウントが必要（無料で作成可能）',
      '認証は初回のみ',
    ],
  },
  {
    id: 'basic-ops',
    title: '基本操作',
    duration: '10分',
    content: '覚えるコマンドは5つだけ！',
    code: `claude          # 起動
/help           # ヘルプ表示
/clear          # 会話リセット
Ctrl+C          # 中断
exit            # 終了
/exit           # 終了（スラッシュ付きでもOK）`,
    tips: [
      '日本語で普通に話しかけてOK',
      '「〜して」「〜を作って」でOK',
      'ファイルパスを指定すると、そのファイルを見てくれる',
    ],
  },
  {
    id: 'first-practice',
    title: '最初の実践',
    duration: '5分',
    content: '実際に試してみましょう！',
    code: `# 例1: Pythonファイル作成
「Hello Worldを出力するPythonを作って」

# 例2: フォルダ構成確認
「このフォルダの構成を説明して」

# 例3: ファイル読み込み
「package.jsonの内容を教えて」`,
    tips: [
      'Claude Codeが提案した変更は、承認してから適用される',
      '間違えたらCtrl+Cで中断してやり直せる',
    ],
  },
  {
    id: 'modes',
    title: 'モード切り替え',
    duration: '3分',
    content: 'Claude Codeには2つの重要なモードがあります。Shift + Tab で切り替えできます。',
    code: `# モード切り替え
Shift + Tab     # モード切り替え

# 2つのモード
1. Accept Edits On  → 編集を自動承認（高速）
2. Plan Mode        → 計画を立ててから実行（安全）`,
    tips: [
      '【重要】Plan Modeで壁打ちしまくり、良いplanが作れたら実行 → 1発で完了！',
      'Plan Modeは大規模な変更や不安な時に使う',
      'Accept Edits Onは慣れてきたら使う（自己責任）',
    ],
  },
  {
    id: 'starter-kit',
    title: 'Starter Kit',
    duration: '3分',
    content: '社内用の設定を1コマンドで導入できます。12個のコマンド、8個のエージェント、6個のルールがインストールされます。',
    code: `# GitHub認証（初回のみ）
gh auth login

# Starter Kit インストール
claude /install-github-plugin Hantaku705/claude-code-starter

# インストール後に使えるコマンド例
/handoff      # セッション終了時の進捗保存
/resume       # セッション再開
/code-review  # コードレビュー
/build-fix    # ビルドエラー修正`,
    tips: [
      '12個のコマンド（/handoff, /resume, /memory, /quick-commit 等）',
      '8個の専門エージェント（planner, code-reviewer 等）',
      '6個のルール（セキュリティ、コーディングスタイル等）',
    ],
  },
  {
    id: 'useful-commands',
    title: 'よく使うコマンド',
    duration: '3分',
    content: 'セッション管理とプロジェクト設定の基本コマンドを覚えましょう。',
    code: `# セッション終了時
/handoff       # 進捗をHANDOFF.mdに保存

# セッション再開時
/resume        # 前回の状態を読み込み

# CLAUDE.md
プロジェクトルートに配置するとClaude Codeが
プロジェクト固有の設定を自動で読み込みます`,
    tips: [
      '/handoff: セッション終了時に必ず実行（進捗が消えない）',
      '/resume: セッション開始時に実行（前回の続きから）',
      'CLAUDE.md: 技術スタック、コーディング規約、フォルダ構成を記載',
    ],
  },
  {
    id: 'troubleshooting',
    title: '困ったら',
    duration: '2分',
    content: 'Claude Codeで解決できないエラーが起きたら、Cursor AIを最終手段として使いましょう。',
    code: `# Claude Codeでエラーが解決しない場合

1. エラーメッセージをコピー
2. Cursor AIのチャット（Cmd+L）に貼り付け
3. 「このエラーを解決して」と依頼

# Cursor AIは別のAI（GPT-4/Claude）なので
# 違う視点から解決策を提案してくれます`,
    tips: [
      'Cursor AIは最終手段（まずはClaude Codeで解決を試みる）',
      'エラーメッセージだけでなく、前後のコードも一緒にコピペ',
      '両方のAIを使い分けると効率UP',
    ],
  },
];

// Features
export const features: Feature[] = [
  // Skills
  { id: 'concept-design', name: 'concept-design', category: 'skill', description: 'マーケティングコンセプト設計原則・チェックリスト' },
  { id: 'what-game', name: 'what-game', category: 'skill', description: '「何ゲーか」分析フレームワーク（市場構造の本質特定）' },
  { id: 'project-workflow', name: 'project-workflow', category: 'skill', description: 'プロジェクト型タスクの5段階ワークフロー' },
  { id: 'coding-standards', name: 'coding-standards', category: 'skill', description: 'コーディング標準' },
  { id: 'webapp-data-pattern', name: 'webapp-data-pattern', category: 'skill', description: 'Webappデータパターン' },
  { id: 'backend-patterns', name: 'backend-patterns', category: 'skill', description: 'バックエンドパターン' },
  { id: 'frontend-patterns', name: 'frontend-patterns', category: 'skill', description: 'フロントエンドパターン' },
  { id: 'security-review-skill', name: 'security-review', category: 'skill', description: 'セキュリティレビュー' },
  { id: 'tdd-workflow-skill', name: 'tdd-workflow', category: 'skill', description: 'TDDワークフロー' },

  // Commands
  { id: 'commit', name: '/commit', category: 'command', description: 'コミット作成（conventional commits形式）', usage: '/commit' },
  { id: 'plan', name: '/plan', category: 'command', description: '実装計画作成', usage: '/plan' },
  { id: 'tdd', name: '/tdd', category: 'command', description: 'TDDワークフロー', usage: '/tdd' },
  { id: 'code-review', name: '/code-review', category: 'command', description: 'コードレビュー実行', usage: '/code-review' },
  { id: 'e2e', name: '/e2e', category: 'command', description: 'E2Eテスト生成・実行（Playwright）', usage: '/e2e' },
  { id: 'build-fix', name: '/build-fix', category: 'command', description: 'ビルドエラーの自動修正', usage: '/build-fix' },
  { id: 'test-coverage', name: '/test-coverage', category: 'command', description: 'テストカバレッジ確認', usage: '/test-coverage' },
  { id: 'update-docs', name: '/update-docs', category: 'command', description: 'ドキュメント更新', usage: '/update-docs' },
  { id: 'refactor-clean', name: '/refactor-clean', category: 'command', description: 'リファクタリング・不要コード削除', usage: '/refactor-clean' },
  { id: 'scaffold-webapp', name: '/scaffold-webapp', category: 'command', description: 'Webアプリ雛形生成', usage: '/scaffold-webapp' },

  // Agents
  { id: 'planner', name: 'planner', category: 'agent', description: '実装計画を作成する専門エージェント' },
  { id: 'code-reviewer', name: 'code-reviewer', category: 'agent', description: 'コードレビューを行う専門エージェント' },
  { id: 'tdd-guide', name: 'tdd-guide', category: 'agent', description: 'TDD（テスト駆動開発）を支援するエージェント' },
  { id: 'architect', name: 'architect', category: 'agent', description: 'システム設計・アーキテクチャ分析' },
  { id: 'security-reviewer', name: 'security-reviewer', category: 'agent', description: 'セキュリティ分析を行うエージェント' },
  { id: 'build-error-resolver', name: 'build-error-resolver', category: 'agent', description: 'ビルドエラーを自動修正するエージェント' },
  { id: 'e2e-runner', name: 'e2e-runner', category: 'agent', description: 'Playwright E2Eテスト専門エージェント' },
  { id: 'doc-updater', name: 'doc-updater', category: 'agent', description: 'ドキュメント更新エージェント' },
  { id: 'refactor-cleaner', name: 'refactor-cleaner', category: 'agent', description: 'リファクタリング・不要コード削除エージェント' },

  // Rules
  { id: 'coding-style', name: 'coding-style', category: 'rule', description: 'コーディング標準（イミュータビリティ、エラーハンドリング等）' },
  { id: 'security', name: 'security', category: 'rule', description: 'セキュリティチェックリスト' },
  { id: 'testing', name: 'testing', category: 'rule', description: 'テスト要件（80%以上カバレッジ、TDD、E2E）' },
  { id: 'git-workflow', name: 'git-workflow', category: 'rule', description: 'Git/PR作成フロー' },
  { id: 'agents', name: 'agents', category: 'rule', description: 'Agent Orchestration（並列実行ガイド）' },
  { id: 'hooks', name: 'hooks', category: 'rule', description: 'Hook定義（PreToolUse、PostToolUse、Stop）' },
  { id: 'patterns', name: 'patterns', category: 'rule', description: '共通パターン（APIレスポンス、Custom Hooks、Repository）' },
  { id: 'performance', name: 'performance', category: 'rule', description: 'モデル選択戦略（Haiku/Sonnet/Opus）' },
];

// Examples
export const examples: Example[] = [
  // コード作成
  {
    id: 'create-function',
    category: 'コード作成',
    title: '関数を作成',
    prompt: '日付をYYYY-MM-DD形式にフォーマットする関数を作って',
    explanation: '具体的な仕様を伝えると、適切な関数を生成してくれます',
  },
  {
    id: 'create-api',
    category: 'コード作成',
    title: 'APIエンドポイント追加',
    prompt: 'ユーザー一覧を取得するAPIエンドポイントを追加して',
    explanation: 'Next.jsのApp RouterでAPI Routeを自動生成',
  },
  {
    id: 'create-component',
    category: 'コード作成',
    title: 'コンポーネント作成',
    prompt: 'ローディングスピナーのコンポーネントを作って',
    explanation: 'Reactコンポーネントを適切な場所に生成',
  },

  // バグ修正
  {
    id: 'fix-error',
    category: 'バグ修正',
    title: 'エラーを修正',
    prompt: 'このエラーを直して: TypeError: Cannot read property ...',
    explanation: 'エラーメッセージをそのまま貼り付けると原因を分析して修正',
  },
  {
    id: 'debug',
    category: 'バグ修正',
    title: '原因調査',
    prompt: 'src/utils/api.ts が動かない原因を調べて',
    explanation: 'ファイルパスを指定すると、コードを読んで原因を特定',
  },
  {
    id: 'fix-build',
    category: 'バグ修正',
    title: 'ビルドエラー修正',
    prompt: '/build-fix',
    explanation: 'ビルドエラーを自動検出して修正',
  },

  // リファクタリング
  {
    id: 'split-file',
    category: 'リファクタリング',
    title: 'ファイル分割',
    prompt: 'このファイルが大きすぎるので分割して',
    explanation: '責務ごとにファイルを適切に分割',
  },
  {
    id: 'rename',
    category: 'リファクタリング',
    title: '命名改善',
    prompt: 'この関数の命名をわかりやすくして',
    explanation: '適切な命名を提案して一括置換',
  },
  {
    id: 'refactor-clean',
    category: 'リファクタリング',
    title: '不要コード削除',
    prompt: '/refactor-clean',
    explanation: '使われていないコードを検出して削除',
  },

  // Git操作
  {
    id: 'commit',
    category: 'Git操作',
    title: 'コミット作成',
    prompt: '/commit',
    explanation: '変更内容を分析して適切なコミットメッセージを生成',
  },
  {
    id: 'push',
    category: 'Git操作',
    title: 'プッシュ',
    prompt: 'mainブランチにプッシュして',
    explanation: 'git pushを実行（確認あり）',
  },
  {
    id: 'pr',
    category: 'Git操作',
    title: 'PR作成',
    prompt: 'PRを作成して',
    explanation: 'GitHub CLIでPull Requestを作成',
  },

  // 調査
  {
    id: 'explain-code',
    category: '調査',
    title: 'コード説明',
    prompt: 'このコードの処理の流れを説明して',
    explanation: '複雑なコードをわかりやすく解説',
  },
  {
    id: 'find-usage',
    category: '調査',
    title: '使用箇所検索',
    prompt: 'この関数がどこで使われているか調べて',
    explanation: 'codebase全体から参照箇所を検索',
  },
  {
    id: 'folder-structure',
    category: '調査',
    title: 'フォルダ構成確認',
    prompt: 'このプロジェクトの構成を説明して',
    explanation: 'ディレクトリ構造と各ファイルの役割を説明',
  },
];

// Tips
export const tips: Tip[] = [
  {
    id: 'claude-md',
    title: 'CLAUDE.md でプロジェクト設定',
    content: 'プロジェクトのルートに CLAUDE.md を置くと、Claude Codeがプロジェクト固有のルールを理解します。技術スタック、コーディング規約、フォルダ構成などを記載しておくと便利。',
    code: `# プロジェクト名

## 技術スタック
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS

## コーディング規約
- 関数は50行以下
- 日本語コメント推奨`,
  },
  {
    id: 'plan-mode',
    title: 'Plan Mode で安全に大規模変更',
    content: '大きなリファクタリングや機能追加の前は Plan Mode を使うと、実行前に計画を確認できます。',
    code: `# Plan Modeで実行
「plan modeで認証機能を追加して」

# 計画を確認 → 承認 → 実行`,
  },
  {
    id: 'subagent',
    title: 'Subagent で専門家に委託',
    content: 'Claude Codeは内部で専門エージェント（Subagent）を使い分けます。複雑なタスクは自動的に適切なエージェントが担当。',
    code: `# 自動的に適切なエージェントが選ばれる
- コードレビュー → code-reviewer
- セキュリティ確認 → security-reviewer
- ビルドエラー → build-error-resolver`,
  },
  {
    id: 'hooks',
    title: 'Hooks で自動チェック',
    content: 'ファイル編集後の自動フォーマット、git push前のレビュー確認など、自動化ルールを設定できます。',
    code: `# ~/.claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "event": "Edit",
        "command": "prettier --write"
      }
    ]
  }
}`,
  },
  {
    id: 'parallel',
    title: '並列実行で高速化',
    content: '「並列で」と指示すると、独立したタスクを同時に実行します。',
    code: `# 例: 3つのファイルを並列で修正
「この3つのファイルのバグを並列で直して」

# 例: 複数の調査を並列実行
「以下を並列で調べて：
1. API仕様
2. DB構造
3. 認証フロー」`,
  },
  {
    id: 'memory',
    title: 'Memory で記憶を永続化',
    content: '/memory コマンドで調査結果や決定事項を保存できます。次回セッションでも参照可能。',
    code: `# 記憶を保存
/memory save "APIキーは.envに保存する方針"

# 記憶を呼び出し
/memory recall API

# 記憶一覧
/memory list`,
  },
  {
    id: 'agent-sdk',
    title: 'Claude Agent SDK で本番エージェント構築',
    content: 'Claude Codeと同じ機能をPython/TypeScriptで使える。本番環境のAIエージェント開発、CI/CD連携、カスタムアプリに最適。公式ドキュメント: https://platform.claude.com/docs/ja/agent-sdk/overview',
    code: `# インストール（TypeScript）
npm install @anthropic-ai/claude-agent-sdk

# インストール（Python）
pip install claude-agent-sdk

# APIキー設定
export ANTHROPIC_API_KEY=your-api-key

# TypeScript例
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "このディレクトリのファイル一覧を教えて",
  options: { allowedTools: ["Bash", "Glob"] }
})) {
  console.log(message);
}`,
  },
  {
    id: 'everything-claude-code',
    title: 'Everything Claude Code で本番レベル環境を即構築',
    content: 'Anthropicハッカソン優勝者の実戦検証済み設定集。9個の特化エージェント、スキル、コマンド、フック、ルールが含まれる。Vibe Codingで止まってる人も一気に跳躍できる。',
    code: `# 導入方法（プラグインコマンド）
/plugin marketplace add affaan-m/everything-claude-code
/plugin install everything-claude-code@everything-claude-code

# 含まれるもの
- 9個の特化エージェント（コードレビュー、セキュリティ、アーキテクチャ等）
- 複数のスキル（TDD、継続学習、セキュリティレビュー）
- 9個のスラッシュコマンド
- フック、ルール

# ⚠️ 重要な注意点
MCPを入れすぎると 200k → 70k にコンテキスト縮小
推奨: プロジェクトごとに10個以下のMCP

# GitHub
https://github.com/affaan-m/everything-claude-code`,
  },
];

// Recommended Skills (Custom Skills for sharing)
export const recommendedSkills: RecommendedSkill[] = [
  {
    id: 'handoff',
    name: '/handoff',
    category: 'session',
    description: 'セッション終了時の進捗保存（HANDOFF.md + CLAUDE.md更新）',
    definition: `# /handoff - セッション終了時の書き出し

セッション終了時に進捗を HANDOFF.md に**追記**し、CLAUDE.md も更新。

## 使い方
セッション終了時に \`/handoff\` を実行するだけ。

## 実行内容
1. git status で変更確認
2. HANDOFF.md を追記更新（完了タスク、作業中タスク、セッション履歴）
3. 変更フォルダのCLAUDE.mdを自動作成/更新
4. ルートCLAUDE.md を更新

## 保存先
\`~/.claude/commands/handoff.md\``,
  },
  {
    id: 'resume',
    name: '/resume',
    category: 'session',
    description: 'セッション再開（HANDOFF.md読み込み）',
    definition: `# /resume - セッション再開時の読み込み

前回のセッションから作業を再開。

## 使い方
セッション開始時に \`/resume\` を実行。

## 実行内容
1. HANDOFF.md を読み込み
2. 前回の完了/作業中タスクを報告
3. 次のアクション（優先順位付き）を提示
4. 未解決の問題を報告
5. 「何から始めますか？」と確認

## 保存先
\`~/.claude/commands/resume.md\``,
  },
  {
    id: 'memory',
    name: '/memory',
    category: 'session',
    description: '調査内容の記憶・呼び出し・削除',
    definition: `# /memory - 記憶の管理

作業中の調査や文脈を記憶として保存・呼び出し・削除。

## 使い方
\`\`\`
/memory save       # 現在の対話を記憶として保存
/memory list       # 記憶一覧を表示
/memory recall     # キーワードで記憶を検索・呼び出し
/memory delete     # 記憶を削除
\`\`\`

## 保存形式
- ファイル名: \`YYYYMMDD-HHMMSS-[トピック].md\`
- 場所: \`.claude/memories/\`
- フロントマター: summary, created, tags

## 保存先
\`~/.claude/commands/memory.md\``,
  },
  {
    id: 'quick-commit',
    name: '/quick-commit',
    category: 'git',
    description: '高速コミット（conventional commits形式）',
    definition: `# /quick-commit - 高速コミット

変更を分析して適切なコミットメッセージで即座にコミット。

## 使い方
\`/quick-commit\` を実行するだけ。

## 実行内容
1. git status で変更確認
2. git diff で変更内容を分析
3. git add -A で全ファイルをステージ
4. 適切なコミットメッセージを生成
   - feat: 新機能
   - fix: バグ修正
   - refactor: リファクタリング
   - docs: ドキュメント
   - test: テスト
   - chore: その他

## 保存先
\`~/.claude/commands/quick-commit.md\``,
  },
  {
    id: 'code-review',
    name: '/code-review',
    category: 'quality',
    description: 'コードレビュー実行（セキュリティ・品質チェック）',
    definition: `# /code-review - コードレビュー

未コミット変更の包括的なセキュリティ・品質レビュー。

## 使い方
\`/code-review\` を実行するだけ。

## チェック項目

**セキュリティ (CRITICAL):**
- ハードコード認証情報、APIキー
- SQLインジェクション、XSS
- 入力バリデーション不備

**コード品質 (HIGH):**
- 50行超の関数、800行超のファイル
- 4段以上のネスト
- console.log残存

**ベストプラクティス (MEDIUM):**
- ミューテーションパターン
- テスト不足

## 保存先
\`~/.claude/commands/code-review.md\``,
  },
  {
    id: 'tdd',
    name: '/tdd',
    category: 'quality',
    description: 'テスト駆動開発ワークフロー（RED → GREEN → REFACTOR）',
    definition: `# /tdd - テスト駆動開発

TDDワークフローを強制実行。テストを先に書く。

## 使い方
\`/tdd [実装したい機能]\`

## TDDサイクル
\`\`\`
RED → GREEN → REFACTOR → REPEAT

RED:      失敗するテストを先に書く
GREEN:    テストを通す最小限のコードを実装
REFACTOR: テスト維持しながらコード改善
REPEAT:   次の機能へ
\`\`\`

## 実行内容
1. インターフェース定義
2. 失敗するテストを作成
3. テスト実行（FAIL確認）
4. 最小限の実装
5. テスト実行（PASS確認）
6. リファクタリング
7. カバレッジ確認（80%以上）

## 保存先
\`~/.claude/commands/tdd.md\``,
  },
  {
    id: 'build-fix',
    name: '/build-fix',
    category: 'dev',
    description: 'ビルドエラー自動修正',
    definition: `# /build-fix - ビルドエラー自動修正

TypeScript/ビルドエラーを段階的に修正。

## 使い方
\`/build-fix\` を実行するだけ。

## 実行内容
1. npm run build でエラー検出
2. エラーをファイル別にグループ化
3. 各エラーについて:
   - エラー箇所のコンテキスト表示
   - 問題の説明
   - 修正を提案・適用
   - 再ビルドで確認
4. サマリー表示

## 停止条件
- 修正で新エラー発生
- 同じエラーが3回連続
- ユーザーが中断

## 保存先
\`~/.claude/commands/build-fix.md\``,
  },
  {
    id: 'plan',
    name: '/plan',
    category: 'dev',
    description: '実装計画作成（確認してから実行）',
    definition: `# /plan - 実装計画作成

実装前に計画を作成し、承認を待ってから実行。

## 使い方
\`/plan [実装したい機能]\`

## 実行内容
1. 要件の再確認
2. フェーズ別の実装ステップ
3. 依存関係の特定
4. リスク評価
5. 複雑度見積もり
6. **ユーザー承認を待つ**

## 出力例
\`\`\`
# 実装計画: [機能名]

## 要件
- ...

## 実装フェーズ
### Phase 1: ...
### Phase 2: ...

## リスク
- HIGH: ...
- MEDIUM: ...

**確認**: この計画で進めますか？
\`\`\`

## 保存先
\`~/.claude/commands/plan.md\``,
  },
];

// Architecture Elements
export const architectureElements: ArchitectureElement[] = [
  {
    id: 'skills',
    name: 'Skills',
    definition: 'ワークフロー定義',
    role: '複数ステップの作業を1コマンドで実行。対話的に進行し、途中で確認や質問が可能',
    location: '~/.claude/skills/',
    example: '/tdd（テスト駆動開発ワークフロー）',
    icon: '🔧',
  },
  {
    id: 'commands',
    name: 'Commands',
    definition: '即時実行コマンド',
    role: '/xxxで呼び出す単発アクション。最小限の対話で即座に実行',
    location: '~/.claude/commands/',
    example: '/quick-commit（高速コミット）',
    icon: '⚡',
  },
  {
    id: 'agents',
    name: 'Agents',
    definition: 'Subagent定義',
    role: 'タスク委譲先の専門エージェント。スコープ限定で独立実行し、結果を返す',
    location: '~/.claude/agents/',
    example: 'code-reviewer（コードレビュー専門）',
    icon: '🤖',
  },
  {
    id: 'rules',
    name: 'Rules',
    definition: '常時適用ルール',
    role: '全セッションで自動適用されるガイドライン。対話不要で常にバックグラウンドで有効',
    location: '~/.claude/rules/',
    example: 'security.md（セキュリティチェック）',
    icon: '📋',
  },
  {
    id: 'hooks',
    name: 'Hooks',
    definition: '自動トリガー',
    role: 'ツール実行前後に自動実行されるスクリプト。ユーザーの介入なしで発火',
    location: '~/.claude/settings.json',
    example: 'PostToolUse: prettier --write（編集後の自動フォーマット）',
    icon: '🪝',
  },
  {
    id: 'mcps',
    name: 'MCPs',
    definition: '外部サービス連携',
    role: 'DB、GitHub、Vercel等への直接接続。プロンプト経由でデータ取得・操作が可能',
    location: '~/.claude.json',
    example: 'supabase MCP（DB直接操作）',
    icon: '🔌',
  },
  {
    id: 'claudemd',
    name: 'CLAUDE.md',
    definition: 'プロジェクト設定',
    role: 'プロジェクト固有のルール・コンテキスト。技術スタック、コーディング規約、フォルダ構成を記載',
    location: 'プロジェクトルート',
    example: '技術スタック、コーディング規約、フォルダ構成',
    icon: '📄',
  },
];

// Architecture element colors
export const architectureColors: Record<string, string> = {
  skills: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-700',
  commands: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300 dark:border-green-700',
  agents: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700',
  rules: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-300 dark:border-orange-700',
  hooks: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 border-pink-300 dark:border-pink-700',
  mcps: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 border-cyan-300 dark:border-cyan-700',
  claudemd: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700',
};

// Skill category colors
export const skillCategoryColors: Record<string, string> = {
  session: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  git: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  quality: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  dev: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
};

export const skillCategoryLabels: Record<string, string> = {
  session: 'セッション',
  git: 'Git',
  quality: '品質',
  dev: '開発',
};

// Category colors
export const categoryColors: Record<string, string> = {
  skill: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  command: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  agent: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  rule: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
};

export const categoryLabels: Record<string, string> = {
  skill: 'スキル',
  command: 'コマンド',
  agent: 'エージェント',
  rule: 'ルール',
};

// Starter Kit data
export interface StarterKitCommand {
  name: string;
  description: string;
}

export interface StarterKitAgent {
  name: string;
  description: string;
}

export interface StarterKitRule {
  name: string;
  description: string;
}

export interface StarterKitDoc {
  name: string;
  description: string;
  highlights: string[];
}

export const starterKit = {
  repoUrl: 'https://github.com/Hantaku705/claude-code-starter',
  installCommand: 'claude /install-github-plugin Hantaku705/claude-code-starter',
  commands: [
    { name: '/handoff', description: 'セッション終了時の進捗保存' },
    { name: '/resume', description: 'セッション再開' },
    { name: '/memory', description: '記憶の保存・呼び出し' },
    { name: '/quick-commit', description: '高速コミット' },
    { name: '/commit-push-pr', description: 'コミット→プッシュ→PR作成' },
    { name: '/code-review', description: 'コードレビュー' },
    { name: '/tdd', description: 'TDDワークフロー' },
    { name: '/test-and-fix', description: 'テスト実行→修正' },
    { name: '/build-fix', description: 'ビルドエラー修正' },
    { name: '/plan', description: '実装計画作成' },
    { name: '/e2e', description: 'E2Eテスト（Playwright）' },
    { name: '/first-principles', description: '第一原理思考' },
  ] as StarterKitCommand[],
  agents: [
    { name: 'planner', description: '実装計画作成' },
    { name: 'architect', description: 'アーキテクチャ設計' },
    { name: 'tdd-guide', description: 'TDDガイド' },
    { name: 'code-reviewer', description: 'コードレビュー' },
    { name: 'security-reviewer', description: 'セキュリティレビュー' },
    { name: 'build-error-resolver', description: 'ビルドエラー解決' },
    { name: 'e2e-runner', description: 'E2Eテスト実行' },
    { name: 'refactor-cleaner', description: '不要コード削除' },
  ] as StarterKitAgent[],
  rules: [
    { name: 'agents', description: 'Agent活用ガイド' },
    { name: 'coding-style', description: 'コーディングスタイル' },
    { name: 'git-workflow', description: 'Gitワークフロー' },
    { name: 'security', description: 'セキュリティガイドライン' },
    { name: 'testing', description: 'テスト要件' },
    { name: 'performance', description: 'パフォーマンス最適化' },
  ] as StarterKitRule[],
  docs: [
    {
      name: 'agent-sdk.md',
      description: 'Claude Agent SDK 概要・使い方',
      highlights: [
        '組み込みツール（Read, Edit, Bash, Glob, Grep, WebSearch等）',
        'フック（PreToolUse, PostToolUse, Stop等）',
        'サブエージェント（Task委譲）',
        'MCP（Model Context Protocol）',
        'セッション管理',
      ],
    },
  ] as StarterKitDoc[],
};

// Tab with level support
export type LevelType = 'beginner' | 'intermediate' | 'advanced';

export interface Tab {
  id: string;
  label: string;
  level: LevelType;
}

export const tabs: Tab[] = [
  // Lv.1 初心者
  { id: 'getting-started', label: 'Getting Started', level: 'beginner' },
  { id: 'starter-kit', label: 'Starter Kit', level: 'beginner' },
  // Lv.2 中級者
  { id: 'features', label: 'Features', level: 'intermediate' },
  { id: 'examples', label: 'Examples', level: 'intermediate' },
  { id: 'architecture', label: 'Architecture', level: 'intermediate' },
  { id: 'compare', label: 'Compare', level: 'intermediate' },
  { id: 'skills', label: 'Skills', level: 'intermediate' },
  // Lv.3 上級者
  { id: 'build', label: 'Build', level: 'advanced' },
  { id: 'tips', label: 'Tips', level: 'advanced' },
];

export interface Level {
  id: LevelType;
  label: string;
  icon: string;
  description: string;
  tabs: string[];
}

export const levels: Level[] = [
  { id: 'beginner', label: '初心者', icon: '🌱', description: 'Getting Started + Starter Kit', tabs: ['getting-started', 'starter-kit'] },
  { id: 'intermediate', label: '中級者', icon: '🌿', description: 'Features + Examples + Architecture + Compare + Skills', tabs: ['features', 'examples', 'architecture', 'compare', 'skills'] },
  { id: 'advanced', label: '上級者', icon: '🌳', description: 'Build + Tips', tabs: ['build', 'tips'] },
];

// Glossary for beginners
export interface Glossary {
  id: string;
  term: string;
  termEn?: string;
  definition: string;
  analogy: string;
  icon: string;
}

export const glossary: Glossary[] = [
  {
    id: 'editor',
    term: 'エディター',
    termEn: 'Editor',
    definition: 'コードを書くためのアプリケーション。文法ハイライトや自動補完などコーディングに便利な機能が搭載されている。',
    analogy: 'メモ帳の超高機能版。Wordが文章用なら、エディターはコード用',
    icon: '📝',
  },
  {
    id: 'cursor',
    term: 'Cursor',
    termEn: 'Cursor',
    definition: 'VS Codeをベースに作られたAI機能付きエディター。Composer（AI画面）でコードを自動生成できる。',
    analogy: 'VS Codeにもう一人のプログラマー（AI）が常駐しているイメージ',
    icon: '🖱️',
  },
  {
    id: 'claude-code',
    term: 'Claude Code',
    termEn: 'Claude Code',
    definition: 'ターミナルで動くAIアシスタント。自然な日本語でコードを書いたり、修正したり、実行したりできる。',
    analogy: 'ChatGPTのターミナル版。しかもファイルを直接編集できる',
    icon: '🤖',
  },
  {
    id: 'terminal',
    term: 'ターミナル',
    termEn: 'Terminal',
    definition: '文字だけで操作する画面。GUIの代わりにコマンドを打って操作する。「黒い画面」「コマンドライン」とも呼ばれる。',
    analogy: 'マウスを使わず、キーボードだけでパソコンを操作する方法',
    icon: '💻',
  },
  {
    id: 'cli',
    term: 'CLI',
    termEn: 'Command Line Interface',
    definition: 'ターミナルで使うツールのこと。GUIの反対。',
    analogy: 'GUIが「見て操作」ならCLIは「打って操作」',
    icon: '⌨️',
  },
  {
    id: 'homebrew',
    term: 'Homebrew',
    termEn: 'Homebrew',
    definition: 'Macにアプリをインストールするためのツール。開発者向けツールの導入が簡単になる。',
    analogy: 'App Storeのターミナル版。brew install でアプリが入る',
    icon: '🍺',
  },
  {
    id: 'npm',
    term: 'npm',
    termEn: 'Node Package Manager',
    definition: 'Node.jsのパッケージ管理ツール。JavaScriptライブラリをインストールする。',
    analogy: 'JavaScriptの部品屋さん。必要な部品をnpm installで取り寄せる',
    icon: '📦',
  },
];

// Persona for each level
export interface Persona {
  level: LevelType;
  title: string;
  description: string;
  background: string;
  pain: string;
  icon: string;
}

export const personas: Persona[] = [
  {
    level: 'beginner',
    title: 'ターミナル初心者',
    description: 'Excelは使えるけどターミナルは怖い人',
    background: '非エンジニア、マーケター、PMなど。Cursorは少し触ったことがある',
    pain: 'AIでコード書けると聞いたけど、何から始めればいいかわからない',
    icon: '🌱',
  },
  {
    level: 'intermediate',
    title: '効率化を目指す人',
    description: 'Cursorでコードは書けるけど手戻りが多い人',
    background: 'コーディング経験1-2年。AIツールは日常使用',
    pain: '効率化したい。エラーループから抜け出したい。チーム展開を検討中',
    icon: '🌿',
  },
  {
    level: 'advanced',
    title: 'ワークフロー職人',
    description: '自分専用の設定を作りたい人',
    background: 'エンジニア3年以上。ワークフロー最適化に関心',
    pain: 'Skills/Agents/Hooksを自作して、チームの生産性を10倍にしたい',
    icon: '🌳',
  },
];

// Goals for each level
export interface LevelGoal {
  level: LevelType;
  goalTitle: string;
  checkItems: string[];
  timeEstimate: string;
  nextAction: string;
}

export const levelGoals: LevelGoal[] = [
  {
    level: 'beginner',
    goalTitle: '中級者へ',
    checkItems: [
      'Claude Codeをインストールして認証できた',
      '基本操作5つを覚えた（claude, /help, /clear, Ctrl+C, exit）',
      '実際にファイルを1つ作成できた',
      '/handoff と /resume を使えた',
      'Plan Modeを試した',
    ],
    timeEstimate: '約1-2時間',
    nextAction: 'CLAUDE.mdを作成してプロジェクト設定を始めよう',
  },
  {
    level: 'intermediate',
    goalTitle: '上級者へ',
    checkItems: [
      'Skillを自分で作れた',
      'Commandを実行できた',
      'Subagentを理解して、並行処理ができた',
    ],
    timeEstimate: '約1-2週間',
    nextAction: 'Hooks・MCP連携でワークフローをさらに自動化しよう',
  },
  {
    level: 'advanced',
    goalTitle: 'マスター',
    checkItems: [
      'Webアプリを作れた（Vercelを活用）',
      'データベースを作れた（Supabaseの理解・導入）',
      '外部API Keyの理解（Apify / RapidAPIの導入理解）',
      'Hooksの設定ができた',
    ],
    timeEstimate: '継続的',
    nextAction: 'Agent SDKで本番環境の自動化を構築しよう',
  },
];

// Build Guide for advanced users
export interface BuildGuideSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  steps: { title: string; description: string; code?: string }[];
  tips?: string[];
  links?: { label: string; url: string }[];
}

export const buildGuideSections: BuildGuideSection[] = [
  {
    id: 'vercel',
    title: 'Webアプリ作成（Vercel）',
    icon: '🚀',
    description: 'Next.jsでWebアプリを作り、Vercelで世界に公開する',
    steps: [
      {
        title: 'Next.js プロジェクト作成',
        description: 'Claude Codeに依頼するだけでプロジェクトが作れる',
        code: '# Claude Codeで実行\n「Next.jsで○○のWebアプリを作って」\n\n# 手動の場合\nnpx create-next-app@latest my-app --typescript --tailwind --app',
      },
      {
        title: 'ローカルで確認',
        description: '開発サーバーを起動してブラウザで確認',
        code: 'cd my-app\nnpm run dev\n# → http://localhost:3000',
      },
      {
        title: 'Vercel にデプロイ',
        description: 'Vercel CLIで本番公開。GitHubプッシュでも自動デプロイ可能',
        code: '# Vercel CLI インストール\nnpm i -g vercel\n\n# 認証\nvercel login\n\n# デプロイ（初回）\nvercel --yes\n\n# 本番デプロイ\nvercel --prod --yes',
      },
      {
        title: '環境変数の設定',
        description: 'API KeyなどをVercelに登録',
        code: '# 環境変数を追加\nvercel env add API_KEY production <<< "your-key"\n\n# 一覧確認\nvercel env ls\n\n# 再デプロイ（環境変数反映）\nvercel --prod --yes',
      },
    ],
    tips: [
      'Claude Codeに「Vercelにデプロイして」と言えば自動でやってくれる',
      'GitHub連携すると、pushするだけで自動デプロイされる',
      'プロジェクト名は小文字のみ（大文字NG）',
    ],
    links: [
      { label: 'Vercel 公式', url: 'https://vercel.com' },
      { label: 'Next.js 公式', url: 'https://nextjs.org' },
      { label: 'Vercel CLI Docs', url: 'https://vercel.com/docs/cli' },
    ],
  },
  {
    id: 'supabase',
    title: 'データベース（Supabase）',
    icon: '🗄️',
    description: 'Supabaseでデータベースを作り、Webアプリと接続する',
    steps: [
      {
        title: 'Supabase プロジェクト作成',
        description: 'supabase.comでアカウント作成 → New Project',
        code: '# プロジェクト作成後、以下の情報をメモ\n# - Project URL: https://xxx.supabase.co\n# - anon key: eyJ...\n# - service_role key: eyJ...',
      },
      {
        title: 'テーブル作成（SQL Editor）',
        description: 'SQL Editorでテーブルを作成。Claude CodeにSQL生成を依頼できる',
        code: '-- テーブル作成例\nCREATE TABLE IF NOT EXISTS users (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  name TEXT NOT NULL,\n  email TEXT UNIQUE NOT NULL,\n  created_at TIMESTAMP DEFAULT now()\n);\n\n-- RLS（行レベルセキュリティ）有効化\nALTER TABLE users ENABLE ROW LEVEL SECURITY;',
      },
      {
        title: 'Next.js から接続',
        description: 'Supabase クライアントライブラリをインストール',
        code: '# インストール\nnpm install @supabase/supabase-js\n\n# .env.local に設定\nNEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...',
      },
      {
        title: 'データの読み書き',
        description: 'TypeScriptからCRUD操作',
        code: "import { createClient } from '@supabase/supabase-js'\n\nconst supabase = createClient(\n  process.env.NEXT_PUBLIC_SUPABASE_URL!,\n  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!\n)\n\n// 読み取り\nconst { data } = await supabase.from('users').select('*')\n\n// 書き込み\nawait supabase.from('users').insert({ name: 'Taro', email: 'taro@example.com' })",
      },
    ],
    tips: [
      'Claude Codeに「Supabaseのテーブル設計して」と依頼するとSQL生成してくれる',
      'RLS（Row Level Security）は必ず有効にすること',
      'service_role keyは絶対にフロントエンドに露出させない',
    ],
    links: [
      { label: 'Supabase 公式', url: 'https://supabase.com' },
      { label: 'Supabase Docs', url: 'https://supabase.com/docs' },
      { label: 'Supabase JS SDK', url: 'https://supabase.com/docs/reference/javascript/introduction' },
    ],
  },
  {
    id: 'api-keys',
    title: '外部API Key（Apify / RapidAPI）',
    icon: '🔑',
    description: '外部サービスのAPIを使い、データ取得やスクレイピングを行う',
    steps: [
      {
        title: 'API Keyとは',
        description: '外部サービスにアクセスするための「合言葉」。サービスごとに発行され、環境変数で管理する',
        code: '# 環境変数で管理（.env.local）\nAPIF_TOKEN=apify_api_xxxxx\nRAPID_API_KEY=xxxxx\n\n# コード内で使用\nconst token = process.env.APIFY_TOKEN',
      },
      {
        title: 'Apify（スクレイピング）',
        description: 'Webサイトからデータを自動取得するプラットフォーム。TikTok、Instagram、Google等のスクレイパーが豊富',
        code: '# Apify クライアント\nnpm install apify-client\n\n# 使用例（TikTokプロフィール取得）\nimport { ApifyClient } from "apify-client"\n\nconst client = new ApifyClient({ token: process.env.APIFY_TOKEN })\nconst run = await client.actor("actor-id").call({ profiles: ["@username"] })\nconst { items } = await client.dataset(run.defaultDatasetId).listItems()',
      },
      {
        title: 'RapidAPI（APIマーケットプレイス）',
        description: '数千のAPIを1つのキーで使えるマーケットプレイス。翻訳、天気、SNSデータなど',
        code: '# RapidAPI 使用例\nconst response = await fetch("https://api-endpoint.p.rapidapi.com/data", {\n  headers: {\n    "X-RapidAPI-Key": process.env.RAPID_API_KEY!,\n    "X-RapidAPI-Host": "api-endpoint.p.rapidapi.com"\n  }\n})\nconst data = await response.json()',
      },
      {
        title: 'Vercelへの環境変数登録',
        description: 'API Keyは必ずVercelの環境変数に登録（コードにハードコードNG）',
        code: '# Vercelに環境変数登録\nvercel env add APIFY_TOKEN production <<< "apify_api_xxxxx"\nvercel env add RAPID_API_KEY production <<< "xxxxx"\n\n# 再デプロイ\nvercel --prod --yes',
      },
    ],
    tips: [
      'API Keyは絶対にコードに直書きしない（環境変数で管理）',
      'Apifyは無料枠あり（月$5相当）。RapidAPIも無料プランあり',
      '.env.local は .gitignore に含まれているか必ず確認',
    ],
    links: [
      { label: 'Apify 公式', url: 'https://apify.com' },
      { label: 'Apify Store', url: 'https://apify.com/store' },
      { label: 'RapidAPI 公式', url: 'https://rapidapi.com' },
    ],
  },
  {
    id: 'hooks',
    title: 'Hooks設定',
    icon: '⚡',
    description: 'ツール実行の前後に自動チェックを走らせる',
    steps: [
      {
        title: 'Hooksとは',
        description: 'Claude Codeがツールを使う前後に自動で実行されるスクリプト。品質チェックや安全ガードに使う',
        code: '# 3種類のHook\nPreToolUse   → ツール実行「前」（バリデーション）\nPostToolUse  → ツール実行「後」（自動フォーマット）\nStop         → セッション終了時（最終チェック）',
      },
      {
        title: 'settings.json の場所',
        description: 'ユーザーレベルの設定ファイル',
        code: '# 場所\n~/.claude/settings.json\n\n# 基本構造\n{\n  "hooks": {\n    "PreToolUse": [...],\n    "PostToolUse": [...],\n    "Stop": [...]\n  }\n}',
      },
      {
        title: '実用例：console.log 検出',
        description: 'ファイル編集後に console.log が残っていないかチェック',
        code: '{\n  "hooks": {\n    "PostToolUse": [\n      {\n        "matcher": "Edit",\n        "hooks": [\n          {\n            "type": "command",\n            "command": "grep -n \'console.log\' \\"$CLAUDE_FILE_PATH\\" && echo \'⚠️ console.log detected\' || true"\n          }\n        ]\n      }\n    ]\n  }\n}',
      },
      {
        title: '実用例：git push 前レビュー',
        description: 'push前に確認を入れる安全ガード',
        code: '{\n  "hooks": {\n    "PreToolUse": [\n      {\n        "matcher": "Bash",\n        "hooks": [\n          {\n            "type": "command",\n            "command": "echo \\"$CLAUDE_TOOL_INPUT\\" | grep -q \'git push\' && echo \'⚠️ About to push! Review changes first.\' || true"\n          }\n        ]\n      }\n    ]\n  }\n}',
      },
    ],
    tips: [
      'Starter Kitをインストールすれば、推奨Hooks設定が含まれている',
      'Hooksが多すぎると実行速度が落ちるので、必要なものだけ設定',
      'Claude Codeに「Hooks設定して」と依頼すると settings.json を編集してくれる',
    ],
    links: [
      { label: 'Claude Code Docs', url: 'https://docs.anthropic.com/en/docs/claude-code' },
      { label: 'Hooks ドキュメント', url: 'https://docs.anthropic.com/en/docs/claude-code/hooks' },
    ],
  },
];

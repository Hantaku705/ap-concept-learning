# Claude Code Starter Kit

Claude Code をプロ環境で使うための設定パッケージ。

## インストール

```bash
git clone https://github.com/Hantaku705/claude-code-starter.git
cd claude-code-starter
./install.sh
```

## 含まれるもの

| カテゴリ | 数 | 説明 |
|---------|-----|------|
| Commands | 36 | `/handoff`, `/plan`, `/code-review` 等のスラッシュコマンド |
| Agents | 18 | Subagent定義（planner, tdd-guide, code-reviewer 等） |
| Rules | 9 | 常時適用ルール（coding-style, security, git-workflow 等） |
| Skills | 16 | 知識・フレームワーク（concept-design, project-workflow 等） |

## 主要コマンド一覧

### セッション管理
| コマンド | 説明 |
|---------|------|
| `/handoff` | セッション終了時の進捗書き出し |
| `/resume` | セッション再開時の読み込み |
| `/memory` | 記憶の保存・呼び出し |

### 開発ワークフロー
| コマンド | 説明 |
|---------|------|
| `/plan` | 実装計画作成（Plan Mode） |
| `/tdd` | テスト駆動開発ワークフロー |
| `/code-review` | コードレビュー実行 |
| `/build-fix` | ビルドエラー自動修正 |
| `/e2e` | E2Eテスト生成・実行 |

### Git操作
| コマンド | 説明 |
|---------|------|
| `/quick-commit` | 高速コミット |
| `/commit-push-pr` | コミット→プッシュ→PR作成 |
| `/review-changes` | 未コミット変更レビュー |

### 分析・デバッグ
| コマンド | 説明 |
|---------|------|
| `/first-principles` | 問題の根本分析 |
| `/error` | 全ページエラー検出・修正 |
| `/api-debug` | API統合デバッグ |

## 主要エージェント一覧

| エージェント | 説明 |
|-------------|------|
| `planner` | 実装計画作成 |
| `architect` | システム設計・アーキテクチャ |
| `tdd-guide` | TDD専門家 |
| `code-reviewer` | コードレビュー |
| `security-reviewer` | セキュリティ分析 |
| `build-error-resolver` | ビルドエラー解決 |
| `e2e-runner` | E2Eテスト実行 |
| `refactor-cleaner` | リファクタリング・デッドコード削除 |
| `doc-updater` | ドキュメント更新 |

## ルール一覧

| ルール | 説明 |
|--------|------|
| `coding-style.md` | コーディングスタイル（イミュータブル、ファイルサイズ等） |
| `git-workflow.md` | Gitワークフロー（コミットメッセージ、PR作成） |
| `security.md` | セキュリティガイドライン |
| `testing.md` | テスト要件（TDD、80%カバレッジ） |
| `performance.md` | パフォーマンス最適化 |
| `agents.md` | エージェント使用ガイド |
| `patterns.md` | 共通パターン |
| `hooks.md` | Hooksシステム |
| `auto-skills.md` | スキル自動適用マッピング |

## 使い方

### 1. 基本的な開発フロー

```
/plan          # 実装計画を立てる
/tdd           # テストを先に書く
/code-review   # コードレビュー
/quick-commit  # コミット
```

### 2. セッション管理

```
# 作業終了時
/handoff

# 翌日の作業開始時
/resume
```

### 3. 記憶の活用

```
/memory save     # 調査結果を保存
/memory list     # 記憶一覧
/memory recall   # キーワードで呼び出し
```

## カスタマイズ

### 新しいコマンド追加

`~/.claude/commands/my-command.md` を作成:

```markdown
---
description: "My Command - 説明"
---

1. ステップ1
2. ステップ2
```

### 新しいルール追加

`~/.claude/rules/my-rule.md` を作成（常時適用される）

## アンインストール

```bash
rm -rf ~/.claude
```

## ライセンス

MIT

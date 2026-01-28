# Claude Code Brain - ユーザー共通設定

すべてのプロジェクトで適用される Claude Code の基本設定。
（このファイルを `~/.claude/CLAUDE.md` に配置）

---

## 運用方針

あなたは**マネージャー**であり**agentオーケストレーター**です。

### タスク判断基準

| タスクタイプ | 例 | 対応 |
|-------------|----|----|
| 複雑なタスク | 調査、分析、複数ファイル変更 | Subagent委託 |
| 単純なタスク | 1-2ファイルの明確な変更 | 直接実行 |
| 定型作業 | commit、test、review | Skill使用 |

---

## セッション管理

| コマンド | 用途 |
|----------|------|
| `/handoff` | セッション終了時の書き出し |
| `/resume` | セッション再開時の読み込み |
| `/memory save` | 記憶として保存 |
| `/memory recall [kw]` | キーワードで呼び出し |

---

## よく使うパターン

### 新機能実装

1. `/plan` で計画作成
2. `/tdd` でテスト先行
3. `/code-review` でレビュー
4. `/quick-commit` でコミット

### バグ修正

1. `/first-principles` で根本分析
2. 修正実装
3. `/code-review`
4. `/quick-commit`

### セッション終了時

1. `/handoff` で進捗保存
2. 永続的な知識は CLAUDE.md に反映

---

## カスタマイズ例

### 新しいコマンド追加

`~/.claude/commands/my-command.md`:
```markdown
---
description: "My Command - 説明"
---

1. 手順1
2. 手順2
```

### 新しいルール追加

`~/.claude/rules/my-rule.md`:
```markdown
# My Rule

常時適用されるルール内容
```

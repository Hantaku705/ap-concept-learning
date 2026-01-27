# commands/ - カスタムSkillコマンド定義

APプロジェクト固有のSlash Commands（スキル）を定義。

## ファイル一覧

| ファイル | スキル | 説明 |
|---------|--------|------|
| `address-lookup.md` | `/address-lookup` | 企業サイトから住所を取得し配送フォーム形式に変換 |
| `build-fix.md` | `/build-fix` | ビルドエラーの自動修正 |
| `code-review.md` | `/code-review` | コードレビュー実行 |
| `e2e.md` | `/e2e` | E2Eテスト生成・実行（Playwright） |
| `organize-folders.md` | `/organize-folders` | フォルダ構造整理 |
| `plan.md` | `/plan` | 実装計画作成 |
| `refactor-clean.md` | `/refactor-clean` | リファクタリング・不要コード削除 |
| `scaffold-webapp.md` | `/scaffold-webapp` | Webアプリ雛形生成 |
| `shogun.md` | `/shogun` | multi-agent-shogun マルチエージェントシステム起動 |
| `should-skill.md` | `/should-skill` | セッション作業からスキル/コマンド化すべきパターンを判定・提案 |
| `tdd.md` | `/tdd` | TDDワークフロー |
| `test-coverage.md` | `/test-coverage` | テストカバレッジ確認 |
| `update-codemaps.md` | `/update-codemaps` | Codemap更新 |
| `update-docs.md` | `/update-docs` | ドキュメント更新 |

## 使用方法

```
/[スキル名]
```

例: `/address-lookup https://example.co.jp`

## 更新履歴

- 2026-01-28: should-skill.md追加（スキル/コマンド化判定）
- 2026-01-27: shogun.md追加（multi-agent-shogun起動スキル）
- 2026-01-23: CLAUDE.md作成、address-lookup.md追加

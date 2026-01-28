#!/bin/bash
# Claude Code Starter Kit インストーラー

set -e

TARGET="$HOME/.claude"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo ""
echo "=========================================="
echo "  Claude Code Starter Kit インストール"
echo "=========================================="
echo ""

# 既存設定のバックアップ
if [ -d "$TARGET" ]; then
  BACKUP="$TARGET.backup.$(date +%Y%m%d%H%M%S)"
  echo "既存の設定をバックアップ: $BACKUP"
  mv "$TARGET" "$BACKUP"
  echo ""
fi

# .claude フォルダをコピー
echo "設定をコピー中..."
cp -r "$SCRIPT_DIR/.claude" "$TARGET"

# 実行権限を付与（必要に応じて）
chmod -R u+rw "$TARGET"

echo ""
echo "=========================================="
echo "  インストール完了!"
echo "=========================================="
echo ""
echo "インストールされたファイル:"
echo "  - Commands: $(ls "$TARGET/commands" 2>/dev/null | wc -l | tr -d ' ') 個"
echo "  - Agents:   $(ls "$TARGET/agents" 2>/dev/null | wc -l | tr -d ' ') 個"
echo "  - Rules:    $(ls "$TARGET/rules" 2>/dev/null | wc -l | tr -d ' ') 個"
echo "  - Skills:   $(ls "$TARGET/skills" 2>/dev/null | wc -l | tr -d ' ') 個"
echo ""
echo "主要コマンド:"
echo "  /handoff      - セッション終了時の書き出し"
echo "  /resume       - セッション再開"
echo "  /plan         - 実装計画作成"
echo "  /code-review  - コードレビュー"
echo "  /tdd          - TDDワークフロー"
echo ""
echo "詳細は README.md を参照してください。"
echo ""

# /update-claude-code-starter - AP設定をStarterに同期

AP/.claude/ の設定を claude-code-starter/.claude/ に同期し、チームメンバーが最新の設定を取得できるようにします。

---

## 同期対象

| 同期する | 同期しない（AP固有） |
|---------|---------------------|
| agents/ | multi-agent/ |
| commands/ | plugins/ |
| rules/ | examples/ |
| skills/ | |

---

## 実行手順

### Step 1: 同期実行

以下のコマンドを順番に実行:

```bash
# agents/
rsync -av --delete /Users/hantaku/Downloads/AP/.claude/agents/ /Users/hantaku/Downloads/AP/claude-code-starter/.claude/agents/

# commands/
rsync -av --delete /Users/hantaku/Downloads/AP/.claude/commands/ /Users/hantaku/Downloads/AP/claude-code-starter/.claude/commands/

# rules/
rsync -av --delete /Users/hantaku/Downloads/AP/.claude/rules/ /Users/hantaku/Downloads/AP/claude-code-starter/.claude/rules/

# skills/
rsync -av --delete /Users/hantaku/Downloads/AP/.claude/skills/ /Users/hantaku/Downloads/AP/claude-code-starter/.claude/skills/
```

### Step 2: 差分確認

```bash
git status claude-code-starter/
```

### Step 3: 同期結果を報告

同期されたファイル数を報告:
- agents: N files
- commands: N files
- rules: N files
- skills: N files

### Step 4: コミット＆プッシュ（オプション）

変更がある場合、コミットしてGitHubにプッシュするか確認。

---

## 注意事項

- `--delete` オプションにより、AP側で削除されたファイルはstarter側からも削除される
- multi-agent/, plugins/, examples/ はAP固有のため同期しない
- 同期後は必ず差分を確認してからコミット

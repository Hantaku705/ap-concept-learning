#!/bin/bash

# Multi-Agent System - Start Script
# Starts tmux session with all agents

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SESSION_NAME="multi-agent"

echo "=========================================="
echo "  Multi-Agent System - Starting"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if session already exists
if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    echo -e "${YELLOW}Session '$SESSION_NAME' already exists.${NC}"
    echo ""
    echo "Options:"
    echo "  1. Attach to existing session: tmux attach -t $SESSION_NAME"
    echo "  2. Stop and restart: ./scripts/stop.sh && ./scripts/start.sh"
    echo ""
    read -p "Attach to existing session? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        tmux attach -t "$SESSION_NAME"
    fi
    exit 0
fi

# Create new session
echo "Creating tmux session..."
tmux new-session -d -s "$SESSION_NAME" -c "$PROJECT_DIR"

# Window 0: Orchestrator
echo -e "${BLUE}Setting up Orchestrator (Window 0)...${NC}"
tmux rename-window -t "$SESSION_NAME:0" "orchestrator"
tmux send-keys -t "$SESSION_NAME:orchestrator" "cd $PROJECT_DIR" C-m
tmux send-keys -t "$SESSION_NAME:orchestrator" "clear" C-m
tmux send-keys -t "$SESSION_NAME:orchestrator" "echo '=== Orchestrator ===' " C-m
tmux send-keys -t "$SESSION_NAME:orchestrator" "echo 'Ready. Waiting for tasks...'" C-m
tmux send-keys -t "$SESSION_NAME:orchestrator" "echo ''" C-m
tmux send-keys -t "$SESSION_NAME:orchestrator" "echo 'To start Claude: claude'" C-m
tmux send-keys -t "$SESSION_NAME:orchestrator" "echo 'Instructions: cat instructions/orchestrator.md'" C-m

# Window 1: Coordinator
echo -e "${BLUE}Setting up Coordinator (Window 1)...${NC}"
tmux new-window -t "$SESSION_NAME" -n "coordinator"
tmux send-keys -t "$SESSION_NAME:coordinator" "cd $PROJECT_DIR" C-m
tmux send-keys -t "$SESSION_NAME:coordinator" "clear" C-m
tmux send-keys -t "$SESSION_NAME:coordinator" "echo '=== Coordinator ===' " C-m
tmux send-keys -t "$SESSION_NAME:coordinator" "echo 'Ready. Waiting for tasks...'" C-m
tmux send-keys -t "$SESSION_NAME:coordinator" "echo ''" C-m
tmux send-keys -t "$SESSION_NAME:coordinator" "echo 'To start Claude: claude'" C-m
tmux send-keys -t "$SESSION_NAME:coordinator" "echo 'Instructions: cat instructions/coordinator.md'" C-m

# Window 2: SubAgents (8 panes)
echo -e "${BLUE}Setting up SubAgents (Window 2, 8 panes)...${NC}"
tmux new-window -t "$SESSION_NAME" -n "subagents"
tmux send-keys -t "$SESSION_NAME:subagents" "cd $PROJECT_DIR" C-m

# Create 8 panes in a grid layout
# Split into 2 rows
tmux split-window -t "$SESSION_NAME:subagents" -v
# Split each row into 4 columns
tmux split-window -t "$SESSION_NAME:subagents.0" -h
tmux split-window -t "$SESSION_NAME:subagents.0" -h
tmux split-window -t "$SESSION_NAME:subagents.0" -h
tmux split-window -t "$SESSION_NAME:subagents.4" -h
tmux split-window -t "$SESSION_NAME:subagents.4" -h
tmux split-window -t "$SESSION_NAME:subagents.4" -h

# Select tiled layout for even distribution
tmux select-layout -t "$SESSION_NAME:subagents" tiled

# Initialize each SubAgent pane
for i in {0..7}; do
    SUBAGENT_NUM=$((i + 1))
    tmux send-keys -t "$SESSION_NAME:subagents.$i" "cd $PROJECT_DIR" C-m
    tmux send-keys -t "$SESSION_NAME:subagents.$i" "export SUBAGENT_ID=$SUBAGENT_NUM" C-m
    tmux send-keys -t "$SESSION_NAME:subagents.$i" "clear" C-m
    tmux send-keys -t "$SESSION_NAME:subagents.$i" "echo '=== SubAgent-$SUBAGENT_NUM ===' " C-m
    tmux send-keys -t "$SESSION_NAME:subagents.$i" "echo 'ID: $SUBAGENT_NUM'" C-m
    tmux send-keys -t "$SESSION_NAME:subagents.$i" "echo 'Task file: queue/tasks/task_*_subagent_$SUBAGENT_NUM.yaml'" C-m
done

# Window 3: Dashboard (Web UI)
echo -e "${BLUE}Setting up Dashboard (Window 3)...${NC}"
tmux new-window -t "$SESSION_NAME" -n "dashboard"
tmux send-keys -t "$SESSION_NAME:dashboard" "cd $PROJECT_DIR/dashboard" C-m
tmux send-keys -t "$SESSION_NAME:dashboard" "clear" C-m
tmux send-keys -t "$SESSION_NAME:dashboard" "echo '=== Dashboard ===' " C-m
tmux send-keys -t "$SESSION_NAME:dashboard" "echo ''" C-m
tmux send-keys -t "$SESSION_NAME:dashboard" "echo 'To start Web UI: npm run dev'" C-m
tmux send-keys -t "$SESSION_NAME:dashboard" "echo 'URL: http://localhost:3001'" C-m
tmux send-keys -t "$SESSION_NAME:dashboard" "echo ''" C-m
tmux send-keys -t "$SESSION_NAME:dashboard" "echo 'Markdown dashboard: cat ../dashboard.md'" C-m

# Window 4: Logs
echo -e "${BLUE}Setting up Logs (Window 4)...${NC}"
tmux new-window -t "$SESSION_NAME" -n "logs"
tmux send-keys -t "$SESSION_NAME:logs" "cd $PROJECT_DIR/logs" C-m
tmux send-keys -t "$SESSION_NAME:logs" "clear" C-m
tmux send-keys -t "$SESSION_NAME:logs" "echo '=== Logs ===' " C-m
tmux send-keys -t "$SESSION_NAME:logs" "echo ''" C-m
tmux send-keys -t "$SESSION_NAME:logs" "echo 'Watch logs: tail -f *.log'" C-m
tmux send-keys -t "$SESSION_NAME:logs" "echo 'Queue status: watch -n 2 ls -la ../queue/'" C-m

# Update dashboard status
cat > "$PROJECT_DIR/dashboard.md" << EOF
# Multi-Agent Dashboard

## Status: 🟢 Running

| Agent | Status | Current Task | Progress |
|-------|--------|--------------|----------|
| Orchestrator | 🟡 Idle | Waiting for tasks | - |
| Coordinator | 🟡 Idle | Waiting for tasks | - |
| SubAgent-1 | 🟡 Idle | - | - |
| SubAgent-2 | 🟡 Idle | - | - |
| SubAgent-3 | 🟡 Idle | - | - |
| SubAgent-4 | 🟡 Idle | - | - |
| SubAgent-5 | 🟡 Idle | - | - |
| SubAgent-6 | 🟡 Idle | - | - |
| SubAgent-7 | 🟡 Idle | - | - |
| SubAgent-8 | 🟡 Idle | - | - |

## Recent Tasks

| Task ID | Command | Status | Duration |
|---------|---------|--------|----------|
| - | - | - | - |

## Skills Auto-Generated

| Skill ID | Trigger | Success Rate | Usage |
|----------|---------|--------------|-------|
| - | - | - | - |

## System Info

- **Started**: $(date '+%Y-%m-%d %H:%M:%S')
- **Uptime**: 0m
- **Tasks Completed**: 0
- **Skills Generated**: 0

## Last Updated: $(date '+%Y-%m-%d %H:%M:%S')
EOF

# Select orchestrator window
tmux select-window -t "$SESSION_NAME:orchestrator"

echo ""
echo "=========================================="
echo -e "${GREEN}  System Started!${NC}"
echo "=========================================="
echo ""
echo "Session: $SESSION_NAME"
echo ""
echo "Windows:"
echo "  0: orchestrator  - Main entry point"
echo "  1: coordinator   - Task management"
echo "  2: subagents     - 8 parallel workers"
echo "  3: dashboard     - Web UI"
echo "  4: logs          - Log viewer"
echo ""
echo "Commands:"
echo "  Attach:  tmux attach -t $SESSION_NAME"
echo "  Detach:  Ctrl+B, D"
echo "  Switch:  Ctrl+B, [0-4]"
echo "  Stop:    ./scripts/stop.sh"
echo ""
echo -e "${BLUE}Attaching to session...${NC}"
echo ""

# Attach to session
tmux attach -t "$SESSION_NAME"

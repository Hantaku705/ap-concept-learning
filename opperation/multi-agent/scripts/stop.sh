#!/bin/bash

# Multi-Agent System - Stop Script
# Stops the tmux session and cleans up

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SESSION_NAME="multi-agent"

echo "=========================================="
echo "  Multi-Agent System - Stopping"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if session exists
if ! tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    echo -e "${YELLOW}Session '$SESSION_NAME' is not running.${NC}"
    exit 0
fi

# Confirm stop
echo -e "${YELLOW}This will stop all agents and terminate the tmux session.${NC}"
read -p "Are you sure? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

# Kill the session
echo "Stopping session..."
tmux kill-session -t "$SESSION_NAME"

# Update dashboard
cat > "$PROJECT_DIR/dashboard.md" << EOF
# Multi-Agent Dashboard

## Status: 🔴 Stopped

| Agent | Status | Current Task | Progress |
|-------|--------|--------------|----------|
| Orchestrator | ⚪ Offline | - | - |
| Coordinator | ⚪ Offline | - | - |
| SubAgent-1 | ⚪ Offline | - | - |
| SubAgent-2 | ⚪ Offline | - | - |
| SubAgent-3 | ⚪ Offline | - | - |
| SubAgent-4 | ⚪ Offline | - | - |
| SubAgent-5 | ⚪ Offline | - | - |
| SubAgent-6 | ⚪ Offline | - | - |
| SubAgent-7 | ⚪ Offline | - | - |
| SubAgent-8 | ⚪ Offline | - | - |

## Recent Tasks

| Task ID | Command | Status | Duration |
|---------|---------|--------|----------|
| - | - | - | - |

## Skills Auto-Generated

| Skill ID | Trigger | Success Rate | Usage |
|----------|---------|--------------|-------|
| - | - | - | - |

## System Info

- **Stopped**: $(date '+%Y-%m-%d %H:%M:%S')
- **Uptime**: -
- **Tasks Completed**: 0
- **Skills Generated**: 0

## Last Updated: $(date '+%Y-%m-%d %H:%M:%S')
EOF

# Optional: Clean up queue files
echo ""
read -p "Clean up queue files? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Cleaning up queue..."
    rm -f "$PROJECT_DIR/queue/orchestrator_to_coordinator.yaml"
    rm -f "$PROJECT_DIR/queue/coordinator_to_orchestrator.yaml"
    rm -f "$PROJECT_DIR/queue/tasks/"*.yaml
    rm -f "$PROJECT_DIR/queue/reports/"*.yaml
    echo -e "${GREEN}✓ Queue cleaned${NC}"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}  System Stopped${NC}"
echo "=========================================="
echo ""
echo "To restart: ./scripts/start.sh"
echo ""

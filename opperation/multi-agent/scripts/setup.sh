#!/bin/bash

# Multi-Agent System - Setup Script
# Run this once to initialize the system

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=========================================="
echo "  Multi-Agent System - Setup"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "Checking prerequisites..."

# Check tmux
if ! command -v tmux &> /dev/null; then
    echo -e "${RED}❌ tmux not found${NC}"
    echo "   Install with: brew install tmux"
    exit 1
fi
echo -e "${GREEN}✓ tmux installed${NC}"

# Check Claude CLI
if ! command -v claude &> /dev/null; then
    echo -e "${RED}❌ Claude CLI not found${NC}"
    echo "   Install from: https://claude.ai/download"
    exit 1
fi
echo -e "${GREEN}✓ Claude CLI installed${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found${NC}"
    echo "   Install with: brew install node"
    exit 1
fi
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo -e "${YELLOW}⚠ Node.js version is $NODE_VERSION. Recommended: 20+${NC}"
else
    echo -e "${GREEN}✓ Node.js $NODE_VERSION installed${NC}"
fi

echo ""
echo "Creating directory structure..."

# Create directories
mkdir -p "$PROJECT_DIR/queue/tasks"
mkdir -p "$PROJECT_DIR/queue/reports"
mkdir -p "$PROJECT_DIR/skills/builtin"
mkdir -p "$PROJECT_DIR/skills/auto-generated"
mkdir -p "$PROJECT_DIR/memory"
mkdir -p "$PROJECT_DIR/logs"

# Create .gitkeep files
touch "$PROJECT_DIR/queue/tasks/.gitkeep"
touch "$PROJECT_DIR/queue/reports/.gitkeep"
touch "$PROJECT_DIR/skills/auto-generated/.gitkeep"
touch "$PROJECT_DIR/memory/.gitkeep"
touch "$PROJECT_DIR/logs/.gitkeep"

echo -e "${GREEN}✓ Directories created${NC}"

# Initialize dashboard
echo ""
echo "Initializing dashboard..."

cat > "$PROJECT_DIR/dashboard.md" << 'EOF'
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

- **Started**: Not started
- **Uptime**: -
- **Tasks Completed**: 0
- **Skills Generated**: 0

## Last Updated: Never
EOF

echo -e "${GREEN}✓ Dashboard initialized${NC}"

# Create builtin skill example
echo ""
echo "Creating builtin skill example..."

cat > "$PROJECT_DIR/skills/builtin/code-review.yaml" << 'EOF'
# Code Review Skill
# Builtin skill for comprehensive code review

skill_id: code-review
name: Code Review
description: Comprehensive code review with security and quality checks
version: 1.0.0

trigger: "コードレビュー|code review|review code"

steps:
  - action: analyze
    target: changed_files
    checks:
      - security:
          - hardcoded_secrets
          - sql_injection
          - xss
          - input_validation
      - code_quality:
          - function_length
          - file_length
          - nesting_depth
          - console_logs
      - best_practices:
          - naming_conventions
          - error_handling
          - type_safety

  - action: report
    format: markdown
    sections:
      - critical_issues:
          title: "🔴 Critical Issues"
          description: "Must fix before merge"
      - high_priority:
          title: "🟠 High Priority"
          description: "Should fix"
      - suggestions:
          title: "💡 Suggestions"
          description: "Nice to have"

success_criteria:
  - all_files_reviewed: true
  - report_generated: true
  - no_critical_issues: recommended

metadata:
  author: system
  created_at: 2026-01-27
  category: quality
EOF

echo -e "${GREEN}✓ Builtin skill created${NC}"

# Setup Web Dashboard
echo ""
echo "Setting up Web Dashboard..."

if [ ! -d "$PROJECT_DIR/dashboard" ]; then
    mkdir -p "$PROJECT_DIR/dashboard"
fi

# Check if package.json exists
if [ ! -f "$PROJECT_DIR/dashboard/package.json" ]; then
    echo "Creating dashboard package.json..."
    cat > "$PROJECT_DIR/dashboard/package.json" << 'EOF'
{
  "name": "multi-agent-dashboard",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "typescript": "^5.0.0"
  }
}
EOF
    echo -e "${GREEN}✓ package.json created${NC}"

    echo ""
    echo -e "${YELLOW}Note: Run 'npm install' in dashboard/ to install dependencies${NC}"
else
    echo -e "${GREEN}✓ package.json already exists${NC}"
fi

# Make scripts executable
echo ""
echo "Making scripts executable..."
chmod +x "$SCRIPT_DIR/setup.sh"
chmod +x "$SCRIPT_DIR/start.sh"
chmod +x "$SCRIPT_DIR/stop.sh"
echo -e "${GREEN}✓ Scripts are executable${NC}"

echo ""
echo "=========================================="
echo -e "${GREEN}  Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. cd $PROJECT_DIR/dashboard && npm install"
echo "  2. ./scripts/start.sh"
echo ""
echo "To start the system:"
echo "  ./scripts/start.sh"
echo ""
echo "To stop the system:"
echo "  ./scripts/stop.sh"
echo ""

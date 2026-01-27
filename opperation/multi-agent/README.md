# Multi-Agent System

A YAML-based, extensible multi-agent system for parallel task execution using Claude Code.

## Features

- **Hierarchical Architecture**: Orchestrator → Coordinator → SubAgent (×8)
- **YAML-Based Configuration**: All settings, communications, and skill definitions in YAML
- **Skills Auto-Generation**: Automatically generates reusable skills from successful task patterns
- **Real-Time Dashboard**: Both Markdown and Web UI dashboards
- **Parallel Execution**: Up to 8 SubAgents running in parallel

## Prerequisites

- macOS
- [tmux](https://github.com/tmux/tmux) (`brew install tmux`)
- [Claude Code CLI](https://claude.ai/download)
- Node.js 20+ (`brew install node`)

## Quick Start

```bash
# 1. Run setup
./scripts/setup.sh

# 2. Install dashboard dependencies
cd dashboard && npm install && cd ..

# 3. Start the system
./scripts/start.sh
```

## Architecture

```
User
  │
  ▼
┌─────────────────────────────────┐
│  Orchestrator                   │
│  - Receives tasks from user     │
│  - Delegates to Coordinator     │
│  - Monitors system health       │
└─────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────┐
│  Coordinator                    │
│  - Decomposes tasks (max 8)     │
│  - Manages SubAgents            │
│  - Generates skills             │
└─────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────┐
│  SubAgent × 8                   │
│  - Executes assigned task ONLY  │
│  - Reports completion           │
│  - Records patterns             │
└─────────────────────────────────┘
```

## Project Structure

```
multi-agent/
├── config/                 # YAML configurations
│   ├── agents.yaml        # Agent definitions
│   ├── skills.yaml        # Skill definitions
│   ├── workflows.yaml     # Workflow definitions
│   └── settings.yaml      # Global settings
├── instructions/           # Agent system prompts
├── queue/                  # YAML-based communication
│   ├── tasks/             # Coordinator → SubAgent
│   └── reports/           # SubAgent → Coordinator
├── skills/
│   ├── builtin/           # Built-in skills
│   └── auto-generated/    # Auto-generated skills
├── scripts/
│   ├── setup.sh           # Initial setup
│   ├── start.sh           # Start system
│   └── stop.sh            # Stop system
└── dashboard/              # Web UI dashboard (Next.js)
```

## Usage

### Starting the System

```bash
./scripts/start.sh
```

This creates a tmux session with:
- Window 0: Orchestrator
- Window 1: Coordinator
- Window 2: SubAgents (8 panes)
- Window 3: Dashboard
- Window 4: Logs

### tmux Navigation

- `Ctrl+B, 0-4`: Switch windows
- `Ctrl+B, D`: Detach from session
- `tmux attach -t multi-agent`: Reattach

### Stopping the System

```bash
./scripts/stop.sh
```

## Dashboard

### Markdown Dashboard

```bash
cat dashboard.md
```

### Web UI Dashboard

```bash
cd dashboard
npm run dev
# Open http://localhost:3001
```

## Communication Protocol

### Task Assignment (Coordinator → SubAgent)

```yaml
# queue/tasks/task_001_subagent_1.yaml
task_id: task_001
subtask_id: subtask_001
subagent_id: 1
command: create_component
target: Button.tsx
details:
  description: Create a reusable Button component
  requirements:
    - variant: primary, secondary, danger
    - size: sm, md, lg
priority: high
```

### Completion Report (SubAgent → Coordinator)

```yaml
# queue/reports/task_001_subagent_1_report.yaml
task_id: task_001
subtask_id: subtask_001
subagent_id: 1
status: completed
result:
  summary: Button component created
  files_created:
    - src/components/ui/Button.tsx
duration: 120
pattern:
  trigger: "Button component creation"
  steps:
    - Create component file
    - Define Props interface
    - Implement variants
```

## Skills Auto-Generation

When a pattern is successfully completed 3+ times with 80%+ success rate, it's automatically saved as a skill:

```yaml
# skills/auto-generated/auto-button-creation.yaml
skill_id: auto-button-creation
name: Button Component Creation
pattern:
  trigger: "Button component|ボタンコンポーネント"
  steps:
    - Create component file at src/components/ui/{Name}.tsx
    - Define Props interface
    - Implement variants
success_rate: 0.95
usage_count: 3
```

## Workflows

### Feature Implementation

```yaml
trigger: "機能実装|implement feature"
phases:
  - Planning (Orchestrator)
  - Task Decomposition (Coordinator)
  - Parallel Execution (SubAgents)
  - Integration (Coordinator)
  - Review (Orchestrator)
```

### Bug Fix

```yaml
trigger: "バグ修正|fix bug"
phases:
  - Investigation (Orchestrator)
  - Fix Implementation (Coordinator)
  - Parallel Fix (SubAgents)
  - Verification (Coordinator)
```

## Configuration

### agents.yaml

Define agent roles, models, and tools.

### settings.yaml

Configure dashboard, logging, skills auto-generation, and memory.

### workflows.yaml

Define multi-step workflows with phase assignments.

## References

- Original: https://github.com/yohey-w/multi-agent-shogun
- Article: https://zenn.dev/shio_shoppaize/articles/5fee11d03a11a1

## License

MIT

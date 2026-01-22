/**
 * Agent SDK Types
 */

// Task types
export type TaskType = 'proposal' | 'research' | 'analysis';

// Generation request
export interface GenerateRequest {
  projectId: string;
  taskType: TaskType;
  section?: string;
  context?: Record<string, unknown>;
}

// Generation result
export interface GenerateResult {
  success: boolean;
  content: string;
  metadata: {
    projectId: string;
    taskType: TaskType;
    section?: string;
    tokensUsed?: number;
    duration?: number;
  };
  error?: string;
}

// Agent message types (from SDK)
export interface AgentMessage {
  type: 'assistant' | 'result' | 'system' | 'tool';
  content?: unknown;
  result?: string;
  subtype?: string;
}

// Project data structure
export interface ProjectData {
  files: Record<string, string>;
  summary?: string;
}

// CLI options
export interface CLIOptions {
  project: string;
  task: TaskType;
  section?: string;
  verbose?: boolean;
}

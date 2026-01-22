/**
 * Proposal Agent
 *
 * Generates proposal sections using Claude Agent SDK
 */

import { query } from '@anthropic-ai/claude-agent-sdk';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { config, getProject, getProjectDataPath } from '../config.js';
import type { GenerateRequest, GenerateResult } from '../types.js';

/**
 * Load system prompt from prompts directory
 */
async function loadSystemPrompt(promptName: string): Promise<string> {
  const promptPath = join(config.promptsDir, `${promptName}.md`);
  return readFile(promptPath, 'utf-8');
}

/**
 * Generate proposal content using Claude Agent SDK
 */
export async function generateProposal(request: GenerateRequest): Promise<GenerateResult> {
  const startTime = Date.now();
  const project = getProject(request.projectId);

  if (!project) {
    return {
      success: false,
      content: '',
      metadata: {
        projectId: request.projectId,
        taskType: request.taskType,
        section: request.section,
      },
      error: `Project not found: ${request.projectId}`,
    };
  }

  try {
    // Load system prompt
    const systemPrompt = await loadSystemPrompt('proposal');

    // Build user prompt
    const dataPath = getProjectDataPath(request.projectId);
    const userPrompt = buildUserPrompt(project, request, dataPath);

    // Collect results
    const results: string[] = [];
    let tokensUsed = 0;

    // Run agent
    for await (const message of query({
      prompt: userPrompt,
      options: {
        allowedTools: ['Read', 'Glob', 'Grep'],
        systemPrompt,
        permissionMode: 'bypassPermissions',
        cwd: config.workingDir,
      },
    })) {
      // Handle different message types
      if (message.type === 'assistant' && message.message?.content) {
        for (const block of message.message.content) {
          if ('text' in block && typeof block.text === 'string') {
            results.push(block.text);
          }
        }
      } else if (message.type === 'result' && message.subtype === 'success') {
        // Type narrowing: SDKResultSuccess has 'result' property
        const successMessage = message as { result: string };
        results.push(successMessage.result);
      }

      // Track token usage if available
      if ('usage' in message && message.usage) {
        const usage = message.usage as { output_tokens?: number };
        tokensUsed += usage.output_tokens ?? 0;
      }
    }

    const duration = Date.now() - startTime;

    return {
      success: true,
      content: results.join('\n'),
      metadata: {
        projectId: request.projectId,
        taskType: request.taskType,
        section: request.section,
        tokensUsed,
        duration,
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      content: '',
      metadata: {
        projectId: request.projectId,
        taskType: request.taskType,
        section: request.section,
        duration: Date.now() - startTime,
      },
      error: errorMessage,
    };
  }
}

/**
 * Build user prompt for proposal generation
 */
function buildUserPrompt(
  project: { id: string; name: string; description: string },
  request: GenerateRequest,
  dataPath: string
): string {
  const contextStr = request.context
    ? `\n\nコンテキスト情報:\n${JSON.stringify(request.context, null, 2)}`
    : '';

  const sectionStr = request.section
    ? `\n\nセクション: ${request.section}`
    : '';

  return `
# タスク: 提案書生成

## プロジェクト情報
- ID: ${project.id}
- 名前: ${project.name}
- 説明: ${project.description}
- データパス: ${dataPath}
${sectionStr}${contextStr}

## 指示

1. まず、プロジェクトのデータディレクトリ（${dataPath}）を確認してください
2. 関連するデータファイル（*.ts）を読み込んでください
3. データを分析し、${request.section ? `「${request.section}」セクションの` : ''}提案書コンテンツを生成してください

## 出力形式

Markdown形式で出力してください。数値は具体的に、根拠を明確にしてください。
`.trim();
}

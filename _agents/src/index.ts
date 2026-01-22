#!/usr/bin/env node
/**
 * AP Agents - Claude Agent SDK based proposal generator
 *
 * Usage:
 *   npx tsx src/index.ts --project dr.melaxin --task proposal
 *   npx tsx src/index.ts --project the-room-fx --task proposal --section executive-summary
 *   npx tsx src/index.ts --list-projects
 */

// Load environment variables from .env file
import 'dotenv/config';

import { parseArgs } from 'node:util';
import { generateProposal } from './agents/proposal-agent.js';
import { listProjects, loadProjectData, projectExists } from './utils/data-loader.js';
import { config } from './config.js';
import type { TaskType, CLIOptions } from './types.js';

async function main() {
  const { values, positionals } = parseArgs({
    options: {
      project: { type: 'string', short: 'p' },
      task: { type: 'string', short: 't', default: 'proposal' },
      section: { type: 'string', short: 's' },
      verbose: { type: 'boolean', short: 'v', default: false },
      'list-projects': { type: 'boolean' },
      'show-data': { type: 'boolean' },
      help: { type: 'boolean', short: 'h' },
    },
    allowPositionals: true,
  });

  // Show help
  if (values.help) {
    printHelp();
    process.exit(0);
  }

  // List projects
  if (values['list-projects']) {
    console.log('\n Available Projects:\n');
    for (const project of listProjects()) {
      console.log(`  - ${project.id}`);
      console.log(`    ${project.name}`);
      console.log(`    ${project.description}\n`);
    }
    process.exit(0);
  }

  // Validate project
  const projectId = values.project ?? config.defaultProjectId;
  const exists = await projectExists(projectId);
  if (!exists) {
    console.error(`Error: Project "${projectId}" not found or has no data directory.`);
    console.error('Use --list-projects to see available projects.');
    process.exit(1);
  }

  // Show project data
  if (values['show-data']) {
    console.log(`\n Loading data for project: ${projectId}\n`);
    const data = await loadProjectData(projectId);
    console.log(data.summary);
    console.log('\n--- File Contents ---\n');
    for (const [file, content] of Object.entries(data.files)) {
      console.log(`\n=== ${file} ===\n`);
      console.log(content.slice(0, 500) + (content.length > 500 ? '\n...(truncated)' : ''));
    }
    process.exit(0);
  }

  // Validate task type
  const taskType = values.task as TaskType;
  if (!['proposal', 'research', 'analysis'].includes(taskType)) {
    console.error(`Error: Invalid task type "${taskType}". Must be: proposal, research, or analysis`);
    process.exit(1);
  }

  // Run agent
  console.log(`\n Starting ${taskType} generation for project: ${projectId}`);
  if (values.section) {
    console.log(` Section: ${values.section}`);
  }
  console.log(' Working directory:', config.workingDir);
  console.log('\n' + '='.repeat(60) + '\n');

  const result = await generateProposal({
    projectId,
    taskType,
    section: values.section,
    context: positionals.length > 0 ? { additionalContext: positionals.join(' ') } : undefined,
  });

  if (result.success) {
    console.log(result.content);
    console.log('\n' + '='.repeat(60));
    console.log(` Completed in ${result.metadata.duration}ms`);
    if (result.metadata.tokensUsed) {
      console.log(` Tokens used: ${result.metadata.tokensUsed}`);
    }
  } else {
    console.error('\n Error:', result.error);
    process.exit(1);
  }
}

function printHelp() {
  console.log(`
AP Agents - Claude Agent SDK based proposal generator

USAGE:
  npx tsx src/index.ts [OPTIONS]

OPTIONS:
  -p, --project <id>     Project ID (default: ${config.defaultProjectId})
  -t, --task <type>      Task type: proposal, research, analysis (default: proposal)
  -s, --section <name>   Specific section to generate
  -v, --verbose          Enable verbose output
      --list-projects    List all available projects
      --show-data        Show project data files
  -h, --help             Show this help message

EXAMPLES:
  # Generate full proposal for dr.melaxin
  npx tsx src/index.ts --project dr.melaxin --task proposal

  # Generate specific section
  npx tsx src/index.ts --project the-room-fx --section executive-summary

  # List available projects
  npx tsx src/index.ts --list-projects

  # Show project data
  npx tsx src/index.ts --project dr.melaxin --show-data
`);
}

// Run main
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

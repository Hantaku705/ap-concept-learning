import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface ProjectConfig {
  id: string;
  name: string;
  dataPath: string;
  description: string;
}

export const config = {
  // API Key (optional if Claude Code is authenticated)
  anthropicApiKey: process.env['ANTHROPIC_API_KEY'],

  // Working directory (parent of _agents)
  workingDir: process.env['WORKING_DIR'] ?? join(__dirname, '../..'),

  // Default project
  defaultProjectId: process.env['DEFAULT_PROJECT_ID'] ?? 'dr.melaxin',

  // Available projects
  projects: [
    {
      id: 'dr.melaxin',
      name: 'Dr.Melaxin マーケティング提案',
      dataPath: 'dr.melaxin/webapp/src/data',
      description: 'BRAND501 Corp.のスキンケアブランド「Dr.Melaxin」の日本市場マーケティング提案',
    },
    {
      id: 'the-room-fx',
      name: 'ANA THE Room FX',
      dataPath: 'The Room FX/webapp/src/data',
      description: 'ANA新ビジネスクラス「THE Room FX」のグローバル広告配信プロジェクト',
    },
    {
      id: 'concept-learning',
      name: 'コンセプト学習',
      dataPath: 'concept-learning/webapp/src/data',
      description: 'マーケティングコンセプト学習のWebアプリと資料',
    },
    {
      id: 'phonefarm',
      name: 'Phone Farm',
      dataPath: 'phonefarm/webapp/src/data',
      description: 'TikTok等のPhone Farm不正業者の脅威インテリジェンスレポート',
    },
  ] satisfies ProjectConfig[],

  // Prompts directory
  promptsDir: join(__dirname, '../prompts'),
} as const;

export function getProject(projectId: string): ProjectConfig | undefined {
  return config.projects.find((p) => p.id === projectId);
}

export function getProjectDataPath(projectId: string): string {
  const project = getProject(projectId);
  if (!project) {
    throw new Error(`Project not found: ${projectId}`);
  }
  return join(config.workingDir, project.dataPath);
}

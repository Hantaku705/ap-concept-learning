/**
 * Data Loader Utility
 *
 * Loads project data from existing webapp directories
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { config, getProject, getProjectDataPath } from '../config.js';
import type { ProjectData } from '../types.js';

/**
 * List all available projects
 */
export function listProjects() {
  return config.projects.map(({ id, name, description }) => ({
    id,
    name,
    description,
  }));
}

/**
 * Load all data files from a project
 */
export async function loadProjectData(projectId: string): Promise<ProjectData> {
  const project = getProject(projectId);
  if (!project) {
    throw new Error(`Project not found: ${projectId}`);
  }

  const dataPath = getProjectDataPath(projectId);
  const files: Record<string, string> = {};

  try {
    const entries = await readdir(dataPath);

    for (const entry of entries) {
      const ext = extname(entry);
      // Only load TypeScript/JavaScript data files
      if (ext === '.ts' || ext === '.tsx' || ext === '.js') {
        const filePath = join(dataPath, entry);
        const fileStat = await stat(filePath);

        if (fileStat.isFile()) {
          const content = await readFile(filePath, 'utf-8');
          files[entry] = content;
        }
      }
    }

    // Generate summary
    const summary = generateSummary(project, files);

    return { files, summary };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(`Data directory not found: ${dataPath}`);
    }
    throw error;
  }
}

/**
 * Load a specific data file from a project
 */
export async function loadProjectFile(
  projectId: string,
  fileName: string
): Promise<string> {
  const dataPath = getProjectDataPath(projectId);
  const filePath = join(dataPath, fileName);

  try {
    return await readFile(filePath, 'utf-8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    }
    throw error;
  }
}

/**
 * Generate a summary of project data
 */
function generateSummary(
  project: { id: string; name: string; description: string },
  files: Record<string, string>
): string {
  const fileList = Object.keys(files);
  const totalLines = Object.values(files).reduce(
    (sum, content) => sum + content.split('\n').length,
    0
  );

  return `
## プロジェクト: ${project.name}

${project.description}

### データファイル (${fileList.length}件, 合計${totalLines}行)
${fileList.map((f) => `- ${f}`).join('\n')}
`.trim();
}

/**
 * Check if a project exists and has data
 */
export async function projectExists(projectId: string): Promise<boolean> {
  try {
    const dataPath = getProjectDataPath(projectId);
    const stats = await stat(dataPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

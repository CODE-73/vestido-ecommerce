import { promises as fs } from 'fs';
import * as path from 'path';

import { checksum } from './checksum';
import { sortByDependencies } from './depends-on';
import { executeInBatches } from './promise';
import { SeedFile } from './types';

export const getSeedFiles = async () => {
  const files = await getAllTSFiles(path.join(__dirname, '..', 'seeds'));
  const seedFiles = await filterSeedFiles(files);

  validateSeedNames(seedFiles);
  const sortedSeedFiles = sortByDependencies(seedFiles);

  return await executeInBatches<SeedFile>(
    sortedSeedFiles.map((seedFile) => async () => ({
      ...seedFile,
      checksum: await checksum(seedFile.path),
    })),
    10,
  );
};

const getAllTSFiles = async (dirPath: string) => {
  const files = await fs.readdir(dirPath);

  let allFiles: string[] = [];

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      allFiles = allFiles.concat(await getAllTSFiles(filePath));
    } else if (path.extname(filePath) === '.ts') {
      allFiles.push(filePath);
    }
  }

  return allFiles;
};

const filterSeedFiles = async (files: string[]) => {
  const promises = files.map(async (file) => {
    const contents = await fs.readFile(file, 'utf-8');
    if (!contents.includes('export const __SEED__ = async')) {
      return false;
    }

    // alphabets, numbers, underscore, quotes, double-quotes comma, forward-slashes (comments)
    const m = contents.match(/__DEPENDS_ON__ = (\[[a-zA-Z0-9_\s'",/]*\]);/);
    let dependsOn: string[] = [];
    if (m && m[1]) {
      try {
        dependsOn = eval(m[1]);
      } catch (e) {
        throw new Error(`__DEPENDS_ON__ in ${file} is not a valid JSON array`);
      }
    }

    return {
      seedName: path.basename(file, '.ts'),
      path: file,
      dependsOn,
    };
  });

  const results = await Promise.all(promises);

  return results.filter((x) => x) as SeedFile[];
};

const validateSeedNames = (files: SeedFile[]) => {
  const seedNameMap: Record<string, SeedFile> = {};
  for (const seed of files) {
    if (seedNameMap[seed.seedName]) {
      throw new Error(
        `Cannot have two seed files with the same name: ${seed.seedName}\n-`,
      );
    }
    seedNameMap[seed.seedName] = seed;
  }
};

import { SeedFile } from './types';

export function sortByDependencies(seeds: SeedFile[]) {
  validateDependsOnExists(seeds);
  validateIfCyclic(seeds);
  return topologicalSort(seeds);
}

function topologicalSort(seeds: SeedFile[]): SeedFile[] {
  const seedNameMap: Record<string, SeedFile> = {};
  for (const seed of seeds) {
    seedNameMap[seed.seedName] = seed;
  }

  const visited: Record<string, boolean> = {};
  const stack: SeedFile[] = [];

  function visit(seedName: string) {
    if (visited[seedName]) {
      return;
    }

    visited[seedName] = true;
    for (const dep of seedNameMap[seedName].dependsOn) {
      visit(dep);
    }
    stack.push(seedNameMap[seedName]);
  }

  for (const seed of seeds) {
    visit(seed.seedName);
  }

  return stack;
}

function validateIfCyclic(seeds: SeedFile[]) {
  const seedNameMap: Record<string, SeedFile> = {};
  for (const seed of seeds) {
    seedNameMap[seed.seedName] = seed;
  }

  const visited: Record<string, boolean> = {};
  const recStack: Record<string, boolean> = {};

  for (const seed of seeds) {
    if (isCyclic(seed.seedName, seedNameMap, visited, recStack)) {
      throw new Error(
        `Cyclic dependency detected for seed ${seed.seedName}. Check __DEPENDS_ON__`,
      );
    }
  }
}

function isCyclic(
  seedName: string,
  seedNameMap: Record<string, SeedFile>,
  visited: Record<string, boolean>,
  recStack: Record<string, boolean>,
) {
  if (!visited[seedName]) {
    visited[seedName] = true;
    recStack[seedName] = true;

    for (const seed of seedNameMap[seedName].dependsOn) {
      if (!visited[seed] && isCyclic(seed, seedNameMap, visited, recStack)) {
        return true;
      } else if (recStack[seed]) {
        return true;
      }
    }
  }

  recStack[seedName] = false;
  return false;
}

function validateDependsOnExists(seeds: SeedFile[]) {
  const seedNameMap: Record<string, SeedFile> = {};
  for (const seed of seeds) {
    seedNameMap[seed.seedName] = seed;
  }

  for (const seed of seeds) {
    for (const dep of seed.dependsOn) {
      if (!seedNameMap[dep]) {
        throw new Error(
          `\n\n\t❌ Seed ${seed.seedName} depends on ${dep} but ${dep} does not exist\n`,
        );
      }
    }
  }
}

export function addDownStreamSeeds(
  toUpdate: SeedFile[],
  allSeeds: SeedFile[],
): SeedFile[] {
  for (const seed of toUpdate) {
    _addDownStreamSeeds(seed, allSeeds, toUpdate);
  }
  return toUpdate;
}

function _addDownStreamSeeds(
  seed: SeedFile,
  allSeeds: SeedFile[],
  stack: SeedFile[],
) {
  for (const s of allSeeds) {
    if (s.dependsOn.includes(seed.seedName) && !stack.includes(s)) {
      stack.push(s);
      _addDownStreamSeeds(s, allSeeds, stack);
    }
  }
}

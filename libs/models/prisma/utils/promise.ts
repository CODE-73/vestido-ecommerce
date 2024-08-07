export async function executeInBatches<T>(
  promises: Array<() => Promise<T>>,
  batchSize: number,
) {
  const results = [] as T[];
  let currentIndex = 0;

  while (currentIndex < promises.length) {
    const batch = promises.slice(currentIndex, currentIndex + batchSize);
    const batchResults = await Promise.all(batch.map((promise) => promise()));
    results.push(...batchResults);
    currentIndex += batchSize;
  }

  return results;
}

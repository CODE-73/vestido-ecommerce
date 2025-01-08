export function safeParseJSON<T>(json: string): T | null {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    return null;
  }
}

export function ensureSerializable<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function adjustDateRange(from: Date, to: Date) {
  const start = new Date(from);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(to);
  end.setUTCHours(23, 59, 59, 999);
  return { fromDate: start, toDate: end };
}

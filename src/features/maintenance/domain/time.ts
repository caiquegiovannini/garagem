export function isDateInFuture(date: Date, now: Date) {
  return date > now;
}

export function getMostRecent<T extends { date: Date }>(
  items: T[],
): T | undefined {
  if (!items.length) return undefined;

  const mostRecentItem = items.reduce((mostRecent, item) => {
    if (item.date > mostRecent.date) return item;
    return mostRecent;
  });

  return mostRecentItem;
}

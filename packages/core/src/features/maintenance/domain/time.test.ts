import { describe, expect, it } from 'vitest';
import { getMostRecent, isDateInFuture } from './time';

describe('isDateInFuture', () => {
  it('should return false when date is just before', () => {
    const now = new Date('2026-03-10T12:00:00Z');
    const justBefore = new Date('2026-03-10T11:59:59.999Z');

    const result = isDateInFuture(justBefore, now);

    expect(result).toBe(false);
  });
  it('should return false when date is now', () => {
    const now = new Date('2026-03-10T12:00:00Z');
    const sameInstant = new Date('2026-03-10T12:00:00Z');

    const result = isDateInFuture(sameInstant, now);

    expect(result).toBe(false);
  });
  it('should return true when date is just after', () => {
    const now = new Date('2026-03-10T12:00:00Z');
    const justAfter = new Date('2026-03-10T12:00:00.001Z');

    const result = isDateInFuture(justAfter, now);

    expect(result).toBe(true);
  });
});

describe('getMostRecent', () => {
  it('should return undefined when there are no items', () => {
    const mostRecent = getMostRecent([]);
    expect(mostRecent).toBeUndefined();
  });
  it('should return the item when there is one item', () => {
    const march10 = { date: new Date('2026-03-10T12:00:00Z'), name: 'John' };
    const mostRecent = getMostRecent([march10]);
    expect(mostRecent).toBe(march10);
  });
  it('should return the most recent item when items are out of order', () => {
    const march10 = { date: new Date('2026-03-10T12:00:00Z'), name: 'John' };
    const march20 = { date: new Date('2026-03-20T12:00:00Z'), color: 'red' };
    const march30 = { date: new Date('2026-03-30T12:00:00Z'), age: 30 };
    const mostRecent = getMostRecent([march20, march30, march10]);
    expect(mostRecent).toBe(march30);
  });
});

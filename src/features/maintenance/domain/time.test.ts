import { describe, expect, it } from 'vitest';
import { isDateInFuture } from './time';

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

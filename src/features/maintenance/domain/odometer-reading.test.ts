import { describe, expect, it } from 'vitest';
import { isKmConsistent } from './odometer-reading';

describe('isKmConsistent', () => {
  it('should return true when there are no existing readings', () => {
    const readingDate = new Date('2026-03-10T12:00:00Z');

    const result = isKmConsistent({ date: readingDate, km: 5000 }, []);

    expect(result).toBe(true);
  });
  it('should return true when reading is after the latest with greater km', () => {
    const march10 = { date: new Date('2026-03-10T12:00:00Z'), km: 4000 };
    const march20 = { date: new Date('2026-03-20T12:00:00Z'), km: 5000 };

    const result = isKmConsistent(march20, [march10]);

    expect(result).toBe(true);
  });
  it('should return true when reading is after the latest with equal km', () => {
    const march10 = { date: new Date('2026-03-10T12:00:00Z'), km: 4000 };
    const march20 = { date: new Date('2026-03-20T12:00:00Z'), km: 4000 };

    const result = isKmConsistent(march20, [march10]);

    expect(result).toBe(true);
  });
  it('should return false when reading is after the latest with lower km', () => {
    const march10 = { date: new Date('2026-03-10T12:00:00Z'), km: 4000 };
    const march20 = { date: new Date('2026-03-20T12:00:00Z'), km: 3000 };

    const result = isKmConsistent(march20, [march10]);

    expect(result).toBe(false);
  });
  it('should return true when backdated reading has km between its neighbors', () => {
    const march10 = { date: new Date('2026-03-10T12:00:00Z'), km: 3000 };
    const march20 = { date: new Date('2026-03-20T12:00:00Z'), km: 4000 };
    const march30 = { date: new Date('2026-03-30T12:00:00Z'), km: 5000 };

    const result = isKmConsistent(march20, [march10, march30]);

    expect(result).toBe(true);
  });
  it('should return false when backdated reading has km greater than a later reading', () => {
    const march10 = { date: new Date('2026-03-10T12:00:00Z'), km: 3000 };
    const march20 = { date: new Date('2026-03-20T12:00:00Z'), km: 6000 };
    const march30 = { date: new Date('2026-03-30T12:00:00Z'), km: 5000 };

    const result = isKmConsistent(march20, [march10, march30]);

    expect(result).toBe(false);
  });
  it('should return true when reading has the same instant and same km as an existing one', () => {
    const march10 = { date: new Date('2026-03-10T12:00:00Z'), km: 3000 };
    const march10Again = { date: new Date('2026-03-10T12:00:00Z'), km: 3000 };

    const result = isKmConsistent(march10Again, [march10]);

    expect(result).toBe(true);
  });
  it('should return false when reading has the same instant and different km as an existing one', () => {
    const march10 = { date: new Date('2026-03-10T12:00:00Z'), km: 3000 };
    const march10Again = { date: new Date('2026-03-10T12:00:00Z'), km: 4000 };

    const result = isKmConsistent(march10Again, [march10]);

    expect(result).toBe(false);
  });
  it('should return true when backdated reading has the same km as a later reading', () => {
    const march10 = { date: new Date('2026-03-10T12:00:00Z'), km: 4000 };
    const march20 = { date: new Date('2026-03-20T12:00:00Z'), km: 4000 };

    const result = isKmConsistent(march10, [march20]);

    expect(result).toBe(true);
  });
});

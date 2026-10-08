import { describe, expect, it } from 'vitest';
import type { MaintenanceItemInterval } from './maintenance-item';
import { isItemDue, type InspectionPoint } from './due';

describe('isItemDue', () => {
  const daysOnlyInterval: MaintenanceItemInterval = {
    days: 30,
  };
  const daysAndKmInterval: MaintenanceItemInterval = {
    days: 60,
    km: 5000,
  };
  const march01Inspection: InspectionPoint = {
    date: new Date('2026-03-01T12:00:00Z'),
    km: 45000,
  };

  it('should return true when the item is due by km', () => {
    const april01 = new Date('2026-04-01T12:00:00Z');
    const currentKm = 51000;

    const result = isItemDue(
      daysAndKmInterval,
      march01Inspection,
      april01,
      currentKm,
    );

    expect(result).toBe(true);
  });
  it('should return true when the item is due by date', () => {
    const june13 = new Date('2026-06-13T12:00:00Z');
    const currentKm = 46000;

    const result = isItemDue(
      daysAndKmInterval,
      march01Inspection,
      june13,
      currentKm,
    );

    expect(result).toBe(true);
  });
  it('should return true when the km reaches the interval exactly', () => {
    const april01 = new Date('2026-04-01T12:00:00Z');
    const currentKm = 50000;

    const result = isItemDue(
      daysAndKmInterval,
      march01Inspection,
      april01,
      currentKm,
    );

    expect(result).toBe(true);
  });
  it('should return true when the date reaches the interval exactly', () => {
    const april30 = new Date('2026-04-30T12:00:00Z');
    const currentKm = 46000;

    const result = isItemDue(
      daysAndKmInterval,
      march01Inspection,
      april30,
      currentKm,
    );

    expect(result).toBe(true);
  });
  it('should ignore the km axis when the item has only a days interval', () => {
    const march15 = new Date('2026-03-15T12:00:00Z');
    const currentKm = 60000;

    const result = isItemDue(
      daysOnlyInterval,
      march01Inspection,
      march15,
      currentKm,
    );

    expect(result).toBe(false);
  });
  it('should return false when the item is not due by date or km', () => {
    const march15 = new Date('2026-03-15T12:00:00Z');
    const currentKm = 46000;

    const result = isItemDue(
      daysAndKmInterval,
      march01Inspection,
      march15,
      currentKm,
    );

    expect(result).toBe(false);
  });
  it('should return true when the item was never inspected', () => {
    const march15 = new Date('2026-03-15T12:00:00Z');
    const currentKm = 46000;

    const result = isItemDue(daysAndKmInterval, undefined, march15, currentKm);

    expect(result).toBe(true);
  });
});

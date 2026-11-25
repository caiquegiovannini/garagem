import type { Inspection } from './inspection';
import type { MaintenanceItemInterval } from './maintenance-item';

export type InspectionPoint = Pick<Inspection, 'date' | 'km'>;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function isItemDue(
  interval: MaintenanceItemInterval,
  lastInspection: InspectionPoint | undefined,
  now: Date,
  currentKm: number | undefined,
): boolean {
  if (lastInspection === undefined) return true;

  const elapsedDays =
    (now.getTime() - lastInspection.date.getTime()) / MS_PER_DAY;
  const isDueByDays =
    interval.days !== undefined && elapsedDays >= interval.days;

  const isDueByKm =
    interval.km !== undefined &&
    currentKm !== undefined &&
    currentKm - lastInspection.km >= interval.km;

  return isDueByDays || isDueByKm;
}

import { db } from '../../../infra/db/connection';
import type { OdometerReading } from '../domain/odometer-reading';

export async function saveOdometerReading(
  reading: OdometerReading,
): Promise<void> {
  await db.odometerReading.put(reading);
}

export async function getAllOdometerReadings(): Promise<OdometerReading[]> {
  return db.odometerReading.toArray();
}

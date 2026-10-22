import { db } from '../../../../infra/db/connection';
import type { OdometerReadingRepository } from '../odometer-reading-repository';

export function createDexieOdometerReadingRepository(): OdometerReadingRepository {
  return {
    async save(reading) {
      await db.odometerReading.put(reading);
    },
    async getAll() {
      return db.odometerReading.toArray();
    },
  };
}

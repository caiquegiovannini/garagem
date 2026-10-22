import type { OdometerReading } from '../../domain/odometer-reading';
import type { OdometerReadingRepository } from '../odometer-reading-repository';

export function createInMemoryOdometerReadingRepository(): OdometerReadingRepository {
  const readings: OdometerReading[] = [];

  return {
    async save(reading) {
      readings.push(reading);
    },
    async getAll() {
      return [...readings];
    },
  };
}

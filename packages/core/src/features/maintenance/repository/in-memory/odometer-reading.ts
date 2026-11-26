import type { OdometerReading } from '../../domain/odometer-reading';
import { createOutboxEntry, type OutboxEntry } from '../../domain/outbox';
import type { OdometerReadingRepository } from '../odometer-reading-repository';

export function createInMemoryOdometerReadingRepository(
  entries: OutboxEntry[],
): OdometerReadingRepository {
  const readings: OdometerReading[] = [];

  return {
    async save(reading) {
      const outboxEntry = createOutboxEntry('odometerReading', reading);

      readings.push(reading);
      entries.push(outboxEntry);
    },
    async getAll() {
      return [...readings];
    },
  };
}

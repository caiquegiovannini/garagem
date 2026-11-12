import type { OdometerReading } from '../../domain/odometer-reading';
import { newMutationId, type OutboxEntry } from '../../domain/outbox';
import type { OdometerReadingRepository } from '../odometer-reading-repository';

export function createInMemoryOdometerReadingRepository(
  entries: OutboxEntry[],
): OdometerReadingRepository {
  const readings: OdometerReading[] = [];

  return {
    async save(reading) {
      const outboxEntry: OutboxEntry = {
        mutationId: newMutationId(),
        operation: 'create',
        entity: 'odometerReading',
        entityId: reading.id,
        payload: reading,
      };

      readings.push(reading);
      entries.push(outboxEntry);
    },
    async getAll() {
      return [...readings];
    },
  };
}

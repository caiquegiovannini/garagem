import { db } from '../../../../infra/db/connection';
import { newMutationId, type OutboxEntry } from '../../domain/outbox';
import type { OdometerReadingRepository } from '../odometer-reading-repository';

export function createDexieOdometerReadingRepository(): OdometerReadingRepository {
  return {
    async save(reading) {
      const outboxEntry: OutboxEntry = {
        mutationId: newMutationId(),
        operation: 'create',
        entity: 'odometerReading',
        entityId: reading.id,
        payload: reading,
      };

      await db.transaction('rw', [db.odometerReading, db.outbox], async () => {
        await db.odometerReading.put(reading);
        await db.outbox.put(outboxEntry);
      });
    },
    async getAll() {
      return db.odometerReading.toArray();
    },
  };
}

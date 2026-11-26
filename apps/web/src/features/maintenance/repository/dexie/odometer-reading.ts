import { db } from '../../../../infra/db/connection';
import { createOutboxEntry } from '@garagem/core';
import type { OdometerReadingRepository } from '@garagem/core';

export function createDexieOdometerReadingRepository(): OdometerReadingRepository {
  return {
    async save(reading) {
      const outboxEntry = createOutboxEntry('odometerReading', reading);

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

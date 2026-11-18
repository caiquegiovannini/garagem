import { db } from '../../../../infra/db/connection';
import { createOutboxEntry } from '../../domain/outbox';
import type { InspectionRepository } from '../inspection-repository';

export function createDexieInspectionRepository(): InspectionRepository {
  return {
    async save(inspection) {
      const outboxEntry = createOutboxEntry('inspection', inspection);

      await db.transaction('rw', [db.inspection, db.outbox], async () => {
        await db.inspection.put(inspection);
        await db.outbox.put(outboxEntry);
      });
    },
    getByItemId(maintenanceItemId) {
      return db.inspection
        .where('maintenanceItemId')
        .equals(maintenanceItemId)
        .toArray();
    },
  };
}

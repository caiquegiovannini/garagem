import type { Inspection } from '../../domain/inspection';
import { createOutboxEntry, type OutboxEntry } from '../../domain/outbox';
import type { InspectionRepository } from '../inspection-repository';

export function createInMemoryInspectionRepository(
  entries: OutboxEntry[],
): InspectionRepository {
  const inspections: Inspection[] = [];

  return {
    async save(inspection) {
      const outboxEntry = createOutboxEntry('inspection', inspection);

      inspections.push(inspection);
      entries.push(outboxEntry);
    },
    async getByItemId(maintenanceItemId) {
      return inspections.filter(
        (inspection) => inspection.maintenanceItemId === maintenanceItemId,
      );
    },
  };
}

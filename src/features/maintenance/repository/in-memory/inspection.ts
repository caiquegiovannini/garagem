import type { Inspection } from '../../domain/inspection';
import { newMutationId, type OutboxEntry } from '../../domain/outbox';
import type { InspectionRepository } from '../inspection-repository';

export function createInMemoryInspectionRepository(
  entries: OutboxEntry[],
): InspectionRepository {
  const inspections: Inspection[] = [];

  return {
    async save(inspection) {
      const outboxEntry: OutboxEntry = {
        mutationId: newMutationId(),
        operation: 'create',
        entity: 'inspection',
        entityId: inspection.id,
        payload: inspection,
      };

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

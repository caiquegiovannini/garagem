import type { Inspection } from '../../domain/inspection';
import type { InspectionRepository } from '../inspection-repository';

export function createInMemoryInspectionRepository(): InspectionRepository {
  const inspections: Inspection[] = [];

  return {
    async save(inspection) {
      inspections.push(inspection);
    },
    async getByItemId(maintenanceItemId) {
      return inspections.filter(
        (inspection) => inspection.maintenanceItemId === maintenanceItemId,
      );
    },
  };
}

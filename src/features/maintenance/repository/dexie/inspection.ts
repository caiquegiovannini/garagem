import { db } from '../../../../infra/db/connection';
import type { InspectionRepository } from '../inspection-repository';

export function createDexieInspectionRepository(): InspectionRepository {
  return {
    async save(inspection) {
      await db.inspection.put(inspection);
    },
    getByItemId(maintenanceItemId) {
      return db.inspection
        .where('maintenanceItemId')
        .equals(maintenanceItemId)
        .toArray();
    },
  };
}

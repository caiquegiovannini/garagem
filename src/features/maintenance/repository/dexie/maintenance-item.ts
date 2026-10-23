import { db } from '../../../../infra/db/connection';
import type { MaintenanceItemRepository } from '../maintenance-item-repository';

export function createDexieMaintenanceItemRepository(): MaintenanceItemRepository {
  return {
    async getAll() {
      return db.maintenanceItem.toArray();
    },
  };
}

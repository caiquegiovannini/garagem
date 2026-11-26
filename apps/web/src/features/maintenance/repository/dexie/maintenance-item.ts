import { db } from '../../../../infra/db/connection';
import type { MaintenanceItemRepository } from '@garagem/core';

export function createDexieMaintenanceItemRepository(): MaintenanceItemRepository {
  return {
    async getAll() {
      return db.maintenanceItem.toArray();
    },
  };
}

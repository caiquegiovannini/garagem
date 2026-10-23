import type { MaintenanceItem } from '../../domain/maintenance-item';
import type { MaintenanceItemRepository } from '../maintenance-item-repository';

export function createInMemoryMaintenanceItemRepository(
  initialItems: MaintenanceItem[],
): MaintenanceItemRepository {
  const items = [...initialItems];

  return {
    async getAll() {
      return [...items];
    },
  };
}

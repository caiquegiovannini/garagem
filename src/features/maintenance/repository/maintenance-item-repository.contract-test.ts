import { describe, expect, it } from 'vitest';
import {
  newMaintenanceItemId,
  type MaintenanceItem,
} from '../domain/maintenance-item';
import type { MaintenanceItemRepository } from './maintenance-item-repository';
import { newVehicleId } from '../domain/vehicle';
import { MAINTENANCE_ITEMS_SEED } from '../../../infra/db/seed';

export function testMaintenanceItemRepositoryContract(
  makeRepository: (
    initialItems: MaintenanceItem[],
  ) => Promise<MaintenanceItemRepository>,
) {
  describe('getAll', () => {
    it('should return an empty array when the store is empty', async () => {
      const repository = await makeRepository([]);
      expect(await repository.getAll()).toHaveLength(0);
    });

    it('should return all items when there are items in the store', async () => {
      const vehicleId = newVehicleId();
      const updatedAt = new Date();
      const items = MAINTENANCE_ITEMS_SEED.map((seed): MaintenanceItem => ({
        ...seed,
        id: newMaintenanceItemId(),
        vehicleId: vehicleId,
        updatedAt,
        dirty: true,
      }));
      const repository = await makeRepository(items);

      const results = await repository.getAll();

      expect(results).toHaveLength(items.length);
      expect(results).toStrictEqual(expect.arrayContaining(items));
    });
  });
}

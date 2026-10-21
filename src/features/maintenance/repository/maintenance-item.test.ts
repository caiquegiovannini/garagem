import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../../../infra/db/connection';
import { getAllMaintenanceItems } from './maintenance-item';
import { MAINTENANCE_ITEMS_SEED } from '../../../infra/db/seed';
import {
  newMaintenanceItemId,
  type MaintenanceItem,
} from '../domain/maintenance-item';
import { newVehicleId } from '../domain/vehicle';

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

describe('getAllMaintenanceItems', () => {
  it('should return an empty array when the store is empty', async () => {
    expect(await getAllMaintenanceItems()).toHaveLength(0);
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
    await db.maintenanceItem.bulkPut(items);

    const results = await getAllMaintenanceItems();

    expect(results).toHaveLength(items.length);
    expect(results).toStrictEqual(expect.arrayContaining(items));
  });
});

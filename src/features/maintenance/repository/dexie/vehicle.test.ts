import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../../../../infra/db/connection';
import { testVehicleRepositoryContract } from '../vehicle-repository.contract-test';
import { createDexieVehicleRepository } from './vehicle';
import { newVehicleId, type Vehicle } from '../../domain/vehicle';

const vehicleUpdatedAt = new Date();
const mareaTurbo: Vehicle = {
  id: newVehicleId(),
  name: 'Marea Turbo',
  dirty: true,
  updatedAt: vehicleUpdatedAt,
};

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

describe('Dexie vehicle repository', () => {
  testVehicleRepositoryContract(() => createDexieVehicleRepository());

  it('should create three maintenance items from the vehicle', async () => {
    const repository = createDexieVehicleRepository();
    await repository.create(mareaTurbo);
    const items = await db.maintenanceItem.toArray();

    expect(items).toHaveLength(3);
    for (const item of items) {
      expect(item).toMatchObject({
        vehicleId: mareaTurbo.id,
        updatedAt: vehicleUpdatedAt,
      });
    }
  });
});

import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../../../infra/db/connection';
import { createVehicle, getVehicle } from './vehicle';
import { newVehicleId, type Vehicle } from '../domain/vehicle';

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

describe('createVehicle', () => {
  it('should save the vehicle and return it', async () => {
    await createVehicle(mareaTurbo);
    const result = await getVehicle();

    expect(result).toStrictEqual(mareaTurbo);
  });

  it('should create three maintenance items from the vehicle', async () => {
    await createVehicle(mareaTurbo);
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

describe('getVehicle', () => {
  it('should return undefined when there is no vehicle', async () => {
    expect(await getVehicle()).toBeUndefined();
  });
});

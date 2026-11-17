import { describe, expect, it } from 'vitest';
import type { VehicleRepository } from './vehicle-repository';
import { newVehicleId, type Vehicle } from '../domain/vehicle';
import type { MaintenanceItemRepository } from './maintenance-item-repository';
import type { OutboxRepository } from './outbox-repository';
import { MAINTENANCE_ITEMS_SEED } from '../../../infra/db/seed';
import type { OutboxEntry } from '../domain/outbox';

const vehicleUpdatedAt = new Date();
const mareaTurbo: Vehicle = {
  id: newVehicleId(),
  name: 'Marea Turbo',
  updatedAt: vehicleUpdatedAt,
};

export function testVehicleRepositoryContract(
  makeRepositories: () => {
    vehicle: VehicleRepository;
    maintenanceItems: MaintenanceItemRepository;
    outbox: OutboxRepository;
  },
) {
  describe('create', () => {
    it('should save the vehicle and return it', async () => {
      const { vehicle } = makeRepositories();
      await vehicle.create(mareaTurbo);
      const result = await vehicle.get();

      expect(result).toStrictEqual(mareaTurbo);
    });

    it('should create the seed maintenance items with the vehicle', async () => {
      const { vehicle, maintenanceItems } = makeRepositories();

      await vehicle.create(mareaTurbo);
      const items = await maintenanceItems.getAll();

      expect(items).toHaveLength(MAINTENANCE_ITEMS_SEED.length);
      expect(items.map((item) => item.name)).toEqual(
        MAINTENANCE_ITEMS_SEED.map((seed) => seed.name),
      );
      for (const item of items) {
        expect(item).toMatchObject({
          vehicleId: mareaTurbo.id,
          updatedAt: vehicleUpdatedAt,
        });
      }
    });

    it('should add one outbox entry for the vehicle and one for each item', async () => {
      const { vehicle, maintenanceItems, outbox } = makeRepositories();
      const vehicleEntry: OutboxEntry = {
        mutationId: expect.any(String),
        operation: 'create',
        entity: 'vehicle',
        entityId: mareaTurbo.id,
        payload: mareaTurbo,
      };

      await vehicle.create(mareaTurbo);
      const items = await maintenanceItems.getAll();
      const entries = await outbox.list();

      expect(entries).toEqual([
        vehicleEntry,
        ...items.map((item) => ({
          mutationId: expect.any(String),
          operation: 'create',
          entity: 'maintenanceItem',
          entityId: item.id,
          payload: item,
        })),
      ]);
    });
  });

  describe('get', () => {
    it('should return undefined when there is no vehicle', async () => {
      const { vehicle } = makeRepositories();
      expect(await vehicle.get()).toBeUndefined();
    });
  });
}

import { describe, expect, it } from 'vitest';
import type { VehicleRepository } from './vehicle-repository';
import { newVehicleId, type Vehicle } from '../domain/vehicle';
import type { MaintenanceItemRepository } from './maintenance-item-repository';
import type { OutboxRepository } from './outbox-repository';

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
  });

  describe('get', () => {
    it('should return undefined when there is no vehicle', async () => {
      const { vehicle } = makeRepositories();
      expect(await vehicle.get()).toBeUndefined();
    });
  });
}

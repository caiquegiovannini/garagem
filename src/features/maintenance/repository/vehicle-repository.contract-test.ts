import { describe, expect, it } from 'vitest';
import type { VehicleRepository } from './vehicle-repository';
import { newVehicleId, type Vehicle } from '../domain/vehicle';

const vehicleUpdatedAt = new Date();
const mareaTurbo: Vehicle = {
  id: newVehicleId(),
  name: 'Marea Turbo',
  dirty: true,
  updatedAt: vehicleUpdatedAt,
};

export function testVehicleRepositoryContract(
  makeRepository: () => VehicleRepository,
) {
  describe('create', () => {
    it('should save the vehicle and return it', async () => {
      const repository = makeRepository();
      await repository.create(mareaTurbo);
      const result = await repository.get();

      expect(result).toStrictEqual(mareaTurbo);
    });
  });

  describe('get', () => {
    it('should return undefined when there is no vehicle', async () => {
      const repository = makeRepository();
      expect(await repository.get()).toBeUndefined();
    });
  });
}

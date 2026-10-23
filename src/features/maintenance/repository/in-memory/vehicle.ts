import type { Vehicle } from '../../domain/vehicle';
import type { VehicleRepository } from '../vehicle-repository';

export function createInMemoryVehicleRepository(): VehicleRepository {
  let vehicleCreated: Vehicle | undefined;

  return {
    async create(vehicle) {
      vehicleCreated = vehicle;
    },
    async get() {
      return vehicleCreated;
    },
  };
}

import type { MaintenanceItem } from '../../domain/maintenance-item';
import type { OutboxEntry } from '../../domain/outbox';
import type { Vehicle } from '../../domain/vehicle';
import type { VehicleRepository } from '../vehicle-repository';

export function createInMemoryVehicleRepository(
  maintenanceItems: MaintenanceItem[],
  entries: OutboxEntry[],
): VehicleRepository {
  let storedVehicle: Vehicle | undefined;

  return {
    async create(vehicle) {
      storedVehicle = vehicle;
    },
    async get() {
      return storedVehicle;
    },
  };
}

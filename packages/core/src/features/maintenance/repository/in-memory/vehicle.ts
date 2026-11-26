import {
  createSeedMaintenanceItems,
  type MaintenanceItem,
} from '../../domain/maintenance-item';
import { createOutboxEntry, type OutboxEntry } from '../../domain/outbox';
import type { Vehicle } from '../../domain/vehicle';
import type { VehicleRepository } from '../vehicle-repository';

export function createInMemoryVehicleRepository(
  maintenanceItems: MaintenanceItem[],
  entries: OutboxEntry[],
): VehicleRepository {
  let storedVehicle: Vehicle | undefined;

  return {
    async create(vehicle) {
      const items = createSeedMaintenanceItems(vehicle);
      const outboxVehicleEntry = createOutboxEntry('vehicle', vehicle);
      const outboxItemsEntries: OutboxEntry[] = items.map((item) =>
        createOutboxEntry('maintenanceItem', item),
      );

      storedVehicle = vehicle;
      maintenanceItems.push(...items);
      entries.push(outboxVehicleEntry, ...outboxItemsEntries);
    },
    async get() {
      return storedVehicle;
    },
  };
}

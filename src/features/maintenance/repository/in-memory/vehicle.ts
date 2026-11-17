import { MAINTENANCE_ITEMS_SEED } from '../../../../infra/db/seed';
import {
  newMaintenanceItemId,
  type MaintenanceItem,
} from '../../domain/maintenance-item';
import { newMutationId, type OutboxEntry } from '../../domain/outbox';
import type { Vehicle } from '../../domain/vehicle';
import type { VehicleRepository } from '../vehicle-repository';

export function createInMemoryVehicleRepository(
  maintenanceItems: MaintenanceItem[],
  entries: OutboxEntry[],
): VehicleRepository {
  let storedVehicle: Vehicle | undefined;

  return {
    async create(vehicle) {
      const items = MAINTENANCE_ITEMS_SEED.map((seed): MaintenanceItem => ({
        ...seed,
        id: newMaintenanceItemId(),
        vehicleId: vehicle.id,
        updatedAt: vehicle.updatedAt,
      }));
      const outboxVehicleEntry: OutboxEntry = {
        mutationId: newMutationId(),
        operation: 'create',
        entity: 'vehicle',
        entityId: vehicle.id,
        payload: vehicle,
      };
      const outboxItemsEntries: OutboxEntry[] = items.map((item) => ({
        mutationId: newMutationId(),
        operation: 'create',
        entity: 'maintenanceItem',
        entityId: item.id,
        payload: item,
      }));

      storedVehicle = vehicle;
      maintenanceItems.push(...items);
      entries.push(outboxVehicleEntry, ...outboxItemsEntries);
    },
    async get() {
      return storedVehicle;
    },
  };
}

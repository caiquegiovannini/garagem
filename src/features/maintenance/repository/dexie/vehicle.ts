import { db } from '../../../../infra/db/connection';
import { MAINTENANCE_ITEMS_SEED } from '../../../../infra/db/seed';
import {
  newMaintenanceItemId,
  type MaintenanceItem,
} from '../../domain/maintenance-item';
import { newMutationId, type OutboxEntry } from '../../domain/outbox';
import type { VehicleRepository } from '../vehicle-repository';

export function createDexieVehicleRepository(): VehicleRepository {
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

      await db.transaction(
        'rw',
        [db.vehicle, db.maintenanceItem, db.outbox],
        async () => {
          await db.vehicle.put(vehicle);
          await db.maintenanceItem.bulkPut(items);
          await db.outbox.bulkPut([outboxVehicleEntry, ...outboxItemsEntries]);
        },
      );
    },
    async get() {
      return db.vehicle.toCollection().first();
    },
  };
}

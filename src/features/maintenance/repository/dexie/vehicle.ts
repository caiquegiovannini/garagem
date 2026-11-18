import { db } from '../../../../infra/db/connection';
import { MAINTENANCE_ITEMS_SEED } from '../../../../infra/db/seed';
import {
  newMaintenanceItemId,
  type MaintenanceItem,
} from '../../domain/maintenance-item';
import { createOutboxEntry, type OutboxEntry } from '../../domain/outbox';
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
      const outboxVehicleEntry = createOutboxEntry('vehicle', vehicle);
      const outboxItemsEntries: OutboxEntry[] = items.map((item) =>
        createOutboxEntry('maintenanceItem', item),
      );

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

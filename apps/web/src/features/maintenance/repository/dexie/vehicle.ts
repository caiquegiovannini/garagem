import { db } from '../../../../infra/db/connection';
import { createSeedMaintenanceItems, createOutboxEntry } from '@garagem/core';
import type { OutboxEntry, VehicleRepository } from '@garagem/core';

export function createDexieVehicleRepository(): VehicleRepository {
  return {
    async create(vehicle) {
      const items = createSeedMaintenanceItems(vehicle);
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

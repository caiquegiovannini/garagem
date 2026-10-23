import { db } from '../../../../infra/db/connection';
import { MAINTENANCE_ITEMS_SEED } from '../../../../infra/db/seed';
import {
  newMaintenanceItemId,
  type MaintenanceItem,
} from '../../domain/maintenance-item';
import type { VehicleRepository } from '../vehicle-repository';

export function createDexieVehicleRepository(): VehicleRepository {
  return {
    async create(vehicle) {
      const items = MAINTENANCE_ITEMS_SEED.map((seed): MaintenanceItem => ({
        ...seed,
        id: newMaintenanceItemId(),
        vehicleId: vehicle.id,
        updatedAt: vehicle.updatedAt,
        dirty: true,
      }));
      await db.transaction('rw', [db.vehicle, db.maintenanceItem], async () => {
        await db.vehicle.put(vehicle);
        await db.maintenanceItem.bulkPut(items);
      });
    },
    async get() {
      return db.vehicle.toCollection().first();
    },
  };
}

import { db } from '../../../infra/db/connection';
import { MAINTENANCE_ITEMS_SEED } from '../../../infra/db/seed';
import {
  newMaintenanceItemId,
  type MaintenanceItem,
} from '../domain/maintenance-item';
import type { Vehicle } from '../domain/vehicle';

export async function getVehicle(): Promise<Vehicle | undefined> {
  return db.vehicle.toCollection().first();
}

export async function createVehicle(vehicle: Vehicle): Promise<void> {
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
}

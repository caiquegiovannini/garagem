import { openDb } from '../../../infra/db/connection';
import { MAINTENANCE_ITEMS_SEED } from '../../../infra/db/seed';
import { STORES } from '../../../infra/db/stores';
import {
  newMaintenanceItemId,
  type MaintenanceItem,
} from '../domain/maintenance-item';
import type { Vehicle } from '../domain/vehicle';

export async function getVehicle(): Promise<Vehicle | undefined> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.vehicle, 'readonly');
    const request = transaction.objectStore(STORES.vehicle).getAll();

    transaction.oncomplete = () => resolve(request.result[0]);
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function createVehicle(vehicle: Vehicle): Promise<void> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      [STORES.vehicle, STORES.maintenanceItem],
      'readwrite',
    );
    transaction.objectStore(STORES.vehicle).put(vehicle);
    const maintenanceItemStore = transaction.objectStore(
      STORES.maintenanceItem,
    );
    for (const item of MAINTENANCE_ITEMS_SEED) {
      const newItem: MaintenanceItem = {
        id: newMaintenanceItemId(),
        vehicleId: vehicle.id,
        updatedAt: vehicle.updatedAt,
        dirty: true,
        ...item,
      };
      maintenanceItemStore.put(newItem);
    }

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

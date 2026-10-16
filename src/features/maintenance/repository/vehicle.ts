import { openDb } from '../../../infra/db/connection';
import { STORES } from '../../../infra/db/stores';
import type { Vehicle, VehicleId } from '../domain/vehicle';

export async function saveVehicle(vehicle: Vehicle): Promise<void> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.vehicle, 'readwrite');
    transaction.objectStore(STORES.vehicle).put(vehicle);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getVehicle(id: VehicleId): Promise<Vehicle | undefined> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.vehicle, 'readonly');
    const request = transaction.objectStore(STORES.vehicle).get(id);

    transaction.oncomplete = () => resolve(request.result);
    transaction.onerror = () => reject(transaction.error);
  });
}

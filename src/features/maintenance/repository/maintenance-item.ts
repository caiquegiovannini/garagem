import { openDb } from '../../../infra/db/connection';
import { STORES } from '../../../infra/db/stores';
import type { MaintenanceItem } from '../domain/maintenance-item';

export async function getAllMaintenanceItems(): Promise<MaintenanceItem[]> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.maintenanceItem, 'readonly');
    const request = transaction.objectStore(STORES.maintenanceItem).getAll();

    transaction.oncomplete = () => resolve(request.result);
    transaction.onerror = () => reject(transaction.error);
  });
}

import { openDb } from '../../../infra/db/connection';
import { STORES } from '../../../infra/db/stores';
import type { Inspection } from '../domain/inspection';
import type { MaintenanceItemId } from '../domain/maintenance-item';

export async function saveInspection(inspection: Inspection): Promise<void> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.inspection, 'readwrite');
    transaction.objectStore(STORES.inspection).put(inspection);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getInspectionsByItem(
  maintenanceItemId: MaintenanceItemId,
): Promise<Inspection[]> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.inspection, 'readonly');
    const request = transaction
      .objectStore(STORES.inspection)
      .index('by-maintenance-item')
      .getAll(maintenanceItemId);

    transaction.oncomplete = () => resolve(request.result);
    transaction.onerror = () => reject(transaction.error);
  });
}

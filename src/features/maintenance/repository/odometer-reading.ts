import { openDb } from '../../../infra/db/connection';
import { STORES } from '../../../infra/db/stores';
import type { OdometerReading } from '../domain/odometer-reading';

export async function saveOdometerReading(
  reading: OdometerReading,
): Promise<void> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.odometerReading, 'readwrite');
    transaction.objectStore(STORES.odometerReading).put(reading);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getAllOdometerReadings(): Promise<OdometerReading[]> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.odometerReading, 'readonly');
    const request = transaction.objectStore(STORES.odometerReading).getAll();

    transaction.oncomplete = () => resolve(request.result);
    transaction.onerror = () => reject(transaction.error);
  });
}

import { STORES } from './stores';

export function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('car-maintenance', 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore(STORES.vehicle, { keyPath: 'id' });
      db.createObjectStore(STORES.odometerReading, { keyPath: 'id' });
      db.createObjectStore(STORES.maintenanceItem, { keyPath: 'id' });
      db.createObjectStore(STORES.inspection, { keyPath: 'id' });
    };

    request.onsuccess = () => resolve(request.result); // IDBDatabase pronto para uso

    request.onerror = () => reject(request.error);
  });
}

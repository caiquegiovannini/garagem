import type { Inspection } from '../../features/maintenance/domain/inspection';
import { INDEXES, STORES } from './stores';

export function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('car-maintenance', 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore(STORES.vehicle, { keyPath: 'id' });
      db.createObjectStore(STORES.odometerReading, { keyPath: 'id' });
      db.createObjectStore(STORES.maintenanceItem, { keyPath: 'id' });
      const inspectionStore = db.createObjectStore(STORES.inspection, {
        keyPath: 'id',
      });
      inspectionStore.createIndex(
        INDEXES.inspectionByMaintenanceItem,
        'maintenanceItemId' satisfies keyof Inspection,
      );
    };

    request.onsuccess = () => resolve(request.result); // IDBDatabase pronto para uso

    request.onerror = () => reject(request.error);
  });
}

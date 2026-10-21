import { db } from '../../../infra/db/connection';
import type { MaintenanceItem } from '../domain/maintenance-item';

export async function getAllMaintenanceItems(): Promise<MaintenanceItem[]> {
  return db.maintenanceItem.toArray();
}

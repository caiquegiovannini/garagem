import { db } from '../../../infra/db/connection';
import type { Inspection } from '../domain/inspection';
import type { MaintenanceItemId } from '../domain/maintenance-item';

export async function saveInspection(inspection: Inspection): Promise<void> {
  await db.inspection.put(inspection);
}

export async function getInspectionsByItem(
  maintenanceItemId: MaintenanceItemId,
): Promise<Inspection[]> {
  return db.inspection
    .where('maintenanceItemId')
    .equals(maintenanceItemId)
    .toArray();
}

import type { Inspection } from '../domain/inspection';
import type { MaintenanceItemId } from '../domain/maintenance-item';

export type InspectionRepository = {
  save: (inspection: Inspection) => Promise<void>;
  getByItemId: (maintenanceItemId: MaintenanceItemId) => Promise<Inspection[]>;
};

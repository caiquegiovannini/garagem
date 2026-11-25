import type { MaintenanceItem } from '../domain/maintenance-item';

export type MaintenanceItemRepository = {
  getAll: () => Promise<MaintenanceItem[]>;
};

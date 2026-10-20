import type { MaintenanceItem } from '../../features/maintenance/domain/maintenance-item';

export const MAINTENANCE_ITEMS_SEED: Omit<
  MaintenanceItem,
  'id' | 'vehicleId' | 'updatedAt' | 'deletedAt' | 'dirty'
>[] = [
  {
    name: 'Calibragem dos pneus',
    type: 'numeric',
    interval: { days: 30 },
  },
  {
    name: 'Nível de óleo',
    type: 'boolean',
    interval: { days: 60, km: 3000 },
  },
  {
    name: 'Pastilha de freio',
    type: 'boolean',
    interval: { days: 30, km: 1000 },
  },
];

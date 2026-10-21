import Dexie, { type EntityTable } from 'dexie';
import type { Inspection } from '../../features/maintenance/domain/inspection';
import type { Vehicle } from '../../features/maintenance/domain/vehicle';
import type { OdometerReading } from '../../features/maintenance/domain/odometer-reading';
import type { MaintenanceItem } from '../../features/maintenance/domain/maintenance-item';

export const db = new Dexie('car-maintenance') as Dexie & {
  vehicle: EntityTable<Vehicle, 'id'>;
  odometerReading: EntityTable<OdometerReading, 'id'>;
  maintenanceItem: EntityTable<MaintenanceItem, 'id'>;
  inspection: EntityTable<Inspection, 'id'>;
};

db.version(1).stores({
  vehicle: 'id',
  inspection: 'id, maintenanceItemId',
  odometerReading: 'id',
  maintenanceItem: 'id',
});

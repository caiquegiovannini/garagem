import Dexie, { type EntityTable } from 'dexie';
import type { Inspection } from '../../features/maintenance/domain/inspection';
import type { Vehicle } from '../../features/maintenance/domain/vehicle';
import type { OdometerReading } from '../../features/maintenance/domain/odometer-reading';
import type { MaintenanceItem } from '../../features/maintenance/domain/maintenance-item';
import type { OutboxEntry } from '../../features/maintenance/domain/outbox';

export const db = new Dexie('car-maintenance') as Dexie & {
  vehicle: EntityTable<Vehicle, 'id'>;
  odometerReading: EntityTable<OdometerReading, 'id'>;
  maintenanceItem: EntityTable<MaintenanceItem, 'id'>;
  inspection: EntityTable<Inspection, 'id'>;
  outbox: EntityTable<OutboxEntry, 'mutationId'>;
};

db.version(1).stores({
  vehicle: 'id',
  inspection: 'id, maintenanceItemId',
  odometerReading: 'id',
  maintenanceItem: 'id',
  outbox: 'mutationId',
});

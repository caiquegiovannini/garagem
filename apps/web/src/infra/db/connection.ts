import Dexie, { type EntityTable } from 'dexie';
import type {
  Inspection,
  Vehicle,
  OdometerReading,
  MaintenanceItem,
  OutboxEntry,
} from '@garagem/core';

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

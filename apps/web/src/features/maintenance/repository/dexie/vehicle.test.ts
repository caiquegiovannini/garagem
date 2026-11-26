import 'fake-indexeddb/auto';
import { beforeEach, describe } from 'vitest';
import { db } from '../../../../infra/db/connection';
import { testVehicleRepositoryContract } from '@garagem/core/testing';
import { createDexieVehicleRepository } from './vehicle';
import { createDexieMaintenanceItemRepository } from './maintenance-item';
import { createDexieOutboxRepository } from './outbox';

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

describe('Dexie vehicle repository', () => {
  testVehicleRepositoryContract(() => {
    return {
      vehicle: createDexieVehicleRepository(),
      maintenanceItems: createDexieMaintenanceItemRepository(),
      outbox: createDexieOutboxRepository(),
    };
  });
});

import 'fake-indexeddb/auto';
import { beforeEach, describe } from 'vitest';
import { testMaintenanceItemRepositoryContract } from '@garagem/core/testing';
import { createDexieMaintenanceItemRepository } from './maintenance-item';
import { db } from '../../../../infra/db/connection';

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

describe('Dexie maintenance item repository', () => {
  testMaintenanceItemRepositoryContract(async (initialItems) => {
    await db.maintenanceItem.bulkPut(initialItems);
    return createDexieMaintenanceItemRepository();
  });
});

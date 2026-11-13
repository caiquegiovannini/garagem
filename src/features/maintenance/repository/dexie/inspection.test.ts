import 'fake-indexeddb/auto';
import { beforeEach, describe } from 'vitest';
import { db } from '../../../../infra/db/connection';
import { testInspectionRepositoryContract } from '../inspection-repository.contract-test';
import { createDexieInspectionRepository } from './inspection';
import { createDexieOutboxRepository } from './outbox';

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

describe('Dexie inspection repository', () => {
  testInspectionRepositoryContract(() => {
    return {
      inspection: createDexieInspectionRepository(),
      outbox: createDexieOutboxRepository(),
    };
  });
});

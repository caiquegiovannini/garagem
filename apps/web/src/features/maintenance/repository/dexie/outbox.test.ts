import 'fake-indexeddb/auto';
import { beforeEach, describe } from 'vitest';
import { db } from '../../../../infra/db/connection';
import { testOutboxRepositoryContract } from '@garagem/core/testing';
import { createDexieOutboxRepository } from './outbox';

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

describe('Dexie outbox repository', () => {
  testOutboxRepositoryContract(() => createDexieOutboxRepository());
});

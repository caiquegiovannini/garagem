import 'fake-indexeddb/auto';
import { beforeEach, describe } from 'vitest';
import { db } from '../../../../infra/db/connection';
import { createDexieOdometerReadingRepository } from './odometer-reading';
import { testOdometerReadingRepositoryContract } from '@garagem/core/testing';
import { createDexieOutboxRepository } from './outbox';

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

describe('Dexie odometer reading repository', () => {
  testOdometerReadingRepositoryContract(() => {
    return {
      odometerReading: createDexieOdometerReadingRepository(),
      outbox: createDexieOutboxRepository(),
    };
  });
});

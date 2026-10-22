import 'fake-indexeddb/auto';
import { beforeEach, describe } from 'vitest';
import { db } from '../../../../infra/db/connection';
import { createDexieOdometerReadingRepository } from './odometer-reading';
import { testOdometerReadingRepositoryContract } from '../odometer-reading-repository.contract-test';

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

describe('Dexie odometer reading repository', () => {
  testOdometerReadingRepositoryContract(() =>
    createDexieOdometerReadingRepository(),
  );
});

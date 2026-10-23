import { describe } from 'vitest';
import { testOdometerReadingRepositoryContract } from '../odometer-reading-repository.contract-test';
import { createInMemoryOdometerReadingRepository } from './odometer-reading';

describe('In-memory odometer reading repository', () => {
  testOdometerReadingRepositoryContract(() =>
    createInMemoryOdometerReadingRepository(),
  );
});

import { describe } from 'vitest';
import { testOdometerReadingRepositoryContract } from '../odometer-reading-repository.contract-test';
import { createInMemoryOdometerReadingRepository } from './odometer-reading';
import type { OutboxEntry } from '../../domain/outbox';
import { createInMemoryOutboxRepository } from './outbox';

describe('In-memory odometer reading repository', () => {
  testOdometerReadingRepositoryContract(() => {
    const outboxEntries: OutboxEntry[] = [];
    return {
      odometerReading: createInMemoryOdometerReadingRepository(outboxEntries),
      outbox: createInMemoryOutboxRepository(outboxEntries),
    };
  });
});

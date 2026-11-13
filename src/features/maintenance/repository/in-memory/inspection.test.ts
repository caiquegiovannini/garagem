import { describe } from 'vitest';
import { testInspectionRepositoryContract } from '../inspection-repository.contract-test';
import { createInMemoryInspectionRepository } from './inspection';
import type { OutboxEntry } from '../../domain/outbox';
import { createInMemoryOutboxRepository } from './outbox';

describe('In-memory inspection repository', () => {
  testInspectionRepositoryContract(() => {
    const entries: OutboxEntry[] = [];
    return {
      inspection: createInMemoryInspectionRepository(entries),
      outbox: createInMemoryOutboxRepository(entries),
    };
  });
});

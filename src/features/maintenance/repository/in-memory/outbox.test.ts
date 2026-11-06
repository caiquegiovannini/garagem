import { describe } from 'vitest';
import { testOutboxRepositoryContract } from '../outbox-repository.contract-test';
import { createInMemoryOutboxRepository } from './outbox';

describe('In-memory outbox repository', () => {
  testOutboxRepositoryContract(() => createInMemoryOutboxRepository());
});

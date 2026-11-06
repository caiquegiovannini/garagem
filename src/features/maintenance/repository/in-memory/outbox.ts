import type { OutboxEntry } from '../../domain/outbox';
import type { OutboxRepository } from '../outbox-repository';

export function createInMemoryOutboxRepository(): OutboxRepository {
  const readings: OutboxEntry[] = [];

  return {
    async list() {
      return [...readings];
    },
  };
}

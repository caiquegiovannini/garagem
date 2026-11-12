import type { OutboxEntry } from '../../domain/outbox';
import type { OutboxRepository } from '../outbox-repository';

export function createInMemoryOutboxRepository(
  entries: OutboxEntry[],
): OutboxRepository {
  return {
    async list() {
      return entries;
    },
  };
}

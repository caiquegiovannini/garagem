import { db } from '../../../../infra/db/connection';
import type { OutboxRepository } from '@garagem/core';

export function createDexieOutboxRepository(): OutboxRepository {
  return {
    async list() {
      return db.outbox.toArray();
    },
  };
}

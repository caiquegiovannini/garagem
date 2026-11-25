import { db } from '../../../../infra/db/connection';
import type { OutboxRepository } from '../outbox-repository';

export function createDexieOutboxRepository(): OutboxRepository {
  return {
    async list() {
      return db.outbox.toArray();
    },
  };
}

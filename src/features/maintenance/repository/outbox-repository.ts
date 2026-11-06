import type { OutboxEntry } from '../domain/outbox';

export type OutboxRepository = {
  list(): Promise<OutboxEntry[]>;
};

import { describe, expect, it } from 'vitest';
import type { OutboxRepository } from './outbox-repository';

export function testOutboxRepositoryContract(
  makeRepository: () => OutboxRepository,
) {
  describe('list', () => {
    it('should return an empty array when the outbox is empty', async () => {
      const repository = makeRepository();
      expect(await repository.list()).toEqual([]);
    });
  });
}

import { describe } from 'vitest';
import { testMaintenanceItemRepositoryContract } from '../maintenance-item-repository.contract-test';
import { createInMemoryMaintenanceItemRepository } from './maintenance-item';

describe('In-memory maintenance item repository', () => {
  testMaintenanceItemRepositoryContract(async (initialItems) =>
    createInMemoryMaintenanceItemRepository(initialItems),
  );
});

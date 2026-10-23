import { describe } from 'vitest';
import { testMaintenanceItemRepositoryContract } from '../maintenance-item-repository.contract-test';
import { createInMemoryMaintenanceItemRepository } from './maintenance-item';

describe('Dexie maintenance item repository', () => {
  testMaintenanceItemRepositoryContract(async (initialItems) =>
    createInMemoryMaintenanceItemRepository(initialItems),
  );
});

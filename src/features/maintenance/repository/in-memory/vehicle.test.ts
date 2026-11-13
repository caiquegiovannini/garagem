import { describe } from 'vitest';
import { testVehicleRepositoryContract } from '../vehicle-repository.contract-test';
import { createInMemoryVehicleRepository } from './vehicle';
import { createInMemoryOutboxRepository } from './outbox';
import { createInMemoryMaintenanceItemRepository } from './maintenance-item';
import type { MaintenanceItem } from '../../domain/maintenance-item';
import type { OutboxEntry } from '../../domain/outbox';

describe('In-memory vehicle repository', () => {
  testVehicleRepositoryContract(() => {
    const maintenanceItems: MaintenanceItem[] = [];
    const entries: OutboxEntry[] = [];
    return {
      vehicle: createInMemoryVehicleRepository(maintenanceItems, entries),
      maintenanceItems:
        createInMemoryMaintenanceItemRepository(maintenanceItems),
      outbox: createInMemoryOutboxRepository(entries),
    };
  });
});

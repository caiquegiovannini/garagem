import { describe } from 'vitest';
import { testVehicleRepositoryContract } from '../vehicle-repository.contract-test';
import { createInMemoryVehicleRepository } from './vehicle';

describe('In-memory vehicle repository', () => {
  testVehicleRepositoryContract(() => createInMemoryVehicleRepository());
});

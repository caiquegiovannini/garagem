import { describe } from 'vitest';
import { testInspectionRepositoryContract } from '../inspection-repository.contract-test';
import { createInMemoryInspectionRepository } from './inspection';

describe('In-memory inspection repository', () => {
  testInspectionRepositoryContract(() => createInMemoryInspectionRepository());
});

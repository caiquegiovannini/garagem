import { describe, expect, it } from 'vitest';
import { newMaintenanceItemId } from '../domain/maintenance-item';
import { newInspectionId, type Inspection } from '../domain/inspection';
import type { InspectionRepository } from './inspection-repository';

const itemAId = newMaintenanceItemId();
const itemBId = newMaintenanceItemId();

const inspectionForItemA: Inspection = {
  id: newInspectionId(),
  maintenanceItemId: itemAId,
  date: new Date(),
  type: 'boolean',
  km: 3000,
  result: 'ok',
  updatedAt: new Date(),
  dirty: true,
};
const inspectionForItemB: Inspection = {
  id: newInspectionId(),
  maintenanceItemId: itemBId,
  date: new Date(),
  type: 'numeric',
  value: 500,
  km: 3000,
  result: 'intervened',
  updatedAt: new Date(),
  dirty: true,
};

export function testInspectionRepositoryContract(
  makeRepository: () => InspectionRepository,
) {
  describe('getByItemId', () => {
    it('should return an empty array when the item has no inspections', async () => {
      const repository = makeRepository();
      await repository.save(inspectionForItemA);

      expect(await repository.getByItemId(itemBId)).toHaveLength(0);
    });

    it('should return only the inspection by the given item', async () => {
      const repository = makeRepository();
      await repository.save(inspectionForItemA);
      await repository.save(inspectionForItemB);

      const result = await repository.getByItemId(itemBId);

      expect(result).toStrictEqual([inspectionForItemB]);
    });
  });

  describe('save', () => {
    it('should save the inspections', async () => {
      const repository = makeRepository();
      await repository.save(inspectionForItemB);

      const result = await repository.getByItemId(itemBId);
      expect(result).toStrictEqual([inspectionForItemB]);
    });
  });
}

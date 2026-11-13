import { describe, expect, it } from 'vitest';
import { newMaintenanceItemId } from '../domain/maintenance-item';
import { newInspectionId, type Inspection } from '../domain/inspection';
import type { InspectionRepository } from './inspection-repository';
import type { OutboxRepository } from './outbox-repository';
import type { OutboxEntry } from '../domain/outbox';

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
};

export function testInspectionRepositoryContract(
  makeRepositories: () => {
    inspection: InspectionRepository;
    outbox: OutboxRepository;
  },
) {
  describe('getByItemId', () => {
    it('should return an empty array when the item has no inspections', async () => {
      const { inspection } = makeRepositories();
      await inspection.save(inspectionForItemA);

      expect(await inspection.getByItemId(itemBId)).toHaveLength(0);
    });

    it('should return only the inspection by the given item', async () => {
      const { inspection } = makeRepositories();
      await inspection.save(inspectionForItemA);
      await inspection.save(inspectionForItemB);

      const result = await inspection.getByItemId(itemBId);

      expect(result).toStrictEqual([inspectionForItemB]);
    });
  });

  describe('save', () => {
    it('should save the inspections', async () => {
      const { inspection } = makeRepositories();
      await inspection.save(inspectionForItemB);

      const result = await inspection.getByItemId(itemBId);
      expect(result).toStrictEqual([inspectionForItemB]);
    });

    it('should create an outbox entry when saving an inspection', async () => {
      const { inspection, outbox } = makeRepositories();
      const entry: OutboxEntry = {
        mutationId: expect.any(String),
        operation: 'create',
        entity: 'inspection',
        entityId: inspectionForItemB.id,
        payload: inspectionForItemB,
      };

      await inspection.save(inspectionForItemB);

      const result = await outbox.list();
      expect(result).toStrictEqual([entry]);
    });
  });
}

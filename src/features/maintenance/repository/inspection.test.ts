import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../../../infra/db/connection';
import { getInspectionsByItem, saveInspection } from './inspection';
import { newMaintenanceItemId } from '../domain/maintenance-item';
import { newInspectionId, type Inspection } from '../domain/inspection';

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

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

describe('getInspectionsByItem', () => {
  it('should return an empty array when the item has no inspections', async () => {
    await db.inspection.put(inspectionForItemA);

    expect(await getInspectionsByItem(itemBId)).toHaveLength(0);
  });

  it('should return only the inspection by the given item', async () => {
    await db.inspection.put(inspectionForItemA);
    await db.inspection.put(inspectionForItemB);

    const result = await getInspectionsByItem(itemBId);

    expect(result).toStrictEqual([inspectionForItemB]);
  });
});

describe('saveInspection', () => {
  it('should save the inspections', async () => {
    await saveInspection(inspectionForItemB);

    const result = await getInspectionsByItem(itemBId);
    expect(result).toStrictEqual([inspectionForItemB]);
  });
});

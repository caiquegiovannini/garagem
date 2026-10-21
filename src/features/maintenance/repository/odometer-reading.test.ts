import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../../../infra/db/connection';
import {
  getAllOdometerReadings,
  saveOdometerReading,
} from './odometer-reading';
import {
  newOdometerReadingId,
  type OdometerReading,
} from '../domain/odometer-reading';
import { newVehicleId } from '../domain/vehicle';

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

describe('getAllOdometerReadings', () => {
  it('should return an empty array when there is no reading in the store', async () => {
    expect(await getAllOdometerReadings()).toHaveLength(0);
  });
});

describe('saveOdometerReading', () => {
  it('should save the readings', async () => {
    const odometerReadings: OdometerReading[] = [
      {
        id: newOdometerReadingId(),
        vehicleId: newVehicleId(),
        date: new Date('2026-06-01'),
        km: 32800,
        updatedAt: new Date('2026-06-01'),
        dirty: true,
      },
      {
        id: newOdometerReadingId(),
        vehicleId: newVehicleId(),
        date: new Date('2026-05-02'),
        km: 29550,
        updatedAt: new Date('2026-05-02'),
        dirty: true,
      },
    ];

    for (const reading of odometerReadings) {
      await saveOdometerReading(reading);
    }
    const results = await getAllOdometerReadings();

    expect(results).toHaveLength(odometerReadings.length);
    expect(results).toStrictEqual(expect.arrayContaining(odometerReadings));
  });
});

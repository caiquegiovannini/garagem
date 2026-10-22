import { describe, expect, it } from 'vitest';
import type { OdometerReadingRepository } from './odometer-reading-repository';
import {
  newOdometerReadingId,
  type OdometerReading,
} from '../domain/odometer-reading';
import { newVehicleId } from '../domain/vehicle';

export function testOdometerReadingRepositoryContract(
  makeRepository: () => OdometerReadingRepository,
) {
  describe('getAll', () => {
    it('should return an empty array when there is no reading in the store', async () => {
      const repository = makeRepository();
      expect(await repository.getAll()).toHaveLength(0);
    });
  });

  describe('save', () => {
    it('should save the readings', async () => {
      const repository = makeRepository();
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
        await repository.save(reading);
      }
      const results = await repository.getAll();

      expect(results).toHaveLength(odometerReadings.length);
      expect(results).toStrictEqual(expect.arrayContaining(odometerReadings));
    });
  });
}

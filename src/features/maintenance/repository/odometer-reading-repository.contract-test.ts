import { describe, expect, it } from 'vitest';
import type { OdometerReadingRepository } from './odometer-reading-repository';
import {
  newOdometerReadingId,
  type OdometerReading,
} from '../domain/odometer-reading';
import { newVehicleId } from '../domain/vehicle';
import type { OutboxRepository } from './outbox-repository';
import type { OutboxEntry } from '../domain/outbox';

export function testOdometerReadingRepositoryContract(
  makeRepositories: () => {
    odometerReading: OdometerReadingRepository;
    outbox: OutboxRepository;
  },
) {
  describe('getAll', () => {
    it('should return an empty array when there is no reading in the store', async () => {
      const { odometerReading } = makeRepositories();
      expect(await odometerReading.getAll()).toHaveLength(0);
    });
  });

  describe('save', () => {
    it('should save the readings', async () => {
      const { odometerReading } = makeRepositories();
      const odometerReadings: OdometerReading[] = [
        {
          id: newOdometerReadingId(),
          vehicleId: newVehicleId(),
          date: new Date('2026-06-01'),
          km: 32800,
          updatedAt: new Date('2026-06-01'),
        },
        {
          id: newOdometerReadingId(),
          vehicleId: newVehicleId(),
          date: new Date('2026-05-02'),
          km: 29550,
          updatedAt: new Date('2026-05-02'),
        },
      ];

      for (const reading of odometerReadings) {
        await odometerReading.save(reading);
      }
      const results = await odometerReading.getAll();

      expect(results).toHaveLength(odometerReadings.length);
      expect(results).toStrictEqual(expect.arrayContaining(odometerReadings));
    });

    it('should create an outbox entry when saving a reading', async () => {
      const { odometerReading, outbox } = makeRepositories();
      const reading: OdometerReading = {
        id: newOdometerReadingId(),
        vehicleId: newVehicleId(),
        date: new Date('2026-06-01'),
        km: 32800,
        updatedAt: new Date('2026-06-01'),
      };
      const entry: OutboxEntry = {
        mutationId: expect.any(String),
        operation: 'create',
        entity: 'odometerReading',
        entityId: reading.id,
        payload: reading,
      };

      await odometerReading.save(reading);

      const result = await outbox.list();

      expect(result).toStrictEqual([entry]);
    });
  });
}

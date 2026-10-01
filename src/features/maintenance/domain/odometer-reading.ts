import { z } from 'zod';
import { VehicleIdSchema } from './vehicle';

export const OdometerReadingIdSchema = z.uuid().brand<'OdometerReadingId'>();
export const OdometerReadingSchema = z.object({
  id: OdometerReadingIdSchema,
  vehicleId: VehicleIdSchema,
  date: z.date(),
  km: z.number().int().nonnegative(),
});

type ReadingPoint = Pick<OdometerReading, 'date' | 'km'>;
export function isKmConsistent(
  reading: ReadingPoint,
  existingReadings: ReadingPoint[],
): boolean {
  return existingReadings.every((existingReading) => {
    if (reading.date > existingReading.date) {
      return reading.km >= existingReading.km;
    }
    if (reading.date.getTime() === existingReading.date.getTime()) {
      return reading.km === existingReading.km;
    }
    return reading.km <= existingReading.km;
  });
}

export type OdometerReadingId = z.infer<typeof OdometerReadingIdSchema>;
export type OdometerReading = z.infer<typeof OdometerReadingSchema>;

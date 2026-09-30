import { z } from 'zod';
import { VehicleIdSchema } from './vehicle';

export const OdometerReadingIdSchema = z.uuid().brand<'OdometerReadingId'>();
export const OdometerReadingSchema = z.object({
  id: OdometerReadingIdSchema,
  vehicleId: VehicleIdSchema,
  date: z.date(),
  km: z.number().int().nonnegative(),
});

export type OdometerReadingId = z.infer<typeof OdometerReadingIdSchema>;
export type OdometerReading = z.infer<typeof OdometerReadingSchema>;

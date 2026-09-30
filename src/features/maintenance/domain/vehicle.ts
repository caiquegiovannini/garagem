import { z } from 'zod';

export const VehicleIdSchema = z.uuid().brand<'VehicleId'>();
export const VehicleSchema = z.object({
  id: VehicleIdSchema,
  name: z.string().trim().nonempty(),
});

export type VehicleId = z.infer<typeof VehicleIdSchema>;
export type Vehicle = z.infer<typeof VehicleSchema>;

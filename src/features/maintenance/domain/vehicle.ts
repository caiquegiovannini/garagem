import { z } from 'zod';
import { generateId } from '../../../shared/id';
import { SyncFieldsSchema } from './sync-fields';

export const VehicleIdSchema = z.uuid().brand<'VehicleId'>();
export const VehicleSchema = z.object({
  id: VehicleIdSchema,
  name: z.string().trim().nonempty(),
  ...SyncFieldsSchema.shape,
});

export function newVehicleId(): VehicleId {
  return VehicleIdSchema.parse(generateId());
}

export type VehicleId = z.infer<typeof VehicleIdSchema>;
export type Vehicle = z.infer<typeof VehicleSchema>;

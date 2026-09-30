import { z } from 'zod';
import { VehicleIdSchema } from './vehicle';

export const MaintenanceItemIdSchema = z.uuid().brand<'MaintenanceItemId'>();
export const MaintenanceItemTypeSchema = z.enum(['numeric', 'boolean']);
export const MaintenanceItemSchema = z.object({
  id: MaintenanceItemIdSchema,
  vehicleId: VehicleIdSchema,
  name: z.string().trim().nonempty(),
  type: MaintenanceItemTypeSchema,
  interval: z
    .object({
      days: z.number().int().positive().optional(),
      km: z.number().int().positive().optional(),
    })
    .refine((interval) => !!interval.days || !!interval.km, {
      error: 'Interval must have at least days or km',
    }),
});

export type MaintenanceItemId = z.infer<typeof MaintenanceItemIdSchema>;
export type MaintenanceItem = z.infer<typeof MaintenanceItemSchema>;
export type MaintenanceItemType = z.infer<typeof MaintenanceItemTypeSchema>;

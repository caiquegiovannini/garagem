import { z } from 'zod';
import { VehicleIdSchema } from './vehicle';
import { generateId } from '../../../shared/id';
import { SyncFieldsSchema } from './sync-fields';

export const MaintenanceItemIdSchema = z.uuidv7().brand<'MaintenanceItemId'>();
export const MaintenanceItemTypeSchema = z.enum(['numeric', 'boolean']);
export const MaintenanceItemIntervalSchema = z
  .object({
    days: z.number().int().positive().optional(),
    km: z.number().int().positive().optional(),
  })
  .refine((interval) => !!interval.days || !!interval.km, {
    error: 'Interval must have at least days or km',
  });

export const MaintenanceItemSchema = z.object({
  id: MaintenanceItemIdSchema,
  vehicleId: VehicleIdSchema,
  name: z.string().trim().nonempty(),
  type: MaintenanceItemTypeSchema,
  interval: MaintenanceItemIntervalSchema,
  ...SyncFieldsSchema.shape,
});

export function newMaintenanceItemId(): MaintenanceItemId {
  return MaintenanceItemIdSchema.parse(generateId());
}

export const MAINTENANCE_ITEMS_SEED: Omit<
  MaintenanceItem,
  'id' | 'vehicleId' | 'updatedAt' | 'deletedAt' | 'dirty'
>[] = [
  {
    name: 'Calibragem dos pneus',
    type: 'numeric',
    interval: { days: 30 },
  },
  {
    name: 'Nível de óleo',
    type: 'boolean',
    interval: { days: 60, km: 3000 },
  },
  {
    name: 'Pastilha de freio',
    type: 'boolean',
    interval: { days: 30, km: 1000 },
  },
];

export type MaintenanceItemId = z.infer<typeof MaintenanceItemIdSchema>;
export type MaintenanceItemType = z.infer<typeof MaintenanceItemTypeSchema>;
export type MaintenanceItemInterval = z.infer<
  typeof MaintenanceItemIntervalSchema
>;
export type MaintenanceItem = z.infer<typeof MaintenanceItemSchema>;

import { z } from 'zod';
import {
  MaintenanceItemIdSchema,
  MaintenanceItemTypeSchema,
} from './maintenance-item';
import { KmSchema } from './km';

export const InspectionIdSchema = z.uuid().brand<'InspectionId'>();

const InspectionBaseSchema = z.object({
  id: InspectionIdSchema,
  maintenanceItemId: MaintenanceItemIdSchema,
  date: z.date(),
  km: KmSchema,
  result: z.enum(['ok', 'intervened']),
  note: z.string().trim().nonempty().optional(),
});

export const InspectionSchema = z.discriminatedUnion('type', [
  z.strictObject({
    ...InspectionBaseSchema.shape,
    type: z.literal(MaintenanceItemTypeSchema.enum.numeric),
    value: z.number().nonnegative(),
  }),
  z.strictObject({
    ...InspectionBaseSchema.shape,
    type: z.literal(MaintenanceItemTypeSchema.enum.boolean),
  }),
]);

export type InspectionId = z.infer<typeof InspectionIdSchema>;
export type Inspection = z.infer<typeof InspectionSchema>;

import z from 'zod';
import { generateId } from '../../../shared/id';
import { VehicleIdSchema, VehicleSchema } from './vehicle';
import {
  OdometerReadingIdSchema,
  OdometerReadingSchema,
} from './odometer-reading';
import {
  MaintenanceItemIdSchema,
  MaintenanceItemSchema,
} from './maintenance-item';
import { InspectionIdSchema, InspectionSchema } from './inspection';

export const MutationIdSchema = z.uuidv7().brand<'MutationId'>();

const OutboxEntryBaseSchema = z.object({
  mutationId: MutationIdSchema,
  operation: z.enum(['create']),
});

export const OutboxEntrySchema = z.discriminatedUnion('entity', [
  z.strictObject({
    ...OutboxEntryBaseSchema.shape,
    entity: z.literal('vehicle'),
    entityId: VehicleIdSchema,
    payload: VehicleSchema,
  }),
  z.strictObject({
    ...OutboxEntryBaseSchema.shape,
    entity: z.literal('odometerReading'),
    entityId: OdometerReadingIdSchema,
    payload: OdometerReadingSchema,
  }),
  z.strictObject({
    ...OutboxEntryBaseSchema.shape,
    entity: z.literal('maintenanceItem'),
    entityId: MaintenanceItemIdSchema,
    payload: MaintenanceItemSchema,
  }),
  z.strictObject({
    ...OutboxEntryBaseSchema.shape,
    entity: z.literal('inspection'),
    entityId: InspectionIdSchema,
    payload: InspectionSchema,
  }),
]);

export function newMutationId(): MutationId {
  return MutationIdSchema.parse(generateId());
}

export type MutationId = z.infer<typeof MutationIdSchema>;
export type OutboxEntry = z.infer<typeof OutboxEntrySchema>;

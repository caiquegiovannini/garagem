import z from 'zod';

export const SyncFieldsSchema = z.object({
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
  dirty: z.boolean(),
});

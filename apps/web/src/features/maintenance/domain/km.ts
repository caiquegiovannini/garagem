import z from 'zod';

export const KmSchema = z.number().int().nonnegative();

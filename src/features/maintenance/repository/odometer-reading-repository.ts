import type { OdometerReading } from '../domain/odometer-reading';

export type OdometerReadingRepository = {
  save: (reading: OdometerReading) => Promise<void>;
  getAll: () => Promise<OdometerReading[]>;
};

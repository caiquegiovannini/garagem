import type { Vehicle } from '../domain/vehicle';

export type VehicleRepository = {
  create: (vehicle: Vehicle) => Promise<void>;
  get: () => Promise<Vehicle | undefined>;
};

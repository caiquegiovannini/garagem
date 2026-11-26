export {
  createSeedMaintenanceItems,
  type MaintenanceItem,
} from "./features/maintenance/domain/maintenance-item";
export type { Vehicle } from "./features/maintenance/domain/vehicle";
export type { OdometerReading } from "./features/maintenance/domain/odometer-reading";
export type { Inspection } from "./features/maintenance/domain/inspection";
export {
  createOutboxEntry,
  type OutboxEntry,
} from "./features/maintenance/domain/outbox";
export type { VehicleRepository } from "./features/maintenance/repository/vehicle-repository";
export type { OdometerReadingRepository } from "./features/maintenance/repository/odometer-reading-repository";
export type { MaintenanceItemRepository } from "./features/maintenance/repository/maintenance-item-repository";
export type { InspectionRepository } from "./features/maintenance/repository/inspection-repository";
export type { OutboxRepository } from "./features/maintenance/repository/outbox-repository";

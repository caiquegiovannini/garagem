export const STORES = {
  vehicle: 'vehicle',
  maintenanceItem: 'maintenance-item',
  odometerReading: 'odometer-reading',
  inspection: 'inspection',
} as const;

export const INDEXES = {
  inspectionByMaintenanceItem: 'by-maintenance-item',
} as const;

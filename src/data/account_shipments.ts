
        
import { ShipmentTrackingModel, ShipmentDetailModel, TrackingHistoryEventModel } from './tracking_data';

// --- Interfaces ---

interface ShipmentListItemModel extends ShipmentTrackingModel {
    shipmentDate: string;
    totalCostIDR: number;
    isArchived: boolean;
}

// Full mock data object, extending one detail model
interface DetailedShipmentWithAccountInfo extends ShipmentDetailModel {
    id: number;
    billingReference: string;
}

// --- Data ---
const MOCK_HISTORY_EVENTS_DELIVERED: TrackingHistoryEventModel[] = [
    // ... (reuse from tracking_data, assume this history leads to Delivered) ...
    {
        timestamp: "2025-11-20 15:45:00 WIB",
        location: "Jl. Sudirman No 50, Jakarta Pusat",
        status: "Delivered",
        details: "Paket telah diterima oleh Satpam a.n. Agung.",
    },
];

export const MOCK_ACCOUNT_SHIPMENT_DETAILS: DetailedShipmentWithAccountInfo = {
    id: 9901,
    billingReference: "REF-9889231",
    resiNumber: 'SNT891234710',
    status: 'In Transit',
    currentLocation: 'Regional Sorting Center Bandung',
    originCity: 'Jakarta Selatan',
    destinationCity: 'Bandung',
    estimatedDelivery: '03 Desember 2025, 11:00 WIB',
    isMappable: true,
    senderInfo: { name: 'PT. Sentra Digital Logistik', phone: '0812xxxx7890' },
    receiverInfo: { name: 'Ibu Annisa Hidayat', phone: '0850xxxx5432' },
    packageDetails: {
        typeName: 'Perangkat Elektronik',
        weightKg: 2.5,
        lengthCm: 30,
        widthCm: 20,
        heightCm: 15,
        declaredValueIDR: 15000000,
        specialInstructions: "Hanya terima oleh Sdr. Budi, harap tidak diletakkan di bawah sinar matahari langsung.",
        isFragile: true,
    },
    detailedTrackingHistory: MOCK_HISTORY_EVENTS_DELIVERED, // Using 'In Transit' but with detailed history for simulation
    serviceName: 'Drone Kilat Max',
    totalPaidIDR: 142500,
    deliveryVehicle: "Autonomous Drone S-7",
};

export const MOCK_SHIPMENT_LIST: ShipmentListItemModel[] = [
    {
        resiNumber: 'SNT891234710',
        status: 'In Transit',
        currentLocation: 'Regional Sorting Center Bandung',
        originCity: 'Jakarta',
        destinationCity: 'Bandung',
        estimatedDelivery: '03/12/2025',
        isMappable: true,
        shipmentDate: '02/12/2025',
        totalCostIDR: 142500,
        isArchived: false,
    },
    {
        resiNumber: 'SNT891234711',
        status: 'Delivered',
        currentLocation: 'Jakarta Pusat',
        originCity: 'Surabaya',
        destinationCity: 'Jakarta',
        estimatedDelivery: '20/11/2025',
        isMappable: false,
        shipmentDate: '18/11/2025',
        totalCostIDR: 85000,
        isArchived: true, // Archived shipment
    },
    {
        resiNumber: 'SNT891234712',
        status: 'Pending',
        currentLocation: 'Menunggu Penjemputan',
        originCity: 'Semarang',
        destinationCity: 'Yogyakarta',
        estimatedDelivery: '04/12/2025',
        isMappable: false,
        shipmentDate: '02/12/2025',
        totalCostIDR: 50000,
        isArchived: false,
    },
    {
        resiNumber: 'SNT891234713',
        status: 'Problem',
        currentLocation: 'Hub Distribusi Jakarta (JDC-1)',
        originCity: 'Jakarta Utara',
        destinationCity: 'Medan',
        estimatedDelivery: 'N/A',
        isMappable: true,
        shipmentDate: '01/12/2025',
        totalCostIDR: 210000,
        isArchived: false,
    },
];

// Re-export for convenience
export type { ShipmentListItemModel, DetailedShipmentWithAccountInfo };
        
      
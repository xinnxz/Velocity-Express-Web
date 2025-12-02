
        
import { LocationModel, PackageDetailModel, RecipientModel } from './order_data';

// --- Interfaces ---

interface TrackingHistoryEventModel {
    timestamp: string; // ISO String or formatted date/time
    location: string;
    status: string;
    details?: string;
}

interface ShipmentTrackingModel {
    resiNumber: string;
    status: 'Pending' | 'In Transit' | 'Delivered' | 'Problem';
    currentLocation: string;
    originCity: string;
    destinationCity: string;
    estimatedDelivery: string;
    isMappable: boolean;
}

interface RealTimeLocationModel {
    resiNumber: string;
    vehicleId: string;
    currentCoordinate: { lat: number; lng: number };
    speedKmH: number;
    lastUpdated: string; // HH:mm:ss
    statusMessage: string;
}

// --- Combined Detailed Model (used by Detail Pelacakan Akun/Admin) ---

interface ShipmentDetailModel extends ShipmentTrackingModel {
    senderInfo: RecipientModel;
    receiverInfo: RecipientModel;
    packageDetails: Omit<PackageDetailModel, 'packageType'> & { typeName: string };
    detailedTrackingHistory: TrackingHistoryEventModel[];
    serviceName: string;
    totalPaidIDR: number;
    deliveryVehicle: string;
}


// --- Data ---

export const MOCK_TRACKING_NUMBERS = [
    'SNT891234710',
    'SNT891234711',
    'SNT891234712',
    'SNT891234713',
];

const MOCK_HISTORY_EVENTS: TrackingHistoryEventModel[] = [
    {
        timestamp: "2025-12-02 10:00:00 WIB",
        location: "Jakarta Selatan, Indonesia",
        status: "Paket Ditunda",
        details: "Menunggu penjemputan oleh kurir otonom.",
    },
    {
        timestamp: "2025-12-02 14:30:00 WIB",
        location: "Hub Distribusi Jakarta (JDC-1)",
        status: "Paket Diambil",
        details: "Paket telah diterima dan melewati pemindaian dimensi/berat.",
    },
    {
        timestamp: "2025-12-02 16:00:00 WIB",
        location: "Pusat Transfer Udara (PTU-AERO)",
        status: "Transfer Armada",
        details: "Dipindahkan ke armada Drone Kilat Max untuk pengiriman cepat ke Bandung.",
    },
    {
        timestamp: "2025-12-02 17:30:00 WIB",
        location: "Regional Sorting Center Bandung",
        status: "Transit",
        details: "Tiba di pusat sortir regional Bandung.",
    },
    {
        timestamp: "2025-12-03 08:30:00 WIB",
        location: "Eco Central Park, Citarum, Bandung",
        status: "Ready for Delivery",
        details: "Menunggu penugasan kurir lokal.",
    },
];

const MOCK_SHIPMENT_DETAILS: ShipmentDetailModel = {
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
    detailedTrackingHistory: MOCK_HISTORY_EVENTS,
    serviceName: 'Drone Kilat Max',
    totalPaidIDR: 142500,
    deliveryVehicle: "Autonomous Drone S-7",
};

export const MOCK_SHIPMENT_TRACKING_SUMMARY: ShipmentTrackingModel = {
    resiNumber: MOCK_SHIPMENT_DETAILS.resiNumber,
    status: MOCK_SHIPMENT_DETAILS.status,
    currentLocation: MOCK_SHIPMENT_DETAILS.currentLocation,
    originCity: MOCK_SHIPMENT_DETAILS.originCity,
    destinationCity: MOCK_SHIPMENT_DETAILS.destinationCity,
    estimatedDelivery: MOCK_SHIPMENT_DETAILS.estimatedDelivery,
    isMappable: MOCK_SHIPMENT_DETAILS.isMappable,
    // Note: Does not contain the full history or sensitive details
};

export const MOCK_REAL_TIME_LOCATION: RealTimeLocationModel = {
    resiNumber: 'SNT891234710',
    vehicleId: 'DRN-S-7-BDG-002',
    currentCoordinate: {
        lat: -6.9080,
        lng: 107.6180,
    },
    speedKmH: 85,
    lastUpdated: "09:15:30",
    statusMessage: "Kurir memasuki zona pengiriman 1 km radius dari tujuan.",
};

export const MOCK_REAL_TIME_MAP_IMAGE: string = "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/7ebe1eff-8f96-4e24-b104-437c7bcee1e3.png";

// Re-export for convenience
export type { ShipmentTrackingModel, TrackingHistoryEventModel, ShipmentDetailModel, RealTimeLocationModel };
        
      
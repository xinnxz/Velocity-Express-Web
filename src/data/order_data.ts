
        
import { CourierServiceModel } from './carrier_services';

// --- Interfaces ---

interface LocationModel {
    addressLine1: string;
    city: string;
    province: string;
    postalCode: string;
    coordinate: {
        lat: number;
        lng: number;
    }
}

interface RecipientModel {
    name: string;
    phone: string;
    email?: string;
}

interface PackageTypeModel {
    id: string;
    name: string;
    iconName: string;
    description: string;
}

interface PackageDetailModel {
    packageType: PackageTypeModel;
    weightKg: number;
    lengthCm: number;
    widthCm: number;
    heightCm: number;
    declaredValueIDR: number;
    specialInstructions: string;
    isFragile: boolean;
}

interface OrderSummaryModel {
    orderId: string;
    sender: RecipientModel;
    origin: LocationModel;
    receiver: RecipientModel;
    destination: LocationModel;
    packageDetails: PackageDetailModel;
    selectedService: CourierServiceModel;
    totalCostIDR: number;
    estimatedDeliveryDate: string;
}

// --- Enum and Constants ---

export const AVAILABLE_PACKAGE_TYPES: PackageTypeModel[] = [
    {
        id: 'STD',
        name: 'Dokumen Standar',
        iconName: 'FileText',
        description: 'Untuk surat, dokumen, atau barang ringan tidak mudah pecah.'
    },
    {
        id: 'FRG',
        name: 'Barang Pecah Belah',
        iconName: 'GlassWater',
        description: 'Memerlukan penanganan ekstra hati-hati dan asuransi wajib.'
    },
    {
        id: 'ELEC',
        name: 'Perangkat Elektronik',
        iconName: 'Zap',
        description: 'Gadget, laptop, atau komponen berteknologi tinggi.'
    },
    {
        id: 'HVY',
        name: 'Barang Berat/Volume Besar',
        iconName: 'Box',
        description: 'Paket yang melebihi batas standar, dikirim menggunakan kargo khusus.'
    }
];

// --- Mock Data ---

export const MOCK_ORIGIN_LOCATION: LocationModel = {
    addressLine1: "Jl. Mega Kuningan Barat No. 12",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    postalCode: "12950",
    coordinate: {
        lat: -6.2255,
        lng: 106.8407,
    }
};

export const MOCK_DESTINATION_LOCATION: LocationModel = {
    addressLine1: "Eco Central Park Tower B, Unit 20A",
    city: "Bandung",
    province: "Jawa Barat",
    postalCode: "40115",
    coordinate: {
        lat: -6.9175,
        lng: 107.6191,
    }
};

export const MOCK_PACKAGE_DETAILS: PackageDetailModel = {
    packageType: AVAILABLE_PACKAGE_TYPES[2], // Electronic
    weightKg: 2.5,
    lengthCm: 30,
    widthCm: 20,
    heightCm: 15,
    declaredValueIDR: 15000000,
    specialInstructions: "Hanya terima oleh Sdr. Budi, harap tidak diletakkan di bawah sinar matahari langsung.",
    isFragile: true,
};

// A preliminary order summary (requires CourierServiceModel from carrier_services)
export const MOCK_ORDER_SUMMARY: OrderSummaryModel = {
    orderId: 'SNT-20251202-001234',
    sender: {
        name: 'PT. Sentra Digital Logistik',
        phone: '081234567890',
        email: 'sales@sentradigit.com'
    },
    origin: MOCK_ORIGIN_LOCATION,
    receiver: {
        name: 'Ibu Annisa Hidayat',
        phone: '085098765432'
    },
    destination: MOCK_DESTINATION_LOCATION,
    packageDetails: MOCK_PACKAGE_DETAILS,
    selectedService: {
        id: 2,
        name: "Drone Kilat Max",
        vehicleType: "Autonomous Drone",
        etaDays: 0.5,
        priceIDR: 125000,
        image: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/73972d1e-ee37-47e6-964c-9a9abf27421f.png",
        slogan: "Pengiriman 12 jam, tanpa hambatan darat.",
        maxWeightKg: 5,
        isGuaranteed: true,
        iconName: "Rocket",
    },
    totalCostIDR: 135000 + (MOCK_PACKAGE_DETAILS.declaredValueIDR * 0.005), // Example calculation
    estimatedDeliveryDate: "03 Desember 2025, 11:00 WIB",
}

// Re-export for convenience
export type { LocationModel, PackageDetailModel, OrderSummaryModel, RecipientModel };
        
      
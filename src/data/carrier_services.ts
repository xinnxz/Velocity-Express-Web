
        
// --- Interfaces ---

interface CourierServiceModel {
    id: number;
    name: string;
    vehicleType: 'Ground Car (Automated)' | 'Ground Van (Driver)' | 'Autonomous Drone' | 'Hypersonic Carrier';
    etaDays: number; // Estimated Time of Arrival in days (can be decimal for same-day/next-day)
    priceIDR: number;
    image: string;
    slogan: string;
    maxWeightKg: number;
    isGuaranteed: boolean;
    iconName: string;
}

// --- Data ---

export const AVAILABLE_COURIER_SERVICES: CourierServiceModel[] = [
    {
        id: 1,
        name: "Eco-Ground Standard",
        vehicleType: "Ground Van (Driver)",
        etaDays: 3,
        priceIDR: 25000,
        image: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/4254a49d-c4b5-46be-9b8b-d1b86a9effb8.png",
        slogan: "Pilihan hemat, pasti sampai tujuan.",
        maxWeightKg: 30,
        isGuaranteed: false,
        iconName: "Truck",
    },
    {
        id: 2,
        name: "Drone Kilat Max",
        vehicleType: "Autonomous Drone",
        etaDays: 0.5,
        priceIDR: 125000,
        image: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/8940a995-baef-4df1-ac02-cde1759f8a79.png",
        slogan: "Pengiriman 12 jam, tanpa hambatan darat.",
        maxWeightKg: 5,
        isGuaranteed: true,
        iconName: "Rocket",
    },
    {
        id: 3,
        name: "Automated Swift Car",
        vehicleType: "Ground Car (Automated)",
        etaDays: 1,
        priceIDR: 45000,
        image: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/532133af-71dc-4a35-b9fa-736f31cd8740.png",
        slogan: "Kecepatan premium dengan kendaraan otonom.",
        maxWeightKg: 10,
        isGuaranteed: true,
        iconName: "Car",
    },
    {
        id: 4,
        name: "HyperLoop Freight",
        vehicleType: "Hypersonic Carrier",
        etaDays: 0.25,
        priceIDR: 350000,
        image: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/4266f00a-01e7-46c3-8bd5-d978860c690d.png",
        slogan: "Ultra-cepat antar-pulau atau lintas benua.",
        maxWeightKg: 500,
        isGuaranteed: true,
        iconName: "Plane",
    }
];

// Re-export for convenience
export type { CourierServiceModel };
        
      
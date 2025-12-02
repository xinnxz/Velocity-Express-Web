
        
import { LucideIcon } from 'lucide-react';

// --- General Interfaces ---

interface FeatureModel {
    id: number;
    title: string;
    description: string;
    iconName: string;
}

interface FeatureCardModel extends FeatureModel {
    image: string;
    ctaLabel: string;
}

interface PromoModel {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    validUntil: string;
    backgroundColor: string;
}

interface SupportChannelModel {
    id: number;
    name: string;
    iconName: string;
    details: string;
    type: 'phone' | 'email' | 'chat';
}

// --- Data ---

export const HOME_PAGE_HERO = {
    title: "Pengiriman Masa Depan, Hari Ini",
    subtitle: "Solusi logistik profesional kelas enterprise dengan kendaraan otonom dan drone canggih.",
    image: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/ce0a4e62-551f-4bc0-9e16-ca002b34ea82.png",
    cta1: {
        label: "Lacak Pengiriman",
        url: "/track",
        iconName: "Search",
    },
    cta2: {
        label: "Buat Pesanan Baru",
        url: "/new-order",
        iconName: "Rocket",
    }
};

export const ORDER_START_STEPS: FeatureCardModel[] = [
    {
        id: 1,
        title: "Pilih Lokasi Cepat",
        description: "Tentukan lokasi penjemputan dan tujuan dengan akurasi peta digital.",
        iconName: "MapPin",
        image: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/38ad11a2-eb0e-42cb-a549-71057f725a28.png",
        ctaLabel: "Mulai Input Lokasi",
    },
    {
        id: 2,
        title: "Detail Paket Akurat",
        description: "Masukkan berat, dimensi, dan jenis barang untuk estimasi biaya terbaik.",
        iconName: "Weight",
        image: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/30061831-be11-405d-9d57-3233446a5109.png",
        ctaLabel: "Lihat Panduan Paket",
    },
    {
        id: 3,
        title: "Pilih Kurir Optimal",
        description: "Pilih dari layanan tercepat atau termurah, didukung armada canggih.",
        iconName: "Gauge",
        image: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/25b69919-c2a3-43d5-8433-fe9e80fe75ee.png",
        ctaLabel: "Bandingkan Layanan",
    },
];

export const FEATURED_PROMOS: PromoModel[] = [
    {
        id: 101,
        title: "Diskon Perdana Drone",
        subtitle: "Hemat 20% untuk pengiriman pertama menggunakan Layanan Ultra-Drone.",
        description: "Nikmati kecepatan maksimal untuk dokumen penting atau paket kecil.",
        image: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/86d783ff-cc5a-4a83-bdf8-b60fafca82c5.png",
        validUntil: "31/12/2025",
        backgroundColor: "#1e3a8a",
    },
    {
        id: 102,
        title: "Gratis Asuransi Premium",
        subtitle: "Lindungi paket berharga Anda tanpa biaya tambahan bulan ini.",
        description: "Asuransi coverage penuh hingga 100 Juta Rupiah untuk semua pengiriman kelas Enterprise.",
        image: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/2b2cbdfc-4a0d-43d9-acdf-379c345ca134.png",
        validUntil: "15/12/2025",
        backgroundColor: "#9d174d",
    },
];

export const PAYMENT_SUPPORT_CHANNELS: SupportChannelModel[] = [
    {
        id: 1,
        name: "Layanan Pelanggan 24/7",
        iconName: "Phone",
        details: "+62 800 123 777 (Bebas Pulsa)",
        type: 'phone',
    },
    {
        id: 2,
        name: "Dukungan Email",
        iconName: "Mail",
        details: "support@sentra.co.id",
        type: 'email',
    },
    {
        id: 3,
        name: "Live Chat",
        iconName: "MessageSquare",
        details: "Tanyakan langsung kepada bot AI kami untuk solusi instan.",
        type: 'chat',
    },
];

// Re-export for convenience
export type { FeatureCardModel, PromoModel, SupportChannelModel };
        
      
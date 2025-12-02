
        
import { LocationModel } from './order_data';
import { PaymentMethodModel } from './payment_data';

// --- Interfaces ---

interface UserProfileModel {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    memberSince: string;
    profilePictureUrl: string;
}

interface UserAddressModel extends LocationModel {
    id: number;
    label: string; // e.g., 'Rumah', 'Kantor'
    isDefault: boolean;
}

interface AccountSettingLinkModel {
    id: number;
    title: string;
    description: string;
    iconName: string;
    route: string;
}

interface SavedPaymentMethodSummary {
    id: number;
    lastFourDigits: string;
    expiryDate: string;
    provider: string; // Visa/Mastercard/Bank Name
    isDefault: boolean;
    type: 'Card' | 'Transfer' | 'E-Wallet';
}

interface NotificationSettingModel {
    key: string; // E.g., shipment_update, promo_alert
    label: string;
    channels: {
        push: boolean;
        email: boolean;
        sms: boolean;
    }
}


// --- Data ---

export const MOCK_USER_PROFILE: UserProfileModel = {
    id: 1001,
    fullName: "Annisa Dewi",
    email: "annisa.d@customer.com",
    phoneNumber: "+62 850 987 654 321",
    memberSince: "2025-11-10",
    profilePictureUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/632ed2de-d5a5-409d-8ee4-b5d04a9794a8.png",
};


export const ACCOUNT_SETTINGS_NAVIGATION: AccountSettingLinkModel[] = [
    {
        id: 1,
        title: "Edit Profil & Keamanan",
        description: "Ubah nama, kontak, dan kata sandi Anda.",
        iconName: "User",
        route: "/account/profile",
    },
    {
        id: 2,
        title: "Pengaturan Notifikasi",
        description: "Atur preferensi email dan notifikasi push.",
        iconName: "Bell",
        route: "/account/notifications",
    },
    {
        id: 3,
        title: "Riwayat Pesanan",
        description: "Lihat semua pengiriman yang telah dibuat.",
        iconName: "History",
        route: "/account/history",
    },
    {
        id: 4,
        title: "Metode Pembayaran Tersimpan",
        description: "Kelola kartu dan e-wallet yang tersimpan.",
        iconName: "CreditCard",
        route: "/account/payments",
    },
];

export const MOCK_SAVED_ADDRESSES: UserAddressModel[] = [
    {
        id: 1,
        label: "Kantor Utama (Default)",
        addressLine1: "Jl. Mega Kuningan Barat No. 12",
        city: "Jakarta Selatan",
        province: "DKI Jakarta",
        postalCode: "12950",
        coordinate: { lat: -6.2255, lng: 106.8407 },
        isDefault: true,
    },
    {
        id: 2,
        label: "Rumah Pribadi",
        addressLine1: "Eco Central Park Tower B, Unit 20A",
        city: "Bandung",
        province: "Jawa Barat",
        postalCode: "40115",
        coordinate: { lat: -6.9175, lng: 107.6191 },
        isDefault: false,
    },
];

export const MOCK_SAVED_PAYMENT_METHODS: SavedPaymentMethodSummary[] = [
    {
        id: 1,
        lastFourDigits: '4242',
        expiryDate: '12/28',
        provider: 'Visa',
        isDefault: true,
        type: 'Card',
    },
    {
        id: 2,
        lastFourDigits: '9012',
        expiryDate: '11/26',
        provider: 'BCA Virtual Account',
        isDefault: false,
        type: 'Transfer',
    },
];

export const MOCK_NOTIFICATION_SETTINGS: NotificationSettingModel[] = [
    {
        key: 'shipment_update',
        label: 'Pembaruan Status Pengiriman',
        channels: { push: true, email: true, sms: false }
    },
    {
        key: 'promo_alert',
        label: 'Peringatan Promo dan Diskon',
        channels: { push: true, email: false, sms: false }
    },
    {
        key: 'billing_invoice',
        label: 'Faktur dan Penagihan',
        channels: { push: false, email: true, sms: false }
    },
];

// Re-export for convenience
export type {
    UserProfileModel, UserAddressModel, AccountSettingLinkModel,
    SavedPaymentMethodSummary, NotificationSettingModel
};
        
      
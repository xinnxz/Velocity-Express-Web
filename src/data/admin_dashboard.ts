
        
// --- Interfaces ---

interface DashboardMetricModel {
    id: number;
    title: string;
    value: string;
    increasePercentage: number;
    iconName: string;
    description: string;
}

interface AdminNavigationItemModel {
    id: number;
    title: string;
    iconName: string;
    route: string;
}

interface UserModel {
    id: number;
    name: string;
    email: string;
    role: 'Customer' | 'Admin' | 'Supervisor' | 'Driver';
    status: 'Active' | 'Inactive' | 'Pending';
    signupDate: string;
    lastLogin: string;
    // Admin specific details
    internalID: string;
}

interface AdminShipmentSummaryModel {
    resiNumber: string;
    status: 'Pending' | 'In Transit' | 'Delivered' | 'Problem';
    customerName: string;
    serviceType: string;
    revenueIDR: number;
    assignment: string; // Driver/Vehicle assigned
}

interface TariffModel {
    id: number;
    serviceName: string;
    baseRateIDR: number;
    ratePerKgIDR: number;
    zoneCoverage: string; // e.g., 'Zone A (Jawa)'
    effectiveDate: string;
    status: 'Active' | 'Draft' | 'Archived';
}

interface TariffChangeHistoryModel {
    id: number;
    tariffId: number;
    changedField: string;
    oldValue: string;
    newValue: string;
    changedBy: string;
    timestamp: string;
}

interface ReportSummaryModel {
    id: number;
    name: string;
    description: string;
    iconName: string;
    lastRun: string;
    route: string;
}

interface ReportDataPointModel {
    label: string;
    value: number;
}

interface SystemSettingModel {
    id: number;
    name: string;
    key: string;
    value: string | boolean | number;
    type: 'text' | 'boolean' | 'number';
    description: string;
}


// --- Data ---

export const ADMIN_DASHBOARD_METRICS: DashboardMetricModel[] = [
    {
        id: 1,
        title: "Total Pengiriman (Bulan Ini)",
        value: "4,512",
        increasePercentage: 15.5,
        iconName: "Package",
        description: "Peningkatan volume pesanan dibandingkan bulan lalu.",
    },
    {
        id: 2,
        title: "Pendapatan Bersih (Bulan Ini)",
        value: "Rp 980 Juta",
        increasePercentage: 8.2,
        iconName: "Wallet",
        description: "Target pendapatan bulanan hampir tercapai.",
    },
    {
        id: 3,
        title: "Pengiriman Bermasalah (24 Jam)",
        value: "12",
        increasePercentage: -25.0, // Indikasi penurunan masalah
        iconName: "AlertTriangle",
        description: "Kasus masalah menurun drastis.",
    },
];

export const ADMIN_NAVIGATION_LINKS: AdminNavigationItemModel[] = [
    { id: 10, title: "Manajemen Pengguna", iconName: "Users", route: "/admin/users" },
    { id: 11, title: "Pemantauan Pengiriman", iconName: "Truck", route: "/admin/shipments" },
    { id: 12, title: "Pengaturan Tarif Layanan", iconName: "DollarSign", route: "/admin/tariffs" },
    { id: 13, title: "Laporan & Analitik", iconName: "BarChart3", route: "/admin/reports" },
];

export const MOCK_ADMIN_USERS: UserModel[] = [
    {
        id: 1, name: "Admin Utama", email: "admin.utama@sentra.co.id", role: 'Supervisor', status: 'Active',
        signupDate: '2023-01-15', lastLogin: '2025-12-02 09:00', internalID: 'SUP-001'
    },
    {
        id: 2, name: "Budi Santoso", email: "budi.s@sentra.co.id", role: 'Admin', status: 'Active',
        signupDate: '2024-05-20', lastLogin: '2025-12-01 15:30', internalID: 'ADM-015'
    },
    {
        id: 3, name: "Annisa Dewi", email: "annisa.d@customer.com", role: 'Customer', status: 'Active',
        signupDate: '2025-11-10', lastLogin: '2025-12-02 11:45', internalID: 'CUS-2019'
    },
];

export const MOCK_ADMIN_SHIPMENTS: AdminShipmentSummaryModel[] = [
    {
        resiNumber: 'SNT891234710',
        status: 'In Transit',
        customerName: 'Annisa Dewi',
        serviceType: 'Drone Kilat Max',
        revenueIDR: 142500,
        assignment: 'DRN-S-7-BDG-002',
    },
    {
        resiNumber: 'SNT891234714',
        status: 'Pending',
        customerName: 'Jaya Abadi PT',
        serviceType: 'Eco-Ground Standard',
        revenueIDR: 250000,
        assignment: 'VAN-JKT-08',
    },
    {
        resiNumber: 'SNT891234715',
        status: 'Delivered',
        customerName: 'Rudi Hartono',
        serviceType: 'Automated Swift Car',
        revenueIDR: 45000,
        assignment: 'CAR-BDG-01',
    },
];

export const MOCK_TARIFFS: TariffModel[] = [
    {
        id: 1,
        serviceName: 'Eco-Ground Standard (Jawa)',
        baseRateIDR: 15000,
        ratePerKgIDR: 5000,
        zoneCoverage: 'Zone A (Jawa & Sumatera Selatan)',
        effectiveDate: '2025-01-01',
        status: 'Active',
    },
    {
        id: 2,
        serviceName: 'Drone Kilat Max (Jabodetabek)',
        baseRateIDR: 100000,
        ratePerKgIDR: 15000,
        zoneCoverage: 'Zone B (Urban Priority)',
        effectiveDate: '2025-10-15',
        status: 'Active',
    },
];

export const MOCK_TARIFF_HISTORY: TariffChangeHistoryModel[] = [
    {
        id: 1,
        tariffId: 1,
        changedField: 'ratePerKgIDR',
        oldValue: 'Rp 4,500',
        newValue: 'Rp 5,000',
        changedBy: 'Admin Utama',
        timestamp: '2025-08-01 10:00:00'
    },
    {
        id: 2,
        tariffId: 2,
        changedField: 'baseRateIDR',
        oldValue: 'Rp 110,000',
        newValue: 'Rp 100,000',
        changedBy: 'Budi Santoso',
        timestamp: '2025-10-15 14:22:00'
    },
];

export const MOCK_REPORTS: ReportSummaryModel[] = [
    {
        id: 1,
        name: "Kinerja Pengiriman Bulanan",
        description: "Rasio On-Time Delivery (OTD) dan rincian keterlambatan per zona.",
        iconName: "LineChart",
        lastRun: "2025-12-02 08:00",
        route: "/admin/reports/performance",
    },
    {
        id: 2,
        name: "Laporan Keuangan Transaksi",
        description: "Detail pendapatan dan biaya operasional per layanan.",
        iconName: "Receipt",
        lastRun: "2025-11-30 23:59",
        route: "/admin/reports/finance",
    },
];

export const MOCK_REPORT_DATA_POINTS: ReportDataPointModel[] = [
    { label: "Jan", value: 400 },
    { label: "Feb", value: 450 },
    { label: "Mar", value: 600 },
    { label: "Apr", value: 550 },
    { label: "Mei", value: 700 },
    { label: "Jun", value: 850 },
    { label: "Jul", value: 900 },
    { label: "Agu", value: 750 },
    { label: "Sep", value: 950 },
    { label: "Okt", value: 1050 },
    { label: "Nov", value: 1200 },
    { label: "Des (Proyeksi)", value: 1300 },
];

export const MOCK_SYSTEM_SETTINGS: SystemSettingModel[] = [
    {
        id: 1,
        name: "Mode Pemeliharaan",
        key: "maintenance_mode",
        value: false,
        type: 'boolean',
        description: "Aktifkan untuk menampilkan halaman 'sedang dalam pemeliharaan' kepada pengguna."
    },
    {
        id: 2,
        name: "Batas Berat Maksimum (Kg)",
        key: "max_weight_standard",
        value: 30,
        type: 'number',
        description: "Batas berat untuk layanan pengiriman standar (non-kargo)."
    },
    {
        id: 3,
        name: "URL Integrasi Pembayaran Pihak Ketiga",
        key: "payment_third_party_url",
        value: "https://api.gateway.com/sentra",
        type: 'text',
        description: "Endpoint API untuk memproses transaksi pembayaran eksternal."
    },
];

// Re-export for convenience
export type {
    DashboardMetricModel, AdminNavigationItemModel, UserModel, AdminShipmentSummaryModel, TariffModel,
    TariffChangeHistoryModel, ReportSummaryModel, ReportDataPointModel, SystemSettingModel
};
        
      
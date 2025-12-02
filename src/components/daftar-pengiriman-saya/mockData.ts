
export type TrackingStatus = 
  | 'pending' 
  | 'picked_up' 
  | 'in_transit' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'failed' 
  | 'cancelled'

export type ServiceType = 'regular' | 'express' | 'drone'

export interface Shipment {
  id: string
  trackingNumber: string
  status: TrackingStatus
  service: ServiceType
  senderName: string
  senderPhone: string
  senderAddress: string
  recipientName: string
  recipientPhone: string
  destination: string
  packageWeight: number
  packageDimensions: string
  totalCost: number
  createdAt: string
  estimatedDelivery: string
  lastUpdate: string
  currentLocation?: string
}

export const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'VEL-2024-001234',
    status: 'in_transit',
    service: 'express',
    senderName: 'PT Teknologi Indonesia',
    senderPhone: '021-1234567',
    senderAddress: 'Jl. Sudirman No. 123, Jakarta Pusat',
    recipientName: 'Budi Santoso',
    recipientPhone: '0812-3456789',
    destination: 'Jl. Gatot Subroto No. 456, Jakarta Selatan',
    packageWeight: 2.5,
    packageDimensions: '30x20x15 cm',
    totalCost: 125000,
    createdAt: '2024-01-15',
    estimatedDelivery: '2024-01-16',
    lastUpdate: '2024-01-15 14:30',
    currentLocation: 'Pusat Distribusi Jakarta Timur',
  },
  {
    id: '2',
    trackingNumber: 'VEL-2024-001235',
    status: 'out_for_delivery',
    service: 'regular',
    senderName: 'Toko Online Maju',
    senderPhone: '021-9876543',
    senderAddress: 'Jl. Hayam Wuruk No. 789, Jakarta Pusat',
    recipientName: 'Siti Nurhaliza',
    recipientPhone: '0813-9876543',
    destination: 'Jl. Merdeka No. 321, Bandung',
    packageWeight: 1.2,
    packageDimensions: '25x15x10 cm',
    totalCost: 85000,
    createdAt: '2024-01-14',
    estimatedDelivery: '2024-01-16',
    lastUpdate: '2024-01-15 10:15',
    currentLocation: 'Kota Bandung',
  },
  {
    id: '3',
    trackingNumber: 'VEL-2024-001236',
    status: 'delivered',
    service: 'drone',
    senderName: 'E-Commerce Besar',
    senderPhone: '021-5555555',
    senderAddress: 'Jl. Jenderal Sudirman No. 999, Jakarta Pusat',
    recipientName: 'Ahmad Wijaya',
    recipientPhone: '0814-1111111',
    destination: 'Jl. Diponegoro No. 555, Jakarta Timur',
    packageWeight: 0.8,
    packageDimensions: '20x15x10 cm',
    totalCost: 95000,
    createdAt: '2024-01-13',
    estimatedDelivery: '2024-01-14',
    lastUpdate: '2024-01-14 16:45',
    currentLocation: 'Alamat Penerima',
  },
  {
    id: '4',
    trackingNumber: 'VEL-2024-001237',
    status: 'picked_up',
    service: 'express',
    senderName: 'Perusahaan Logistik ABC',
    senderPhone: '021-3333333',
    senderAddress: 'Jl. Gatot Subroto No. 111, Jakarta Selatan',
    recipientName: 'Rina Kusuma',
    recipientPhone: '0815-2222222',
    destination: 'Jl. Ahmad Yani No. 222, Surabaya',
    packageWeight: 3.5,
    packageDimensions: '40x30x20 cm',
    totalCost: 175000,
    createdAt: '2024-01-15',
    estimatedDelivery: '2024-01-17',
    lastUpdate: '2024-01-15 09:00',
    currentLocation: 'Pusat Distribusi Jakarta Pusat',
  },
  {
    id: '5',
    trackingNumber: 'VEL-2024-001238',
    status: 'pending',
    service: 'regular',
    senderName: 'Toko Retail Kecil',
    senderPhone: '021-7777777',
    senderAddress: 'Jl. Merdeka No. 333, Jakarta Pusat',
    recipientName: 'Dewi Lestari',
    recipientPhone: '0816-3333333',
    destination: 'Jl. Sudirman No. 444, Medan',
    packageWeight: 2.0,
    packageDimensions: '35x25x15 cm',
    totalCost: 145000,
    createdAt: '2024-01-15',
    estimatedDelivery: '2024-01-18',
    lastUpdate: '2024-01-15 08:30',
  },
  {
    id: '6',
    trackingNumber: 'VEL-2024-001239',
    status: 'delivered',
    service: 'express',
    senderName: 'Distributor Elektronik',
    senderPhone: '021-4444444',
    senderAddress: 'Jl. Hayam Wuruk No. 666, Jakarta Pusat',
    recipientName: 'Hendra Gunawan',
    recipientPhone: '0817-4444444',
    destination: 'Jl. Diponegoro No. 777, Yogyakarta',
    packageWeight: 1.5,
    packageDimensions: '28x18x12 cm',
    totalCost: 135000,
    createdAt: '2024-01-12',
    estimatedDelivery: '2024-01-14',
    lastUpdate: '2024-01-14 13:20',
    currentLocation: 'Alamat Penerima',
  },
  {
    id: '7',
    trackingNumber: 'VEL-2024-001240',
    status: 'in_transit',
    service: 'drone',
    senderName: 'Startup Teknologi',
    senderPhone: '021-8888888',
    senderAddress: 'Jl. Sudirman No. 888, Jakarta Pusat',
    recipientName: 'Farah Azizah',
    recipientPhone: '0818-5555555',
    destination: 'Jl. Gatot Subroto No. 999, Jakarta Selatan',
    packageWeight: 0.5,
    packageDimensions: '15x10x8 cm',
    totalCost: 105000,
    createdAt: '2024-01-15',
    estimatedDelivery: '2024-01-15',
    lastUpdate: '2024-01-15 15:45',
    currentLocation: 'Udara - Rute Jakarta Selatan',
  },
  {
    id: '8',
    trackingNumber: 'VEL-2024-001241',
    status: 'failed',
    service: 'regular',
    senderName: 'Toko Fashion Online',
    senderPhone: '021-2222222',
    senderAddress: 'Jl. Merdeka No. 111, Jakarta Pusat',
    recipientName: 'Gita Permata',
    recipientPhone: '0819-6666666',
    destination: 'Jl. Ahmad Yani No. 333, Semarang',
    packageWeight: 1.8,
    packageDimensions: '32x22x14 cm',
    totalCost: 95000,
    createdAt: '2024-01-10',
    estimatedDelivery: '2024-01-12',
    lastUpdate: '2024-01-12 11:00',
  },
  {
    id: '9',
    trackingNumber: 'VEL-2024-001242',
    status: 'cancelled',
    service: 'express',
    senderName: 'Perusahaan Manufaktur',
    senderPhone: '021-6666666',
    senderAddress: 'Jl. Jenderal Sudirman No. 222, Jakarta Pusat',
    recipientName: 'Irfan Harahap',
    recipientPhone: '0820-7777777',
    destination: 'Jl. Diponegoro No. 444, Bandung',
    packageWeight: 4.2,
    packageDimensions: '45x35x25 cm',
    totalCost: 195000,
    createdAt: '2024-01-08',
    estimatedDelivery: '2024-01-10',
    lastUpdate: '2024-01-09 09:30',
  },
  {
    id: '10',
    trackingNumber: 'VEL-2024-001243',
    status: 'delivered',
    service: 'regular',
    senderName: 'Supplier Barang Umum',
    senderPhone: '021-1111111',
    senderAddress: 'Jl. Hayam Wuruk No. 444, Jakarta Pusat',
    recipientName: 'Joko Susilo',
    recipientPhone: '0821-8888888',
    destination: 'Jl. Sudirman No. 555, Malang',
    packageWeight: 2.3,
    packageDimensions: '33x23x16 cm',
    totalCost: 125000,
    createdAt: '2024-01-11',
    estimatedDelivery: '2024-01-13',
    lastUpdate: '2024-01-13 14:15',
    currentLocation: 'Alamat Penerima',
  },
]

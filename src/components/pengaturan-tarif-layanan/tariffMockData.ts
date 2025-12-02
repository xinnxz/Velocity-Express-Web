
export interface Tariff {
  id: string
  name: string
  description: string
  serviceType: 'Regular' | 'Express' | 'Drone' | 'Same Day'
  basePrice: number
  additionalFee: number
  discountPercentage: number
  estimatedDays: number
  maxWeight: number
  isActive: boolean
  effectiveDate: string
  createdAt: string
  updatedAt: string
}

export const mockTariffs: Tariff[] = [
  {
    id: 'tariff_001',
    name: 'Regular Jakarta - Bandung',
    description: 'Pengiriman reguler untuk rute Jakarta ke Bandung dengan estimasi 2-3 hari kerja',
    serviceType: 'Regular',
    basePrice: 25000,
    additionalFee: 5000,
    discountPercentage: 0,
    estimatedDays: 3,
    maxWeight: 30,
    isActive: true,
    effectiveDate: '2024-01-01',
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'tariff_002',
    name: 'Express Jakarta - Surabaya',
    description: 'Pengiriman express dengan drone untuk rute Jakarta ke Surabaya, pengiriman dalam 1 hari',
    serviceType: 'Express',
    basePrice: 75000,
    additionalFee: 15000,
    discountPercentage: 5,
    estimatedDays: 1,
    maxWeight: 20,
    isActive: true,
    effectiveDate: '2024-01-05',
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: 'tariff_003',
    name: 'Drone Delivery Jakarta',
    description: 'Pengiriman menggunakan drone untuk area Jakarta dan sekitarnya, pengiriman same-day',
    serviceType: 'Drone',
    basePrice: 50000,
    additionalFee: 10000,
    discountPercentage: 10,
    estimatedDays: 0,
    maxWeight: 5,
    isActive: true,
    effectiveDate: '2024-01-10',
    createdAt: '2024-01-10T11:20:00Z',
    updatedAt: '2024-01-18T16:00:00Z',
  },
  {
    id: 'tariff_004',
    name: 'Same Day Jakarta',
    description: 'Pengiriman same-day untuk area Jakarta dengan jaminan pengiriman hari yang sama',
    serviceType: 'Same Day',
    basePrice: 40000,
    additionalFee: 8000,
    discountPercentage: 0,
    estimatedDays: 0,
    maxWeight: 15,
    isActive: true,
    effectiveDate: '2024-01-08',
    createdAt: '2024-01-08T07:30:00Z',
    updatedAt: '2024-01-22T09:00:00Z',
  },
  {
    id: 'tariff_005',
    name: 'Regular Bandung - Yogyakarta',
    description: 'Pengiriman reguler untuk rute Bandung ke Yogyakarta dengan estimasi 2 hari kerja',
    serviceType: 'Regular',
    basePrice: 30000,
    additionalFee: 6000,
    discountPercentage: 0,
    estimatedDays: 2,
    maxWeight: 30,
    isActive: true,
    effectiveDate: '2024-01-12',
    createdAt: '2024-01-12T10:45:00Z',
    updatedAt: '2024-01-19T13:20:00Z',
  },
  {
    id: 'tariff_006',
    name: 'Express Surabaya - Medan',
    description: 'Pengiriman express untuk rute Surabaya ke Medan dengan estimasi 2 hari',
    serviceType: 'Express',
    basePrice: 85000,
    additionalFee: 18000,
    discountPercentage: 8,
    estimatedDays: 2,
    maxWeight: 20,
    isActive: false,
    effectiveDate: '2024-02-01',
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-25T15:30:00Z',
  },
  {
    id: 'tariff_007',
    name: 'Drone Delivery Bandung',
    description: 'Pengiriman menggunakan drone untuk area Bandung dan sekitarnya',
    serviceType: 'Drone',
    basePrice: 45000,
    additionalFee: 9000,
    discountPercentage: 12,
    estimatedDays: 0,
    maxWeight: 5,
    isActive: true,
    effectiveDate: '2024-01-14',
    createdAt: '2024-01-14T08:15:00Z',
    updatedAt: '2024-01-21T11:45:00Z',
  },
  {
    id: 'tariff_008',
    name: 'Same Day Bandung',
    description: 'Pengiriman same-day untuk area Bandung dengan jaminan pengiriman hari yang sama',
    serviceType: 'Same Day',
    basePrice: 35000,
    additionalFee: 7000,
    discountPercentage: 5,
    estimatedDays: 0,
    maxWeight: 15,
    isActive: true,
    effectiveDate: '2024-01-16',
    createdAt: '2024-01-16T09:30:00Z',
    updatedAt: '2024-01-23T14:15:00Z',
  },
]

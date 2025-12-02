
export interface RateChangeHistory {
  id: string
  changedAt: string
  serviceName: string
  changedBy: string
  oldValue: string
  newValue: string
  changeType: 'price_update' | 'discount_update' | 'surcharge_update' | 'service_added' | 'service_removed'
  notes?: string
}

export const mockRateChangeHistory: RateChangeHistory[] = [
  {
    id: 'RCH-2024-001',
    changedAt: '2024-01-15T14:30:00',
    serviceName: 'Express Same Day',
    changedBy: 'Admin Budi',
    oldValue: 'Rp 50.000',
    newValue: 'Rp 55.000',
    changeType: 'price_update',
    notes: 'Penyesuaian harga berdasarkan inflasi bahan bakar'
  },
  {
    id: 'RCH-2024-002',
    changedAt: '2024-01-14T10:15:00',
    serviceName: 'Regular Delivery',
    changedBy: 'Admin Siti',
    oldValue: '0%',
    newValue: '5%',
    changeType: 'discount_update',
    notes: 'Promo pelanggan setia'
  },
  {
    id: 'RCH-2024-003',
    changedAt: '2024-01-13T16:45:00',
    serviceName: 'Drone Delivery',
    changedBy: 'Admin Rudi',
    oldValue: 'Rp 100.000',
    newValue: 'Rp 120.000',
    changeType: 'price_update',
    notes: 'Peningkatan biaya operasional drone'
  },
  {
    id: 'RCH-2024-004',
    changedAt: '2024-01-12T09:20:00',
    serviceName: 'Overnight Delivery',
    changedBy: 'Admin Budi',
    oldValue: 'Rp 75.000',
    newValue: 'Rp 80.000',
    changeType: 'price_update'
  },
  {
    id: 'RCH-2024-005',
    changedAt: '2024-01-11T13:00:00',
    serviceName: 'Premium Handling',
    changedBy: 'Admin Siti',
    oldValue: 'Rp 25.000',
    newValue: 'Rp 30.000',
    changeType: 'surcharge_update',
    notes: 'Biaya penanganan khusus untuk barang fragile'
  },
  {
    id: 'RCH-2024-006',
    changedAt: '2024-01-10T11:30:00',
    serviceName: 'International Shipping',
    changedBy: 'Admin Rudi',
    oldValue: 'Tidak Ada',
    newValue: 'Aktif',
    changeType: 'service_added',
    notes: 'Peluncuran layanan pengiriman internasional'
  },
  {
    id: 'RCH-2024-007',
    changedAt: '2024-01-09T15:45:00',
    serviceName: 'Express Same Day',
    changedBy: 'Admin Budi',
    oldValue: '10%',
    newValue: '8%',
    changeType: 'discount_update',
    notes: 'Penyesuaian diskon musiman'
  },
  {
    id: 'RCH-2024-008',
    changedAt: '2024-01-08T08:00:00',
    serviceName: 'Local Delivery',
    changedBy: 'Admin Siti',
    oldValue: 'Rp 30.000',
    newValue: 'Rp 35.000',
    changeType: 'price_update'
  },
  {
    id: 'RCH-2024-009',
    changedAt: '2024-01-07T12:15:00',
    serviceName: 'Bulk Shipping',
    changedBy: 'Admin Rudi',
    oldValue: 'Rp 15.000/item',
    newValue: 'Rp 12.000/item',
    changeType: 'price_update',
    notes: 'Diskon untuk pengiriman dalam jumlah besar'
  },
  {
    id: 'RCH-2024-010',
    changedAt: '2024-01-06T14:30:00',
    serviceName: 'Weekend Delivery',
    changedBy: 'Admin Budi',
    oldValue: 'Aktif',
    newValue: 'Tidak Ada',
    changeType: 'service_removed',
    notes: 'Penghentian layanan pengiriman akhir pekan'
  },
  {
    id: 'RCH-2024-011',
    changedAt: '2024-01-05T10:00:00',
    serviceName: 'Express Same Day',
    changedBy: 'Admin Siti',
    oldValue: 'Rp 55.000',
    newValue: 'Rp 52.000',
    changeType: 'price_update',
    notes: 'Penyesuaian harga kompetitif'
  },
  {
    id: 'RCH-2024-012',
    changedAt: '2024-01-04T16:20:00',
    serviceName: 'Drone Delivery',
    changedBy: 'Admin Rudi',
    oldValue: '0%',
    newValue: '3%',
    changeType: 'discount_update',
    notes: 'Promosi peluncuran layanan drone'
  },
  {
    id: 'RCH-2024-013',
    changedAt: '2024-01-03T09:45:00',
    serviceName: 'Regular Delivery',
    changedBy: 'Admin Budi',
    oldValue: 'Rp 40.000',
    newValue: 'Rp 42.000',
    changeType: 'price_update'
  },
  {
    id: 'RCH-2024-014',
    changedAt: '2024-01-02T13:30:00',
    serviceName: 'Overnight Delivery',
    changedBy: 'Admin Siti',
    oldValue: 'Rp 80.000',
    newValue: 'Rp 85.000',
    changeType: 'price_update',
    notes: 'Penyesuaian harga tahun baru'
  },
  {
    id: 'RCH-2024-015',
    changedAt: '2024-01-01T08:00:00',
    serviceName: 'Premium Handling',
    changedBy: 'Admin Rudi',
    oldValue: 'Rp 30.000',
    newValue: 'Rp 35.000',
    changeType: 'surcharge_update',
    notes: 'Peningkatan biaya penanganan khusus'
  },
  {
    id: 'RCH-2023-016',
    changedAt: '2023-12-28T11:00:00',
    serviceName: 'Local Delivery',
    changedBy: 'Admin Budi',
    oldValue: 'Rp 35.000',
    newValue: 'Rp 38.000',
    changeType: 'price_update'
  },
  {
    id: 'RCH-2023-017',
    changedAt: '2023-12-25T15:30:00',
    serviceName: 'Express Same Day',
    changedBy: 'Admin Siti',
    oldValue: '8%',
    newValue: '12%',
    changeType: 'discount_update',
    notes: 'Diskon spesial hari raya'
  },
  {
    id: 'RCH-2023-018',
    changedAt: '2023-12-20T10:15:00',
    serviceName: 'Bulk Shipping',
    changedBy: 'Admin Rudi',
    oldValue: 'Rp 12.000/item',
    newValue: 'Rp 10.000/item',
    changeType: 'price_update',
    notes: 'Promosi akhir tahun'
  },
  {
    id: 'RCH-2023-019',
    changedAt: '2023-12-15T14:45:00',
    serviceName: 'Drone Delivery',
    changedBy: 'Admin Budi',
    oldValue: 'Rp 120.000',
    newValue: 'Rp 115.000',
    changeType: 'price_update',
    notes: 'Penyesuaian harga kompetitif'
  },
  {
    id: 'RCH-2023-020',
    changedAt: '2023-12-10T09:00:00',
    serviceName: 'Overnight Delivery',
    changedBy: 'Admin Siti',
    oldValue: 'Rp 85.000',
    newValue: 'Rp 88.000',
    changeType: 'price_update'
  }
]

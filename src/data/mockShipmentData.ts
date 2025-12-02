
export type ShipmentStatus = 
  | 'pending' 
  | 'picked_up' 
  | 'in_transit' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'failed' 
  | 'cancelled'

export interface ShipmentDetail {
  id: string
  trackingNumber: string
  status: ShipmentStatus
  createdDate: string
  estimatedDeliveryDate: string
  actualDeliveryDate?: string
  
  sender: {
    name: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
  
  recipient: {
    name: string
    phone: string
  }
  
  destination: {
    address: string
    city: string
    postalCode: string
  }
  
  package: {
    type: string
    weight: number
    dimensions: string
    description: string
  }
  
  service: {
    id: string
    name: string
    type: 'regular' | 'express' | 'drone'
    estimatedDays: number
  }
  
  cost: number
  specialInstructions?: string
  
  trackingHistory: Array<{
    timestamp: string
    status: ShipmentStatus
    location: string
    description: string
  }>
}

export const mockShipmentDetail: ShipmentDetail = {
  id: 'ship_001',
  trackingNumber: 'VEL-2024-001234',
  status: 'picked_up',
  createdDate: '2024-01-15T08:30:00Z',
  estimatedDeliveryDate: '2024-01-18T17:00:00Z',
  
  sender: {
    name: 'PT Teknologi Indonesia',
    phone: '+62812345678',
    address: 'Jl. Sudirman No. 123, Gedung A',
    city: 'Jakarta Pusat',
    postalCode: '12190'
  },
  
  recipient: {
    name: 'Budi Santoso',
    phone: '+62821987654'
  },
  
  destination: {
    address: 'Jl. Gatot Subroto No. 456, Apartemen B, Unit 12B',
    city: 'Jakarta Selatan',
    postalCode: '12950'
  },
  
  package: {
    type: 'Elektronik',
    weight: 2.5,
    dimensions: '30x20x15 cm',
    description: 'Laptop dan aksesori'
  },
  
  service: {
    id: 'svc_express',
    name: 'VeloCity Express',
    type: 'express',
    estimatedDays: 1
  },
  
  cost: 125000,
  specialInstructions: 'Hubungi sebelum tiba, letakkan di depan pintu jika tidak ada yang menjawab',
  
  trackingHistory: [
    {
      timestamp: '2024-01-15T08:30:00Z',
      status: 'pending',
      location: 'Jakarta Pusat',
      description: 'Pesanan dibuat'
    },
    {
      timestamp: '2024-01-15T10:15:00Z',
      status: 'picked_up',
      location: 'Jakarta Pusat',
      description: 'Paket dijemput dari pengirim'
    },
    {
      timestamp: '2024-01-15T14:45:00Z',
      status: 'in_transit',
      location: 'Jakarta Pusat',
      description: 'Paket dalam perjalanan ke pusat distribusi'
    }
  ]
}

export const mockShipmentList: ShipmentDetail[] = [
  mockShipmentDetail,
  {
    ...mockShipmentDetail,
    id: 'ship_002',
    trackingNumber: 'VEL-2024-001235',
    status: 'in_transit',
    createdDate: '2024-01-14T09:00:00Z',
    estimatedDeliveryDate: '2024-01-17T17:00:00Z',
    recipient: { name: 'Siti Nurhaliza', phone: '+62822111222' },
    destination: {
      address: 'Jl. Thamrin No. 789, Ruko C',
      city: 'Jakarta Pusat',
      postalCode: '12210'
    },
    cost: 95000
  },
  {
    ...mockShipmentDetail,
    id: 'ship_003',
    trackingNumber: 'VEL-2024-001236',
    status: 'delivered',
    createdDate: '2024-01-10T08:00:00Z',
    estimatedDeliveryDate: '2024-01-12T17:00:00Z',
    actualDeliveryDate: '2024-01-12T16:30:00Z',
    recipient: { name: 'Ahmad Wijaya', phone: '+62823333444' },
    destination: {
      address: 'Jl. Rasuna Said No. 321, Gedung D',
      city: 'Jakarta Selatan',
      postalCode: '12940'
    },
    cost: 85000
  }
]

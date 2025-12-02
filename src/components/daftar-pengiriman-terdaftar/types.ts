
export type TrackingStatus = 
  | 'pending' 
  | 'picked_up' 
  | 'in_transit' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'failed' 
  | 'cancelled'

export interface Address {
  name: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
}

export interface Shipment {
  id: string
  trackingNumber: string
  sender: Address
  recipient: Address
  status: TrackingStatus
  service: string
  cost: number
  weight: number
  createdAt: string
  estimatedDelivery: string
  lastUpdate: string
}

export interface FilterState {
  status: 'all' | TrackingStatus
  dateFrom: string
  dateTo: string
}

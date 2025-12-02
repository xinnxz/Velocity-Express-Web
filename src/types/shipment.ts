
export type TrackingStatus = 
  | 'pending' 
  | 'picked_up' 
  | 'in_transit' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'failed' 
  | 'cancelled'

export type ServiceType = 'regular' | 'express' | 'drone' | 'same_day'

export interface Shipment {
  id: string
  tracking_number: string
  status: TrackingStatus
  service_type: ServiceType
  sender_name: string
  sender_phone: string
  sender_address: string
  sender_city: string
  receiver_name: string
  receiver_phone: string
  receiver_address: string
  receiver_city: string
  package_weight: number
  package_dimensions: {
    length: number
    width: number
    height: number
  }
  package_description: string
  amount: number
  created_at: string
  updated_at: string
  estimated_delivery: string
  actual_delivery?: string
  notes?: string
}

export interface TrackingEvent {
  id: string
  shipment_id: string
  status: TrackingStatus
  location: string
  timestamp: string
  notes?: string
}


'use client'

import SafeIcon from '@/components/common/SafeIcon'
import type { LocationModel } from '@/data/order_data'

interface MapDisplayProps {
  origin: LocationModel | null
  destination: LocationModel | null
  distance: number | null
}

export default function MapDisplay({ origin, destination, distance }: MapDisplayProps) {
  // Create a simple map visualization using SVG
  // In a real app, you'd use Google Maps, Mapbox, or Leaflet
  
  const getMapUrl = () => {
    if (!origin || !destination) return null
    
    // Using a simple map service URL (you can replace with actual map provider)
    const centerLat = (origin.coordinate.lat + destination.coordinate.lat) / 2
    const centerLng = (origin.coordinate.lng + destination.coordinate.lng) / 2
    const zoom = 10
    
    return `https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/54e19725-361c-477e-9c70-a5ecf00043c0.png`
  }

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="relative w-full h-96 bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
        {origin && destination ? (
          <>
            {/* Map Image */}
            <img
              src={getMapUrl() || ''}
              alt="Delivery Route Map"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-between p-4">
              {/* Top Info */}
              <div className="flex justify-between items-start">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
                  <p className="text-xs text-gray-300">Dari</p>
                  <p className="font-semibold text-sm">{origin.city}</p>
                </div>
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
                  <p className="text-xs text-gray-300">Ke</p>
                  <p className="font-semibold text-sm">{destination.city}</p>
                </div>
              </div>

              {/* Bottom Distance Info */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
                <div className="flex items-center gap-2">
                  <SafeIcon name="Route" className="w-4 h-4" />
                  <span className="text-sm font-semibold">{distance} km</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
            <SafeIcon name="Map" className="w-12 h-12 mb-2 opacity-50" />
            <p className="text-sm">Pilih lokasi untuk melihat peta</p>
          </div>
        )}
      </div>

      {/* Location Details */}
      {origin && destination && (
        <div className="grid grid-cols-2 gap-4">
          {/* Origin Card */}
          <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <SafeIcon name="MapPin" className="w-3 h-3 text-primary" />
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Penjemputan</p>
            </div>
            <p className="text-sm font-medium line-clamp-2">{origin.addressLine1}</p>
            <p className="text-xs text-muted-foreground mt-1">{origin.city}</p>
            <p className="text-xs text-muted-foreground/70 mt-2">
              {origin.coordinate.lat.toFixed(4)}°, {origin.coordinate.lng.toFixed(4)}°
            </p>
          </div>

          {/* Destination Card */}
          <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <SafeIcon name="MapPin" className="w-3 h-3 text-secondary" />
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Tujuan</p>
            </div>
            <p className="text-sm font-medium line-clamp-2">{destination.addressLine1}</p>
            <p className="text-xs text-muted-foreground mt-1">{destination.city}</p>
            <p className="text-xs text-muted-foreground/70 mt-2">
              {destination.coordinate.lat.toFixed(4)}°, {destination.coordinate.lng.toFixed(4)}°
            </p>
          </div>
        </div>
      )}
    </div>
  )
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'

interface Location {
  lat: number
  lng: number
  address: string
  timestamp: string
}

interface RealTimeTrackingMapProps {
  currentLocation: Location
  destination: string
}

export default function RealTimeTrackingMap({ 
  currentLocation, 
  destination 
}: RealTimeTrackingMapProps) {
  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <Card className="glass-effect border-border overflow-hidden">
      <CardHeader>
        <CardTitle>Peta Pelacakan</CardTitle>
        <CardDescription>Lokasi terkini paket Anda</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Container - Placeholder */}
        <div className="relative w-full h-96 rounded-lg overflow-hidden bg-muted/30 border border-border flex items-center justify-center">
          {/* Simulated map background */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40">
            {/* Grid pattern */}
            <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Map content */}
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            {/* Current location marker */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Pulse animation */}
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse" style={{
                  width: '60px',
                  height: '60px',
                  left: '-30px',
                  top: '-30px'
                }}></div>
                
                {/* Main marker */}
                <div className="w-6 h-6 rounded-full bg-primary border-2 border-primary-foreground shadow-lg neon-glow flex items-center justify-center">
                  <SafeIcon name="MapPin" className="w-3 h-3 text-primary-foreground" />
                </div>
              </div>
            </div>

            {/* Destination marker */}
            <div className="absolute bottom-1/4 right-1/4">
              <div className="w-5 h-5 rounded-full bg-secondary border-2 border-secondary-foreground shadow-lg flex items-center justify-center">
                <SafeIcon name="Flag" className="w-2.5 h-2.5 text-secondary-foreground" />
              </div>
            </div>

            {/* Route line */}
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              <line 
                x1="50%" 
                y1="33%" 
                x2="75%" 
                y2="75%" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                strokeDasharray="5,5"
                opacity="0.5"
              />
            </svg>

            {/* Map info overlay */}
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <div className="glass-effect rounded-lg p-3 backdrop-blur-md">
                <p className="text-xs text-muted-foreground mb-1">Lokasi Saat Ini</p>
                <p className="text-sm font-semibold line-clamp-2">{currentLocation.address}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTime(currentLocation.timestamp)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <p className="text-xs text-muted-foreground">Lokasi Saat Ini</p>
            </div>
            <p className="text-sm font-semibold line-clamp-2">{currentLocation.address}</p>
            <p className="text-xs text-muted-foreground">
              Koordinat: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <p className="text-xs text-muted-foreground">Tujuan</p>
            </div>
            <p className="text-sm font-semibold line-clamp-2">{destination}</p>
            <p className="text-xs text-muted-foreground">
              Jarak: ~2.5 km
            </p>
          </div>
        </div>

        {/* Map Controls */}
        <div className="flex gap-2 justify-center">
          <button className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            <SafeIcon name="Plus" className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            <SafeIcon name="Minus" className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            <SafeIcon name="Navigation" className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

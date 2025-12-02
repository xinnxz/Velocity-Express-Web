
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

interface TrackingMapSectionProps {
  location: {
    lat: number
    lng: number
    address: string
  }
}

export default function TrackingMapSection({ location }: TrackingMapSectionProps) {
  // Generate map image URL with location
  const mapImageUrl = `https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/e7cd5d8f-9826-4291-8b08-0ea2603be602.png`

  return (
    <div className="glass-effect rounded-lg overflow-hidden border border-border/50">
      {/* Map Container */}
      <div className="relative w-full h-96 bg-muted/20">
        <img
          src={mapImageUrl}
          alt="Peta lokasi paket"
          className="w-full h-full object-cover"
        />

        {/* Location Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-12 h-12 bg-primary rounded-full flex items-center justify-center border-2 border-primary/50 shadow-lg">
              <SafeIcon name="MapPin" className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Location Info Card */}
        <div className="absolute bottom-4 left-4 right-4 glass-effect rounded-lg p-3 border border-border/50 backdrop-blur-md">
          <div className="flex items-start gap-2">
            <SafeIcon name="MapPin" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-primary mb-1">Lokasi Terkini</p>
              <p className="text-sm text-foreground/90 truncate">{location.address}</p>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
            asChild
          >
            <a href="./pelacakan-real-time.html" title="Lihat pelacakan real-time">
              <SafeIcon name="Navigation" className="w-4 h-4" />
            </a>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
            title="Refresh lokasi"
          >
            <SafeIcon name="RotateCw" className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Map Info Footer */}
      <div className="bg-card/50 border-t border-border/50 p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Koordinat</p>
            <p className="text-sm font-semibold">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Akurasi</p>
            <p className="text-sm font-semibold">±50 meter</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Update Terakhir</p>
            <p className="text-sm font-semibold">2 menit lalu</p>
          </div>
        </div>
      </div>
    </div>
  )
}

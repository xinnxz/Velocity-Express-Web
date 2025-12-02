
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge, { type TrackingStatus } from '@/components/common/TrackingStatusBadge'

interface Courier {
  name: string
  vehicle: string
  phone: string
}

interface TrackingStatusCardProps {
  status: TrackingStatus
  estimatedArrival: string
  currentLocation: string
  courier: Courier
}

export default function TrackingStatusCard({
  status,
  estimatedArrival,
  currentLocation,
  courier
}: TrackingStatusCardProps) {
  // Calculate time remaining
  const now = new Date()
  const arrival = new Date(estimatedArrival)
  const diffMs = arrival.getTime() - now.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const hours = Math.floor(diffMins / 60)
  const mins = diffMins % 60

  const timeString = hours > 0 
    ? `${hours} jam ${mins} menit` 
    : `${mins} menit`

  return (
    <Card className="glass-effect border-border overflow-hidden">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Status Section */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Status Pengiriman</p>
            <div className="space-y-2">
              <TrackingStatusBadge status={status} showIcon={true} className="text-base py-2 px-3" />
              <p className="text-xs text-muted-foreground">
                Diperbarui {new Date().toLocaleTimeString('id-ID', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>

          {/* ETA Section */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Estimasi Tiba</p>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">{timeString}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {arrival.toLocaleTimeString('id-ID', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false
                })} hari ini
              </p>
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Lokasi Saat Ini</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <SafeIcon name="MapPin" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm line-clamp-2">{currentLocation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-border"></div>

        {/* Courier Info */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Informasi Kurir</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <SafeIcon name="User" className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Kurir</p>
                <p className="text-sm font-semibold truncate">{courier.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <SafeIcon name="Zap" className="w-5 h-5 text-secondary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Kendaraan</p>
                <p className="text-sm font-semibold truncate">{courier.vehicle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <SafeIcon name="Phone" className="w-5 h-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Telepon</p>
                <p className="text-sm font-semibold font-mono truncate">{courier.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

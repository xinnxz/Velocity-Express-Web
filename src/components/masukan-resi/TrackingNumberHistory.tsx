
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'

interface RecentTracking {
  id: string
  number: string
  status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed' | 'cancelled'
  lastUpdate: string
  destination: string
}

// Mock data for recent tracking history
const mockRecentTrackings: RecentTracking[] = [
  {
    id: '1',
    number: 'VEL20240001',
    status: 'delivered',
    lastUpdate: '2 jam yang lalu',
    destination: 'Jakarta Selatan'
  },
  {
    id: '2',
    number: 'VEL20240002',
    status: 'in_transit',
    lastUpdate: '30 menit yang lalu',
    destination: 'Bandung'
  },
  {
    id: '3',
    number: 'VEL20240003',
    status: 'out_for_delivery',
    lastUpdate: '15 menit yang lalu',
    destination: 'Tangerang'
  }
]

export default function TrackingNumberHistory() {
  return (
    <Card className="glass-effect border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SafeIcon name="History" className="w-5 h-5 text-primary" />
          Riwayat Pelacakan Terbaru
        </CardTitle>
        <CardDescription>
          Paket yang baru-baru ini Anda lacak
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {mockRecentTrackings.map((tracking) => (
            <div
              key={tracking.id}
              className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                  <SafeIcon name="Package" className="w-5 h-5 text-muted-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-mono font-semibold text-sm text-foreground truncate">
                      {tracking.number}
                    </p>
                    <TrackingStatusBadge status={tracking.status} showIcon={false} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <SafeIcon name="MapPin" className="w-3 h-3" />
                    <span>{tracking.destination}</span>
                    <span>•</span>
                    <span>{tracking.lastUpdate}</span>
                  </div>
                </div>
              </div>

              <Button
                asChild
                variant="ghost"
                size="sm"
                className="ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <a href={`./hasil-pelacakan.html?resi=${tracking.number}`}>
                  <SafeIcon name="ChevronRight" className="w-4 h-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>

        <Button
          asChild
          variant="outline"
          className="w-full mt-4"
        >
          <a href="./daftar-pengiriman-terdaftar.html">
            <SafeIcon name="List" className="w-4 h-4 mr-2" />
            Lihat Semua Pengiriman
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

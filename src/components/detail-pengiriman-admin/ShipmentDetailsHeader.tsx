
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'
import SafeIcon from '@/components/common/SafeIcon'

interface ShipmentDetailsHeaderProps {}

export default function ShipmentDetailsHeader({}: ShipmentDetailsHeaderProps) {
  const shipmentId = 'VEL-2024-001234'
  const status = 'in_transit'
  const lastUpdate = '2024-01-15 14:30:00'

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{shipmentId}</h1>
          <TrackingStatusBadge status={status} />
        </div>
        <p className="text-sm text-muted-foreground">
          Update terakhir: {lastUpdate}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" asChild>
          <a href="./pemantauan-pengiriman-admin.html">
            <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Kembali
          </a>
        </Button>
        <Button variant="outline" size="sm">
          <SafeIcon name="Download" className="w-4 h-4 mr-2" />
          Ekspor
        </Button>
        <Button variant="outline" size="sm">
          <SafeIcon name="Share2" className="w-4 h-4 mr-2" />
          Bagikan
        </Button>
      </div>
    </div>
  )
}

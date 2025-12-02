
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'

interface TrackingHeaderProps {
  shipment: {
    resiNumber: string
    status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed' | 'cancelled'
    service: {
      type: string
    }
  }
}

export default function TrackingHeader({ shipment }: TrackingHeaderProps) {
  return (
    <div className="glass-effect rounded-lg p-6 border border-border/50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <SafeIcon name="Package" className="w-6 h-6 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">
              {shipment.resiNumber}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Nomor resi pengiriman Anda
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <TrackingStatusBadge status={shipment.status} />
          <Badge variant="outline" className="border-secondary/50 text-secondary">
            <SafeIcon name="Zap" className="w-3 h-3 mr-1" />
            {shipment.service.type}
          </Badge>
        </div>
      </div>
    </div>
  )
}

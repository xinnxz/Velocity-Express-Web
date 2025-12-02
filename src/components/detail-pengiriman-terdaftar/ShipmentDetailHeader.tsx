
import { Card } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'

interface ShipmentDetailHeaderProps {
  shipment: {
    id: string
    status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed' | 'cancelled'
    createdAt: string
    service: {
      type: string
    }
  }
}

export default function ShipmentDetailHeader({ shipment }: ShipmentDetailHeaderProps) {
  const createdDate = new Date(shipment.createdAt)
  const formattedDate = createdDate.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Card className="glass-effect border-border/50 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
              <SafeIcon name="Package" className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{shipment.id}</h1>
              <p className="text-sm text-muted-foreground">
                Dibuat pada {formattedDate}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Jenis Layanan</p>
            <p className="text-sm font-semibold">{shipment.service.type}</p>
          </div>
          <div className="border-l border-border/50 pl-4">
            <p className="text-xs text-muted-foreground mb-1">Status</p>
            <TrackingStatusBadge status={shipment.status} />
          </div>
        </div>
      </div>
    </Card>
  )
}

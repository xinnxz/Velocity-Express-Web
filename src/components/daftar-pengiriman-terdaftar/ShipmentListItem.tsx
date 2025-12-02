
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'
import type { Shipment } from './types'

interface ShipmentListItemProps {
  shipment: Shipment
}

export default function ShipmentListItem({ shipment }: ShipmentListItemProps) {
  const createdDate = new Date(shipment.createdAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <Card className="border-border bg-card/50 glass-effect hover:bg-card/70 transition-colors">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <SafeIcon name="Package" className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="font-mono text-xs font-semibold text-primary truncate">
                  {shipment.trackingNumber}
                </span>
              </div>
              <p className="text-sm font-medium">{shipment.recipient.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {shipment.recipient.address}
              </p>
            </div>
            <TrackingStatusBadge status={shipment.status} />
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-muted-foreground mb-1">Pengirim</p>
              <p className="font-medium">{shipment.sender.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Tanggal</p>
              <p className="font-medium">{createdDate}</p>
            </div>
          </div>

          {/* Service Info */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <SafeIcon name="Truck" className="w-3.5 h-3.5" />
              <span>{shipment.service}</span>
            </div>
            <div className="text-primary font-semibold">
              Rp {shipment.cost.toLocaleString('id-ID')}
            </div>
          </div>

          {/* Action Button */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="w-full border-border hover:bg-primary/10 hover:text-primary"
          >
            <a href={`./detail-pelacakan-akun.html?id=${shipment.id}`}>
              <SafeIcon name="Eye" className="w-4 h-4 mr-2" />
              Lihat Detail
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge, { type TrackingStatus } from '@/components/common/TrackingStatusBadge'

interface ShipmentArchiveCardProps {
  shipment: {
    id: string
    trackingNumber: string
    sender: {
      name: string
      city: string
    }
    recipient: {
      name: string
      city: string
    }
    status: TrackingStatus
    completedDate: string
    amount: number
    weight: number
    service: string
  }
}

export default function ShipmentArchiveCard({ shipment }: ShipmentArchiveCardProps) {
  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/50 transition-colors overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-mono text-primary truncate">
              {shipment.trackingNumber}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {shipment.service}
            </p>
          </div>
          <TrackingStatusBadge status={shipment.status} showIcon={false} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Sender Info */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Pengirim</p>
          <p className="text-sm font-medium">{shipment.sender.name}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <SafeIcon name="MapPin" className="w-3 h-3" />
            {shipment.sender.city}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
            <SafeIcon name="ArrowDown" className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Recipient Info */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Penerima</p>
          <p className="text-sm font-medium">{shipment.recipient.name}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <SafeIcon name="MapPin" className="w-3 h-3" />
            {shipment.recipient.city}
          </p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/30">
          <div>
            <p className="text-xs text-muted-foreground">Berat</p>
            <p className="text-sm font-medium">{shipment.weight} kg</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Tanggal Selesai</p>
            <p className="text-sm font-medium">
              {new Date(shipment.completedDate).toLocaleDateString('id-ID', {
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Amount */}
        <div className="pt-2 border-t border-border/30">
          <p className="text-xs text-muted-foreground mb-1">Total Nilai</p>
          <p className="text-lg font-bold text-primary">
            Rp {shipment.amount.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Action Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2"
          asChild
        >
          <a href={`./detail-pengiriman-terdaftar.html?id=${shipment.id}`}>
            <SafeIcon name="Eye" className="w-4 h-4 mr-2" />
            Lihat Detail
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

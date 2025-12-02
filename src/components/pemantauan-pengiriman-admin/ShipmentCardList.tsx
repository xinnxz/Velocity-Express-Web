
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'
import type { Shipment } from '@/types/shipment'

interface ShipmentCardListProps {
  shipments: Shipment[]
}

export default function ShipmentCardList({ shipments }: ShipmentCardListProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {shipments.map((shipment) => (
        <Card key={shipment.id} className="glass-effect border-border/50 hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Nomor Resi</p>
                <p className="font-mono text-sm font-semibold truncate">
                  {shipment.tracking_number}
                </p>
              </div>
              <TrackingStatusBadge status={shipment.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Sender Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <SafeIcon name="MapPin" className="w-3.5 h-3.5" />
                <span>Pengirim</span>
              </div>
              <div className="text-sm">
                <p className="font-medium">{shipment.sender_name}</p>
                <p className="text-xs text-muted-foreground">{shipment.sender_phone}</p>
              </div>
            </div>

            {/* Receiver Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <SafeIcon name="MapPin" className="w-3.5 h-3.5" />
                <span>Penerima</span>
              </div>
              <div className="text-sm">
                <p className="font-medium">{shipment.receiver_name}</p>
                <p className="text-xs text-muted-foreground">{shipment.receiver_phone}</p>
              </div>
            </div>

            {/* Date and Amount */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Tanggal</p>
                <p className="text-sm font-medium">{formatDate(shipment.created_at)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Biaya</p>
                <p className="text-sm font-semibold text-primary">
                  {formatCurrency(shipment.amount)}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <Button
              asChild
              className="w-full gap-2"
              variant="outline"
            >
              <a href={`./detail-pengiriman-admin.html?id=${shipment.id}`}>
                <SafeIcon name="Eye" className="w-4 h-4" />
                Lihat Detail
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

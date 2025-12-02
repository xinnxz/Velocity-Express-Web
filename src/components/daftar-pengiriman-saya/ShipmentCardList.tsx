
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'
import SafeIcon from '@/components/common/SafeIcon'
import type { Shipment } from './mockData'

interface ShipmentCardListProps {
  shipments: Shipment[]
}

export default function ShipmentCardList({ shipments }: ShipmentCardListProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'regular':
        return 'Truck'
      case 'express':
        return 'Zap'
      case 'drone':
        return 'Drone'
      default:
        return 'Package'
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {shipments.map((shipment) => (
        <Card key={shipment.id} className="glass-effect border-border hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base font-mono break-all">
                  {shipment.trackingNumber}
                </CardTitle>
                <CardDescription className="mt-1">
                  {formatDate(shipment.createdAt)}
                </CardDescription>
              </div>
              <TrackingStatusBadge status={shipment.status} />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Recipient Info */}
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <SafeIcon name="User" className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{shipment.recipientName}</p>
                  <p className="text-xs text-muted-foreground">{shipment.recipientPhone}</p>
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-start gap-3">
              <SafeIcon name="MapPin" className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Tujuan</p>
                <p className="text-sm break-words">{shipment.destination}</p>
              </div>
            </div>

            {/* Service & Cost */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Layanan</p>
                <div className="flex items-center gap-2">
                  <SafeIcon name={getServiceIcon(shipment.service)} className="w-4 h-4 text-primary" />
                  <p className="text-sm font-medium capitalize">
                    {shipment.service === 'regular' && 'Reguler'}
                    {shipment.service === 'express' && 'Express'}
                    {shipment.service === 'drone' && 'Drone'}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Biaya</p>
                <p className="text-sm font-semibold">{formatPrice(shipment.totalCost)}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                asChild
              >
                <a href={`./detail-pengiriman-terdaftar.html?id=${shipment.id}`}>
                  <SafeIcon name="Eye" className="w-4 h-4 mr-2" />
                  Detail
                </a>
              </Button>
              <Button
                size="sm"
                className="flex-1"
                asChild
              >
                <a href={`./pelacakan-real-time.html?id=${shipment.id}`}>
                  <SafeIcon name="MapPin" className="w-4 h-4 mr-2" />
                  Lacak
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge, { type TrackingStatus } from '@/components/common/TrackingStatusBadge'
import { formatCurrency, formatDate } from '@/lib/formatting'

interface OrderItem {
  id: string
  name: string
  quantity: number
  weight: string
}

interface OrderHistoryCardProps {
  order: {
    id: string
    orderNumber: string
    date: string
    recipient: string
    destination: string
    status: TrackingStatus
    totalPrice: number
    itemsCount: number
    items: OrderItem[]
    courier: string
    trackingNumber: string
  }
  onViewDetails: () => void
}

export default function OrderHistoryCard({ order, onViewDetails }: OrderHistoryCardProps) {
  return (
    <Card className="glass-effect border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3 border-b border-border/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold">{order.orderNumber}</h3>
              <TrackingStatusBadge status={order.status} showIcon={true} />
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDate(order.date)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(order.totalPrice)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {order.itemsCount} item{order.itemsCount > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {/* Recipient Info */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Penerima
              </p>
              <p className="font-medium">{order.recipient}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Tujuan
              </p>
              <p className="text-sm text-foreground/80">{order.destination}</p>
            </div>
          </div>

          {/* Courier & Tracking Info */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Kurir
              </p>
              <p className="font-medium">{order.courier}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Nomor Resi
              </p>
              <p className="text-sm font-mono text-primary">{order.trackingNumber}</p>
            </div>
          </div>
        </div>

        {/* Items Preview */}
        {order.items.length > 0 && (
          <div className="mb-4 p-3 bg-background/50 rounded-lg border border-border/30">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Item Pengiriman
            </p>
            <div className="space-y-1">
              {order.items.slice(0, 2).map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-foreground/80">
                    {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                  </span>
                  <span className="text-muted-foreground">{item.weight}</span>
                </div>
              ))}
              {order.items.length > 2 && (
                <p className="text-xs text-muted-foreground pt-1">
                  +{order.items.length - 2} item lainnya
                </p>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={onViewDetails}
            className="flex-1 sm:flex-none"
          >
            <SafeIcon name="Eye" className="w-4 h-4 mr-2" />
            Lihat Detail
          </Button>
          <Button
            variant="outline"
            className="flex-1 sm:flex-none"
            asChild
          >
            <a href={`./detail-riwayat-pelacakan.html?id=${order.id}`}>
              <SafeIcon name="MapPin" className="w-4 h-4 mr-2" />
              Lacak
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

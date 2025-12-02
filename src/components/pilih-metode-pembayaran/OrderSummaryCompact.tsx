
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'
import { Badge } from '@/components/ui/badge'

interface Order {
  orderId: string
  totalAmount: number
  itemCount: number
  estimatedDelivery: string
  from: string
  to: string
}

interface OrderSummaryCompactProps {
  order: Order
}

export default function OrderSummaryCompact({ order }: OrderSummaryCompactProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card className="sticky top-24 glass-effect border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Order ID */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">ID Pesanan</p>
          <p className="font-mono text-sm font-semibold text-primary">
            {order.orderId}
          </p>
        </div>

        <Separator className="bg-border/50" />

        {/* Route */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Rute Pengiriman</p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <SafeIcon name="MapPin" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Dari</p>
                <p className="text-sm font-medium truncate">{order.from}</p>
              </div>
            </div>
            <div className="flex justify-center py-1">
              <SafeIcon name="ArrowDown" className="w-4 h-4 text-muted-foreground/50" />
            </div>
            <div className="flex items-start gap-2">
              <SafeIcon name="MapPin" className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Ke</p>
                <p className="text-sm font-medium truncate">{order.to}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Items Count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SafeIcon name="Package" className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Jumlah Item</span>
          </div>
          <Badge variant="secondary">{order.itemCount} item</Badge>
        </div>

        {/* Estimated Delivery */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SafeIcon name="Calendar" className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Estimasi Tiba</span>
          </div>
          <span className="text-sm font-medium">
            {formatDate(order.estimatedDelivery)}
          </span>
        </div>

        <Separator className="bg-border/50" />

        {/* Total Amount */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="text-sm">Rp {order.totalAmount.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Biaya Layanan</span>
            <span className="text-sm">Rp 0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Diskon</span>
            <span className="text-sm text-green-400">- Rp 0</span>
          </div>
          
          <Separator className="bg-border/50" />
          
          <div className="flex items-center justify-between pt-2">
            <span className="font-semibold">Total Pembayaran</span>
            <span className="text-lg font-bold gradient-text">
              Rp {order.totalAmount.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex gap-2">
            <SafeIcon name="Info" className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-primary/80">
              Pembayaran akan diproses setelah Anda memilih metode pembayaran
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
  weight: string
  dimensions: string
}

interface Order {
  orderId: string
  createdAt: string
  items: OrderItem[]
  pickupLocation: string
  deliveryLocation: string
  serviceType: string
  estimatedDelivery: string
  subtotal: number
  shippingFee: number
  tax: number
  discount: number
  total: number
}

interface OrderSummaryCardProps {
  order: Order
}

export default function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <SafeIcon name="Package" className="w-5 h-5 text-primary" />
              Ringkasan Pesanan
            </CardTitle>
            <CardDescription>
              Nomor Pesanan: <span className="font-mono font-semibold text-foreground">{order.orderId}</span>
            </CardDescription>
          </div>
          <Badge variant="outline" className="border-primary/50">
            {order.serviceType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Items */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
            Item Pengiriman
          </h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-start p-3 bg-background/30 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <SafeIcon name="Weight" className="w-3 h-3 inline mr-1" />
                    {item.weight} • {item.dimensions}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">x{item.quantity}</p>
                  <p className="font-semibold text-primary">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Locations */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
            Lokasi Pengiriman
          </h4>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <SafeIcon name="MapPin" className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Penjemputan</p>
                <p className="text-sm font-medium">{order.pickupLocation}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent"></div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <SafeIcon name="CheckCircle2" className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Pengiriman</p>
                <p className="text-sm font-medium">{order.deliveryLocation}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Delivery Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Jenis Layanan
            </p>
            <p className="font-semibold text-sm">{order.serviceType}</p>
          </div>
          <div className="bg-background/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Estimasi Tiba
            </p>
            <p className="font-semibold text-sm">
              {new Date(order.estimatedDelivery).toLocaleDateString('id-ID', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
              })}
            </p>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal:</span>
            <span>Rp {order.subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Biaya Pengiriman:</span>
            <span>Rp {order.shippingFee.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pajak (PPN 11%):</span>
            <span>Rp {order.tax.toLocaleString('id-ID')}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-green-400">
              <span>Diskon:</span>
              <span>-Rp {order.discount.toLocaleString('id-ID')}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface OrderData {
  orderId: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shippingFee: number
  discount: number
  total: number
  currency: string
}

interface OrderSummaryProps {
  orderData: OrderData
}

export default function OrderSummary({ orderData }: OrderSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: orderData.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <Card className="glass-effect border-border/50 sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
        <p className="text-xs text-muted-foreground mt-2">ID: {orderData.orderId}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3">
          {orderData.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium">{formatCurrency(item.price)}</p>
            </div>
          ))}
        </div>

        <Separator className="bg-border/50" />

        {/* Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>{formatCurrency(orderData.subtotal)}</span>
          </div>
          
          {orderData.tax > 0 && (
            <div className="flex justify-between text-muted-foreground">
              <span>Pajak</span>
              <span>{formatCurrency(orderData.tax)}</span>
            </div>
          )}
          
          {orderData.shippingFee > 0 && (
            <div className="flex justify-between text-muted-foreground">
              <span>Biaya Pengiriman</span>
              <span>{formatCurrency(orderData.shippingFee)}</span>
            </div>
          )}
          
          {orderData.discount > 0 && (
            <div className="flex justify-between text-green-400">
              <span>Diskon</span>
              <span>-{formatCurrency(orderData.discount)}</span>
            </div>
          )}
        </div>

        <Separator className="bg-border/50" />

        {/* Total */}
        <div className="flex justify-between items-center pt-2">
          <span className="font-semibold">Total Pembayaran</span>
          <span className="text-2xl font-bold gradient-text">
            {formatCurrency(orderData.total)}
          </span>
        </div>

        {/* Payment Status Info */}
        <div className="mt-6 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex gap-2 text-xs text-primary">
            <SafeIcon name="Info" className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              Pembayaran Anda dilindungi dengan enkripsi SSL 256-bit dan teknologi keamanan terkini.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

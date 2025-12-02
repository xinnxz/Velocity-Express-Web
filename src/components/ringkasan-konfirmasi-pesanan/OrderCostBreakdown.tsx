
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'
import type { OrderSummaryModel } from '@/data/order_data'

interface OrderCostBreakdownProps {
  orderData: OrderSummaryModel
}

export default function OrderCostBreakdown({ orderData }: OrderCostBreakdownProps) {
  // Calculate cost breakdown
  const basePrice = orderData.selectedService.priceIDR
  const insurancePrice = orderData.packageDetails.declaredValueIDR * 0.005 // 0.5% insurance
  const subtotal = basePrice + insurancePrice
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  return (
    <Card className="glass-effect border-primary/30 sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <SafeIcon name="DollarSign" className="w-5 h-5 text-primary" />
          Rincian Biaya
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cost Items */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Biaya Pengiriman</span>
            <span className="font-medium">Rp {basePrice.toLocaleString('id-ID')}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Asuransi Paket (0.5%)</span>
            <span className="font-medium">Rp {Math.round(insurancePrice).toLocaleString('id-ID')}</span>
          </div>

          <Separator className="my-2" />

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">Rp {Math.round(subtotal).toLocaleString('id-ID')}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Pajak (10%)</span>
            <span className="font-medium">Rp {Math.round(tax).toLocaleString('id-ID')}</span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Pembayaran</span>
          <span className="text-2xl font-bold text-primary">
            Rp {Math.round(total).toLocaleString('id-ID')}
          </span>
        </div>

        {/* Promo Code Section */}
        <div className="pt-2 border-t border-border/50">
          <button className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
            <SafeIcon name="Gift" className="w-4 h-4" />
            Punya kode promo?
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

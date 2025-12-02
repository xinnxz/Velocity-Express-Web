
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'

interface OrderSummaryProps {
  order: {
    orderId: string
    sender: {
      name: string
      address: string
      phone: string
    }
    recipient: {
      name: string
      address: string
      phone: string
    }
    package: {
      type: string
      weight: string
      dimensions: string
      description: string
    }
    service: {
      name: string
      estimatedTime: string
      icon: string
    }
    cost: {
      baseCost: number
      insurance: number
      discount: number
      total: number
    }
  }
}

export default function OrderSummary({ order }: OrderSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Order ID */}
      <div className="text-sm">
        <p className="text-muted-foreground mb-1">Nomor Pesanan</p>
        <p className="font-mono font-semibold">{order.orderId}</p>
      </div>

      <Separator className="bg-border/50" />

      {/* Sender & Recipient */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sender */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <SafeIcon name="MapPin" className="w-4 h-4 text-primary" />
            <p className="font-semibold text-sm">Pengirim</p>
          </div>
          <div className="space-y-1 text-sm">
            <p className="font-medium">{order.sender.name}</p>
            <p className="text-muted-foreground text-xs leading-relaxed">{order.sender.address}</p>
            <p className="text-muted-foreground">{order.sender.phone}</p>
          </div>
        </div>

        {/* Recipient */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <SafeIcon name="MapPin" className="w-4 h-4 text-primary" />
            <p className="font-semibold text-sm">Penerima</p>
          </div>
          <div className="space-y-1 text-sm">
            <p className="font-medium">{order.recipient.name}</p>
            <p className="text-muted-foreground text-xs leading-relaxed">{order.recipient.address}</p>
            <p className="text-muted-foreground">{order.recipient.phone}</p>
          </div>
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Package Details */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <SafeIcon name="Box" className="w-4 h-4 text-primary" />
          <p className="font-semibold text-sm">Detail Paket</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Jenis Paket</p>
            <p className="font-medium">{order.package.type}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Berat</p>
            <p className="font-medium">{order.package.weight}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Dimensi</p>
            <p className="font-medium">{order.package.dimensions}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Deskripsi</p>
            <p className="font-medium">{order.package.description}</p>
          </div>
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Service Type */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <SafeIcon name={order.service.icon} className="w-4 h-4 text-primary" />
          <p className="font-semibold text-sm">Layanan Pengiriman</p>
        </div>
        <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
          <p className="font-medium">{order.service.name}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Estimasi: {order.service.estimatedTime}
          </p>
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Cost Breakdown */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <SafeIcon name="DollarSign" className="w-4 h-4 text-primary" />
          <p className="font-semibold text-sm">Rincian Biaya</p>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Biaya Dasar</span>
            <span>{formatCurrency(order.cost.baseCost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Asuransi Paket</span>
            <span>{formatCurrency(order.cost.insurance)}</span>
          </div>
          {order.cost.discount > 0 && (
            <div className="flex justify-between text-green-400">
              <span>Diskon</span>
              <span>-{formatCurrency(order.cost.discount)}</span>
            </div>
          )}
          <Separator className="my-2 bg-border/50" />
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span className="text-primary">{formatCurrency(order.cost.total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

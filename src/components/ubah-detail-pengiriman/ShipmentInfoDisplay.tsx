
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'
import type { ShipmentDetail } from '@/data/mockShipmentData'

interface ShipmentInfoDisplayProps {
  shipment: ShipmentDetail
}

export default function ShipmentInfoDisplay({ shipment }: ShipmentInfoDisplayProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-4">
      {/* Status Card */}
      <Card className="border-border/50 glass-effect">
        <CardHeader>
          <CardTitle className="text-base">Status Pengiriman</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status Saat Ini</span>
            <TrackingStatusBadge status={shipment.status} />
          </div>
          <Separator />
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Resi</p>
            <p className="font-mono text-sm font-semibold">{shipment.trackingNumber}</p>
          </div>
        </CardContent>
      </Card>

      {/* Shipment Details Card */}
      <Card className="border-border/50 glass-effect">
        <CardHeader>
          <CardTitle className="text-base">Detail Pengiriman</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Service Type */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Jenis Layanan
            </p>
            <div className="flex items-center gap-2">
              <SafeIcon name="Truck" className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{shipment.service.name}</span>
            </div>
          </div>

          <Separator />

          {/* Package Info */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Informasi Paket
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Berat:</span>
                <span className="font-medium">{shipment.package.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dimensi:</span>
                <span className="font-medium">{shipment.package.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipe:</span>
                <span className="font-medium">{shipment.package.type}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Dates */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Jadwal
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dibuat:</span>
                <span className="font-medium">{formatDate(shipment.createdDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimasi Tiba:</span>
                <span className="font-medium">{formatDate(shipment.estimatedDeliveryDate)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Cost */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Biaya Pengiriman
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                Rp {shipment.cost.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sender Info Card */}
      <Card className="border-border/50 glass-effect">
        <CardHeader>
          <CardTitle className="text-base">Pengirim</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <p className="text-muted-foreground text-xs mb-1">Nama</p>
            <p className="font-medium">{shipment.sender.name}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-1">Telepon</p>
            <p className="font-medium">{shipment.sender.phone}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-1">Alamat</p>
            <p className="text-xs">{shipment.sender.address}</p>
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="border-border/50 bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <SafeIcon name="Info" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                Anda dapat mengubah informasi pengiriman selama paket belum diambil oleh kurir.
              </p>
              <p>
                Untuk perubahan lebih lanjut, hubungi layanan pelanggan kami.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'

interface ShipmentInfoCardProps {}

export default function ShipmentInfoCard({}: ShipmentInfoCardProps) {
  const shipment = {
    id: 'VEL-2024-001234',
    serviceType: 'Express Drone',
    weight: '2.5 kg',
    dimensions: '30x20x15 cm',
    contents: 'Elektronik - Smartphone',
    value: 'Rp 5.000.000',
    insurance: true,
    createdAt: '2024-01-15 08:00:00',
    estimatedDelivery: '2024-01-15 18:00:00',
    sender: {
      name: 'PT Teknologi Indonesia',
      phone: '+62-812-3456-7890',
      email: 'sender@teknologi.id',
      address: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 12190'
    },
    receiver: {
      name: 'Budi Santoso',
      phone: '+62-821-9876-5432',
      email: 'budi@email.com',
      address: 'Jl. Gatot Subroto No. 456, Bandung, Jawa Barat 40123'
    },
    distance: '180 km',
    estimatedTime: '2 jam 30 menit'
  }

  return (
    <div className="space-y-4">
      {/* Package Details */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Detail Paket</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Jenis Layanan</p>
              <p className="font-semibold flex items-center gap-2">
                <SafeIcon name="Zap" className="w-4 h-4 text-primary" />
                {shipment.serviceType}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Berat</p>
              <p className="font-semibold">{shipment.weight}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Dimensi</p>
              <p className="font-semibold">{shipment.dimensions}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Nilai Paket</p>
              <p className="font-semibold">{shipment.value}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Isi Paket</p>
            <p className="font-semibold">{shipment.contents}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <SafeIcon name="Shield" className="w-4 h-4 text-primary" />
            <span className="text-sm">Asuransi: {shipment.insurance ? 'Aktif' : 'Tidak Aktif'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Sender & Receiver Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sender */}
        <Card className="glass-effect border-border/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <SafeIcon name="MapPin" className="w-4 h-4 text-primary" />
              Pengirim
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Nama</p>
              <p className="font-semibold">{shipment.sender.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telepon</p>
              <a href={`tel:${shipment.sender.phone}`} className="font-semibold text-primary hover:underline">
                {shipment.sender.phone}
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <a href={`mailto:${shipment.sender.email}`} className="font-semibold text-primary hover:underline">
                {shipment.sender.email}
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Alamat</p>
              <p className="text-sm">{shipment.sender.address}</p>
            </div>
          </CardContent>
        </Card>

        {/* Receiver */}
        <Card className="glass-effect border-border/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <SafeIcon name="MapPin" className="w-4 h-4 text-primary" />
              Penerima
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Nama</p>
              <p className="font-semibold">{shipment.receiver.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telepon</p>
              <a href={`tel:${shipment.receiver.phone}`} className="font-semibold text-primary hover:underline">
                {shipment.receiver.phone}
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <a href={`mailto:${shipment.receiver.email}`} className="font-semibold text-primary hover:underline">
                {shipment.receiver.email}
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Alamat</p>
              <p className="text-sm">{shipment.receiver.address}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Route Info */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <SafeIcon name="Navigation" className="w-4 h-4 text-primary" />
            Informasi Rute
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Jarak</p>
              <p className="text-lg font-semibold">{shipment.distance}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Estimasi Waktu</p>
              <p className="text-lg font-semibold">{shipment.estimatedTime}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Estimasi Tiba</p>
              <p className="text-lg font-semibold">{shipment.estimatedDelivery.split(' ')[1]}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

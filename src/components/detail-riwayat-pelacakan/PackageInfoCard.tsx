
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface PackageInfoCardProps {}

export default function PackageInfoCard({}: PackageInfoCardProps) {
  // Mock package data
  const packageData = {
    trackingNumber: 'VLC-2024-001234567',
    serviceType: 'Express Drone',
    weight: '2.5 kg',
    dimensions: '30 x 20 x 15 cm',
    contents: 'Elektronik - Laptop',
    insurance: true,
    insuranceValue: 'Rp 15.000.000',
    shippingCost: 'Rp 125.000',
    insuranceCost: 'Rp 15.000',
    totalCost: 'Rp 140.000',
    paymentStatus: 'Lunas',
    sender: {
      name: 'PT Teknologi Indonesia',
      address: 'Jl. Sudirman No. 123, Jakarta Pusat',
      phone: '+62-21-1234567',
      email: 'shipping@teknologi.id'
    },
    recipient: {
      name: 'Budi Santoso',
      address: 'Jl. Ahmad Yani No. 456, Surabaya',
      phone: '+62-31-9876543',
      email: 'budi@email.com'
    }
  }

return (
    <div className="space-y-4">
      {/* Package Details Card */}
      <Card className="glass-effect border-primary/20">
        <CardHeader className="border-b border-border/50 p-4 sm:p-5">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <SafeIcon name="Package" className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="truncate">Detail Paket</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {/* Service Type */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Jenis Layanan</p>
            <Badge className="bg-primary/20 text-primary border-primary/50">
              {packageData.serviceType}
            </Badge>
          </div>

          <Separator className="bg-border/50" />

          {/* Weight & Dimensions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Berat</p>
              <p className="font-semibold">{packageData.weight}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Dimensi</p>
              <p className="font-semibold text-sm">{packageData.dimensions}</p>
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Contents */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Isi Paket</p>
            <p className="font-semibold">{packageData.contents}</p>
          </div>

          <Separator className="bg-border/50" />

          {/* Insurance */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Asuransi</p>
              {packageData.insurance && (
                <SafeIcon name="CheckCircle2" className="w-4 h-4 text-green-400" />
              )}
            </div>
            {packageData.insurance && (
              <p className="text-sm font-semibold text-green-400">{packageData.insuranceValue}</p>
            )}
          </div>
        </CardContent>
      </Card>

{/* Cost Breakdown Card */}
      <Card className="glass-effect border-primary/20">
        <CardHeader className="border-b border-border/50 p-4 sm:p-5">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <SafeIcon name="DollarSign" className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="truncate">Rincian Biaya</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Biaya Pengiriman</span>
            <span className="font-semibold">{packageData.shippingCost}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Biaya Asuransi</span>
            <span className="font-semibold">{packageData.insuranceCost}</span>
          </div>
          <Separator className="bg-border/50" />
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold text-primary">{packageData.totalCost}</span>
          </div>
          <div className="pt-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/50">
              {packageData.paymentStatus}
            </Badge>
          </div>
        </CardContent>
      </Card>

{/* Sender Info Card */}
      <Card className="glass-effect border-primary/20">
        <CardHeader className="border-b border-border/50 p-4 sm:p-5">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <SafeIcon name="User" className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="truncate">Pengirim</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Nama</p>
            <p className="font-semibold">{packageData.sender.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Alamat</p>
            <p className="text-sm">{packageData.sender.address}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Kontak</p>
            <div className="space-y-1">
              <a href={`tel:${packageData.sender.phone}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                <SafeIcon name="Phone" className="w-3.5 h-3.5" />
                {packageData.sender.phone}
              </a>
              <a href={`mailto:${packageData.sender.email}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                <SafeIcon name="Mail" className="w-3.5 h-3.5" />
                {packageData.sender.email}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

{/* Recipient Info Card */}
      <Card className="glass-effect border-primary/20">
        <CardHeader className="border-b border-border/50 p-4 sm:p-5">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <SafeIcon name="User" className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="truncate">Penerima</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Nama</p>
            <p className="font-semibold">{packageData.recipient.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Alamat</p>
            <p className="text-sm">{packageData.recipient.address}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Kontak</p>
            <div className="space-y-1">
              <a href={`tel:${packageData.recipient.phone}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                <SafeIcon name="Phone" className="w-3.5 h-3.5" />
                {packageData.recipient.phone}
              </a>
              <a href={`mailto:${packageData.recipient.email}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                <SafeIcon name="Mail" className="w-3.5 h-3.5" />
                {packageData.recipient.email}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

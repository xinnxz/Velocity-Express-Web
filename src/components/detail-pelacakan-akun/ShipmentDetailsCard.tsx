
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'

interface ShipmentDetailsCardProps {
  shipment: {
    sender: {
      name: string
      address: string
      phone: string
      email: string
    }
    recipient: {
      name: string
      address: string
      phone: string
      email: string
    }
    package: {
      weight: string
      dimensions: string
      contents: string
      insurance: boolean
      insuranceValue: string
    }
  }
}

export default function ShipmentDetailsCard({ shipment }: ShipmentDetailsCardProps) {
  return (
    <div className="space-y-4">
      {/* Sender and Recipient */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sender */}
        <Card className="glass-effect border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <SafeIcon name="Send" className="w-4 h-4 text-primary" />
              Pengirim
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-semibold">{shipment.sender.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{shipment.sender.address}</p>
            </div>
            <Separator className="bg-border/30" />
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <SafeIcon name="Phone" className="w-4 h-4 text-muted-foreground" />
                <a href={`tel:${shipment.sender.phone}`} className="text-primary hover:underline">
                  {shipment.sender.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <SafeIcon name="Mail" className="w-4 h-4 text-muted-foreground" />
                <a href={`mailto:${shipment.sender.email}`} className="text-primary hover:underline truncate">
                  {shipment.sender.email}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recipient */}
        <Card className="glass-effect border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <SafeIcon name="MapPin" className="w-4 h-4 text-secondary" />
              Penerima
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-semibold">{shipment.recipient.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{shipment.recipient.address}</p>
            </div>
            <Separator className="bg-border/30" />
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <SafeIcon name="Phone" className="w-4 h-4 text-muted-foreground" />
                <a href={`tel:${shipment.recipient.phone}`} className="text-primary hover:underline">
                  {shipment.recipient.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <SafeIcon name="Mail" className="w-4 h-4 text-muted-foreground" />
                <a href={`mailto:${shipment.recipient.email}`} className="text-primary hover:underline truncate">
                  {shipment.recipient.email}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Package Details */}
      <Card className="glass-effect border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <SafeIcon name="Box" className="w-4 h-4 text-accent" />
            Detail Paket
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Berat</p>
              <p className="text-sm font-semibold">{shipment.package.weight}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Ukuran</p>
              <p className="text-sm font-semibold">{shipment.package.dimensions}</p>
            </div>
            <div className="col-span-2 md:col-span-2">
              <p className="text-xs text-muted-foreground mb-1">Isi Paket</p>
              <p className="text-sm font-semibold">{shipment.package.contents}</p>
            </div>
          </div>

          {shipment.package.insurance && (
            <>
              <Separator className="my-4 bg-border/30" />
              <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                <SafeIcon name="Shield" className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-green-400">Asuransi Aktif</p>
                  <p className="text-xs text-green-400/80">Nilai: {shipment.package.insuranceValue}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

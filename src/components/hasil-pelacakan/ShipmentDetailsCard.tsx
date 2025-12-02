
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'

interface ShipmentDetailsCardProps {
  sender: {
    name: string
    address: string
    phone: string
    city: string
  }
  recipient: {
    name: string
    address: string
    phone: string
    city: string
  }
  package: {
    weight: string
    dimensions: string
    contents: string
    value: string
  }
}

export default function ShipmentDetailsCard({
  sender,
  recipient,
  package: pkg
}: ShipmentDetailsCardProps) {
  return (
    <Card className="glass-effect border-border">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <SafeIcon name="FileText" className="w-5 h-5 text-primary" />
          Detail Pengiriman
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sender & Recipient */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Sender */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <SafeIcon name="MapPin" className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">Pengirim</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 space-y-1 border border-border/50">
              <p className="font-medium text-foreground">{sender.name}</p>
              <p className="text-xs text-muted-foreground">{sender.address}</p>
              <p className="text-xs text-muted-foreground">{sender.city}</p>
              <p className="text-xs text-primary mt-2 flex items-center gap-1">
                <SafeIcon name="Phone" className="w-3 h-3" />
                {sender.phone}
              </p>
            </div>
          </div>

          {/* Recipient */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                <SafeIcon name="MapPin" className="w-4 h-4 text-secondary" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">Penerima</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 space-y-1 border border-border/50">
              <p className="font-medium text-foreground">{recipient.name}</p>
              <p className="text-xs text-muted-foreground">{recipient.address}</p>
              <p className="text-xs text-muted-foreground">{recipient.city}</p>
              <p className="text-xs text-secondary mt-2 flex items-center gap-1">
                <SafeIcon name="Phone" className="w-3 h-3" />
                {recipient.phone}
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Package Details */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
            <SafeIcon name="Box" className="w-4 h-4 text-primary" />
            Detail Paket
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-background/50 rounded-lg p-3 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Berat</p>
              <p className="font-semibold text-sm">{pkg.weight}</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Dimensi</p>
              <p className="font-semibold text-sm">{pkg.dimensions}</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 border border-border/50 sm:col-span-2">
              <p className="text-xs text-muted-foreground mb-1">Isi Paket</p>
              <p className="font-semibold text-sm">{pkg.contents}</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 border border-border/50 sm:col-span-2">
              <p className="text-xs text-muted-foreground mb-1">Nilai Paket</p>
              <p className="font-semibold text-sm text-primary">{pkg.value}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

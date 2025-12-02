
import { Card } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'

interface ShipmentInfoCardProps {
  title: string
  name: string
  address: string
  phone: string
  email: string
  icon: string
}

export default function ShipmentInfoCard({
  title,
  name,
  address,
  phone,
  email,
  icon
}: ShipmentInfoCardProps) {
  return (
    <Card className="glass-effect border-border/50 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <SafeIcon name={icon} className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Nama</p>
          <p className="text-sm font-medium">{name}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Alamat</p>
          <p className="text-sm text-foreground/80">{address}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Telepon</p>
            <a 
              href={`tel:${phone}`}
              className="text-sm text-primary hover:underline"
            >
              {phone}
            </a>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Email</p>
            <a 
              href={`mailto:${email}`}
              className="text-sm text-primary hover:underline truncate"
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </Card>
  )
}

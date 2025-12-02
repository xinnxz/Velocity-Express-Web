
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import type { Address } from '@/components/manajemen-alamat/AddressManagementPage'

interface AddressCardProps {
  address: Address
  isDefault: boolean
  onEdit: () => void
  onDelete: () => void
  onSetDefault: () => void
}

export default function AddressCard({
  address,
  isDefault,
  onEdit,
  onDelete,
  onSetDefault
}: AddressCardProps) {
  return (
    <Card className="border-border/50 glass-effect hover:border-primary/50 transition-colors">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <SafeIcon 
                  name={address.type === 'pickup' ? 'Package' : 'MapPin'} 
                  className="w-5 h-5 text-primary"
                />
              </div>
              <div>
                <h4 className="font-semibold">{address.label}</h4>
                <p className="text-sm text-muted-foreground">{address.recipientName}</p>
              </div>
            </div>
            {isDefault && (
              <Badge className="bg-primary/20 text-primary border-primary/50">
                <SafeIcon name="Star" className="w-3 h-3 mr-1" />
                Default
              </Badge>
            )}
          </div>

          {/* Address Details */}
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <SafeIcon name="MapPin" className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-muted-foreground">
                <p>{address.street}</p>
                <p>{address.district}, {address.city}</p>
                <p>{address.province} {address.postalCode}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon name="Phone" className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <p className="text-muted-foreground">{address.phone}</p>
            </div>
          </div>

          {/* Type Badge */}
          <div className="flex gap-2">
            <Badge variant="outline" className="border-border/50">
              {address.type === 'pickup' ? 'Penjemputan' : 'Pengiriman'}
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="flex-1"
            >
              <SafeIcon name="Edit2" className="w-4 h-4 mr-2" />
              Edit
            </Button>
            {!isDefault && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSetDefault}
                className="flex-1"
              >
                <SafeIcon name="Star" className="w-4 h-4 mr-2" />
                Jadikan Default
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="text-destructive hover:text-destructive"
            >
              <SafeIcon name="Trash2" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import SafeIcon from '@/components/common/SafeIcon'
import type { PaymentMethod } from './types'

interface SavedPaymentMethodCardProps {
  method: PaymentMethod
  onDelete: (id: string) => void
  onSetDefault: (id: string) => void
  onEdit: () => void
}

export default function SavedPaymentMethodCard({
  method,
  onDelete,
  onSetDefault,
  onEdit
}: SavedPaymentMethodCardProps) {
  const getMethodIcon = () => {
    switch (method.type) {
      case 'credit_card':
        return 'CreditCard'
      case 'ewallet':
        return 'Smartphone'
      case 'bank_transfer':
        return 'Building2'
      default:
        return 'Wallet'
    }
  }

  const getMethodDisplay = () => {
    if (method.type === 'credit_card') {
      return {
        number: method.cardNumber,
        detail: `Berlaku hingga ${method.expiryDate}`,
        issuer: method.issuer
      }
    } else if (method.type === 'ewallet') {
      return {
        number: method.accountNumber,
        detail: `E-Wallet ${method.issuer}`,
        issuer: method.issuer
      }
    } else {
      return {
        number: method.accountNumber,
        detail: `${method.bankName}`,
        issuer: method.issuer
      }
    }
  }

  const display = getMethodDisplay()
  const lastUsedDate = new Date(method.lastUsed)
  const formattedDate = lastUsedDate.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Card className={`glass-effect border transition-all ${
      method.isDefault 
        ? 'border-primary/50 bg-primary/5' 
        : 'border-border hover:border-primary/30'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Left Section - Icon and Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <SafeIcon name={getMethodIcon()} className="w-6 h-6 text-primary-foreground" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate">{method.name}</h3>
                {method.isDefault && (
                  <Badge className="bg-primary/20 text-primary border-primary/50 flex-shrink-0">
                    <SafeIcon name="Check" className="w-3 h-3 mr-1" />
                    Default
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-2 truncate">
                {display.number}
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span>{display.detail}</span>
                <span>•</span>
                <span>Terakhir digunakan: {formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <SafeIcon name="MoreVertical" className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onEdit}>
                  <SafeIcon name="Edit2" className="w-4 h-4 mr-2" />
                  Edit Metode
                </DropdownMenuItem>

                {!method.isDefault && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onSetDefault(method.id)}>
                      <SafeIcon name="Check" className="w-4 h-4 mr-2" />
                      Jadikan Default
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(method.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <SafeIcon name="Trash2" className="w-4 h-4 mr-2" />
                  Hapus Metode
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

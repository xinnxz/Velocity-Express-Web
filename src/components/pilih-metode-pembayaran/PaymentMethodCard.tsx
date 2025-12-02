
import { Card } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import { cn } from '@/lib/utils'

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: string
  processingTime: string
  fee: number
  available: boolean
}

interface PaymentMethodCardProps {
  method: PaymentMethod
  isSelected: boolean
  onSelect: () => void
}

export default function PaymentMethodCard({
  method,
  isSelected,
  onSelect
}: PaymentMethodCardProps) {
  return (
    <Card
      onClick={onSelect}
      className={cn(
        'cursor-pointer transition-all duration-300 border-2',
        isSelected
          ? 'border-primary bg-primary/10 shadow-lg'
          : 'border-border hover:border-primary/50 hover:bg-card/50',
        !method.available && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1">
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
              isSelected
                ? 'bg-primary/30'
                : 'bg-muted/50'
            )}>
              <SafeIcon 
                name={method.icon} 
                className={cn(
                  'w-5 h-5',
                  isSelected ? 'text-primary' : 'text-muted-foreground'
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm leading-tight">
                {method.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {method.description}
              </p>
            </div>
          </div>
          
          {/* Selection Indicator */}
          <div className={cn(
            'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2',
            isSelected
              ? 'border-primary bg-primary'
              : 'border-muted-foreground/30'
          )}>
            {isSelected && (
              <SafeIcon name="Check" className="w-3 h-3 text-primary-foreground" />
            )}
          </div>
        </div>

        {/* Processing Time */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <SafeIcon name="Clock" className="w-3.5 h-3.5" />
          <span>{method.processingTime}</span>
        </div>

        {/* Fee Badge */}
        {method.fee > 0 && (
          <div className="mt-2 inline-block px-2 py-1 rounded bg-muted/50 text-xs">
            Biaya: Rp {method.fee.toLocaleString('id-ID')}
          </div>
        )}
        {method.fee === 0 && (
          <div className="mt-2 inline-block px-2 py-1 rounded bg-green-500/20 text-xs text-green-400">
            Tanpa Biaya Tambahan
          </div>
        )}

        {!method.available && (
          <div className="mt-2 text-xs text-destructive">
            Tidak tersedia saat ini
          </div>
        )}
      </div>
    </Card>
  )
}

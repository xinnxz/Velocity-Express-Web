
import { Card } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import { AVAILABLE_PACKAGE_TYPES } from '@/data/order_data'
import { cn } from '@/lib/utils'

interface PackageTypeSelectorProps {
  selectedTypeId: string
  onSelect: (typeId: string) => void
  error?: string
}

export default function PackageTypeSelector({
  selectedTypeId,
  onSelect,
  error
}: PackageTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {AVAILABLE_PACKAGE_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={cn(
              'p-4 rounded-lg border-2 transition-all text-left',
              selectedTypeId === type.id
                ? 'border-primary bg-primary/10'
                : 'border-border/50 bg-background/30 hover:border-primary/50'
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                selectedTypeId === type.id
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted/50 text-muted-foreground'
              )}>
                <SafeIcon name={type.iconName} className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm">{type.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {type.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {error && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <SafeIcon name="AlertCircle" className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  )
}

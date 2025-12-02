
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface TrackingNumberCardProps {
  number: string
  onRemove: () => void
}

export default function TrackingNumberCard({ number, onRemove }: TrackingNumberCardProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <SafeIcon name="Package" className="w-5 h-5 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-mono font-semibold text-sm text-foreground truncate">
            {number}
          </p>
          <p className="text-xs text-muted-foreground">
            Siap untuk dilacak
          </p>
        </div>
      </div>

      <Button
        onClick={onRemove}
        variant="ghost"
        size="sm"
        className="ml-2 flex-shrink-0"
      >
        <SafeIcon name="X" className="w-4 h-4" />
      </Button>
    </div>
  )
}

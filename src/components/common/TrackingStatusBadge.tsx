
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import { cn } from '@/lib/utils'

export type TrackingStatus = 
  | 'pending' 
  | 'picked_up' 
  | 'in_transit' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'failed' 
  | 'cancelled'

interface TrackingStatusBadgeProps {
  status: TrackingStatus
  showIcon?: boolean
  className?: string
}

const statusConfig: Record<TrackingStatus, {
  label: string
  icon: string
  variant: 'default' | 'secondary' | 'destructive' | 'outline'
  className: string
}> = {
  pending: {
    label: 'Menunggu',
    icon: 'Clock',
    variant: 'secondary',
    className: 'bg-muted text-muted-foreground'
  },
  picked_up: {
    label: 'Dijemput',
    icon: 'PackageCheck',
    variant: 'default',
    className: 'bg-blue-500/20 text-blue-400 border-blue-500/50'
  },
  in_transit: {
    label: 'Dalam Perjalanan',
    icon: 'Truck',
    variant: 'default',
    className: 'bg-primary/20 text-primary border-primary/50'
  },
  out_for_delivery: {
    label: 'Sedang Dikirim',
    icon: 'MapPin',
    variant: 'default',
    className: 'bg-purple-500/20 text-purple-400 border-purple-500/50'
  },
  delivered: {
    label: 'Terkirim',
    icon: 'CheckCircle2',
    variant: 'default',
    className: 'bg-green-500/20 text-green-400 border-green-500/50'
  },
  failed: {
    label: 'Gagal',
    icon: 'XCircle',
    variant: 'destructive',
    className: 'bg-destructive/20 text-destructive border-destructive/50'
  },
  cancelled: {
    label: 'Dibatalkan',
    icon: 'Ban',
    variant: 'outline',
    className: 'bg-muted/50 text-muted-foreground border-muted-foreground/50'
  }
}

export default function TrackingStatusBadge({ 
  status, 
  showIcon = true,
  className 
}: TrackingStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge 
      variant={config.variant}
      className={cn(
        'inline-flex items-center gap-1.5 border',
        config.className,
        className
      )}
    >
      {showIcon && <SafeIcon name={config.icon} className="w-3.5 h-3.5" />}
      <span>{config.label}</span>
    </Badge>
  )
}

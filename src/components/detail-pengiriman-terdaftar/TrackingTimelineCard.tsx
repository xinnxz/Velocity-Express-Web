
import { Card } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'

interface TimelineEvent {
  status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed' | 'cancelled'
  timestamp: string
  location: string
  description: string
}

interface TrackingTimelineCardProps {
  timeline: TimelineEvent[]
}

export default function TrackingTimelineCard({ timeline }: TrackingTimelineCardProps) {
  const getStatusIcon = (status: string): string => {
    const iconMap: Record<string, string> = {
      pending: 'Clock',
      picked_up: 'PackageCheck',
      in_transit: 'Truck',
      out_for_delivery: 'MapPin',
      delivered: 'CheckCircle2',
      failed: 'XCircle',
      cancelled: 'Ban'
    }
    return iconMap[status] || 'Package'
  }

  return (
    <Card className="glass-effect border-border/50 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
          <SafeIcon name="Route" className="w-4 h-4 text-accent" />
        </div>
        <h3 className="font-semibold">Riwayat Pelacakan</h3>
      </div>

      <div className="space-y-4">
        {timeline.map((event, index) => {
          const eventDate = new Date(event.timestamp)
          const formattedTime = eventDate.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
          })
          const formattedDate = eventDate.toLocaleDateString('id-ID', {
            month: 'short',
            day: 'numeric'
          })

          return (
            <div key={index} className="flex gap-4">
              {/* Timeline Line & Dot */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <SafeIcon 
                    name={getStatusIcon(event.status)} 
                    className="w-5 h-5 text-primary-foreground"
                  />
                </div>
                {index < timeline.length - 1 && (
                  <div className="w-0.5 h-12 bg-gradient-to-b from-primary/50 to-primary/10 mt-2" />
                )}
              </div>

              {/* Event Content */}
              <div className="flex-1 pt-1 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                  <TrackingStatusBadge status={event.status} showIcon={false} />
                  <span className="text-xs text-muted-foreground">
                    {formattedDate} {formattedTime}
                  </span>
                </div>
                <p className="text-sm font-medium mb-1">{event.location}</p>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="pt-4 border-t border-border/50">
        <button className="text-sm text-primary hover:underline flex items-center gap-1">
          <SafeIcon name="ChevronDown" className="w-4 h-4" />
          Lihat Riwayat Lengkap
        </button>
      </div>
    </Card>
  )
}

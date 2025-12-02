
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import type { TrackingEvent } from './mockData'
import { cn } from '@/lib/utils'

interface TrackingHistoryTimelineProps {
  events: TrackingEvent[]
}

const eventTypeConfig: Record<string, { icon: string; color: string }> = {
  pickup: { icon: 'PackageCheck', color: 'text-blue-400' },
  transit: { icon: 'Truck', color: 'text-primary' },
  location_update: { icon: 'MapPin', color: 'text-purple-400' },
  delivery_attempt: { icon: 'AlertCircle', color: 'text-yellow-400' },
  delivered: { icon: 'CheckCircle2', color: 'text-green-400' },
  failed: { icon: 'XCircle', color: 'text-destructive' },
  note: { icon: 'MessageSquare', color: 'text-muted-foreground' },
}

const statusColorMap: Record<string, string> = {
  pending: 'bg-muted text-muted-foreground',
  picked_up: 'bg-blue-500/20 text-blue-400 border border-blue-500/50',
  in_transit: 'bg-primary/20 text-primary border border-primary/50',
  out_for_delivery: 'bg-purple-500/20 text-purple-400 border border-purple-500/50',
  delivered: 'bg-green-500/20 text-green-400 border border-green-500/50',
  failed: 'bg-destructive/20 text-destructive border border-destructive/50',
}

export default function TrackingHistoryTimeline({ events }: TrackingHistoryTimelineProps) {
  return (
    <div className="space-y-6">
      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent" />

        {/* Events */}
        <div className="space-y-6">
          {events.map((event, index) => {
            const config = eventTypeConfig[event.eventType] || eventTypeConfig.note
            return (
              <div key={index} className="relative pl-20">
                {/* Timeline dot */}
                <div className={cn(
                  'absolute left-0 top-2 w-12 h-12 rounded-full border-2 border-background flex items-center justify-center',
                  'bg-card neon-glow'
                )}>
                  <SafeIcon name={config.icon} className={cn('w-5 h-5', config.color)} />
                </div>

                {/* Event card */}
                <Card className="glass-effect border-border/50 hover:border-primary/50 transition-colors">
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          {event.description}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {event.location}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={cn(
                          'whitespace-nowrap',
                          statusColorMap[event.status] || 'bg-muted'
                        )}>
                          {event.statusLabel}
                        </Badge>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {event.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Additional details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-border/50">
                      {event.coordinates && (
                        <div className="flex items-center gap-2 text-xs">
                          <SafeIcon name="Navigation" className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {event.coordinates}
                          </span>
                        </div>
                      )}
                      {event.handler && (
                        <div className="flex items-center gap-2 text-xs">
                          <SafeIcon name="User" className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {event.handler}
                          </span>
                        </div>
                      )}
                      {event.temperature && (
                        <div className="flex items-center gap-2 text-xs">
                          <SafeIcon name="Thermometer" className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {event.temperature}
                          </span>
                        </div>
                      )}
                      {event.notes && (
                        <div className="flex items-start gap-2 text-xs sm:col-span-2">
                          <SafeIcon name="FileText" className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            {event.notes}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Timeline Summary */}
      <Card className="glass-effect border-border/50 bg-card/50">
        <div className="p-6">
          <h3 className="font-semibold mb-4">Ringkasan Perjalanan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Waktu Mulai
              </p>
              <p className="font-semibold">{events[0]?.timestamp || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Waktu Selesai
              </p>
              <p className="font-semibold">{events[events.length - 1]?.timestamp || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Total Event
              </p>
              <p className="font-semibold">{events.length} event</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

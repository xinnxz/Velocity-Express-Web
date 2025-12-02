
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'

interface TimelineEvent {
  id: number
  timestamp: string
  status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed' | 'cancelled'
  location: string
  description: string
}

interface TrackingTimelinePreviewProps {
  timeline: TimelineEvent[]
  showAll?: boolean
}

export default function TrackingTimelinePreview({ 
  timeline, 
  showAll = false 
}: TrackingTimelinePreviewProps) {
  const displayedEvents = showAll ? timeline : timeline.slice(0, 3)

  return (
    <Card className="glass-effect border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <SafeIcon name="Clock" className="w-4 h-4 text-primary" />
          Riwayat Pelacakan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedEvents.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline line */}
              {index < displayedEvents.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-12 bg-gradient-to-b from-primary/50 to-primary/10" />
              )}

              {/* Event item */}
              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className="flex flex-col items-center pt-1">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center flex-shrink-0">
                    <SafeIcon name="CheckCircle2" className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Event content */}
                <div className="flex-1 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{event.description}</p>
                      <TrackingStatusBadge status={event.status} showIcon={false} className="text-xs" />
                    </div>
                    <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <SafeIcon name="MapPin" className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && timeline.length > 3 && (
          <div className="mt-4 pt-4 border-t border-border/30">
            <a 
              href="./detail-riwayat-pelacakan.html"
              className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              Lihat Riwayat Lengkap
              <SafeIcon name="ArrowRight" className="w-3 h-3" />
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

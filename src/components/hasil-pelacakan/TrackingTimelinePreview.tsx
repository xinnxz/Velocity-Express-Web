
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge, { type TrackingStatus } from '@/components/common/TrackingStatusBadge'

interface TimelineEvent {
  status: TrackingStatus
  location: string
  timestamp: string | null
  description: string
}

interface TrackingTimelinePreviewProps {
  timeline: TimelineEvent[]
}

export default function TrackingTimelinePreview({
  timeline
}: TrackingTimelinePreviewProps) {
  return (
    <Card className="glass-effect border-border">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <SafeIcon name="Route" className="w-5 h-5 text-primary" />
          Perjalanan Paket
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map((event, index) => (
            <div key={index} className="flex gap-4">
              {/* Timeline Dot & Line */}
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  event.timestamp 
                    ? 'bg-primary border-primary' 
                    : 'bg-background border-muted'
                }`}>
                  {event.timestamp && (
                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  )}
                </div>
                {index < timeline.length - 1 && (
                  <div className={`w-0.5 h-12 ${
                    event.timestamp ? 'bg-primary/50' : 'bg-muted/50'
                  }`} />
                )}
              </div>

              {/* Event Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <p className="font-medium text-foreground">
                      {event.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.location}
                    </p>
                  </div>
                  <TrackingStatusBadge status={event.status} showIcon={false} className="text-xs" />
                </div>
                {event.timestamp && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <SafeIcon name="Clock" className="w-3 h-3" />
                    {event.timestamp}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

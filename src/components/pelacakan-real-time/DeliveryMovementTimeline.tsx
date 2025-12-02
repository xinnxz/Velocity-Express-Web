
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import TrackingStatusBadge, { type TrackingStatus } from '@/components/common/TrackingStatusBadge'
import SafeIcon from '@/components/common/SafeIcon'

interface Movement {
  status: TrackingStatus
  location: string
  timestamp: string
  description: string
}

interface DeliveryMovementTimelineProps {
  movements: Movement[]
}

export default function DeliveryMovementTimeline({ movements }: DeliveryMovementTimelineProps) {
  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let dateStr = ''
    if (date.toDateString() === today.toDateString()) {
      dateStr = 'Hari ini'
    } else if (date.toDateString() === yesterday.toDateString()) {
      dateStr = 'Kemarin'
    } else {
      dateStr = date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      })
    }

    const timeStr = date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    })

    return { dateStr, timeStr }
  }

  return (
    <Card className="glass-effect border-border">
      <CardHeader>
        <CardTitle>Riwayat Pergerakan</CardTitle>
        <CardDescription>Kronologi lengkap perjalanan paket Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {movements.map((movement, index) => {
            const { dateStr, timeStr } = formatDateTime(movement.timestamp)
            const isLast = index === movements.length - 1

            return (
              <div key={index} className="relative">
                {/* Timeline line */}
                {!isLast && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-primary/10"></div>
                )}

                {/* Timeline item */}
                <div className="flex gap-4">
                  {/* Timeline dot */}
                  <div className="relative flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      isLast 
                        ? 'bg-primary/20 border-primary' 
                        : 'bg-muted/50 border-muted-foreground/30'
                    }`}>
                      {movement.status === 'picked_up' && (
                        <SafeIcon name="PackageCheck" className="w-5 h-5 text-primary" />
                      )}
                      {movement.status === 'in_transit' && (
                        <SafeIcon name="Truck" className="w-5 h-5 text-primary" />
                      )}
                      {movement.status === 'out_for_delivery' && (
                        <SafeIcon name="MapPin" className="w-5 h-5 text-primary" />
                      )}
                      {movement.status === 'delivered' && (
                        <SafeIcon name="CheckCircle2" className="w-5 h-5 text-green-400" />
                      )}
                      {movement.status === 'pending' && (
                        <SafeIcon name="Clock" className="w-5 h-5 text-muted-foreground" />
                      )}
                      {movement.status === 'failed' && (
                        <SafeIcon name="XCircle" className="w-5 h-5 text-destructive" />
                      )}
                      {movement.status === 'cancelled' && (
                        <SafeIcon name="Ban" className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Timeline content */}
                  <div className="flex-1 pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <TrackingStatusBadge status={movement.status} showIcon={false} />
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-semibold">{dateStr}</span>
                        <span className="font-mono">{timeStr}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-semibold">{movement.description}</p>
                      <div className="flex items-start gap-2">
                        <SafeIcon name="MapPin" className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{movement.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

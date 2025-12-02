
import { Card, CardContent } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge, { type TrackingStatus } from '@/components/common/TrackingStatusBadge'

interface TrackingResultsHeaderProps {
  trackingNumber: string
  status: TrackingStatus
}

export default function TrackingResultsHeader({
  trackingNumber,
  status
}: TrackingResultsHeaderProps) {
  return (
    <Card className="glass-effect border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SafeIcon name="Package" className="w-6 h-6 text-primary" />
              <h1 className="text-2xl sm:text-3xl font-bold gradient-text">
                Hasil Pelacakan
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Nomor Resi: <span className="font-mono font-semibold text-foreground">{trackingNumber}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Status Pengiriman</p>
              <TrackingStatusBadge status={status} showIcon={true} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

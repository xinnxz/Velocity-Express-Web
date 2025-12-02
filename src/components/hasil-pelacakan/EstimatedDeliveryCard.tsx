
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import SafeIcon from '@/components/common/SafeIcon'

interface EstimatedDeliveryCardProps {
  estimatedDelivery: {
    date: string
    time: string
    daysRemaining: number
  }
}

export default function EstimatedDeliveryCard({
  estimatedDelivery
}: EstimatedDeliveryCardProps) {
  // Calculate progress (assuming 3 days total journey)
  const totalDays = 3
  const progressPercent = ((totalDays - estimatedDelivery.daysRemaining) / totalDays) * 100

  // Format date
  const deliveryDate = new Date(estimatedDelivery.date)
  const formattedDate = deliveryDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Card className="glass-effect border-primary/20 bg-gradient-to-br from-primary/10 to-transparent neon-glow">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <SafeIcon name="Calendar" className="w-5 h-5 text-primary" />
          Estimasi Pengiriman
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Countdown */}
        <div className="text-center py-4 bg-background/50 rounded-lg border border-primary/20">
          <p className="text-xs text-muted-foreground mb-2">Sisa Waktu</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-bold text-primary">
              {estimatedDelivery.daysRemaining}
            </span>
            <span className="text-sm text-muted-foreground">hari</span>
          </div>
        </div>

        {/* Date & Time */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <SafeIcon name="Calendar" className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Tanggal:</span>
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <SafeIcon name="Clock" className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Waktu:</span>
            <span className="font-medium">{estimatedDelivery.time}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progres Pengiriman</span>
            <span className="text-primary font-semibold">{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Info */}
        <div className="bg-accent/10 rounded-lg p-3 border border-accent/20 text-xs text-muted-foreground space-y-1">
          <p className="flex items-start gap-2">
            <SafeIcon name="Info" className="w-3 h-3 mt-0.5 flex-shrink-0 text-accent" />
            <span>Paket Anda sedang dalam perjalanan dan akan tiba sesuai jadwal.</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

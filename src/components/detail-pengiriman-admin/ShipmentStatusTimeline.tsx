
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface TrackingEvent {
  id: string
  status: string
  timestamp: string
  location: string
  description: string
  icon: string
  isCompleted: boolean
}

interface ShipmentStatusTimelineProps {}

export default function ShipmentStatusTimeline({}: ShipmentStatusTimelineProps) {
  const trackingHistory: TrackingEvent[] = [
    {
      id: '1',
      status: 'Paket Diterima',
      timestamp: '2024-01-15 08:15:00',
      location: 'Jakarta Pusat',
      description: 'Paket telah diterima dari pengirim',
      icon: 'PackageCheck',
      isCompleted: true
    },
    {
      id: '2',
      status: 'Dalam Proses',
      timestamp: '2024-01-15 09:30:00',
      location: 'Pusat Distribusi Jakarta',
      description: 'Paket sedang diproses di pusat distribusi',
      icon: 'Zap',
      isCompleted: true
    },
    {
      id: '3',
      status: 'Dalam Perjalanan',
      timestamp: '2024-01-15 11:00:00',
      location: 'Jalan Tol Jakarta-Bandung',
      description: 'Paket sedang dalam perjalanan menuju Bandung',
      icon: 'Truck',
      isCompleted: true
    },
    {
      id: '4',
      status: 'Sedang Dikirim',
      timestamp: '2024-01-15 14:30:00',
      location: 'Bandung',
      description: 'Paket sedang dalam pengiriman akhir',
      icon: 'MapPin',
      isCompleted: true
    },
    {
      id: '5',
      status: 'Terkirim',
      timestamp: '2024-01-15 18:00:00',
      location: 'Bandung',
      description: 'Paket telah diterima oleh penerima',
      icon: 'CheckCircle2',
      isCompleted: false
    }
  ]

  return (
    <Card className="glass-effect border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <SafeIcon name="Clock" className="w-5 h-5 text-primary" />
          Riwayat Pelacakan
        </CardTitle>
        <CardDescription>Kronologi lengkap perjalanan paket</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {trackingHistory.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  event.isCompleted 
                    ? 'bg-primary/20 border-primary' 
                    : 'bg-muted border-muted-foreground'
                }`}>
                  <SafeIcon 
                    name={event.icon} 
                    className={`w-5 h-5 ${
                      event.isCompleted ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  />
                </div>
                {index < trackingHistory.length - 1 && (
                  <div className={`w-0.5 h-16 mt-2 ${
                    event.isCompleted ? 'bg-primary/50' : 'bg-muted'
                  }`} />
                )}
              </div>

              {/* Event Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold">{event.status}</h4>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                  {event.isCompleted && (
                    <Badge variant="outline" className="text-xs">
                      Selesai
                    </Badge>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <SafeIcon name="Calendar" className="w-3 h-3" />
                    {event.timestamp}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <SafeIcon name="MapPin" className="w-3 h-3" />
                    {event.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full History Link */}
        <div className="mt-6 pt-6 border-t border-border">
          <a 
            href="./riwayat-pelacakan-admin.html"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <SafeIcon name="ArrowRight" className="w-4 h-4" />
            Lihat Riwayat Lengkap
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

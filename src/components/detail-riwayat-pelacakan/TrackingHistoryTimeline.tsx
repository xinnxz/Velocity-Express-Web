
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'
import type { TrackingStatus } from '@/components/common/TrackingStatusBadge'

interface TrackingEvent {
  id: string
  timestamp: string
  status: TrackingStatus
  location: string
  description: string
  notes?: string
  icon: string
}

interface TrackingHistoryTimelineProps {}

export default function TrackingHistoryTimeline({}: TrackingHistoryTimelineProps) {
  // Mock tracking history data
  const trackingEvents: TrackingEvent[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30',
      status: 'delivered',
      location: 'Surabaya, Jawa Timur',
      description: 'Paket telah diterima oleh penerima',
      notes: 'Diterima oleh: Budi Santoso',
      icon: 'CheckCircle2'
    },
    {
      id: '2',
      timestamp: '2024-01-15 10:15',
      status: 'out_for_delivery',
      location: 'Surabaya, Jawa Timur',
      description: 'Paket sedang dalam perjalanan ke alamat tujuan',
      notes: 'Kurir: Andi Wijaya (Drone DJI Matrice 300)',
      icon: 'Drone'
    },
    {
      id: '3',
      timestamp: '2024-01-15 08:45',
      status: 'in_transit',
      location: 'Pusat Distribusi Surabaya',
      description: 'Paket telah tiba di pusat distribusi tujuan',
      notes: 'Scan masuk: Operator Pusat Distribusi',
      icon: 'Package'
    },
    {
      id: '4',
      timestamp: '2024-01-14 22:30',
      status: 'in_transit',
      location: 'Rute Jakarta - Surabaya',
      description: 'Paket dalam perjalanan dengan kendaraan express',
      notes: 'Kendaraan: Tesla Semi Truck (Autonomous)',
      icon: 'Truck'
    },
    {
      id: '5',
      timestamp: '2024-01-14 18:00',
      status: 'picked_up',
      location: 'Pusat Distribusi Jakarta',
      description: 'Paket telah diproses dan siap dikirim',
      notes: 'Scan keluar: Operator Pusat Distribusi',
      icon: 'PackageCheck'
    },
    {
      id: '6',
      timestamp: '2024-01-14 14:20',
      status: 'picked_up',
      location: 'Jakarta, DKI Jakarta',
      description: 'Paket telah dijemput dari lokasi pengirim',
      notes: 'Dijemput oleh: Rudi Hermawan (Sepeda Motor)',
      icon: 'Bike'
    },
    {
      id: '7',
      timestamp: '2024-01-14 10:00',
      status: 'pending',
      location: 'PT Teknologi Indonesia, Jakarta',
      description: 'Pesanan telah diterima dan dalam proses',
      notes: 'Penerima: Ibu Siti (Admin Pengiriman)',
      icon: 'Clock'
    }
  ]

return (
    <Card className="glass-effect border-primary/20">
      <CardHeader className="border-b border-border/50 p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <SafeIcon name="History" className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="truncate">Riwayat Pelacakan Lengkap</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {/* Timeline */}
        <div className="space-y-0">
          {trackingEvents.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline Line */}
              {index < trackingEvents.length - 1 && (
                <div className="absolute left-5 sm:left-6 top-14 sm:top-16 w-0.5 h-12 bg-gradient-to-b from-primary/50 to-primary/10" />
              )}

              {/* Event Item */}
              <div className="flex gap-3 sm:gap-4 pb-6">
                {/* Timeline Dot */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-primary flex items-center justify-center border-2 border-background relative z-10 flex-shrink-0">
                    <SafeIcon 
                      name={event.icon} 
                      className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" 
                    />
                  </div>
                </div>

                {/* Event Content */}
                <div className="flex-1 pt-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-foreground">{event.description}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-start gap-1">
                        <SafeIcon name="MapPin" className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{event.location}</span>
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <TrackingStatusBadge status={event.status} showIcon={false} className="whitespace-nowrap text-xs sm:text-sm" />
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <SafeIcon name="Clock" className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                    <span className="truncate">{event.timestamp}</span>
                  </div>

                  {/* Notes */}
                  {event.notes && (
                    <div className="bg-muted/30 rounded-lg p-2 sm:p-3 mt-3 border border-border/50">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Catatan: </span>
                        {event.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Summary */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Tahapan</p>
              <p className="text-xl sm:text-2xl font-bold">{trackingEvents.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Durasi</p>
              <p className="text-xl sm:text-2xl font-bold">1 hari</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Jarak</p>
              <p className="text-xl sm:text-2xl font-bold">~700 km</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Kecepatan</p>
              <p className="text-xl sm:text-2xl font-bold">~29 km/h</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

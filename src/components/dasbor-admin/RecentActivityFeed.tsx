
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface Activity {
  id: string
  type: 'order' | 'user' | 'payment' | 'system'
  title: string
  description: string
  timestamp: string
  icon: string
  color: string
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'order',
    title: 'Pesanan Baru Dibuat',
    description: 'Pesanan #ORD-2024-001847 dibuat oleh Budi Santoso',
    timestamp: '5 menit yang lalu',
    icon: 'Package',
    color: 'text-primary'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Pembayaran Berhasil',
    description: 'Pembayaran Rp 250.000 untuk pesanan #ORD-2024-001846 dikonfirmasi',
    timestamp: '12 menit yang lalu',
    icon: 'CheckCircle2',
    color: 'text-green-400'
  },
  {
    id: '3',
    type: 'user',
    title: 'Pengguna Baru Terdaftar',
    description: 'Siti Nurhaliza mendaftar sebagai pengguna baru',
    timestamp: '28 menit yang lalu',
    icon: 'UserPlus',
    color: 'text-blue-400'
  },
  {
    id: '4',
    type: 'order',
    title: 'Pengiriman Selesai',
    description: 'Pesanan #ORD-2024-001845 telah diterima oleh penerima',
    timestamp: '1 jam yang lalu',
    icon: 'Truck',
    color: 'text-purple-400'
  },
  {
    id: '5',
    type: 'system',
    title: 'Backup Sistem Selesai',
    description: 'Backup database harian berhasil diselesaikan',
    timestamp: '2 jam yang lalu',
    icon: 'Database',
    color: 'text-yellow-400'
  },
  {
    id: '6',
    type: 'order',
    title: 'Pengiriman Dimulai',
    description: 'Pesanan #ORD-2024-001844 sedang dalam perjalanan ke tujuan',
    timestamp: '3 jam yang lalu',
    icon: 'MapPin',
    color: 'text-primary'
  }
]

const typeConfig: Record<Activity['type'], { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  order: { label: 'Pesanan', variant: 'default' },
  user: { label: 'Pengguna', variant: 'secondary' },
  payment: { label: 'Pembayaran', variant: 'outline' },
  system: { label: 'Sistem', variant: 'outline' }
}

export default function RecentActivityFeed() {
  return (
    <Card className="glass-effect border-border/50">
      <CardHeader>
        <CardTitle>Aktivitas Terbaru</CardTitle>
        <CardDescription>
          Riwayat aktivitas sistem dalam 24 jam terakhir
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={activity.id}
              className={`flex gap-4 pb-4 ${index !== activities.length - 1 ? 'border-b border-border/50' : ''}`}
            >
              {/* Timeline dot and line */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center ${activity.color}`}>
                  <SafeIcon name={activity.icon} className="w-5 h-5" />
                </div>
                {index !== activities.length - 1 && (
                  <div className="w-0.5 h-12 bg-border/50 mt-2"></div>
                )}
              </div>

              {/* Activity content */}
              <div className="flex-1 pt-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{activity.title}</h4>
                      <Badge 
                        variant={typeConfig[activity.type].variant}
                        className="text-xs"
                      >
                        {typeConfig[activity.type].label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

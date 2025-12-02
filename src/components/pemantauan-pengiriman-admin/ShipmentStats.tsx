
import { Card, CardContent } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'

interface ShipmentStatsProps {
  stats: {
    total: number
    active: number
    completed: number
    failed: number
  }
}

export default function ShipmentStats({ stats }: ShipmentStatsProps) {
  const statItems = [
    {
      label: 'Total Pengiriman',
      value: stats.total,
      icon: 'Package',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Aktif',
      value: stats.active,
      icon: 'Truck',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Terkirim',
      value: stats.completed,
      icon: 'CheckCircle2',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Gagal/Dibatalkan',
      value: stats.failed,
      icon: 'XCircle',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <Card key={item.label} className="glass-effect border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                <p className="text-3xl font-bold">{item.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                <SafeIcon name={item.icon} className={`w-6 h-6 ${item.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

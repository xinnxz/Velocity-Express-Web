
import { Card, CardContent } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'

interface MetricCard {
  title: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: string
  color: string
}

const metrics: MetricCard[] = [
  {
    title: 'Total Pengiriman',
    value: '12,847',
    change: '+12.5% dari bulan lalu',
    changeType: 'positive',
    icon: 'Package',
    color: 'text-primary'
  },
  {
    title: 'Pendapatan Bulan Ini',
    value: 'Rp 2.4B',
    change: '+8.2% dari bulan lalu',
    changeType: 'positive',
    icon: 'DollarSign',
    color: 'text-green-400'
  },
  {
    title: 'Pengguna Aktif',
    value: '3,542',
    change: '+5.1% dari bulan lalu',
    changeType: 'positive',
    icon: 'Users',
    color: 'text-blue-400'
  },
  {
    title: 'Pengiriman Aktif',
    value: '847',
    change: '-2.3% dari kemarin',
    changeType: 'negative',
    icon: 'Truck',
    color: 'text-purple-400'
  }
]

export default function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card 
          key={metric.title}
          className="glass-effect border-border/50 hover:border-primary/50 transition-all duration-300"
        >
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center ${metric.color}`}>
                  <SafeIcon name={metric.icon} className="w-6 h-6" />
                </div>
              </div>
              
              <div className={`text-xs font-medium ${
                metric.changeType === 'positive' 
                  ? 'text-green-400' 
                  : metric.changeType === 'negative'
                  ? 'text-red-400'
                  : 'text-muted-foreground'
              }`}>
                {metric.changeType === 'positive' && (
                  <SafeIcon name="TrendingUp" className="w-3 h-3 inline mr-1" />
                )}
                {metric.changeType === 'negative' && (
                  <SafeIcon name="TrendingDown" className="w-3 h-3 inline mr-1" />
                )}
                {metric.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

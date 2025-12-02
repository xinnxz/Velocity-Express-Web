
import { Card, CardContent } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'

interface DateRange {
  from: Date
  to: Date
}

interface MetricItem {
  label: string
  value: string | number
  change: number
  icon: string
  color: string
}

interface MetricsGridProps {
  dateRange: DateRange
}

export default function MetricsGrid({ dateRange }: MetricsGridProps) {
  // Mock data for metrics
  const metrics: MetricItem[] = [
    {
      label: 'Total Pengiriman',
      value: '12,458',
      change: 12.5,
      icon: 'Package',
      color: 'text-blue-400'
    },
    {
      label: 'Tingkat Keberhasilan',
      value: '98.5%',
      change: 2.3,
      icon: 'CheckCircle2',
      color: 'text-green-400'
    },
    {
      label: 'Rata-rata Waktu Pengiriman',
      value: '2.4 hari',
      change: -5.2,
      icon: 'Clock',
      color: 'text-purple-400'
    },
    {
      label: 'Total Pendapatan',
      value: 'Rp 2.4M',
      change: 18.7,
      icon: 'DollarSign',
      color: 'text-yellow-400'
    },
    {
      label: 'Kepuasan Pelanggan',
      value: '4.8/5.0',
      change: 3.1,
      icon: 'Star',
      color: 'text-orange-400'
    },
    {
      label: 'Pengiriman Aktif',
      value: '342',
      change: 8.4,
      icon: 'Truck',
      color: 'text-cyan-400'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="glass-effect border-border/50 hover:border-primary/50 transition-colors">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center ${metric.color}`}>
                  <SafeIcon name={metric.icon} className="w-5 h-5" />
                </div>
              </div>

              {/* Change Indicator */}
              <div className="flex items-center gap-1">
                {metric.change >= 0 ? (
                  <>
                    <SafeIcon name="TrendingUp" className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">+{metric.change}%</span>
                  </>
                ) : (
                  <>
                    <SafeIcon name="TrendingDown" className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-400">{metric.change}%</span>
                  </>
                )}
                <span className="text-xs text-muted-foreground">vs periode sebelumnya</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

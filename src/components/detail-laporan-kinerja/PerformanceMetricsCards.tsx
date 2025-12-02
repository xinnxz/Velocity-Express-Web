
import { Card, CardContent } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import { cn } from '@/lib/utils'

interface Metric {
  id: string
  label: string
  value: string | number
  unit?: string
  change?: number
  icon: string
  trend?: 'up' | 'down' | 'neutral'
  color?: 'primary' | 'success' | 'warning' | 'destructive'
}

interface PerformanceMetricsCardsProps {
  metrics: Metric[]
}

const colorClasses = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  success: 'bg-green-500/10 text-green-400 border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  destructive: 'bg-destructive/10 text-destructive border-destructive/20',
}

export default function PerformanceMetricsCards({ metrics }: PerformanceMetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card 
          key={metric.id}
          className="border-border/50 bg-card/50 hover:bg-card/70 transition-colors"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={cn(
                'w-12 h-12 rounded-lg flex items-center justify-center border',
                colorClasses[metric.color || 'primary']
              )}>
                <SafeIcon name={metric.icon} className="w-6 h-6" />
              </div>
              {metric.change !== undefined && (
                <div className={cn(
                  'flex items-center gap-1 text-sm font-medium',
                  metric.change >= 0 ? 'text-green-400' : 'text-destructive'
                )}>
                  <SafeIcon 
                    name={metric.change >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                    className="w-4 h-4" 
                  />
                  {Math.abs(metric.change)}%
                </div>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{metric.value}</span>
              {metric.unit && <span className="text-sm text-muted-foreground">{metric.unit}</span>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

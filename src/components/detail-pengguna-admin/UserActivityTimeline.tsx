
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import { cn } from '@/lib/utils'

interface Activity {
  id: number
  type: string
  description: string
  timestamp: string
  details: string
}

interface UserActivityTimelineProps {
  activities: Activity[]
}

const activityTypeConfig: Record<string, {
  icon: string
  color: string
  bgColor: string
}> = {
  shipment_created: {
    icon: 'Package',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20'
  },
  payment_completed: {
    icon: 'CreditCard',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20'
  },
  shipment_delivered: {
    icon: 'CheckCircle2',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20'
  },
  login: {
    icon: 'LogIn',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20'
  },
  profile_updated: {
    icon: 'User',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20'
  }
}

export default function UserActivityTimeline({ activities }: UserActivityTimelineProps) {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Baru saja'
    if (diffMins < 60) return `${diffMins} menit lalu`
    if (diffHours < 24) return `${diffHours} jam lalu`
    if (diffDays < 7) return `${diffDays} hari lalu`

    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className="glass-effect border-border/50">
      <CardHeader>
        <CardTitle>Riwayat Aktivitas</CardTitle>
        <CardDescription>Aktivitas pengguna dalam 30 hari terakhir</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {activities.length > 0 ? (
            activities.map((activity, index) => {
              const config = activityTypeConfig[activity.type] || {
                icon: 'Activity',
                color: 'text-muted-foreground',
                bgColor: 'bg-muted/20'
              }

              return (
                <div key={activity.id} className="flex gap-4">
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                      config.bgColor
                    )}>
                      <SafeIcon 
                        name={config.icon} 
                        className={cn('w-5 h-5', config.color)}
                      />
                    </div>
                    {index < activities.length - 1 && (
                      <div className="w-0.5 h-12 bg-border/50 mt-2" />
                    )}
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.details}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDateTime(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-8">
              <SafeIcon name="History" className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Tidak ada aktivitas</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

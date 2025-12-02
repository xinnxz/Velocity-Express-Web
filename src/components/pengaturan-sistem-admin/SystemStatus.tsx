
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import SafeIcon from '@/components/common/SafeIcon'

export default function SystemStatus() {
  const systemInfo = {
    version: '2.1.0',
    buildDate: '2024-01-15',
    uptime: '45 hari 12 jam',
    status: 'operational',
    lastBackup: '2024-01-20 03:00 AM',
    database: 'Connected',
    apiServer: 'Running',
    cache: 'Active'
  }

  const metrics = [
    {
      label: 'CPU Usage',
      value: 35,
      unit: '%',
      status: 'normal'
    },
    {
      label: 'Memory Usage',
      value: 62,
      unit: '%',
      status: 'normal'
    },
    {
      label: 'Disk Usage',
      value: 78,
      unit: '%',
      status: 'warning'
    },
    {
      label: 'Database Size',
      value: 45,
      unit: 'GB',
      status: 'normal'
    }
  ]

  const services = [
    { name: 'API Server', status: 'running', uptime: '45d 12h' },
    { name: 'Database', status: 'running', uptime: '45d 12h' },
    { name: 'Cache Service', status: 'running', uptime: '2d 3h' },
    { name: 'Queue Service', status: 'running', uptime: '45d 12h' },
    { name: 'Email Service', status: 'running', uptime: '10d 5h' },
    { name: 'SMS Gateway', status: 'running', uptime: '45d 12h' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
      case 'operational':
      case 'normal':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'error':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Activity" className="w-5 h-5 text-primary" />
            Status Sistem
          </CardTitle>
          <CardDescription>Informasi kesehatan dan status sistem secara real-time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Versi Aplikasi</p>
              <p className="text-2xl font-bold">{systemInfo.version}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Status Sistem</p>
              <Badge className={`${getStatusColor('operational')} border`}>
                <SafeIcon name="CheckCircle2" className="w-3 h-3 mr-1" />
                Operasional
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Uptime</p>
              <p className="text-2xl font-bold">{systemInfo.uptime}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Backup Terakhir</p>
              <p className="text-sm font-mono">{systemInfo.lastBackup}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
            <div className="space-y-2">
              <p className="text-sm font-medium">Database</p>
              <Badge className={`${getStatusColor('running')} border`}>
                <SafeIcon name="Database" className="w-3 h-3 mr-1" />
                {systemInfo.database}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">API Server</p>
              <Badge className={`${getStatusColor('running')} border`}>
                <SafeIcon name="Server" className="w-3 h-3 mr-1" />
                {systemInfo.apiServer}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Cache Service</p>
              <Badge className={`${getStatusColor('running')} border`}>
                <SafeIcon name="Zap" className="w-3 h-3 mr-1" />
                {systemInfo.cache}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Build Date</p>
              <p className="text-sm font-mono">{systemInfo.buildDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Metrics */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="BarChart3" className="w-5 h-5 text-primary" />
            Metrik Sistem
          </CardTitle>
          <CardDescription>Penggunaan sumber daya sistem saat ini</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">{metric.label}</label>
                <span className="text-sm font-mono">
                  {metric.value}{metric.unit}
                </span>
              </div>
              <Progress 
                value={metric.value} 
                className="h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Services Status */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Server" className="w-5 h-5 text-primary" />
            Status Layanan
          </CardTitle>
          <CardDescription>Status dan uptime setiap layanan sistem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.map((service) => (
              <div 
                key={service.name}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <SafeIcon name="Circle" className="w-3 h-3 text-green-500 fill-green-500" />
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-xs">
                    Uptime: {service.uptime}
                  </Badge>
                  <Badge className={`${getStatusColor(service.status)} border text-xs`}>
                    {service.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

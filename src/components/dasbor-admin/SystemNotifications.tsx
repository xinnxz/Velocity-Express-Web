
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

interface Notification {
  id: string
  type: 'warning' | 'info' | 'error' | 'success'
  title: string
  description: string
  icon: string
  action?: {
    label: string
    href: string
  }
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Kapasitas Storage Menipis',
    description: 'Penggunaan storage telah mencapai 85%. Pertimbangkan untuk upgrade atau membersihkan data lama.',
    icon: 'AlertTriangle',
    action: {
      label: 'Kelola Storage',
      href: './pengaturan-sistem-admin.html'
    }
  },
  {
    id: '2',
    type: 'info',
    title: 'Update Sistem Tersedia',
    description: 'Versi 2.5.0 dari VeloCity Express sudah tersedia. Kami merekomendasikan untuk melakukan update.',
    icon: 'Info',
    action: {
      label: 'Lihat Update',
      href: './pengaturan-sistem-admin.html'
    }
  }
]

const typeConfig: Record<Notification['type'], { className: string; bgColor: string }> = {
  warning: {
    className: 'border-yellow-500/50 bg-yellow-500/10',
    bgColor: 'bg-yellow-500/20'
  },
  info: {
    className: 'border-blue-500/50 bg-blue-500/10',
    bgColor: 'bg-blue-500/20'
  },
  error: {
    className: 'border-destructive/50 bg-destructive/10',
    bgColor: 'bg-destructive/20'
  },
  success: {
    className: 'border-green-500/50 bg-green-500/10',
    bgColor: 'bg-green-500/20'
  }
}

export default function SystemNotifications() {
  if (notifications.length === 0) return null

  return (
    <div className="space-y-3">
      {notifications.map((notification) => {
        const config = typeConfig[notification.type]
        
        return (
          <Alert 
            key={notification.id}
            className={`glass-effect border ${config.className}`}
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${config.bgColor}`}>
              <SafeIcon 
                name={notification.icon} 
                className={`w-4 h-4 ${
                  notification.type === 'warning' ? 'text-yellow-400' :
                  notification.type === 'info' ? 'text-blue-400' :
                  notification.type === 'error' ? 'text-destructive' :
                  'text-green-400'
                }`}
              />
            </div>
            <div className="flex-1">
              <AlertTitle className="text-sm font-semibold">
                {notification.title}
              </AlertTitle>
              <AlertDescription className="text-xs mt-1">
                {notification.description}
              </AlertDescription>
            </div>
            {notification.action && (
              <Button 
                variant="ghost" 
                size="sm"
                asChild
                className="ml-auto"
              >
                <a href={notification.action.href}>
                  {notification.action.label}
                </a>
              </Button>
            )}
          </Alert>
        )
      })}
    </div>
  )
}

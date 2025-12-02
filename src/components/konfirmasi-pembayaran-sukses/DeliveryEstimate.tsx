
import { Progress } from '@/components/ui/progress'
import SafeIcon from '@/components/common/SafeIcon'

interface DeliveryEstimateProps {
  service: {
    name: string
    estimatedTime: string
    icon: string
  }
}

export default function DeliveryEstimate({ service }: DeliveryEstimateProps) {
  // Mock timeline data
  const timeline = [
    {
      status: 'Pesanan Dikonfirmasi',
      time: 'Sekarang',
      icon: 'CheckCircle2',
      completed: true
    },
    {
      status: 'Paket Dijemput',
      time: '30 menit',
      icon: 'PackageCheck',
      completed: false
    },
    {
      status: 'Dalam Perjalanan',
      time: '1-2 jam',
      icon: 'Truck',
      completed: false
    },
    {
      status: 'Sedang Dikirim',
      time: '2-3 jam',
      icon: 'MapPin',
      completed: false
    },
    {
      status: 'Terkirim',
      time: '3 jam',
      icon: 'CheckCircle2',
      completed: false
    }
  ]

  return (
    <div className="space-y-6">
      {/* Service Info */}
      <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
        <div className="flex items-center gap-3 mb-2">
          <SafeIcon name={service.icon} className="w-5 h-5 text-primary" />
          <div>
            <p className="font-semibold">{service.name}</p>
            <p className="text-sm text-muted-foreground">Estimasi: {service.estimatedTime}</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <p className="text-sm font-semibold">Tahapan Pengiriman</p>
        
        <div className="space-y-3">
          {timeline.map((item, index) => (
            <div key={index} className="flex gap-4">
              {/* Timeline dot and line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    item.completed
                      ? 'bg-primary border-primary'
                      : 'border-border bg-muted/50'
                  }`}
                >
                  <SafeIcon
                    name={item.icon}
                    className={`w-4 h-4 ${
                      item.completed ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}
                  />
                </div>
                {index < timeline.length - 1 && (
                  <div
                    className={`w-0.5 h-12 mt-2 ${
                      item.completed ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                )}
              </div>

              {/* Timeline content */}
              <div className="pt-1 pb-3">
                <p
                  className={`font-medium ${
                    item.completed ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {item.status}
                </p>
                <p className="text-sm text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progres Pengiriman</span>
          <span className="font-semibold">20%</span>
        </div>
        <Progress value={20} className="h-2" />
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30">
        <div className="flex gap-3">
          <SafeIcon name="Info" className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-secondary mb-1">Informasi Penting</p>
            <p className="text-muted-foreground">
              Paket Anda akan dijemput dalam waktu singkat. Pastikan alamat penerima sudah benar dan tersedia untuk menerima paket.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

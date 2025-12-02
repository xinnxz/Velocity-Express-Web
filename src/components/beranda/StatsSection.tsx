
import { useEffect, useState } from 'react'
import SafeIcon from '@/components/common/SafeIcon'

interface StatItem {
  label: string
  value: string
  icon: string
  suffix?: string
}

export default function StatsSection() {
  const [stats] = useState<StatItem[]>([
    {
      label: 'Paket Terkirim',
      value: '2.5',
      suffix: 'Juta+',
      icon: 'Package'
    },
    {
      label: 'Pelanggan Puas',
      value: '98',
      suffix: '%',
      icon: 'Users'
    },
    {
      label: 'Kota Terjangkau',
      value: '500',
      suffix: '+',
      icon: 'Globe'
    },
    {
      label: 'Waktu Pengiriman',
      value: '24',
      suffix: 'Jam',
      icon: 'Zap'
    }
  ])

  const [displayStats, setDisplayStats] = useState<StatItem[]>(stats)

  useEffect(() => {
    // Animate counter on mount
    const timer = setTimeout(() => {
      setDisplayStats(stats)
    }, 100)
    return () => clearTimeout(timer)
  }, [stats])

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat) => (
            <div 
              key={stat.label}
              className="glass-effect rounded-lg p-6 text-center hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <SafeIcon name={stat.icon} className="w-6 h-6 text-primary" />
              </div>
              
              <div className="mb-2">
                <p className="text-3xl font-bold gradient-text">
                  {stat.value}
                  {stat.suffix && <span className="text-lg ml-1">{stat.suffix}</span>}
                </p>
              </div>
              
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

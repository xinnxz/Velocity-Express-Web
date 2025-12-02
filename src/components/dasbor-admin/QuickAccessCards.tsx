
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

interface QuickAccessModule {
  title: string
  description: string
  icon: string
  href: string
  color: string
  bgColor: string
}

const modules: QuickAccessModule[] = [
  {
    title: 'Manajemen Pengguna',
    description: 'Kelola data pengguna, peran, dan hak akses',
    icon: 'Users',
    href: './manajemen-pengguna-admin.html',
    color: 'text-blue-400',
    bgColor: 'from-blue-500/10 to-blue-500/5'
  },
  {
    title: 'Pemantauan Pengiriman',
    description: 'Pantau status dan riwayat semua pengiriman',
    icon: 'Package',
    href: './pemantauan-pengiriman-admin.html',
    color: 'text-primary',
    bgColor: 'from-primary/10 to-primary/5'
  },
  {
    title: 'Pengaturan Tarif',
    description: 'Kelola harga layanan dan diskon',
    icon: 'DollarSign',
    href: './pengaturan-tarif-layanan.html',
    color: 'text-green-400',
    bgColor: 'from-green-500/10 to-green-500/5'
  },
  {
    title: 'Laporan & Analitik',
    description: 'Lihat laporan kinerja dan analisis data',
    icon: 'BarChart3',
    href: './laporan-analitik-admin.html',
    color: 'text-purple-400',
    bgColor: 'from-purple-500/10 to-purple-500/5'
  }
]

export default function QuickAccessCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {modules.map((module) => (
        <Card 
          key={module.title}
          className={`glass-effect border-border/50 hover:border-primary/50 transition-all duration-300 bg-gradient-to-br ${module.bgColor} group cursor-pointer`}
        >
          <CardHeader>
            <div className={`w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center mb-4 group-hover:bg-muted transition-colors ${module.color}`}>
              <SafeIcon name={module.icon} className="w-6 h-6" />
            </div>
            <CardTitle className="text-lg">{module.title}</CardTitle>
            <CardDescription className="text-xs">
              {module.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              asChild 
              variant="outline" 
              className="w-full group-hover:bg-primary/10 group-hover:border-primary/50 transition-all"
            >
              <a href={module.href}>
                Akses
                <SafeIcon name="ChevronRight" className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'

interface DateRange {
  from: Date
  to: Date
}

interface Report {
  id: string
  title: string
  description: string
  icon: string
  metrics: string[]
  lastUpdated: string
  href: string
}

interface ReportsListProps {
  dateRange: DateRange
}

export default function ReportsList({ dateRange }: ReportsListProps) {
  const reports: Report[] = [
    {
      id: 'performance',
      title: 'Laporan Kinerja Pengiriman',
      description: 'Analisis mendalam tentang kinerja pengiriman, tingkat keberhasilan, dan waktu pengiriman rata-rata',
      icon: 'TrendingUp',
      metrics: ['Tingkat Keberhasilan', 'Waktu Pengiriman', 'Jumlah Pengiriman'],
      lastUpdated: 'Hari ini',
      href: './detail-laporan-kinerja.html'
    },
    {
      id: 'revenue',
      title: 'Laporan Pendapatan',
      description: 'Rincian pendapatan berdasarkan layanan, wilayah, dan periode waktu dengan proyeksi',
      icon: 'DollarSign',
      metrics: ['Total Pendapatan', 'Pendapatan per Layanan', 'Proyeksi Bulanan'],
      lastUpdated: 'Hari ini',
      href: './detail-laporan-kinerja.html'
    },
    {
      id: 'volume',
      title: 'Laporan Volume Paket',
      description: 'Statistik volume paket yang dikirim, distribusi per layanan, dan tren pertumbuhan',
      icon: 'Package',
      metrics: ['Total Paket', 'Distribusi Layanan', 'Tren Pertumbuhan'],
      lastUpdated: 'Hari ini',
      href: './detail-laporan-kinerja.html'
    },
    {
      id: 'customer',
      title: 'Laporan Kepuasan Pelanggan',
      description: 'Analisis rating, review, dan feedback pelanggan dengan insight untuk peningkatan layanan',
      icon: 'Star',
      metrics: ['Rating Rata-rata', 'Jumlah Review', 'Sentiment Analysis'],
      lastUpdated: 'Kemarin',
      href: './detail-laporan-kinerja.html'
    },
    {
      id: 'operational',
      title: 'Laporan Operasional',
      description: 'Metrik operasional termasuk utilisasi kendaraan, efisiensi rute, dan biaya operasional',
      icon: 'Zap',
      metrics: ['Utilisasi Kendaraan', 'Efisiensi Rute', 'Biaya Operasional'],
      lastUpdated: 'Kemarin',
      href: './detail-laporan-kinerja.html'
    },
    {
      id: 'geographic',
      title: 'Laporan Geografis',
      description: 'Analisis kinerja berdasarkan wilayah, kota, dan area dengan perbandingan regional',
      icon: 'MapPin',
      metrics: ['Kinerja Regional', 'Distribusi Wilayah', 'Analisis Kompetitif'],
      lastUpdated: '2 hari lalu',
      href: './detail-laporan-kinerja.html'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reports.map((report) => (
        <Card 
          key={report.id} 
          className="glass-effect border-border/50 hover:border-primary/50 transition-all hover:shadow-card cursor-pointer group"
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                  <SafeIcon name={report.icon} className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base">{report.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Diperbarui: {report.lastUpdated}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {report.description}
            </p>

            {/* Metrics Tags */}
            <div className="flex flex-wrap gap-2">
              {report.metrics.map((metric, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {metric}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button 
                variant="default" 
                size="sm" 
                className="flex-1"
                asChild
              >
                <a href={report.href}>
                  <SafeIcon name="Eye" className="w-4 h-4 mr-2" />
                  Lihat Detail
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = './ekspor-data-laporan.html'}
              >
                <SafeIcon name="Download" className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

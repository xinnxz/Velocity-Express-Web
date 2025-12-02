
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'

interface TrackingHistoryHeaderProps {}

export default function TrackingHistoryHeader({}: TrackingHistoryHeaderProps) {
  // Mock data - in real app, this would come from props or context
  const trackingData = {
    trackingNumber: 'VLC-2024-001234567',
    status: 'delivered' as const,
    estimatedDelivery: '2024-01-15',
    actualDelivery: '2024-01-15',
    sender: {
      name: 'PT Teknologi Indonesia',
      city: 'Jakarta'
    },
    recipient: {
      name: 'Budi Santoso',
      city: 'Surabaya'
    }
  }

return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground overflow-x-auto pb-2">
        <a href="./beranda.html" className="hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap">
          <SafeIcon name="Home" className="w-4 h-4" />
          Beranda
        </a>
        <SafeIcon name="ChevronRight" className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        <a href="./hasil-pelacakan.html" className="hover:text-primary transition-colors whitespace-nowrap">
          Hasil Pelacakan
        </a>
        <SafeIcon name="ChevronRight" className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        <span className="text-foreground whitespace-nowrap">Riwayat Lengkap</span>
      </div>

      {/* Header Card */}
      <Card className="glass-effect border-primary/20 overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-5">
            {/* Top Row - Tracking Number and Status */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="space-y-2 min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Nomor Resi</p>
                <p className="text-xl sm:text-2xl font-bold font-mono break-all">{trackingData.trackingNumber}</p>
              </div>
              <div className="flex-shrink-0">
                <TrackingStatusBadge status={trackingData.status} />
              </div>
            </div>

            {/* Route Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/50">
              {/* From */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Dari</p>
                <div className="flex items-start gap-2">
                  <SafeIcon name="MapPin" className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-xs sm:text-sm line-clamp-2">{trackingData.sender.name}</p>
                    <p className="text-xs text-muted-foreground">{trackingData.sender.city}</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex items-center justify-center">
                <div className="flex items-center gap-2 text-primary">
                  <SafeIcon name="ArrowRight" className="w-5 h-5" />
                </div>
              </div>

              {/* To */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Ke</p>
                <div className="flex items-start gap-2">
                  <SafeIcon name="MapPin" className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-xs sm:text-sm line-clamp-2">{trackingData.recipient.name}</p>
                    <p className="text-xs text-muted-foreground">{trackingData.recipient.city}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Timeline */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Estimasi Tiba</p>
                <p className="font-semibold text-sm">{new Date(trackingData.estimatedDelivery).toLocaleDateString('id-ID', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Tiba Aktual</p>
                <p className="font-semibold text-sm text-green-400">{new Date(trackingData.actualDelivery).toLocaleDateString('id-ID', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button variant="outline" asChild className="w-full">
          <a href="./hasil-pelacakan.html" className="justify-center">
            <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Kembali</span>
            <span className="sm:hidden">Hasil Pelacakan</span>
          </a>
        </Button>
        <Button variant="outline" asChild className="w-full">
          <a href="./detail-pelacakan-akun.html" className="justify-center">
            <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Kembali Akun</span>
            <span className="sm:hidden">Detail Akun</span>
          </a>
        </Button>
        <Button asChild className="w-full neon-glow">
          <a href="./pelacakan-real-time.html" className="justify-center">
            <SafeIcon name="MapPin" className="w-4 h-4 mr-2" />
            Lacak Real-time
          </a>
        </Button>
      </div>
    </div>
  )
}

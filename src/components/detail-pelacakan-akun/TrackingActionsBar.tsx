
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

export default function TrackingActionsBar() {
  return (
    <div className="mt-8 pt-6 border-t border-border/30 flex flex-col sm:flex-row gap-3 justify-between">
      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        <Button 
          variant="outline" 
          className="flex-1 sm:flex-none"
          asChild
        >
          <a href="./detail-riwayat-pelacakan.html">
            <SafeIcon name="History" className="w-4 h-4 mr-2" />
            Riwayat Lengkap
          </a>
        </Button>

        <Button 
          variant="outline"
          className="flex-1 sm:flex-none"
          asChild
        >
          <a href="./pelacakan-real-time.html">
            <SafeIcon name="Navigation" className="w-4 h-4 mr-2" />
            Pelacakan Real-time
          </a>
        </Button>

        <Button 
          variant="outline"
          className="flex-1 sm:flex-none"
        >
          <SafeIcon name="Share2" className="w-4 h-4 mr-2" />
          Bagikan
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 flex-1 sm:flex-none">
        <Button 
          variant="outline"
          className="flex-1 sm:flex-none"
          asChild
        >
          <a href="./daftar-pengiriman-terdaftar.html">
            <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Kembali
          </a>
        </Button>

        <Button 
          className="flex-1 sm:flex-none neon-glow"
          asChild
        >
          <a href="./beranda.html">
            <SafeIcon name="Home" className="w-4 h-4 mr-2" />
            Beranda
          </a>
        </Button>
      </div>
    </div>
  )
}

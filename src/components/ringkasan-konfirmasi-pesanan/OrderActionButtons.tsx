
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

export default function OrderActionButtons() {
  return (
    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
      {/* Back Button */}
      <Button 
        variant="outline" 
        size="lg"
        asChild
        className="border-border/50 hover:border-primary/50 hover:bg-primary/5"
      >
        <a href="./pilih-layanan-kurir.html">
          <SafeIcon name="ChevronLeft" className="w-5 h-5 mr-2" />
          Ubah Layanan
        </a>
      </Button>

      {/* Primary Action Button */}
      <Button 
        size="lg"
        className="neon-glow"
        asChild
      >
        <a href="./pilih-metode-pembayaran.html">
          <SafeIcon name="CreditCard" className="w-5 h-5 mr-2" />
          Konfirmasi & Bayar
        </a>
      </Button>
    </div>
  )
}


import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="container-custom">
        <div className="relative rounded-2xl overflow-hidden glass-effect border border-primary/30 p-12 md:p-16">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent pointer-events-none" />
          
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Siap Memulai Pengiriman Anda?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Jangan tunda lagi! Buat pesanan sekarang dan nikmati pengiriman cepat dengan teknologi drone dan kendaraan canggih kami. Gratis ongkir untuk pesanan pertama Anda!
            </p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <SafeIcon name="CheckCircle2" className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm">Pengiriman dalam 30 menit</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <SafeIcon name="CheckCircle2" className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm">Asuransi penuh gratis</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <SafeIcon name="CheckCircle2" className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm">Tracking real-time 24/7</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <SafeIcon name="CheckCircle2" className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm">Dukungan pelanggan 24/7</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="neon-glow group"
                asChild
              >
                <a href="./pilih-lokasi-pesanan.html" className="flex items-center justify-center gap-2">
                  <SafeIcon name="Rocket" className="w-5 h-5 group-hover:animate-bounce" />
                  Mulai Pesanan Sekarang
                </a>
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                asChild
              >
                <a href="./beranda.html" className="flex items-center justify-center gap-2">
                  <SafeIcon name="HelpCircle" className="w-5 h-5" />
                  Pelajari Lebih Lanjut
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <p className="text-sm text-muted-foreground">Pengguna Aktif</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500K+</div>
            <p className="text-sm text-muted-foreground">Pengiriman Sukses</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">99.8%</div>
            <p className="text-sm text-muted-foreground">Kepuasan Pelanggan</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <p className="text-sm text-muted-foreground">Layanan Pelanggan</p>
          </div>
        </div>
      </div>
    </section>
  )
}

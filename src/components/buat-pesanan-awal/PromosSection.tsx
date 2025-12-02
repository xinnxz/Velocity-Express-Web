
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'
import { FEATURED_PROMOS } from '@/data/app_content'

export default function PromosSection() {
  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Penawaran <span className="gradient-text">Spesial Hari Ini</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dapatkan diskon dan bonus eksklusif untuk pengiriman Anda
          </p>
        </div>

        {/* Promos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED_PROMOS.map((promo) => (
            <div 
              key={promo.id}
              className="relative rounded-xl overflow-hidden group cursor-pointer"
              style={{ backgroundColor: promo.backgroundColor }}
            >
              {/* Background image with overlay */}
              <div className="absolute inset-0">
                <img 
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-8 md:p-10 h-64 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 w-fit">
                    <SafeIcon name="Zap" className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-semibold text-white">Penawaran Terbatas</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {promo.title}
                  </h3>
                  
                  <p className="text-white/90 text-sm md:text-base">
                    {promo.subtitle}
                  </p>
                </div>

                {/* Footer with validity and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/70">
                    Berlaku hingga <span className="font-semibold text-white">{promo.validUntil}</span>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-white text-black hover:bg-white/90"
                    asChild
                  >
                    <a href="./pilih-lokasi-pesanan.html" className="flex items-center gap-1">
                      Gunakan
                      <SafeIcon name="ArrowRight" className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-xl transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Additional info banner */}
        <div className="mt-12 p-6 glass-effect rounded-lg border border-primary/20 flex items-start gap-4">
          <SafeIcon name="Info" className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold mb-1">Informasi Penting</h4>
            <p className="text-sm text-muted-foreground">
              Semua penawaran dapat dikombinasikan dengan program loyalitas kami. Daftar sekarang untuk mendapatkan poin reward di setiap pengiriman!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

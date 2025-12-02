
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 w-fit">
                <SafeIcon name="Zap" className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Teknologi Pengiriman Masa Depan</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">VeloCity Express</span>
                <br />
                <span className="text-foreground">Pengiriman Cepat & Terpercaya</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg">
                Layanan kurir enterprise dengan teknologi futuristik. Nikmati pengiriman dengan drone canggih, kendaraan pintar, dan sistem pelacakan real-time untuk kepuasan maksimal.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="neon-glow" asChild>
                <a href="./buat-pesanan-awal.html">
                  <SafeIcon name="Plus" className="w-5 h-5 mr-2" />
                  Buat Pesanan Sekarang
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="./masukan-resi.html">
                  <SafeIcon name="Search" className="w-5 h-5 mr-2" />
                  Lacak Paket
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <SafeIcon name="CheckCircle2" className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Aman & Terpercaya</p>
                  <p className="text-xs text-muted-foreground">Asuransi penuh</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <SafeIcon name="Zap" className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Super Cepat</p>
                  <p className="text-xs text-muted-foreground">Pengiriman 24 jam</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <SafeIcon name="Globe" className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Jangkauan Luas</p>
                  <p className="text-xs text-muted-foreground">Seluruh Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-[500px] hidden lg:flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Drone illustration placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-80">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin" style={{ animationDuration: '20s' }} />
                  <div className="absolute inset-8 rounded-full border border-secondary/20 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
                  
                  {/* Central drone icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-gradient-primary/20 flex items-center justify-center neon-glow">
                      <SafeIcon name="Drone" className="w-24 h-24 text-primary" />
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12">
                    <div className="w-16 h-16 rounded-lg bg-card border border-primary/50 flex items-center justify-center glass-effect">
                      <SafeIcon name="Package" className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 translate-x-8 translate-y-8">
                    <div className="w-16 h-16 rounded-lg bg-card border border-secondary/50 flex items-center justify-center glass-effect">
                      <SafeIcon name="MapPin" className="w-8 h-8 text-secondary" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 -translate-x-8 translate-y-8">
                    <div className="w-16 h-16 rounded-lg bg-card border border-accent/50 flex items-center justify-center glass-effect">
                      <SafeIcon name="Truck" className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

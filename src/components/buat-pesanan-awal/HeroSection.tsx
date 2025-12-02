
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'
import { HOME_PAGE_HERO } from '@/data/app_content'

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial-at-t from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">{HOME_PAGE_HERO.title}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                {HOME_PAGE_HERO.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="neon-glow group"
                asChild
              >
                <a href="./pilih-lokasi-pesanan.html" className="flex items-center gap-2">
                  <SafeIcon name={HOME_PAGE_HERO.cta1.iconName} className="w-5 h-5 group-hover:animate-spin" />
                  {HOME_PAGE_HERO.cta1.label}
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                asChild
              >
                <a href="./beranda.html" className="flex items-center gap-2">
                  <SafeIcon name="Home" className="w-5 h-5" />
                  Kembali ke Beranda
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 pt-8 border-t border-border/50">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Pengiriman Sukses</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">24/7</p>
                <p className="text-sm text-muted-foreground">Layanan Pelanggan</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">99.8%</p>
                <p className="text-sm text-muted-foreground">Tingkat Kepuasan</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[400px] md:h-[500px] hidden lg:block">
            <div className="absolute inset-0 rounded-2xl overflow-hidden glass-effect">
              <img 
                src={HOME_PAGE_HERO.image}
                alt="Futuristic delivery drone"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 glass-effect rounded-lg p-4 backdrop-blur-md border border-primary/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <SafeIcon name="Zap" className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Pengiriman Instan</p>
                  <p className="text-xs text-muted-foreground">Dalam 30 menit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

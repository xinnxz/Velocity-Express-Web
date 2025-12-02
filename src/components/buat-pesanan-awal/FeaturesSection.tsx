
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import { ORDER_START_STEPS } from '@/data/app_content'

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Proses Pemesanan <span className="gradient-text">Mudah & Cepat</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hanya 3 langkah sederhana untuk membuat pesanan pengiriman Anda
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {ORDER_START_STEPS.map((feature, index) => (
            <Card 
              key={feature.id}
              className="glass-effect border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-card group"
            >
              <CardHeader>
                {/* Step number */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <SafeIcon 
                    name={feature.iconName} 
                    className="w-6 h-6 text-primary group-hover:animate-bounce"
                  />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Feature image */}
                <div className="mb-6 rounded-lg overflow-hidden h-48 bg-muted/50">
                  <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CTA Button */}
                <Button 
                  variant="outline" 
                  className="w-full group/btn"
                  asChild
                >
                  <a href="./pilih-lokasi-pesanan.html" className="flex items-center justify-center gap-2">
                    {feature.ctaLabel}
                    <SafeIcon 
                      name="ArrowRight" 
                      className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                    />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Flow Diagram */}
        <div className="mt-16 p-8 glass-effect rounded-xl border border-primary/20">
          <h3 className="text-xl font-semibold mb-8 text-center">Alur Lengkap Pemesanan</h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                <SafeIcon name="MapPin" className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm font-medium text-center">Pilih Lokasi</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-primary/50 mb-8">
              <SafeIcon name="ChevronRight" className="w-6 h-6" />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-14 h-14 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center">
                <SafeIcon name="Package" className="w-7 h-7 text-secondary" />
              </div>
              <p className="text-sm font-medium text-center">Detail Paket</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-primary/50 mb-8">
              <SafeIcon name="ChevronRight" className="w-6 h-6" />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-14 h-14 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                <SafeIcon name="Truck" className="w-7 h-7 text-accent" />
              </div>
              <p className="text-sm font-medium text-center">Pilih Kurir</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-primary/50 mb-8">
              <SafeIcon name="ChevronRight" className="w-6 h-6" />
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-14 h-14 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                <SafeIcon name="CheckCircle2" className="w-7 h-7 text-green-500" />
              </div>
              <p className="text-sm font-medium text-center">Konfirmasi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

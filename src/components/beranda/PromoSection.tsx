
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

export default function PromoSection() {
  const promos = [
    {
      icon: 'Zap',
      title: 'Pengiriman Express',
      description: 'Pengiriman dalam 24 jam ke seluruh kota besar',
      features: ['Jaminan tepat waktu', 'Asuransi penuh', 'Tracking real-time'],
      badge: 'Populer',
      highlighted: true
    },
    {
      icon: 'Truck',
      title: 'Pengiriman Reguler',
      description: 'Pengiriman standar dengan harga terjangkau',
      features: ['Harga kompetitif', 'Aman & terpercaya', 'Jangkauan luas'],
      badge: 'Ekonomis'
    },
    {
      icon: 'Drone',
      title: 'Pengiriman Drone',
      description: 'Teknologi drone untuk pengiriman ultra cepat',
      features: ['Pengiriman 2-4 jam', 'Teknologi AI', 'Ramah lingkungan'],
      badge: 'Futuristik'
    }
  ]

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Layanan Kami</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pilih layanan pengiriman yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <Card 
              key={promo.title}
              className={`relative transition-all duration-300 ${
                promo.highlighted 
                  ? 'border-primary/50 shadow-card md:scale-105' 
                  : 'hover:border-primary/30'
              }`}
            >
              {promo.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="neon-glow">{promo.badge}</Badge>
                </div>
              )}
              
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center mb-4">
                  <SafeIcon name={promo.icon} className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{promo.title}</CardTitle>
                <CardDescription>{promo.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {promo.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <SafeIcon name="Check" className="w-4 h-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

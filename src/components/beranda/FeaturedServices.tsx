
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

export default function FeaturedServices() {
  const services = [
    {
      title: 'Pelacakan Real-time',
      description: 'Pantau lokasi paket Anda setiap saat dengan teknologi GPS terkini',
      icon: 'MapPin',
      image: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/fcebae1d-59d8-4af0-9e3c-65732b110700.png'
    },
    {
      title: 'Asuransi Pengiriman',
      description: 'Lindungi paket Anda dengan asuransi komprehensif hingga nilai penuh',
      icon: 'Shield',
      image: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/4ecc9a07-5e99-440d-a664-60b6df051a99.png'
    },
    {
      title: 'Dukungan 24/7',
      description: 'Tim customer service kami siap membantu Anda kapan saja',
      icon: 'Headphones',
      image: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/74ff0b6c-1890-4726-8e1f-2caaef564de3.png'
    },
    {
      title: 'Integrasi Pembayaran',
      description: 'Berbagai metode pembayaran untuk kemudahan transaksi Anda',
      icon: 'CreditCard',
      image: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/3ce3812c-fe66-4c64-89c8-e3597d14379b.png'
    }
  ]

  return (
    <section className="py-16 bg-gradient-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Fitur Unggulan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Teknologi terdepan untuk pengalaman pengiriman terbaik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="group glass-effect rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                {/* Content */}
                <div className="flex flex-col justify-center space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <SafeIcon name={service.icon} className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  </div>
                  <Button variant="ghost" className="w-fit" asChild>
                    <a href="./placeholder.html">
                      Pelajari Lebih Lanjut
                      <SafeIcon name="ArrowRight" className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>

                {/* Image */}
                <div className="hidden sm:block relative h-48 rounded-lg overflow-hidden">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import SafeIcon from '@/components/common/SafeIcon'

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Budi Santoso',
      role: 'Pemilik Toko Online',
      image: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/5a44ec61-3149-4a9f-884d-13bef47fd212.png',
      content: 'VeloCity Express sangat membantu bisnis online saya. Pengiriman cepat dan pelacakan real-time membuat pelanggan saya sangat puas.',
      rating: 5
    },
    {
      name: 'Siti Nurhaliza',
      role: 'Entrepreneur E-commerce',
      image: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/4087e776-675b-4deb-8d55-a7194620a125.png',
      content: 'Layanan drone mereka benar-benar inovatif. Paket sampai lebih cepat dari yang dijanjikan dan dalam kondisi sempurna.',
      rating: 5
    },
    {
      name: 'Ahmad Wijaya',
      role: 'Manajer Logistik',
      image: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/283e7404-23a1-4225-8a9d-1ae545141553.png',
      content: 'Integrasi dengan sistem kami sangat mudah. Tim support VeloCity sangat responsif dan profesional dalam menangani masalah.',
      rating: 5
    }
  ]

  return (
    <section className="py-16 bg-gradient-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Testimoni Pelanggan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ribuan pelanggan puas telah mempercayai VeloCity Express
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.name}
              className="hover:border-primary/50 transition-all duration-300 hover:shadow-card"
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <SafeIcon 
                      key={i}
                      name="Star" 
                      className="w-4 h-4 fill-primary text-primary" 
                    />
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

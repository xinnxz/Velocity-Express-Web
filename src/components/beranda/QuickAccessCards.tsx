
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

export default function QuickAccessCards() {
  const cards = [
    {
      icon: 'Search',
      title: 'Lacak Paket',
      description: 'Masukkan nomor resi untuk melacak status pengiriman Anda secara real-time',
      href: './masukan-resi.html',
      color: 'primary'
    },
    {
      icon: 'Plus',
      title: 'Buat Pesanan',
      description: 'Mulai membuat pesanan pengiriman baru dengan mudah dan cepat',
      href: './buat-pesanan-awal.html',
      color: 'secondary'
    },
    {
      icon: 'Package',
      title: 'Pengiriman Saya',
      description: 'Lihat daftar semua pengiriman Anda yang aktif dan riwayat pengiriman',
      href: './daftar-pengiriman-saya.html',
      color: 'accent'
    }
  ]

  const colorMap = {
    primary: 'bg-primary/10 border-primary/30 text-primary',
    secondary: 'bg-secondary/10 border-secondary/30 text-secondary',
    accent: 'bg-accent/10 border-accent/30 text-accent'
  }

  return (
    <section className="py-16 bg-gradient-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Akses Cepat</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mulai dengan fitur utama kami yang dirancang untuk kemudahan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card 
              key={card.title}
              className="group hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-card"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg border flex items-center justify-center mb-4 ${colorMap[card.color as keyof typeof colorMap]}`}>
                  <SafeIcon name={card.icon} className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full group-hover:neon-glow">
                  <a href={card.href}>
                    Mulai Sekarang
                    <SafeIcon name="ArrowRight" className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'

interface CommonFooterProps {
  variant?: 'simple' | 'complex'
}

export default function CommonFooter({ variant = 'complex' }: CommonFooterProps) {
  const currentYear = new Date().getFullYear()

  if (variant === 'simple') {
return (
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-auto" id="i3hk7w">
        <div className="container-custom py-6" id="iek5dv">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <SafeIcon name="Zap" className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold">VeloCity Express</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <a href="./placeholder.html" className="hover:text-primary transition-colors">
                Tentang Kami
              </a>
              <a href="./placeholder.html" className="hover:text-primary transition-colors">
                Kebijakan Privasi
              </a>
              <a href="./placeholder.html" className="hover:text-primary transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="./placeholder.html" className="hover:text-primary transition-colors">
                Kontak
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {currentYear} VeloCity Express
            </p>
          </div>
        </div>
      </footer>
    )
  }

  // Complex variant for homepage
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <SafeIcon name="Zap" className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold gradient-text">VeloCity Express</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Layanan kurir enterprise dengan teknologi futuristik. 
              Pengiriman cepat, aman, dan terpercaya dengan drone dan kendaraan canggih.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <SafeIcon name="Facebook" className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <SafeIcon name="Twitter" className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <SafeIcon name="Instagram" className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <SafeIcon name="Linkedin" className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Layanan Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Layanan</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="./buat-pesanan-awal.html" className="hover:text-primary transition-colors">
                  Buat Pesanan
                </a>
              </li>
              <li>
                <a href="./masukan-resi.html" className="hover:text-primary transition-colors">
                  Lacak Paket
                </a>
              </li>
              <li>
                <a href="./placeholder.html" className="hover:text-primary transition-colors">
                  Pengiriman Reguler
                </a>
              </li>
              <li>
                <a href="./placeholder.html" className="hover:text-primary transition-colors">
                  Pengiriman Express
                </a>
              </li>
              <li>
                <a href="./placeholder.html" className="hover:text-primary transition-colors">
                  Pengiriman Drone
                </a>
              </li>
            </ul>
          </div>

          {/* Perusahaan Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Perusahaan</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="./placeholder.html" className="hover:text-primary transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="./placeholder.html" className="hover:text-primary transition-colors">
                  Karir
                </a>
              </li>
              <li>
                <a href="./placeholder.html" className="hover:text-primary transition-colors">
                  Mitra Bisnis
                </a>
              </li>
              <li>
                <a href="./placeholder.html" className="hover:text-primary transition-colors">
                  Berita & Media
                </a>
              </li>
              <li>
                <a href="./placeholder.html" className="hover:text-primary transition-colors">
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Dapatkan update terbaru tentang promo dan fitur baru
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Email Anda" 
                className="bg-background/50"
              />
              <Button type="submit" className="w-full">
                Berlangganan
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} VeloCity Express. Semua hak dilindungi.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="./placeholder.html" className="hover:text-primary transition-colors">
              Kebijakan Privasi
            </a>
            <a href="./placeholder.html" className="hover:text-primary transition-colors">
              Syarat & Ketentuan
            </a>
            <a href="./placeholder.html" className="hover:text-primary transition-colors">
              Kebijakan Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

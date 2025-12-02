
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'
import ContactChannels from './ContactChannels'
import FAQSection from './FAQSection'
import SupportHours from './SupportHours'
import SupportContactForm from './SupportContactForm'

export default function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <section className="container-custom py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/50 mb-6">
            <SafeIcon name="Headphones" className="w-8 h-8 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dukungan Pembayaran
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Kami siap membantu Anda mengatasi masalah pembayaran. 
            Hubungi tim dukungan kami melalui berbagai saluran yang tersedia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              className="neon-glow"
            >
              <a href="./pilih-metode-pembayaran.html">
                <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Kembali ke Pembayaran
              </a>
            </Button>
            <Button 
              variant="outline"
              asChild
            >
              <a href="./ringkasan-konfirmasi-pesanan.html">
                <SafeIcon name="Home" className="w-4 h-4 mr-2" />
                Kembali ke Ringkasan
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="container-custom py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <SafeIcon name="MessageSquare" className="w-6 h-6 text-primary" />
            Hubungi Kami
          </h2>
          <ContactChannels />
        </div>
      </section>

      {/* Support Hours */}
      <section className="container-custom py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <SafeIcon name="Clock" className="w-6 h-6 text-primary" />
            Jam Layanan
          </h2>
          <SupportHours />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-custom py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <SafeIcon name="HelpCircle" className="w-6 h-6 text-primary" />
            Pertanyaan Umum
          </h2>
          <FAQSection />
        </div>
      </section>

      {/* Contact Form */}
      <section className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <SafeIcon name="Mail" className="w-6 h-6 text-primary" />
            Kirim Pesan
          </h2>
          <SupportContactForm />
        </div>
      </section>

      {/* Additional Info */}
      <section className="container-custom py-12">
        <div className="glass-effect rounded-lg p-8 border border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <SafeIcon name="Zap" className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Respons Cepat</h3>
              <p className="text-sm text-muted-foreground">
                Tim kami merespons dalam waktu kurang dari 1 jam
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <SafeIcon name="Shield" className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Aman & Terpercaya</h3>
              <p className="text-sm text-muted-foreground">
                Data Anda dilindungi dengan enkripsi tingkat enterprise
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <SafeIcon name="Users" className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Tim Profesional</h3>
              <p className="text-sm text-muted-foreground">
                Dukungan dari tim ahli yang berpengalaman
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

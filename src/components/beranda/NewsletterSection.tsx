
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SafeIcon from '@/components/common/SafeIcon'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail('')
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="glass-effect rounded-lg p-8 md:p-12 border border-primary/30 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <SafeIcon name="Mail" className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Newsletter</span>
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Dapatkan Update Terbaru
            </h2>

            <p className="text-muted-foreground mb-8">
              Berlangganan newsletter kami untuk mendapatkan promo eksklusif, tips pengiriman, dan update fitur terbaru langsung ke email Anda.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-background/50"
              />
              <Button 
                type="submit"
                className="neon-glow"
              >
                {isSubmitted ? (
                  <>
                    <SafeIcon name="Check" className="w-4 h-4 mr-2" />
                    Berhasil!
                  </>
                ) : (
                  <>
                    <SafeIcon name="Send" className="w-4 h-4 mr-2" />
                    Berlangganan
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              Kami tidak akan membagikan email Anda. Unsubscribe kapan saja.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

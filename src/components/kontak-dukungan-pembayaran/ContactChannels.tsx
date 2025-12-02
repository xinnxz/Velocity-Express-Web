
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

interface ContactChannel {
  id: string
  title: string
  description: string
  icon: string
  details: string[]
  action: {
    label: string
    href?: string
    onClick?: () => void
  }
}

const contactChannels: ContactChannel[] = [
  {
    id: 'phone',
    title: 'Telepon',
    description: 'Hubungi tim dukungan kami langsung',
    icon: 'Phone',
    details: [
      '+62 (21) 1234-5678',
      '+62 (21) 8765-4321'
    ],
    action: {
      label: 'Hubungi Sekarang',
      href: 'tel:+622112345678'
    }
  },
  {
    id: 'email',
    title: 'Email',
    description: 'Kirim pertanyaan Anda melalui email',
    icon: 'Mail',
    details: [
      'support@velocity-express.com',
      'payment@velocity-express.com'
    ],
    action: {
      label: 'Kirim Email',
      href: 'mailto:support@velocity-express.com'
    }
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    description: 'Chat langsung dengan tim support kami',
    icon: 'MessageCircle',
    details: [
      '+62 812-3456-7890',
      'Respons dalam 5-10 menit'
    ],
    action: {
      label: 'Chat WhatsApp',
      href: 'https://wa.me/6281234567890'
    }
  },
  {
    id: 'live-chat',
    title: 'Live Chat',
    description: 'Obrolan langsung di website kami',
    icon: 'MessageSquare',
    details: [
      'Tersedia 24/7',
      'Tidak perlu login'
    ],
    action: {
      label: 'Mulai Chat',
      onClick: () => {
        // Simulate opening live chat
        alert('Live chat widget akan dibuka')
      }
    }
  },
  {
    id: 'social-media',
    title: 'Media Sosial',
    description: 'Hubungi kami melalui media sosial',
    icon: 'Share2',
    details: [
      '@velocity_express',
      'Respons dalam 2-4 jam'
    ],
    action: {
      label: 'Kunjungi',
      href: 'https://instagram.com/velocity_express'
    }
  },
  {
    id: 'office',
    title: 'Kantor Pusat',
    description: 'Kunjungi kantor kami secara langsung',
    icon: 'MapPin',
    details: [
      'Jl. Teknologi No. 123, Jakarta',
      'Senin-Jumat: 09:00-17:00'
    ],
    action: {
      label: 'Lihat Lokasi',
      href: 'https://maps.google.com'
    }
  }
]

export default function ContactChannels() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contactChannels.map((channel) => (
        <Card 
          key={channel.id}
          className="glass-effect border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-card"
        >
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <SafeIcon name={channel.icon} className="w-6 h-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-lg">{channel.title}</CardTitle>
            <CardDescription>{channel.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {channel.details.map((detail, idx) => (
                <p key={idx} className="text-sm text-foreground/80">
                  {detail}
                </p>
              ))}
            </div>

            <Button 
              className="w-full"
              asChild={!!channel.action.href}
              onClick={channel.action.onClick}
            >
              {channel.action.href ? (
                <a href={channel.action.href} target="_blank" rel="noopener noreferrer">
                  {channel.action.label}
                </a>
              ) : (
                channel.action.label
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

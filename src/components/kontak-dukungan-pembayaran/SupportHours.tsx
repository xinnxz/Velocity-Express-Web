
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface SupportHour {
  day: string
  hours: string
  status: 'open' | 'closed' | 'limited'
}

const supportHours: SupportHour[] = [
  { day: 'Senin', hours: '08:00 - 22:00', status: 'open' },
  { day: 'Selasa', hours: '08:00 - 22:00', status: 'open' },
  { day: 'Rabu', hours: '08:00 - 22:00', status: 'open' },
  { day: 'Kamis', hours: '08:00 - 22:00', status: 'open' },
  { day: 'Jumat', hours: '08:00 - 22:00', status: 'open' },
  { day: 'Sabtu', hours: '09:00 - 18:00', status: 'limited' },
  { day: 'Minggu', hours: '10:00 - 16:00', status: 'limited' },
]

const getStatusBadge = (status: 'open' | 'closed' | 'limited') => {
  switch (status) {
    case 'open':
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
          <SafeIcon name="CheckCircle2" className="w-3 h-3 mr-1" />
          Buka
        </Badge>
      )
    case 'limited':
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
          <SafeIcon name="Clock" className="w-3 h-3 mr-1" />
          Terbatas
        </Badge>
      )
    case 'closed':
      return (
        <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
          <SafeIcon name="XCircle" className="w-3 h-3 mr-1" />
          Tutup
        </Badge>
      )
  }
}

export default function SupportHours() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Hours Table */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Jam Operasional</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {supportHours.map((hour, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <span className="font-medium">{hour.day}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{hour.hours}</span>
                  {getStatusBadge(hour.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Response Times */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Waktu Respons</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-background/50">
              <div className="flex items-center gap-2 mb-1">
                <SafeIcon name="Phone" className="w-4 h-4 text-primary" />
                <span className="font-medium">Telepon</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Respons dalam 2-5 menit
              </p>
            </div>

            <div className="p-3 rounded-lg bg-background/50">
              <div className="flex items-center gap-2 mb-1">
                <SafeIcon name="Mail" className="w-4 h-4 text-primary" />
                <span className="font-medium">Email</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Respons dalam 1-2 jam
              </p>
            </div>

            <div className="p-3 rounded-lg bg-background/50">
              <div className="flex items-center gap-2 mb-1">
                <SafeIcon name="MessageCircle" className="w-4 h-4 text-primary" />
                <span className="font-medium">WhatsApp</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Respons dalam 5-10 menit
              </p>
            </div>

            <div className="p-3 rounded-lg bg-background/50">
              <div className="flex items-center gap-2 mb-1">
                <SafeIcon name="MessageSquare" className="w-4 h-4 text-primary" />
                <span className="font-medium">Live Chat</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Respons instan (24/7)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

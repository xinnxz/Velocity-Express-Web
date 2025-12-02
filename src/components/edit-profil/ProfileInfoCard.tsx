
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  city: string
  province: string
  postalCode: string
  profileImage?: string
}

interface ProfileInfoCardProps {
  userProfile: UserProfile
}

export default function ProfileInfoCard({ userProfile }: ProfileInfoCardProps) {
  const initials = `${userProfile.firstName[0]}${userProfile.lastName[0]}`.toUpperCase()
  const memberSince = new Date(2023, 0, 15) // Mock join date
  const daysActive = Math.floor((new Date().getTime() - memberSince.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm sticky top-24">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {initials}
          </div>
        </div>
        <CardTitle className="text-xl">
          {userProfile.firstName} {userProfile.lastName}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">{userProfile.email}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Member Status */}
        <div className="p-3 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <SafeIcon name="CheckCircle2" className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">Akun Terverifikasi</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Anggota sejak {memberSince.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
          </p>
        </div>

        {/* Account Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">ID Pengguna</span>
            <code className="text-xs bg-muted/50 px-2 py-1 rounded">
              {userProfile.id}
            </code>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Hari Aktif</span>
            <Badge variant="secondary">{daysActive} hari</Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status Verifikasi</span>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
              <SafeIcon name="Check" className="w-3 h-3 mr-1" />
              Lengkap
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border space-y-2">
          <a 
            href="./ubah-kata-sandi.html"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm text-foreground/80 hover:text-primary"
          >
            <SafeIcon name="Lock" className="w-4 h-4" />
            <span>Ubah Kata Sandi</span>
            <SafeIcon name="ChevronRight" className="w-3 h-3 ml-auto" />
          </a>

          <a 
            href="./manajemen-alamat.html"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm text-foreground/80 hover:text-primary"
          >
            <SafeIcon name="MapPin" className="w-4 h-4" />
            <span>Manajemen Alamat</span>
            <SafeIcon name="ChevronRight" className="w-3 h-3 ml-auto" />
          </a>

          <a 
            href="./pengaturan-notifikasi.html"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm text-foreground/80 hover:text-primary"
          >
            <SafeIcon name="Bell" className="w-4 h-4" />
            <span>Pengaturan Notifikasi</span>
            <SafeIcon name="ChevronRight" className="w-3 h-3 ml-auto" />
          </a>
        </div>

        {/* Account Security Info */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Keamanan Akun</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <SafeIcon name="Shield" className="w-3 h-3 text-green-400" />
              <span>Autentikasi 2 Faktor: Aktif</span>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon name="Lock" className="w-3 h-3 text-green-400" />
              <span>Kata Sandi: Aman</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

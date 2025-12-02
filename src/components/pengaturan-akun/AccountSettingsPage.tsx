
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'
import { cn } from '@/lib/utils'

interface SettingsMenuItem {
  id: string
  title: string
  description: string
  icon: string
  href: string
  badge?: string
}

const settingsMenuItems: SettingsMenuItem[] = [
  {
    id: 'edit_profil',
    title: 'Edit Profil',
    description: 'Perbarui informasi pribadi, email, dan nomor telepon Anda',
    icon: 'User',
    href: './edit-profil.html'
  },
  {
    id: 'pengaturan_notifikasi',
    title: 'Pengaturan Notifikasi',
    description: 'Kelola preferensi notifikasi email dan push',
    icon: 'Bell',
    href: './pengaturan-notifikasi.html'
  },
  {
    id: 'riwayat_pesanan',
    title: 'Riwayat Pesanan',
    description: 'Lihat semua pesanan dan status pengiriman Anda',
    icon: 'Package',
    href: './riwayat-pesanan.html'
  },
  {
    id: 'metode_pembayaran',
    title: 'Metode Pembayaran Tersimpan',
    description: 'Kelola kartu kredit, e-wallet, dan metode pembayaran lainnya',
    icon: 'CreditCard',
    href: './metode-pembayaran-tersimpan.html'
  }
]

// Mock user data
const mockUserData = {
  name: 'Ahmad Rizki',
  email: 'ahmad.rizki@example.com',
  phone: '+62 812-3456-7890',
  avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/2/622281a9-e32a-4823-9a87-41045b3bea14.png',
  joinDate: 'Bergabung sejak Januari 2024',
  totalOrders: 24,
  totalSpent: 'Rp 2.450.000'
}

export default function AccountSettingsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  return (
    <div className="min-h-[calc(100vh-128px)] bg-gradient-dark">
      <div className="container-custom py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <SafeIcon name="Settings" className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold">Pengaturan Akun</h1>
          </div>
          <p className="text-muted-foreground">
            Kelola informasi pribadi, preferensi, dan riwayat akun Anda
          </p>
        </div>

        {/* User Profile Card */}
        <Card className="mb-8 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <Avatar className="w-24 h-24 border-2 border-primary/50">
                <AvatarImage src={mockUserData.avatar} alt={mockUserData.name} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl font-bold">
                  {mockUserData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{mockUserData.name}</h2>
                <p className="text-muted-foreground mb-4">{mockUserData.email}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Nomor Telepon</p>
                    <p className="font-semibold">{mockUserData.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Pesanan</p>
                    <p className="font-semibold">{mockUserData.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Pengeluaran</p>
                    <p className="font-semibold">{mockUserData.totalSpent}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{mockUserData.joinDate}</p>
              </div>

              {/* Action Button */}
              <Button asChild className="w-full sm:w-auto">
                <a href="./edit-profil.html">
                  <SafeIcon name="Edit2" className="w-4 h-4 mr-2" />
                  Edit Profil
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings Menu Grid */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold">Pengaturan Akun</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {settingsMenuItems.map((item) => (
              <Card
                key={item.id}
                className={cn(
                  'border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-primary/50 hover:bg-card/70',
                  activeSection === item.id && 'border-primary/50 bg-card/70'
                )}
                onClick={() => setActiveSection(item.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <SafeIcon name={item.icon} className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{item.title}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {item.description}
                        </CardDescription>
                      </div>
                    </div>
                    {item.badge && (
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/20 text-primary">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    asChild 
                    variant="ghost" 
                    className="w-full justify-between group"
                  >
                    <a href={item.href}>
                      <span>Buka</span>
                      <SafeIcon name="ChevronRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Settings Section */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SafeIcon name="Shield" className="w-5 h-5 text-primary" />
              Keamanan & Privasi
            </CardTitle>
            <CardDescription>
              Kelola keamanan akun dan preferensi privasi Anda
            </CardDescription>
          </CardHeader>
          <Separator className="bg-border/50" />
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Security Items */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-3">
                  <SafeIcon name="Lock" className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Kata Sandi</p>
                    <p className="text-xs text-muted-foreground">Terakhir diubah 3 bulan lalu</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="./ubah-kata-sandi.html">
                    Ubah
                  </a>
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-3">
                  <SafeIcon name="Smartphone" className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Verifikasi Dua Faktor</p>
                    <p className="text-xs text-muted-foreground">Belum diaktifkan</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Aktifkan
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-3">
                  <SafeIcon name="Eye" className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Aktivitas Login</p>
                    <p className="text-xs text-muted-foreground">Lihat perangkat yang terhubung</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Lihat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="mt-8 border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <SafeIcon name="AlertTriangle" className="w-5 h-5" />
              Zona Berbahaya
            </CardTitle>
            <CardDescription>
              Tindakan ini tidak dapat dibatalkan. Harap berhati-hati.
            </CardDescription>
          </CardHeader>
          <Separator className="bg-destructive/20" />
          <CardContent className="pt-6">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-destructive/50 text-destructive hover:bg-destructive/10">
                <SafeIcon name="Download" className="w-4 h-4 mr-2" />
                Unduh Data Pribadi Saya
              </Button>
              <Button variant="outline" className="w-full justify-start border-destructive/50 text-destructive hover:bg-destructive/10">
                <SafeIcon name="Trash2" className="w-4 h-4 mr-2" />
                Hapus Akun Saya
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <Button variant="ghost" asChild>
            <a href="./beranda.html" className="flex items-center gap-2">
              <SafeIcon name="ChevronLeft" className="w-4 h-4" />
              Kembali ke Beranda
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

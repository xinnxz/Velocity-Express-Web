
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'
import DashboardMetrics from '@/components/dasbor-admin/DashboardMetrics'
import QuickAccessCards from '@/components/dasbor-admin/QuickAccessCards'
import RecentActivityFeed from '@/components/dasbor-admin/RecentActivityFeed'
import SystemNotifications from '@/components/dasbor-admin/SystemNotifications'

export default function AdminDashboardContent() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="container-custom py-8 space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold gradient-text">Dasbor Admin</h1>
          <p className="text-muted-foreground">
            Selamat datang kembali. Berikut adalah ringkasan operasional sistem Anda.
          </p>
        </div>

        {/* System Notifications */}
        <SystemNotifications />

        {/* Key Metrics */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Metrik Operasional</h2>
          <DashboardMetrics />
        </div>

        {/* Quick Access Modules */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Akses Cepat</h2>
          <QuickAccessCards />
        </div>

        {/* Activity & Analytics Section */}
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="activity">Aktivitas Terbaru</TabsTrigger>
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            <RecentActivityFeed />
          </TabsContent>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Health */}
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SafeIcon name="Activity" className="w-5 h-5 text-primary" />
                    Kesehatan Sistem
                  </CardTitle>
                  <CardDescription>Status komponen sistem</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Server API</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-muted-foreground">Aktif</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Database</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-muted-foreground">Aktif</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Cache Service</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-muted-foreground">Aktif</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Payment Gateway</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span className="text-xs text-muted-foreground">Peringatan</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SafeIcon name="TrendingUp" className="w-5 h-5 text-primary" />
                    Statistik Hari Ini
                  </CardTitle>
                  <CardDescription>Performa 24 jam terakhir</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pesanan Baru</span>
                      <span className="text-lg font-bold text-primary">+142</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pengiriman Selesai</span>
                      <span className="text-lg font-bold text-green-400">+128</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pendapatan</span>
                      <span className="text-lg font-bold text-primary">Rp 45.2M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Tingkat Kepuasan</span>
                      <span className="text-lg font-bold text-blue-400">98.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* System Settings Quick Link */}
        <Card className="glass-effect border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SafeIcon name="Settings" className="w-5 h-5 text-primary" />
              Pengaturan Sistem
            </CardTitle>
            <CardDescription>
              Kelola konfigurasi dan pengaturan aplikasi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="neon-glow">
              <a href="./pengaturan-sistem-admin.html">
                <SafeIcon name="ChevronRight" className="w-4 h-4 mr-2" />
                Buka Pengaturan Sistem
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

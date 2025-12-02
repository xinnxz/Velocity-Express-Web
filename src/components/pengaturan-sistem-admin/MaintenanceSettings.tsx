
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'

interface MaintenanceSettingsProps {
  onSave: () => void
  isSaving: boolean
}

export default function MaintenanceSettings({ onSave, isSaving }: MaintenanceSettingsProps) {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    maintenanceMessage: 'Sistem sedang dalam pemeliharaan. Kami akan kembali segera.',
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: '30',
    logRetention: '90',
    cacheCleanup: true,
    cacheCleanupFrequency: 'weekly'
  })

  const [lastBackup] = useState({
    date: '2024-01-20',
    time: '03:00 AM',
    size: '2.5 GB',
    status: 'success'
  })

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      {/* Maintenance Mode */}
      <Card className="glass-effect border-border/50 border-yellow-500/50 bg-yellow-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <SafeIcon name="AlertTriangle" className="w-5 h-5" />
            Mode Pemeliharaan
          </CardTitle>
          <CardDescription>Aktifkan mode pemeliharaan untuk melakukan perbaikan sistem</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Aktifkan Mode Pemeliharaan</Label>
              <p className="text-sm text-muted-foreground">Sistem akan menampilkan pesan pemeliharaan kepada pengguna</p>
            </div>
            <Switch 
              checked={settings.maintenanceMode}
              onCheckedChange={() => handleToggle('maintenanceMode')}
            />
          </div>

          {settings.maintenanceMode && (
            <div className="pt-4 border-t border-border/50 space-y-2">
              <Label htmlFor="maintenance-msg">Pesan Pemeliharaan</Label>
              <textarea 
                id="maintenance-msg"
                value={settings.maintenanceMessage}
                onChange={(e) => handleChange('maintenanceMessage', e.target.value)}
                className="w-full p-3 rounded-lg bg-background/50 border border-border text-sm resize-none"
                rows={3}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Backup Configuration */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="HardDrive" className="w-5 h-5 text-primary" />
            Konfigurasi Backup
          </CardTitle>
          <CardDescription>Pengaturan backup otomatis database</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Backup Otomatis</Label>
              <p className="text-sm text-muted-foreground">Buat backup database secara otomatis</p>
            </div>
            <Switch 
              checked={settings.autoBackup}
              onCheckedChange={() => handleToggle('autoBackup')}
            />
          </div>

          {settings.autoBackup && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                <div className="space-y-2">
                  <Label htmlFor="backup-freq">Frekuensi Backup</Label>
                  <select 
                    id="backup-freq"
                    value={settings.backupFrequency}
                    onChange={(e) => handleChange('backupFrequency', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-background/50 border border-border text-sm"
                  >
                    <option value="hourly">Setiap Jam</option>
                    <option value="daily">Harian</option>
                    <option value="weekly">Mingguan</option>
                    <option value="monthly">Bulanan</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-retention">Retensi Backup (hari)</Label>
                  <Input 
                    id="backup-retention"
                    type="number"
                    value={settings.backupRetention}
                    onChange={(e) => handleChange('backupRetention', e.target.value)}
                    className="bg-background/50"
                  />
                </div>
              </div>

              {/* Last Backup Info */}
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50 space-y-2">
                <h4 className="font-medium text-sm">Backup Terakhir</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Tanggal & Waktu</p>
                    <p className="font-mono">{lastBackup.date} {lastBackup.time}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Ukuran</p>
                    <p className="font-mono">{lastBackup.size}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex gap-2 pt-4 border-t border-border/50">
            <Button variant="outline" className="flex-1">
              <SafeIcon name="Download" className="w-4 h-4 mr-2" />
              Backup Sekarang
            </Button>
            <Button variant="outline" className="flex-1">
              <SafeIcon name="RotateCcw" className="w-4 h-4 mr-2" />
              Restore Backup
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Log Management */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="FileText" className="w-5 h-5 text-primary" />
            Manajemen Log
          </CardTitle>
          <CardDescription>Pengaturan penyimpanan dan pembersihan log</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="log-retention">Retensi Log (hari)</Label>
            <Input 
              id="log-retention"
              type="number"
              value={settings.logRetention}
              onChange={(e) => handleChange('logRetention', e.target.value)}
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">
              Log yang lebih lama dari periode ini akan dihapus secara otomatis
            </p>
          </div>

          <div className="pt-4 border-t border-border/50 space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <SafeIcon name="Download" className="w-4 h-4 mr-2" />
              Download Log Sistem
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <SafeIcon name="Trash2" className="w-4 h-4 mr-2" />
              Hapus Log Lama
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cache Management */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Zap" className="w-5 h-5 text-primary" />
            Manajemen Cache
          </CardTitle>
          <CardDescription>Pengaturan cache sistem</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Pembersihan Cache Otomatis</Label>
              <p className="text-sm text-muted-foreground">Bersihkan cache secara berkala</p>
            </div>
            <Switch 
              checked={settings.cacheCleanup}
              onCheckedChange={() => handleToggle('cacheCleanup')}
            />
          </div>

          {settings.cacheCleanup && (
            <div className="pt-4 border-t border-border/50 space-y-2">
              <Label htmlFor="cache-freq">Frekuensi Pembersihan</Label>
              <select 
                id="cache-freq"
                value={settings.cacheCleanupFrequency}
                onChange={(e) => handleChange('cacheCleanupFrequency', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background/50 border border-border text-sm"
              >
                <option value="hourly">Setiap Jam</option>
                <option value="daily">Harian</option>
                <option value="weekly">Mingguan</option>
              </select>
            </div>
          )}

          <div className="pt-4 border-t border-border/50">
            <Button variant="outline" className="w-full">
              <SafeIcon name="RotateCcw" className="w-4 h-4 mr-2" />
              Bersihkan Cache Sekarang
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Cleanup */}
      <Card className="glass-effect border-border/50 border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <SafeIcon name="Trash2" className="w-5 h-5" />
            Pembersihan Sistem
          </CardTitle>
          <CardDescription>Tindakan pembersihan lanjutan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert className="border-destructive/50 bg-destructive/10">
            <SafeIcon name="AlertTriangle" className="h-4 w-4 text-destructive" />
            <AlertTitle>Hati-hati</AlertTitle>
            <AlertDescription>
              Tindakan ini tidak dapat dibatalkan. Pastikan Anda telah membuat backup sebelum melanjutkan.
            </AlertDescription>
          </Alert>

          <Button variant="outline" className="w-full justify-start">
            <SafeIcon name="Trash2" className="w-4 h-4 mr-2" />
            Hapus File Sementara
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <SafeIcon name="Database" className="w-4 h-4 mr-2" />
            Optimasi Database
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <SafeIcon name="RotateCcw" className="w-4 h-4 mr-2" />
            Reset Cache Sistem
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

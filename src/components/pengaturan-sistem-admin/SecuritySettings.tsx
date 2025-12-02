
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SafeIcon from '@/components/common/SafeIcon'

interface SecuritySettingsProps {
  onSave: () => void
  isSaving: boolean
}

export default function SecuritySettings({ onSave, isSaving }: SecuritySettingsProps) {
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    ipWhitelist: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
    forceHttps: true,
    corsEnabled: true,
    rateLimiting: true,
    apiKeyRotation: true,
    auditLogging: true,
    encryptionEnabled: true
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
      {/* Authentication Security */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Lock" className="w-5 h-5 text-primary" />
            Keamanan Autentikasi
          </CardTitle>
          <CardDescription>Pengaturan keamanan untuk autentikasi pengguna</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Autentikasi Dua Faktor</Label>
              <p className="text-sm text-muted-foreground">Wajibkan 2FA untuk semua admin</p>
            </div>
            <Switch 
              checked={settings.twoFactorAuth}
              onCheckedChange={() => handleToggle('twoFactorAuth')}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">IP Whitelist</Label>
              <p className="text-sm text-muted-foreground">Batasi akses ke IP tertentu</p>
            </div>
            <Switch 
              checked={settings.ipWhitelist}
              onCheckedChange={() => handleToggle('ipWhitelist')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Timeout Sesi (menit)</Label>
              <Input 
                id="session-timeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-expiry">Kadaluarsa Password (hari)</Label>
              <Input 
                id="password-expiry"
                type="number"
                value={settings.passwordExpiry}
                onChange={(e) => handleChange('passwordExpiry', e.target.value)}
                className="bg-background/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network Security */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Shield" className="w-5 h-5 text-primary" />
            Keamanan Jaringan
          </CardTitle>
          <CardDescription>Pengaturan keamanan komunikasi dan jaringan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Paksa HTTPS</Label>
              <p className="text-sm text-muted-foreground">Semua koneksi harus menggunakan HTTPS</p>
            </div>
            <Switch 
              checked={settings.forceHttps}
              onCheckedChange={() => handleToggle('forceHttps')}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">CORS Enabled</Label>
              <p className="text-sm text-muted-foreground">Izinkan Cross-Origin Resource Sharing</p>
            </div>
            <Switch 
              checked={settings.corsEnabled}
              onCheckedChange={() => handleToggle('corsEnabled')}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Rate Limiting</Label>
              <p className="text-sm text-muted-foreground">Batasi jumlah request per IP</p>
            </div>
            <Switch 
              checked={settings.rateLimiting}
              onCheckedChange={() => handleToggle('rateLimiting')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Security */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Database" className="w-5 h-5 text-primary" />
            Keamanan Data
          </CardTitle>
          <CardDescription>Pengaturan enkripsi dan perlindungan data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Enkripsi Data</Label>
              <p className="text-sm text-muted-foreground">Enkripsi data sensitif di database</p>
            </div>
            <Switch 
              checked={settings.encryptionEnabled}
              onCheckedChange={() => handleToggle('encryptionEnabled')}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Audit Logging</Label>
              <p className="text-sm text-muted-foreground">Catat semua aktivitas admin</p>
            </div>
            <Switch 
              checked={settings.auditLogging}
              onCheckedChange={() => handleToggle('auditLogging')}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Rotasi API Key</Label>
              <p className="text-sm text-muted-foreground">Rotasi API key secara berkala</p>
            </div>
            <Switch 
              checked={settings.apiKeyRotation}
              onCheckedChange={() => handleToggle('apiKeyRotation')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Actions */}
      <Card className="glass-effect border-border/50 border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <SafeIcon name="AlertTriangle" className="w-5 h-5" />
            Tindakan Keamanan
          </CardTitle>
          <CardDescription>Tindakan keamanan lanjutan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <SafeIcon name="RotateCcw" className="w-4 h-4 mr-2" />
            Reset Semua API Keys
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <SafeIcon name="LogOut" className="w-4 h-4 mr-2" />
            Logout Semua Sesi
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <SafeIcon name="Trash2" className="w-4 h-4 mr-2" />
            Hapus Log Audit Lama
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

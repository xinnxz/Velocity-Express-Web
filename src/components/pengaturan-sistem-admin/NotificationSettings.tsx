
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import SafeIcon from '@/components/common/SafeIcon'

interface NotificationSettingsProps {
  onSave: () => void
  isSaving: boolean
}

export default function NotificationSettings({ onSave, isSaving }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    notificationFrequency: 'immediate',
    quietHoursEnabled: true,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    adminAlerts: true,
    systemAlerts: true,
    performanceAlerts: true,
    securityAlerts: true,
    notificationEmail: 'admin@velocity.express'
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
      {/* Email & SMS Notifications */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Mail" className="w-5 h-5 text-primary" />
            Saluran Notifikasi
          </CardTitle>
          <CardDescription>Pilih saluran komunikasi untuk notifikasi sistem</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Email Notifications */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="space-y-1">
                <Label className="text-base font-medium">Notifikasi Email</Label>
                <p className="text-sm text-muted-foreground">Terima notifikasi melalui email</p>
              </div>
              <Switch 
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle('emailNotifications')}
              />
            </div>

            {/* SMS Notifications */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="space-y-1">
                <Label className="text-base font-medium">Notifikasi SMS</Label>
                <p className="text-sm text-muted-foreground">Terima notifikasi melalui SMS</p>
              </div>
              <Switch 
                checked={settings.smsNotifications}
                onCheckedChange={() => handleToggle('smsNotifications')}
              />
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="space-y-1">
                <Label className="text-base font-medium">Notifikasi Push</Label>
                <p className="text-sm text-muted-foreground">Terima notifikasi push di browser</p>
              </div>
              <Switch 
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggle('pushNotifications')}
              />
            </div>
          </div>

          {/* Notification Email */}
          <div className="pt-4 border-t border-border/50 space-y-2">
            <Label htmlFor="notif-email">Email Penerima Notifikasi</Label>
            <Input 
              id="notif-email"
              type="email"
              value={settings.notificationEmail}
              onChange={(e) => handleChange('notificationEmail', e.target.value)}
              placeholder="admin@example.com"
              className="bg-background/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Frequency */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Clock" className="w-5 h-5 text-primary" />
            Frekuensi Notifikasi
          </CardTitle>
          <CardDescription>Atur seberapa sering Anda menerima notifikasi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="frequency">Frekuensi Pengiriman</Label>
            <Select value={settings.notificationFrequency} onValueChange={(value) => handleChange('notificationFrequency', value)}>
              <SelectTrigger id="frequency" className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Segera (Real-time)</SelectItem>
                <SelectItem value="hourly">Setiap Jam</SelectItem>
                <SelectItem value="daily">Harian</SelectItem>
                <SelectItem value="weekly">Mingguan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quiet Hours */}
          <div className="pt-4 border-t border-border/50 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Jam Tenang</Label>
              <Switch 
                checked={settings.quietHoursEnabled}
                onCheckedChange={() => handleToggle('quietHoursEnabled')}
              />
            </div>
            
            {settings.quietHoursEnabled && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quiet-start">Mulai</Label>
                  <Input 
                    id="quiet-start"
                    type="time"
                    value={settings.quietHoursStart}
                    onChange={(e) => handleChange('quietHoursStart', e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quiet-end">Berakhir</Label>
                  <Input 
                    id="quiet-end"
                    type="time"
                    value={settings.quietHoursEnd}
                    onChange={(e) => handleChange('quietHoursEnd', e.target.value)}
                    className="bg-background/50"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Alert Types */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="AlertCircle" className="w-5 h-5 text-primary" />
            Jenis Peringatan
          </CardTitle>
          <CardDescription>Pilih jenis peringatan yang ingin Anda terima</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Peringatan Admin</Label>
              <p className="text-sm text-muted-foreground">Notifikasi terkait aktivitas admin</p>
            </div>
            <Switch 
              checked={settings.adminAlerts}
              onCheckedChange={() => handleToggle('adminAlerts')}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Peringatan Sistem</Label>
              <p className="text-sm text-muted-foreground">Notifikasi kesalahan dan masalah sistem</p>
            </div>
            <Switch 
              checked={settings.systemAlerts}
              onCheckedChange={() => handleToggle('systemAlerts')}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Peringatan Performa</Label>
              <p className="text-sm text-muted-foreground">Notifikasi masalah performa sistem</p>
            </div>
            <Switch 
              checked={settings.performanceAlerts}
              onCheckedChange={() => handleToggle('performanceAlerts')}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Peringatan Keamanan</Label>
              <p className="text-sm text-muted-foreground">Notifikasi insiden keamanan penting</p>
            </div>
            <Switch 
              checked={settings.securityAlerts}
              onCheckedChange={() => handleToggle('securityAlerts')}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

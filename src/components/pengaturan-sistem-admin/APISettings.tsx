
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface APISettingsProps {
  onSave: () => void
  isSaving: boolean
}

export default function APISettings({ onSave, isSaving }: APISettingsProps) {
  const [apiKeys, setApiKeys] = useState([
    {
      id: 'key_1',
      name: 'Production API Key',
      key: 'sk_live_••••••••••••••••••••••••',
      created: '2024-01-01',
      lastUsed: '2024-01-20 14:30',
      status: 'active'
    },
    {
      id: 'key_2',
      name: 'Development API Key',
      key: 'sk_test_••••••••••••••••••••••••',
      created: '2024-01-05',
      lastUsed: '2024-01-20 10:15',
      status: 'active'
    },
    {
      id: 'key_3',
      name: 'Staging API Key',
      key: 'sk_stage_•••••••••••••••••••••••',
      created: '2024-01-10',
      lastUsed: '2024-01-15 09:00',
      status: 'inactive'
    }
  ])

  const [settings, setSettings] = useState({
    apiEnabled: true,
    rateLimitEnabled: true,
    rateLimitPerMinute: '1000',
    versioningEnabled: true,
    currentVersion: 'v2',
    deprecationWarnings: true
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
      {/* API Keys Management */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <SafeIcon name="Key" className="w-5 h-5 text-primary" />
                Manajemen API Key
              </CardTitle>
              <CardDescription>Kelola kunci API untuk integrasi</CardDescription>
            </div>
            <Button size="sm" className="neon-glow">
              <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
              Buat Key Baru
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {apiKeys.map((key) => (
            <div 
              key={key.id}
              className="p-4 rounded-lg bg-muted/30 border border-border/50 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{key.name}</h4>
                    <Badge 
                      variant="outline"
                      className={key.status === 'active' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                        : 'bg-muted text-muted-foreground'
                      }
                    >
                      {key.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                    </Badge>
                  </div>
                  <p className="text-sm font-mono text-muted-foreground">{key.key}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <SafeIcon name="Copy" className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground border-t border-border/50 pt-3">
                <div>
                  <p className="text-xs uppercase tracking-wider">Dibuat</p>
                  <p>{key.created}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider">Terakhir Digunakan</p>
                  <p>{key.lastUsed}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border/50">
                <Button variant="outline" size="sm" className="flex-1">
                  <SafeIcon name="RotateCcw" className="w-3 h-3 mr-1" />
                  Regenerate
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <SafeIcon name="Trash2" className="w-3 h-3 mr-1" />
                  Hapus
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Settings" className="w-5 h-5 text-primary" />
            Konfigurasi API
          </CardTitle>
          <CardDescription>Pengaturan umum API dan versioning</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">API Enabled</Label>
              <p className="text-sm text-muted-foreground">Aktifkan/nonaktifkan akses API</p>
            </div>
            <Switch 
              checked={settings.apiEnabled}
              onCheckedChange={() => handleToggle('apiEnabled')}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Versioning</Label>
              <p className="text-sm text-muted-foreground">Gunakan versioning API</p>
            </div>
            <Switch 
              checked={settings.versioningEnabled}
              onCheckedChange={() => handleToggle('versioningEnabled')}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Peringatan Deprecation</Label>
              <p className="text-sm text-muted-foreground">Tampilkan peringatan untuk endpoint lama</p>
            </div>
            <Switch 
              checked={settings.deprecationWarnings}
              onCheckedChange={() => handleToggle('deprecationWarnings')}
            />
          </div>

          {settings.versioningEnabled && (
            <div className="pt-4 border-t border-border/50 space-y-2">
              <Label htmlFor="api-version">Versi API Saat Ini</Label>
              <Input 
                id="api-version"
                value={settings.currentVersion}
                onChange={(e) => handleChange('currentVersion', e.target.value)}
                className="bg-background/50"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rate Limiting */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Zap" className="w-5 h-5 text-primary" />
            Rate Limiting
          </CardTitle>
          <CardDescription>Kontrol kecepatan akses API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Rate Limiting Enabled</Label>
              <p className="text-sm text-muted-foreground">Batasi jumlah request per menit</p>
            </div>
            <Switch 
              checked={settings.rateLimitEnabled}
              onCheckedChange={() => handleToggle('rateLimitEnabled')}
            />
          </div>

          {settings.rateLimitEnabled && (
            <div className="pt-4 border-t border-border/50 space-y-2">
              <Label htmlFor="rate-limit">Request per Menit</Label>
              <Input 
                id="rate-limit"
                type="number"
                value={settings.rateLimitPerMinute}
                onChange={(e) => handleChange('rateLimitPerMinute', e.target.value)}
                className="bg-background/50"
              />
              <p className="text-xs text-muted-foreground">
                Batas maksimal request yang diizinkan per menit per API key
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Endpoints */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Globe" className="w-5 h-5 text-primary" />
            Endpoint API
          </CardTitle>
          <CardDescription>Informasi endpoint API utama</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Base URL</Label>
            <div className="flex gap-2">
              <Input 
                type="text"
                value="https://api.velocity.express/v2"
                readOnly
                className="bg-background/50 font-mono text-sm"
              />
              <Button variant="outline" size="icon">
                <SafeIcon name="Copy" className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Dokumentasi</Label>
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="./placeholder.html" target="_blank" rel="noopener noreferrer">
                <SafeIcon name="ExternalLink" className="w-4 h-4 mr-2" />
                https://docs.velocity.express/api
              </a>
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Status Page</Label>
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="./placeholder.html" target="_blank" rel="noopener noreferrer">
                <SafeIcon name="ExternalLink" className="w-4 h-4 mr-2" />
                https://status.velocity.express
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface IntegrationSettingsProps {
  onSave: () => void
  isSaving: boolean
}

export default function IntegrationSettings({ onSave, isSaving }: IntegrationSettingsProps) {
  const [integrations, setIntegrations] = useState([
    {
      id: 'stripe',
      name: 'Stripe Payment',
      description: 'Integrasi pembayaran Stripe',
      enabled: true,
      status: 'connected',
      lastSync: '2024-01-20 10:30 AM'
    },
    {
      id: 'twilio',
      name: 'Twilio SMS',
      description: 'Layanan SMS melalui Twilio',
      enabled: true,
      status: 'connected',
      lastSync: '2024-01-20 10:25 AM'
    },
    {
      id: 'sendgrid',
      name: 'SendGrid Email',
      description: 'Layanan email melalui SendGrid',
      enabled: true,
      status: 'connected',
      lastSync: '2024-01-20 10:20 AM'
    },
    {
      id: 'google-maps',
      name: 'Google Maps API',
      description: 'Integrasi peta dan lokasi',
      enabled: true,
      status: 'connected',
      lastSync: '2024-01-20 10:15 AM'
    },
    {
      id: 'slack',
      name: 'Slack Notifications',
      description: 'Notifikasi ke Slack',
      enabled: false,
      status: 'disconnected',
      lastSync: null
    },
    {
      id: 'datadog',
      name: 'Datadog Monitoring',
      description: 'Monitoring dan analytics',
      enabled: false,
      status: 'disconnected',
      lastSync: null
    }
  ])

  const handleToggle = (id: string) => {
    setIntegrations(prev => 
      prev.map(int => 
        int.id === id ? { ...int, enabled: !int.enabled } : int
      )
    )
  }

  const getStatusColor = (status: string) => {
    return status === 'connected' 
      ? 'bg-green-500/20 text-green-400 border-green-500/50'
      : 'bg-muted text-muted-foreground border-muted-foreground/50'
  }

  return (
    <div className="space-y-6">
      {/* Active Integrations */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Plug" className="w-5 h-5 text-primary" />
            Integrasi Pihak Ketiga
          </CardTitle>
          <CardDescription>Kelola integrasi dengan layanan eksternal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {integrations.map((integration) => (
            <div 
              key={integration.id}
              className="flex items-start justify-between p-4 rounded-lg bg-muted/30 border border-border/50"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{integration.name}</h4>
                  <Badge 
                    variant="outline"
                    className={`${getStatusColor(integration.status)} border text-xs`}
                  >
                    {integration.status === 'connected' ? (
                      <>
                        <SafeIcon name="CheckCircle2" className="w-3 h-3 mr-1" />
                        Terhubung
                      </>
                    ) : (
                      <>
                        <SafeIcon name="XCircle" className="w-3 h-3 mr-1" />
                        Terputus
                      </>
                    )}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{integration.description}</p>
                {integration.lastSync && (
                  <p className="text-xs text-muted-foreground">
                    Sinkronisasi terakhir: {integration.lastSync}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Switch 
                  checked={integration.enabled}
                  onCheckedChange={() => handleToggle(integration.id)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Webhook" className="w-5 h-5 text-primary" />
            Konfigurasi Webhook
          </CardTitle>
          <CardDescription>Atur webhook untuk event sistem</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">URL Webhook</Label>
            <Input 
              id="webhook-url"
              type="url"
              placeholder="https://your-domain.com/webhook"
              className="bg-background/50 font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-secret">Secret Key</Label>
            <div className="flex gap-2">
              <Input 
                id="webhook-secret"
                type="password"
                placeholder="••••••••••••••••"
                className="bg-background/50 font-mono text-sm"
              />
              <Button variant="outline" size="icon">
                <SafeIcon name="Copy" className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50">
            <Label className="text-sm font-medium mb-3 block">Event yang Dipicu</Label>
            <div className="space-y-2">
              {[
                'Pesanan Dibuat',
                'Pengiriman Dimulai',
                'Pengiriman Selesai',
                'Pembayaran Berhasil',
                'Pembayaran Gagal'
              ].map((event) => (
                <div key={event} className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id={event}
                    defaultChecked
                    className="w-4 h-4 rounded"
                  />
                  <Label htmlFor={event} className="font-normal cursor-pointer">
                    {event}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4">
            <SafeIcon name="TestTube" className="w-4 h-4 mr-2" />
            Test Webhook
          </Button>
        </CardContent>
      </Card>

      {/* API Documentation */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="BookOpen" className="w-5 h-5 text-primary" />
            Dokumentasi API
          </CardTitle>
          <CardDescription>Akses dokumentasi dan resource API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./placeholder.html" target="_blank" rel="noopener noreferrer">
              <SafeIcon name="ExternalLink" className="w-4 h-4 mr-2" />
              Buka Dokumentasi API
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./placeholder.html" target="_blank" rel="noopener noreferrer">
              <SafeIcon name="Download" className="w-4 h-4 mr-2" />
              Download OpenAPI Spec
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./placeholder.html" target="_blank" rel="noopener noreferrer">
              <SafeIcon name="Code" className="w-4 h-4 mr-2" />
              Lihat Contoh Kode
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

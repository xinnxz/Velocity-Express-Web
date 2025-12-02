
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'
import NotificationSettings from './NotificationSettings'
import SecuritySettings from './SecuritySettings'
import IntegrationSettings from './IntegrationSettings'
import APISettings from './APISettings'
import SystemStatus from './SystemStatus'
import MaintenanceSettings from './MaintenanceSettings'

export default function PengaturanSistemAdmin() {
  const [activeTab, setActiveTab] = useState('status')
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSaveSettings = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <SafeIcon name="Settings" className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Pengaturan Sistem</h1>
            <p className="text-muted-foreground">Kelola konfigurasi dan parameter operasional aplikasi</p>
          </div>
        </div>
      </div>

      {/* Success Alert */}
      {saveSuccess && (
        <Alert className="border-green-500/50 bg-green-500/10">
          <SafeIcon name="CheckCircle2" className="h-4 w-4 text-green-500" />
          <AlertTitle>Berhasil</AlertTitle>
          <AlertDescription>Pengaturan sistem telah disimpan dengan sukses.</AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-2 h-auto p-1 bg-muted/50">
          <TabsTrigger value="status" className="flex items-center gap-2">
            <SafeIcon name="Activity" className="w-4 h-4" />
            <span className="hidden sm:inline">Status</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <SafeIcon name="Bell" className="w-4 h-4" />
            <span className="hidden sm:inline">Notifikasi</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <SafeIcon name="Shield" className="w-4 h-4" />
            <span className="hidden sm:inline">Keamanan</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <SafeIcon name="Plug" className="w-4 h-4" />
            <span className="hidden sm:inline">Integrasi</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <SafeIcon name="Code" className="w-4 h-4" />
            <span className="hidden sm:inline">API</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <SafeIcon name="Wrench" className="w-4 h-4" />
            <span className="hidden sm:inline">Maintenance</span>
          </TabsTrigger>
        </TabsList>

        {/* Status Tab */}
        <TabsContent value="status" className="space-y-6">
          <SystemStatus />
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings onSave={handleSaveSettings} isSaving={isSaving} />
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <SecuritySettings onSave={handleSaveSettings} isSaving={isSaving} />
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <IntegrationSettings onSave={handleSaveSettings} isSaving={isSaving} />
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-6">
          <APISettings onSave={handleSaveSettings} isSaving={isSaving} />
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-6">
          <MaintenanceSettings onSave={handleSaveSettings} isSaving={isSaving} />
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end pt-6 border-t border-border">
        <Button variant="outline" asChild>
          <a href="./dasbor-admin.html">
            <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Kembali ke Dasbor
          </a>
        </Button>
        <Button 
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="neon-glow"
        >
          {isSaving ? (
            <>
              <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <SafeIcon name="Save" className="w-4 h-4 mr-2" />
              Simpan Pengaturan
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

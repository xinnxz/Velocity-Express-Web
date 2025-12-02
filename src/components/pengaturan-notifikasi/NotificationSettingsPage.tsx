
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'
import NotificationCategoryCard from '@/components/pengaturan-notifikasi/NotificationCategoryCard'

interface NotificationPreferences {
  email: {
    shipmentStatus: boolean
    promotions: boolean
    accountUpdates: boolean
    systemAlerts: boolean
  }
  push: {
    shipmentStatus: boolean
    promotions: boolean
    accountUpdates: boolean
    systemAlerts: boolean
  }
}

const defaultPreferences: NotificationPreferences = {
  email: {
    shipmentStatus: true,
    promotions: true,
    accountUpdates: true,
    systemAlerts: true,
  },
  push: {
    shipmentStatus: true,
    promotions: false,
    accountUpdates: true,
    systemAlerts: true,
  },
}

export default function NotificationSettingsPage() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences)
  const [isSaved, setIsSaved] = useState(false)

  const handleToggle = (channel: 'email' | 'push', category: keyof NotificationPreferences['email']) => {
    setPreferences(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [category]: !prev[channel][category]
      }
    }))
    setIsSaved(false)
  }

  const handleSave = () => {
    // Simulate saving preferences
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const handleReset = () => {
    setPreferences(defaultPreferences)
    setIsSaved(false)
  }

  return (
    <div className="container-custom py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <a href="./pengaturan-akun.html" className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors">
            <SafeIcon name="ArrowLeft" className="w-5 h-5" />
          </a>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Notification Settings</h1>
            <p className="text-muted-foreground mt-1">Customize how you receive updates about your shipments and account</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {isSaved && (
        <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/50 flex items-center gap-3">
          <SafeIcon name="CheckCircle2" className="w-5 h-5 text-green-400" />
          <span className="text-sm text-green-400">Your notification preferences have been saved successfully</span>
        </div>
      )}

      <div className="grid gap-8">
        {/* Email Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <SafeIcon name="Mail" className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Email Notifications</h2>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <NotificationCategoryCard
              title="Shipment Status"
              description="Get updates about your package pickup, transit, and delivery"
              icon="Package"
              isEnabled={preferences.email.shipmentStatus}
              onChange={() => handleToggle('email', 'shipmentStatus')}
            />
            <NotificationCategoryCard
              title="Promotions & Offers"
              description="Receive information about special deals and discounts"
              icon="Gift"
              isEnabled={preferences.email.promotions}
              onChange={() => handleToggle('email', 'promotions')}
            />
            <NotificationCategoryCard
              title="Account Updates"
              description="Important changes to your account and profile"
              icon="User"
              isEnabled={preferences.email.accountUpdates}
              onChange={() => handleToggle('email', 'accountUpdates')}
            />
            <NotificationCategoryCard
              title="System Alerts"
              description="Critical system notifications and maintenance alerts"
              icon="AlertCircle"
              isEnabled={preferences.email.systemAlerts}
              onChange={() => handleToggle('email', 'systemAlerts')}
            />
          </div>
        </div>

        <Separator className="my-4" />

        {/* Push Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
              <SafeIcon name="Bell" className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Push Notifications</h2>
              <p className="text-sm text-muted-foreground">Receive instant notifications on your device</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <NotificationCategoryCard
              title="Shipment Status"
              description="Real-time updates about your package location and status"
              icon="MapPin"
              isEnabled={preferences.push.shipmentStatus}
              onChange={() => handleToggle('push', 'shipmentStatus')}
            />
            <NotificationCategoryCard
              title="Promotions & Offers"
              description="Flash sales and limited-time offers"
              icon="Zap"
              isEnabled={preferences.push.promotions}
              onChange={() => handleToggle('push', 'promotions')}
            />
            <NotificationCategoryCard
              title="Account Updates"
              description="Login alerts and security notifications"
              icon="Lock"
              isEnabled={preferences.push.accountUpdates}
              onChange={() => handleToggle('push', 'accountUpdates')}
            />
            <NotificationCategoryCard
              title="System Alerts"
              description="Important service announcements"
              icon="Info"
              isEnabled={preferences.push.systemAlerts}
              onChange={() => handleToggle('push', 'systemAlerts')}
            />
          </div>
        </div>

        <Separator className="my-4" />

        {/* Additional Settings */}
        <Card className="glass-effect border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SafeIcon name="Settings" className="w-5 h-5" />
              Additional Preferences
            </CardTitle>
            <CardDescription>Fine-tune your notification experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
              <div>
                <p className="font-medium">Quiet Hours</p>
                <p className="text-sm text-muted-foreground">Disable notifications between 10 PM - 8 AM</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-muted cursor-pointer relative">
                <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-muted-foreground transition-all"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
              <div>
                <p className="font-medium">Digest Emails</p>
                <p className="text-sm text-muted-foreground">Receive a weekly summary instead of individual emails</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-primary cursor-pointer relative">
                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary-foreground transition-all"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Receive critical updates via SMS</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-primary cursor-pointer relative">
                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary-foreground transition-all"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            onClick={handleSave}
            className="flex-1 neon-glow"
          >
            <SafeIcon name="Save" className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
          <Button 
            onClick={handleReset}
            variant="outline"
            className="flex-1"
          >
            <SafeIcon name="RotateCcw" className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
          <Button 
            variant="ghost"
            asChild
            className="flex-1"
          >
            <a href="./pengaturan-akun.html">
              <SafeIcon name="X" className="w-4 h-4 mr-2" />
              Cancel
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

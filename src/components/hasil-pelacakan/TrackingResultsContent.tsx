
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'
import TrackingResultsHeader from './TrackingResultsHeader'
import ShipmentDetailsCard from './ShipmentDetailsCard'
import TrackingTimelinePreview from './TrackingTimelinePreview'
import EstimatedDeliveryCard from './EstimatedDeliveryCard'

// Mock data for SSG
const mockTrackingData = {
  trackingNumber: 'VEL-2024-001234567',
  status: 'in_transit' as const,
  sender: {
    name: 'PT Elektronik Indonesia',
    address: 'Jl. Merdeka No. 123, Jakarta Pusat, 12190',
    phone: '+62-21-1234567',
    city: 'Jakarta'
  },
  recipient: {
    name: 'Budi Santoso',
    address: 'Jl. Sudirman No. 456, Bandung, 40123',
    phone: '+62-274-9876543',
    city: 'Bandung'
  },
  package: {
    weight: '2.5 kg',
    dimensions: '30 x 20 x 15 cm',
    contents: 'Laptop & Aksesori',
    value: 'Rp 15.000.000'
  },
  currentLocation: {
    city: 'Cirebon',
    address: 'Distribution Center Cirebon',
    latitude: -6.7049,
    longitude: 108.4747,
    timestamp: '2024-01-15 14:30'
  },
  estimatedDelivery: {
    date: '2024-01-16',
    time: '14:00 - 18:00',
    daysRemaining: 1
  },
  timeline: [
    {
      status: 'picked_up',
      location: 'Jakarta',
      timestamp: '2024-01-14 09:15',
      description: 'Paket dijemput dari pengirim'
    },
    {
      status: 'in_transit',
      location: 'Cirebon',
      timestamp: '2024-01-15 14:30',
      description: 'Paket sedang dalam perjalanan'
    },
    {
      status: 'out_for_delivery',
      location: 'Bandung',
      timestamp: null,
      description: 'Paket akan segera dikirim'
    },
    {
      status: 'delivered',
      location: 'Bandung',
      timestamp: null,
      description: 'Paket telah diterima'
    }
  ],
  service: {
    name: 'Express Drone',
    icon: 'Zap',
    estimatedDays: 1
  }
}

export default function TrackingResultsContent() {
  const [trackingData] = useState(mockTrackingData)

  return (
    <div className="container-custom py-8 space-y-6">
      {/* Header Section */}
      <TrackingResultsHeader 
        trackingNumber={trackingData.trackingNumber}
        status={trackingData.status}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Status & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Status Card */}
          <Card className="glass-effect border-primary/20 neon-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <SafeIcon name="MapPin" className="w-5 h-5 text-primary" />
                    Status Terkini
                  </CardTitle>
                  <CardDescription>
                    Lokasi dan status paket Anda saat ini
                  </CardDescription>
                </div>
                <TrackingStatusBadge status={trackingData.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Location */}
              <div className="bg-background/50 rounded-lg p-4 border border-border">
                <p className="text-sm text-muted-foreground mb-1">Lokasi Saat Ini</p>
                <p className="text-lg font-semibold text-primary">
                  {trackingData.currentLocation.city}
                </p>
                <p className="text-sm text-foreground/70 mt-1">
                  {trackingData.currentLocation.address}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  <SafeIcon name="Clock" className="w-3 h-3 inline mr-1" />
                  {trackingData.currentLocation.timestamp}
                </p>
              </div>

              {/* Service Info */}
              <div className="flex items-center gap-3 bg-secondary/10 rounded-lg p-3 border border-secondary/20">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <SafeIcon name={trackingData.service.icon} className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{trackingData.service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Estimasi {trackingData.service.estimatedDays} hari
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipment Details */}
          <ShipmentDetailsCard 
            sender={trackingData.sender}
            recipient={trackingData.recipient}
            package={trackingData.package}
          />

          {/* Timeline Preview */}
          <TrackingTimelinePreview timeline={trackingData.timeline} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Estimated Delivery */}
          <EstimatedDeliveryCard 
            estimatedDelivery={trackingData.estimatedDelivery}
          />

          {/* Quick Actions */}
          <Card className="glass-effect border-border">
            <CardHeader>
              <CardTitle className="text-base">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                asChild 
                variant="outline" 
                className="w-full justify-start"
              >
                <a href="./detail-riwayat-pelacakan.html">
                  <SafeIcon name="History" className="w-4 h-4 mr-2" />
                  Lihat Riwayat Lengkap
                </a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="w-full justify-start"
              >
                <a href="./masukan-resi.html">
                  <SafeIcon name="Search" className="w-4 h-4 mr-2" />
                  Lacak Resi Lain
                </a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="w-full justify-start"
              >
                <a href="./beranda.html">
                  <SafeIcon name="Home" className="w-4 h-4 mr-2" />
                  Kembali ke Beranda
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="glass-effect border-border bg-accent/5">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <SafeIcon name="HelpCircle" className="w-4 h-4" />
                Butuh Bantuan?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Jika ada pertanyaan tentang pengiriman Anda, hubungi tim dukungan kami.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground/80">
                  <SafeIcon name="Phone" className="w-4 h-4 text-primary" />
                  <span>+62-800-123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/80">
                  <SafeIcon name="Mail" className="w-4 h-4 text-primary" />
                  <span>support@velocity.id</span>
                </div>
              </div>
              <Button 
                asChild 
                variant="outline" 
                className="w-full text-xs"
              >
                <a href="./kontak-dukungan-pembayaran.html">
                  Hubungi Dukungan
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

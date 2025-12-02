
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingHeader from './TrackingHeader'
import TrackingMapSection from './TrackingMapSection'
import ShipmentDetailsCard from './ShipmentDetailsCard'
import TrackingTimelinePreview from './TrackingTimelinePreview'
import TrackingActionsBar from './TrackingActionsBar'

// Mock data for shipment
const mockShipment = {
  resiNumber: 'VEL-2024-001234',
  status: 'in_transit' as const,
  currentLocation: {
    lat: -6.2088,
    lng: 106.8456,
    address: 'Jl. Sudirman, Jakarta Pusat, DKI Jakarta'
  },
  sender: {
    name: 'PT Teknologi Maju',
    address: 'Jl. Gatot Subroto No. 123, Jakarta Selatan',
    phone: '+62-21-1234567',
    email: 'info@teknologi-maju.com'
  },
  recipient: {
    name: 'Budi Santoso',
    address: 'Jl. Merdeka No. 456, Bandung, Jawa Barat',
    phone: '+62-274-9876543',
    email: 'budi.santoso@email.com'
  },
  package: {
    weight: '2.5 kg',
    dimensions: '30 x 20 x 15 cm',
    contents: 'Elektronik - Laptop',
    insurance: true,
    insuranceValue: 'Rp 15.000.000'
  },
  service: {
    type: 'Express Drone',
    estimatedDelivery: '2024-01-15 14:30',
    cost: 'Rp 125.000',
    paymentStatus: 'Lunas'
  },
  timeline: [
    {
      id: 1,
      timestamp: '2024-01-15 08:30',
      status: 'picked_up',
      location: 'Jakarta Pusat',
      description: 'Paket dijemput dari pengirim'
    },
    {
      id: 2,
      timestamp: '2024-01-15 09:45',
      status: 'in_transit',
      location: 'Jl. Sudirman, Jakarta',
      description: 'Paket dalam perjalanan menuju tujuan'
    },
    {
      id: 3,
      timestamp: '2024-01-15 11:20',
      status: 'in_transit',
      location: 'Tangerang',
      description: 'Paket melewati checkpoint Tangerang'
    },
    {
      id: 4,
      timestamp: '2024-01-15 13:00',
      status: 'out_for_delivery',
      location: 'Bandung',
      description: 'Paket sedang dalam pengiriman akhir'
    }
  ]
}

export default function DetailPelacakanAkunPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col">
      <div className="container-custom py-6 flex-1">
        {/* Header */}
        <TrackingHeader shipment={mockShipment} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Map and Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Section */}
            <TrackingMapSection location={mockShipment.currentLocation} />

            {/* Tabs for Details and Timeline */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-card/50 border border-border">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <SafeIcon name="Info" className="w-4 h-4" />
                  <span className="hidden sm:inline">Ringkasan</span>
                </TabsTrigger>
                <TabsTrigger value="timeline" className="flex items-center gap-2">
                  <SafeIcon name="Clock" className="w-4 h-4" />
                  <span className="hidden sm:inline">Timeline</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <ShipmentDetailsCard shipment={mockShipment} />
              </TabsContent>

              <TabsContent value="timeline" className="mt-4">
                <TrackingTimelinePreview timeline={mockShipment.timeline} showAll={true} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-4">
            {/* Status Card */}
            <div className="glass-effect rounded-lg p-4 border border-border/50">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <SafeIcon name="AlertCircle" className="w-4 h-4 text-primary" />
                Status Terkini
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-sm font-semibold text-primary">Dalam Perjalanan</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Lokasi</span>
                  <span className="text-sm font-semibold">{mockShipment.currentLocation.address}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estimasi Tiba</span>
                  <span className="text-sm font-semibold">{mockShipment.service.estimatedDelivery}</span>
                </div>
              </div>
            </div>

            {/* Service Info Card */}
            <div className="glass-effect rounded-lg p-4 border border-border/50">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <SafeIcon name="Truck" className="w-4 h-4 text-secondary" />
                Informasi Layanan
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tipe Layanan</span>
                  <span className="text-sm font-semibold">{mockShipment.service.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Biaya</span>
                  <span className="text-sm font-semibold text-primary">{mockShipment.service.cost}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pembayaran</span>
                  <span className="text-sm font-semibold text-green-400">{mockShipment.service.paymentStatus}</span>
                </div>
              </div>
            </div>

            {/* Package Info Card */}
            <div className="glass-effect rounded-lg p-4 border border-border/50">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <SafeIcon name="Package" className="w-4 h-4 text-accent" />
                Informasi Paket
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Berat: </span>
                  <span className="font-semibold">{mockShipment.package.weight}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Ukuran: </span>
                  <span className="font-semibold">{mockShipment.package.dimensions}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Isi: </span>
                  <span className="font-semibold">{mockShipment.package.contents}</span>
                </div>
                {mockShipment.package.insurance && (
                  <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <SafeIcon name="Shield" className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400">Asuransi: {mockShipment.package.insuranceValue}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <TrackingActionsBar />
      </div>
    </div>
  )
}

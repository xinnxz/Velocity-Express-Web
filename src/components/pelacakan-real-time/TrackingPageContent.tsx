
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'
import RealTimeTrackingMap from './RealTimeTrackingMap'
import TrackingStatusCard from './TrackingStatusCard'
import DeliveryMovementTimeline from './DeliveryMovementTimeline'
import PackageDetailsCard from './PackageDetailsCard'

// Mock delivery data
const mockDeliveryData = {
  resi: 'VEL-2024-001234',
  status: 'out_for_delivery' as const,
  currentLocation: {
    lat: -6.2088,
    lng: 106.8456,
    address: 'Jl. Sudirman No. 123, Jakarta Pusat',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString()
  },
  estimatedArrival: new Date(Date.now() + 45 * 60000).toISOString(),
  sender: {
    name: 'PT. Elektronik Indonesia',
    address: 'Jl. Gatot Subroto No. 456, Jakarta Selatan',
    phone: '+62-21-1234567'
  },
  recipient: {
    name: 'Budi Santoso',
    address: 'Jl. Merdeka No. 789, Jakarta Pusat',
    phone: '+62-812-3456789'
  },
  package: {
    weight: '2.5 kg',
    dimensions: '30x20x15 cm',
    contents: 'Elektronik - Laptop',
    insurance: 'Rp 5.000.000'
  },
  courier: {
    name: 'Andi Wijaya',
    vehicle: 'Drone Delivery Pro X1',
    phone: '+62-812-9876543'
  },
  movements: [
    {
      status: 'picked_up',
      location: 'Jl. Gatot Subroto No. 456, Jakarta Selatan',
      timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
      description: 'Paket dijemput dari pengirim'
    },
    {
      status: 'in_transit',
      location: 'Sorting Center Jakarta Pusat',
      timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
      description: 'Paket tiba di pusat sortir'
    },
    {
      status: 'in_transit',
      location: 'Jl. Sudirman, Jakarta Pusat',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      description: 'Paket dalam perjalanan menuju tujuan'
    },
    {
      status: 'out_for_delivery',
      location: 'Jl. Sudirman No. 123, Jakarta Pusat',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      description: 'Paket sedang dikirim oleh kurir'
    }
  ]
}

export default function TrackingPageContent() {
  const [activeTab, setActiveTab] = useState('map')

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-dark">
      <div className="container-custom py-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Pelacakan Real-time</h1>
            <p className="text-muted-foreground">
              Resi: <span className="font-mono font-semibold text-primary">{mockDeliveryData.resi}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a href="./detail-pengiriman-terdaftar.html">
                <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Kembali
              </a>
            </Button>
            <Button variant="outline" size="icon">
              <SafeIcon name="Share2" className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <SafeIcon name="RefreshCw" className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <TrackingStatusCard 
          status={mockDeliveryData.status}
          estimatedArrival={mockDeliveryData.estimatedArrival}
          currentLocation={mockDeliveryData.currentLocation.address}
          courier={mockDeliveryData.courier}
        />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="map">
              <SafeIcon name="Map" className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Peta</span>
            </TabsTrigger>
            <TabsTrigger value="timeline">
              <SafeIcon name="Clock" className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Riwayat</span>
            </TabsTrigger>
            <TabsTrigger value="details">
              <SafeIcon name="Package" className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Detail</span>
            </TabsTrigger>
          </TabsList>

          {/* Map Tab */}
          <TabsContent value="map" className="space-y-4">
            <RealTimeTrackingMap 
              currentLocation={mockDeliveryData.currentLocation}
              destination={mockDeliveryData.recipient.address}
            />
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-4">
            <DeliveryMovementTimeline movements={mockDeliveryData.movements} />
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PackageDetailsCard 
                title="Informasi Paket"
                package={mockDeliveryData.package}
              />
              
              <Card className="glass-effect border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Pengirim</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Nama</p>
                    <p className="font-semibold">{mockDeliveryData.sender.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alamat</p>
                    <p className="text-sm">{mockDeliveryData.sender.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telepon</p>
                    <p className="font-mono text-sm">{mockDeliveryData.sender.phone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Penerima</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Nama</p>
                    <p className="font-semibold">{mockDeliveryData.recipient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alamat</p>
                    <p className="text-sm">{mockDeliveryData.recipient.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telepon</p>
                    <p className="font-mono text-sm">{mockDeliveryData.recipient.phone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Kurir</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Nama Kurir</p>
                    <p className="font-semibold">{mockDeliveryData.courier.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kendaraan</p>
                    <p className="text-sm flex items-center gap-2">
                      <SafeIcon name="Zap" className="w-4 h-4 text-primary" />
                      {mockDeliveryData.courier.vehicle}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telepon</p>
                    <p className="font-mono text-sm">{mockDeliveryData.courier.phone}</p>
                  </div>
                  <Button className="w-full mt-2" variant="outline">
                    <SafeIcon name="Phone" className="w-4 h-4 mr-2" />
                    Hubungi Kurir
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex-1" asChild>
            <a href="./detail-riwayat-pelacakan.html">
              <SafeIcon name="History" className="w-4 h-4 mr-2" />
              Lihat Riwayat Lengkap
            </a>
          </Button>
          <Button variant="outline" className="flex-1">
            <SafeIcon name="MessageSquare" className="w-4 h-4 mr-2" />
            Hubungi Dukungan
          </Button>
          <Button variant="outline" className="flex-1">
            <SafeIcon name="Download" className="w-4 h-4 mr-2" />
            Unduh Bukti
          </Button>
        </div>
      </div>
    </div>
  )
}

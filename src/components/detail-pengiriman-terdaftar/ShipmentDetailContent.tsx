
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'
import ShipmentDetailHeader from './ShipmentDetailHeader'
import ShipmentInfoCard from './ShipmentInfoCard'
import PackageDetailsCard from './PackageDetailsCard'
import TrackingTimelineCard from './TrackingTimelineCard'

// Mock shipment data
const mockShipment = {
  id: 'VEL-2024-001234',
  status: 'in_transit' as const,
  createdAt: '2024-01-15T08:30:00Z',
  estimatedDelivery: '2024-01-17T14:00:00Z',
  currentLocation: 'Jakarta Pusat Distribution Center',
  
  sender: {
    name: 'PT Teknologi Indonesia',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat, 12190',
    phone: '+62-21-5555-0001',
    email: 'shipping@teknologi.id'
  },
  
  recipient: {
    name: 'Budi Santoso',
    address: 'Jl. Gatot Subroto No. 456, Jakarta Selatan, 12950',
    phone: '+62-812-3456-7890',
    email: 'budi.santoso@email.com'
  },
  
  package: {
    weight: 2.5,
    dimensions: '30 x 20 x 15 cm',
    contents: 'Elektronik - Laptop & Aksesori',
    value: 'Rp 15.000.000',
    insurance: true,
    specialInstructions: 'Fragile - Handle with care. Signature required upon delivery.'
  },
  
  service: {
    type: 'Express Drone',
    price: 'Rp 125.000',
    estimatedDays: '2 hari'
  },
  
  timeline: [
    {
      status: 'picked_up',
      timestamp: '2024-01-15T09:00:00Z',
      location: 'PT Teknologi Indonesia, Jakarta Pusat',
      description: 'Paket dijemput dari lokasi pengirim'
    },
    {
      status: 'in_transit',
      timestamp: '2024-01-15T14:30:00Z',
      location: 'Jakarta Pusat Distribution Center',
      description: 'Paket tiba di pusat distribusi utama'
    },
    {
      status: 'in_transit',
      timestamp: '2024-01-16T08:00:00Z',
      location: 'Jakarta Selatan Distribution Hub',
      description: 'Paket dalam perjalanan ke hub distribusi lokal'
    },
    {
      status: 'out_for_delivery',
      timestamp: '2024-01-17T10:00:00Z',
      location: 'Jakarta Selatan',
      description: 'Paket sedang dalam perjalanan untuk pengiriman'
    }
  ]
}

export default function ShipmentDetailContent() {
  const estimatedDeliveryDate = new Date(mockShipment.estimatedDelivery)
  const formattedDate = estimatedDeliveryDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="container-custom py-8 space-y-6">
      {/* Header Section */}
      <ShipmentDetailHeader shipment={mockShipment} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sender & Recipient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ShipmentInfoCard
              title="Pengirim"
              name={mockShipment.sender.name}
              address={mockShipment.sender.address}
              phone={mockShipment.sender.phone}
              email={mockShipment.sender.email}
              icon="Send"
            />
            <ShipmentInfoCard
              title="Penerima"
              name={mockShipment.recipient.name}
              address={mockShipment.recipient.address}
              phone={mockShipment.recipient.phone}
              email={mockShipment.recipient.email}
              icon="MapPin"
            />
          </div>

          {/* Package Details */}
          <PackageDetailsCard package={mockShipment.package} />

          {/* Tracking Timeline */}
          <TrackingTimelineCard timeline={mockShipment.timeline} />
        </div>

        {/* Right Column - Summary & Actions */}
        <div className="space-y-6">
          {/* Status Summary Card */}
          <Card className="glass-effect border-border/50 p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Status Pengiriman
              </h3>
              <div className="flex items-center gap-2">
                <TrackingStatusBadge status={mockShipment.status} />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Lokasi Saat Ini</p>
                <p className="text-sm font-medium">{mockShipment.currentLocation}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Estimasi Tiba</p>
                <p className="text-sm font-medium">{formattedDate}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Nomor Resi</p>
                <p className="text-sm font-mono font-semibold text-primary">
                  {mockShipment.id}
                </p>
              </div>
            </div>
          </Card>

          {/* Service Info Card */}
          <Card className="glass-effect border-border/50 p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Layanan Pengiriman
              </h3>
              <p className="text-lg font-bold gradient-text">
                {mockShipment.service.type}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-border/50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Harga</span>
                <span className="font-semibold">{mockShipment.service.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Estimasi</span>
                <span className="font-semibold">{mockShipment.service.estimatedDays}</span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full neon-glow" 
              asChild
            >
              <a href="./pelacakan-real-time.html">
                <SafeIcon name="MapPin" className="w-4 h-4 mr-2" />
                Lacak Real-time
              </a>
            </Button>

            <Button 
              variant="outline" 
              className="w-full"
              asChild
            >
              <a href="./ubah-detail-pengiriman.html">
                <SafeIcon name="Edit" className="w-4 h-4 mr-2" />
                Ubah Detail
              </a>
            </Button>

            <Button 
              variant="ghost" 
              className="w-full"
              asChild
            >
              <a href="./daftar-pengiriman-saya.html">
                <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Kembali
              </a>
            </Button>
          </div>

          {/* Additional Info */}
          <Card className="glass-effect border-border/50 p-4 space-y-2">
            <div className="flex items-start gap-2">
              <SafeIcon name="Info" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Asuransi pengiriman: <span className="text-primary font-semibold">Aktif</span></p>
                <p>Tanda tangan diperlukan saat pengiriman</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

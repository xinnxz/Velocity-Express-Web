
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingHistoryTimeline from './TrackingHistoryTimeline'
import TrackingHistoryTable from './TrackingHistoryTable'
import { mockTrackingHistory } from './mockData'

export default function TrackingHistoryContent() {
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('timeline')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredHistory = mockTrackingHistory.filter((event) => {
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus
    const matchesSearch = 
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.eventType.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const shipmentInfo = {
    trackingNumber: 'VEL-2024-001234',
    sender: 'PT Maju Jaya Logistics',
    recipient: 'Toko Elektronik Merdeka',
    origin: 'Jakarta Pusat',
    destination: 'Surabaya',
    startDate: '2024-01-15 08:30',
    estimatedDelivery: '2024-01-17 14:00',
  }

  const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'pending', label: 'Menunggu' },
    { value: 'picked_up', label: 'Dijemput' },
    { value: 'in_transit', label: 'Dalam Perjalanan' },
    { value: 'out_for_delivery', label: 'Sedang Dikirim' },
    { value: 'delivered', label: 'Terkirim' },
    { value: 'failed', label: 'Gagal' },
  ]

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Riwayat Pelacakan</h1>
              <p className="text-muted-foreground">
                Nomor Resi: <span className="font-semibold text-foreground">{shipmentInfo.trackingNumber}</span>
              </p>
            </div>
            <Button variant="outline" asChild>
              <a href="./detail-pengiriman-admin.html">
                <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Kembali ke Detail
              </a>
            </Button>
          </div>

          {/* Shipment Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-effect rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Pengirim</p>
              <p className="font-semibold text-sm">{shipmentInfo.sender}</p>
              <p className="text-xs text-muted-foreground mt-1">{shipmentInfo.origin}</p>
            </div>
            <div className="glass-effect rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Penerima</p>
              <p className="font-semibold text-sm">{shipmentInfo.recipient}</p>
              <p className="text-xs text-muted-foreground mt-1">{shipmentInfo.destination}</p>
            </div>
            <div className="glass-effect rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Tanggal Pengiriman</p>
              <p className="font-semibold text-sm">{shipmentInfo.startDate}</p>
            </div>
            <div className="glass-effect rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Estimasi Tiba</p>
              <p className="font-semibold text-sm">{shipmentInfo.estimatedDelivery}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="container-custom py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 min-w-0">
              <Input
                placeholder="Cari berdasarkan lokasi, deskripsi, atau tipe event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[200px] bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'timeline' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('timeline')}
              >
                <SafeIcon name="GitBranch" className="w-4 h-4 mr-2" />
                Timeline
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <SafeIcon name="Table2" className="w-4 h-4 mr-2" />
                Tabel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 container-custom py-8">
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <SafeIcon name="Search" className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tidak ada hasil</h3>
            <p className="text-sm text-muted-foreground">
              Tidak ditemukan event pelacakan yang sesuai dengan filter Anda
            </p>
          </div>
        ) : (
          <>
            {viewMode === 'timeline' ? (
              <TrackingHistoryTimeline events={filteredHistory} />
            ) : (
              <TrackingHistoryTable events={filteredHistory} />
            )}
          </>
        )}
      </div>

      {/* Summary Stats */}
      {filteredHistory.length > 0 && (
        <div className="border-t border-border bg-card/30 backdrop-blur-sm">
          <div className="container-custom py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="glass-effect rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Event</p>
                <p className="text-2xl font-bold">{filteredHistory.length}</p>
              </div>
              <div className="glass-effect rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Durasi Pengiriman</p>
                <p className="text-2xl font-bold">2d 6h</p>
              </div>
              <div className="glass-effect rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Jarak Tempuh</p>
                <p className="text-2xl font-bold">750 km</p>
              </div>
              <div className="glass-effect rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Status Akhir</p>
                <p className="text-2xl font-bold text-green-400">Terkirim</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

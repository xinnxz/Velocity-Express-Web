
'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'
import ShipmentFilters from './ShipmentFilters'
import ShipmentTable from './ShipmentTable'
import ShipmentCardList from './ShipmentCardList'
import EmptyState from '@/components/common/EmptyState'
import { mockShipments } from './mockData'

type ViewMode = 'table' | 'card'
type FilterStatus = 'all' | 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed' | 'cancelled'

export default function ShipmentListPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({})

  // Filter and search shipments
  const filteredShipments = useMemo(() => {
    return mockShipments.filter(shipment => {
      // Search filter
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = 
        shipment.trackingNumber.toLowerCase().includes(searchLower) ||
        shipment.recipientName.toLowerCase().includes(searchLower) ||
        shipment.recipientPhone.includes(searchQuery) ||
        shipment.destination.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false

      // Status filter
      if (filterStatus !== 'all' && shipment.status !== filterStatus) {
        return false
      }

      // Date range filter
      if (dateRange.from || dateRange.to) {
        const shipmentDate = new Date(shipment.createdAt)
        if (dateRange.from && shipmentDate < new Date(dateRange.from)) return false
        if (dateRange.to && shipmentDate > new Date(dateRange.to)) return false
      }

      return true
    })
  }, [searchQuery, filterStatus, dateRange])

  const activeCount = mockShipments.filter(s => 
    ['pending', 'picked_up', 'in_transit', 'out_for_delivery'].includes(s.status)
  ).length
  const completedCount = mockShipments.filter(s => 
    ['delivered', 'failed', 'cancelled'].includes(s.status)
  ).length

  return (
    <div className="flex-1 flex flex-col">
      <div className="container-custom py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Pengiriman Saya</h1>
            <p className="text-muted-foreground">
              Kelola dan lacak semua pengiriman Anda
            </p>
          </div>
          <Button asChild className="neon-glow">
            <a href="./buat-pesanan-awal.html">
              <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
              Buat Pesanan Baru
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-effect rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Pengiriman</p>
                <p className="text-2xl font-bold">{mockShipments.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <SafeIcon name="Package" className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Aktif</p>
                <p className="text-2xl font-bold">{activeCount}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <SafeIcon name="Truck" className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Selesai</p>
                <p className="text-2xl font-bold">{completedCount}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <SafeIcon name="CheckCircle2" className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <SafeIcon 
                name="Search" 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" 
              />
              <Input
                placeholder="Cari nomor resi, nama penerima, atau tujuan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon" asChild>
              <a href="./arsip-pengiriman.html">
                <SafeIcon name="Archive" className="w-4 h-4" />
              </a>
            </Button>
          </div>

          <ShipmentFilters
            filterStatus={filterStatus}
            onStatusChange={setFilterStatus}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Menampilkan {filteredShipments.length} dari {mockShipments.length} pengiriman
          </p>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="hidden sm:flex"
            >
              <SafeIcon name="Table" className="w-4 h-4 mr-2" />
              Tabel
            </Button>
            <Button
              variant={viewMode === 'card' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('card')}
            >
              <SafeIcon name="LayoutGrid" className="w-4 h-4 mr-2" />
              Kartu
            </Button>
          </div>
        </div>

        {/* Content */}
        {filteredShipments.length === 0 ? (
          <EmptyState
            icon="PackageOpen"
            title="Tidak ada pengiriman"
            description={
              searchQuery || filterStatus !== 'all'
                ? 'Coba ubah filter atau pencarian Anda'
                : 'Mulai dengan membuat pesanan pengiriman baru'
            }
            actionLabel="Buat Pesanan Baru"
            actionHref="./buat-pesanan-awal.html"
          />
        ) : (
          <>
            {viewMode === 'table' && (
              <div className="hidden sm:block">
                <ShipmentTable shipments={filteredShipments} />
              </div>
            )}
            {viewMode === 'card' && (
              <ShipmentCardList shipments={filteredShipments} />
            )}
            {viewMode === 'table' && (
              <div className="sm:hidden">
                <ShipmentCardList shipments={filteredShipments} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

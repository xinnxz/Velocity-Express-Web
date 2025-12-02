
'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'
import ShipmentStats from '@/components/pemantauan-pengiriman-admin/ShipmentStats'
import ShipmentFilters from '@/components/pemantauan-pengiriman-admin/ShipmentFilters'
import ShipmentTable from '@/components/pemantauan-pengiriman-admin/ShipmentTable'
import ShipmentCardList from '@/components/pemantauan-pengiriman-admin/ShipmentCardList'
import { mockShipments } from '@/data/mockShipments'
import type { Shipment, TrackingStatus } from '@/types/shipment'

type SortField = 'date' | 'status' | 'tracking_number' | 'amount'
type SortOrder = 'asc' | 'desc'

export default function ShipmentMonitoringPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<TrackingStatus | 'all'>('all')
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: '',
    to: ''
  })

  // Filter and sort shipments
  const filteredShipments = useMemo(() => {
    let result = [...mockShipments]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (shipment) =>
          shipment.tracking_number.toLowerCase().includes(query) ||
          shipment.sender_name.toLowerCase().includes(query) ||
          shipment.receiver_name.toLowerCase().includes(query) ||
          shipment.sender_phone.includes(query) ||
          shipment.receiver_phone.includes(query)
      )
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      result = result.filter((shipment) => shipment.status === selectedStatus)
    }

    // Filter by date range
    if (dateRange.from) {
      const fromDate = new Date(dateRange.from)
      result = result.filter((shipment) => new Date(shipment.created_at) >= fromDate)
    }
    if (dateRange.to) {
      const toDate = new Date(dateRange.to)
      toDate.setHours(23, 59, 59, 999)
      result = result.filter((shipment) => new Date(shipment.created_at) <= toDate)
    }

    // Sort
    result.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === 'date') {
        aValue = new Date(a.created_at).getTime()
        bValue = new Date(b.created_at).getTime()
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [searchQuery, selectedStatus, sortField, sortOrder, dateRange])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const stats = {
    total: mockShipments.length,
    active: mockShipments.filter(
      (s) => s.status === 'pending' || s.status === 'picked_up' || s.status === 'in_transit' || s.status === 'out_for_delivery'
    ).length,
    completed: mockShipments.filter((s) => s.status === 'delivered').length,
    failed: mockShipments.filter((s) => s.status === 'failed' || s.status === 'cancelled').length,
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="container-custom py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Pemantauan Pengiriman</h1>
            <p className="text-muted-foreground">
              Kelola dan pantau semua pengiriman aktif dan selesai
            </p>
          </div>
          <Button asChild className="neon-glow">
            <a href="./dasbor-admin.html">
              <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Kembali ke Dasbor
            </a>
          </Button>
        </div>

        {/* Statistics */}
        <ShipmentStats stats={stats} />

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <SafeIcon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nomor resi, nama pengirim, atau penerima..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <SafeIcon name="Download" className="w-4 h-4" />
            </Button>
          </div>

          {/* Filters */}
          <ShipmentFilters
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Menampilkan {filteredShipments.length} dari {mockShipments.length} pengiriman
          </p>
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'table' | 'cards')}>
            <TabsList>
              <TabsTrigger value="table" className="gap-2">
                <SafeIcon name="Table" className="w-4 h-4" />
                <span className="hidden sm:inline">Tabel</span>
              </TabsTrigger>
              <TabsTrigger value="cards" className="gap-2">
                <SafeIcon name="Grid" className="w-4 h-4" />
                <span className="hidden sm:inline">Kartu</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        {filteredShipments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <SafeIcon name="PackageOpen" className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tidak ada pengiriman ditemukan</h3>
            <p className="text-sm text-muted-foreground max-w-md mb-6">
              Coba ubah filter atau pencarian Anda untuk menemukan pengiriman
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedStatus('all')
                setDateRange({ from: '', to: '' })
              }}
            >
              Reset Filter
            </Button>
          </div>
        ) : viewMode === 'table' ? (
          <ShipmentTable
            shipments={filteredShipments}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        ) : (
          <ShipmentCardList shipments={filteredShipments} />
        )}
      </div>
    </div>
  )
}

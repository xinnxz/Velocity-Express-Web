
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SafeIcon from '@/components/common/SafeIcon'
import ShipmentListFilters from './ShipmentListFilters'
import ShipmentListTable from './ShipmentListTable'
import ShipmentListPagination from './ShipmentListPagination'
import { mockShipments } from './mockData'
import type { Shipment, FilterState } from './types'

const ITEMS_PER_PAGE = 10

export default function ShipmentListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    dateFrom: '',
    dateTo: '',
  })
  const [currentPage, setCurrentPage] = useState(1)

  // Filter and search shipments
  const filteredShipments = mockShipments.filter((shipment) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      shipment.trackingNumber.toLowerCase().includes(searchLower) ||
      shipment.sender.name.toLowerCase().includes(searchLower) ||
      shipment.recipient.name.toLowerCase().includes(searchLower) ||
      shipment.recipient.address.toLowerCase().includes(searchLower)

    if (!matchesSearch) return false

    // Status filter
    if (filters.status !== 'all' && shipment.status !== filters.status) {
      return false
    }

    // Date range filter
    const shipmentDate = new Date(shipment.createdAt)
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom)
      if (shipmentDate < fromDate) return false
    }
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo)
      toDate.setHours(23, 59, 59, 999)
      if (shipmentDate > toDate) return false
    }

    return true
  })

  // Pagination
  const totalPages = Math.ceil(filteredShipments.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedShipments = filteredShipments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  // Reset to first page when filters change
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)]">
      <div className="container-custom py-8 flex-1">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Daftar Pengiriman</h1>
              <p className="text-muted-foreground">
                Kelola dan lacak semua pengiriman Anda
              </p>
            </div>
            <Button asChild className="neon-glow w-full sm:w-auto">
              <a href="./buat-pesanan-awal.html">
                <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
                Buat Pesanan Baru
              </a>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <SafeIcon
              name="Search"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="Cari nomor resi, pengirim, atau penerima..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 bg-background/50 border-border"
            />
          </div>
        </div>

        {/* Filters */}
        <ShipmentListFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Results Info */}
        <div className="mb-4 text-sm text-muted-foreground">
          Menampilkan {paginatedShipments.length > 0 ? startIndex + 1 : 0} -{' '}
          {Math.min(startIndex + ITEMS_PER_PAGE, filteredShipments.length)} dari{' '}
          {filteredShipments.length} pengiriman
        </div>

        {/* Shipment List */}
        {paginatedShipments.length > 0 ? (
          <>
            <ShipmentListTable shipments={paginatedShipments} />

            {/* Pagination */}
            {totalPages > 1 && (
              <ShipmentListPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <SafeIcon
                name="PackageOpen"
                className="w-8 h-8 text-muted-foreground"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tidak ada pengiriman</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || filters.status !== 'all' || filters.dateFrom || filters.dateTo
                ? 'Tidak ada pengiriman yang sesuai dengan filter Anda'
                : 'Anda belum memiliki pengiriman. Buat pesanan baru untuk memulai.'}
            </p>
            <Button asChild>
              <a href="./buat-pesanan-awal.html">
                <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
                Buat Pesanan Baru
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

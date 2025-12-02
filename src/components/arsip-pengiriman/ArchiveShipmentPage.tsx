
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge, { type TrackingStatus } from '@/components/common/TrackingStatusBadge'
import EmptyState from '@/components/common/EmptyState'
import ArchiveFilters from '@/components/arsip-pengiriman/ArchiveFilters'
import ShipmentArchiveCard from '@/components/arsip-pengiriman/ShipmentArchiveCard'

interface ArchivedShipment {
  id: string
  trackingNumber: string
  sender: {
    name: string
    city: string
  }
  recipient: {
    name: string
    city: string
  }
  status: TrackingStatus
  completedDate: string
  amount: number
  weight: number
  service: string
}

// Mock data for archived shipments
const mockArchivedShipments: ArchivedShipment[] = [
  {
    id: '1',
    trackingNumber: 'VEL-2024-001234',
    sender: { name: 'PT Elektronik Maju', city: 'Jakarta' },
    recipient: { name: 'Budi Santoso', city: 'Surabaya' },
    status: 'delivered',
    completedDate: '2024-01-15',
    amount: 125000,
    weight: 2.5,
    service: 'Express'
  },
  {
    id: '2',
    trackingNumber: 'VEL-2024-001235',
    sender: { name: 'Toko Online Berkah', city: 'Bandung' },
    recipient: { name: 'Siti Nurhaliza', city: 'Jakarta' },
    status: 'delivered',
    completedDate: '2024-01-14',
    amount: 85000,
    weight: 1.2,
    service: 'Regular'
  },
  {
    id: '3',
    trackingNumber: 'VEL-2024-001236',
    sender: { name: 'Fashion Store Premium', city: 'Jakarta' },
    recipient: { name: 'Ahmad Wijaya', city: 'Medan' },
    status: 'cancelled',
    completedDate: '2024-01-13',
    amount: 250000,
    weight: 5.0,
    service: 'Drone Express'
  },
  {
    id: '4',
    trackingNumber: 'VEL-2024-001237',
    sender: { name: 'Distributor Barang', city: 'Surabaya' },
    recipient: { name: 'Eka Putri', city: 'Yogyakarta' },
    status: 'delivered',
    completedDate: '2024-01-12',
    amount: 175000,
    weight: 3.8,
    service: 'Standard'
  },
  {
    id: '5',
    trackingNumber: 'VEL-2024-001238',
    sender: { name: 'Perusahaan Logistik', city: 'Jakarta' },
    recipient: { name: 'Rini Handoko', city: 'Bandung' },
    status: 'delivered',
    completedDate: '2024-01-11',
    amount: 95000,
    weight: 2.1,
    service: 'Express'
  },
  {
    id: '6',
    trackingNumber: 'VEL-2024-001239',
    sender: { name: 'Toko Buku Online', city: 'Jakarta' },
    recipient: { name: 'Hendra Kusuma', city: 'Jakarta' },
    status: 'cancelled',
    completedDate: '2024-01-10',
    amount: 45000,
    weight: 0.8,
    service: 'Regular'
  },
  {
    id: '7',
    trackingNumber: 'VEL-2024-001240',
    sender: { name: 'Supplier Elektronik', city: 'Medan' },
    recipient: { name: 'Dewi Lestari', city: 'Jakarta' },
    status: 'delivered',
    completedDate: '2024-01-09',
    amount: 320000,
    weight: 8.5,
    service: 'Cargo'
  },
  {
    id: '8',
    trackingNumber: 'VEL-2024-001241',
    sender: { name: 'Toko Fashion', city: 'Bandung' },
    recipient: { name: 'Bambang Irawan', city: 'Semarang' },
    status: 'delivered',
    completedDate: '2024-01-08',
    amount: 155000,
    weight: 2.3,
    service: 'Express'
  },
  {
    id: '9',
    trackingNumber: 'VEL-2024-001242',
    sender: { name: 'Distributor Makanan', city: 'Jakarta' },
    recipient: { name: 'Lina Wijaya', city: 'Bogor' },
    status: 'delivered',
    completedDate: '2024-01-07',
    amount: 65000,
    weight: 1.5,
    service: 'Regular'
  },
  {
    id: '10',
    trackingNumber: 'VEL-2024-001243',
    sender: { name: 'Perusahaan Teknologi', city: 'Jakarta' },
    recipient: { name: 'Yudi Hermawan', city: 'Jakarta' },
    status: 'cancelled',
    completedDate: '2024-01-06',
    amount: 500000,
    weight: 12.0,
    service: 'Drone Express'
  },
]

const ITEMS_PER_PAGE = 10

export default function ArchiveShipmentPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'delivered' | 'cancelled'>('all')
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: '',
    to: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')

  // Filter and search logic
  const filteredShipments = useMemo(() => {
    return mockArchivedShipments.filter(shipment => {
      // Search filter
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = 
        shipment.trackingNumber.toLowerCase().includes(searchLower) ||
        shipment.sender.name.toLowerCase().includes(searchLower) ||
        shipment.recipient.name.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false

      // Status filter
      if (statusFilter !== 'all' && shipment.status !== statusFilter) {
        return false
      }

      // Date range filter
      if (dateRange.from && shipment.completedDate < dateRange.from) {
        return false
      }
      if (dateRange.to && shipment.completedDate > dateRange.to) {
        return false
      }

      return true
    })
  }, [searchQuery, statusFilter, dateRange])

  // Pagination
  const totalPages = Math.ceil(filteredShipments.length / ITEMS_PER_PAGE)
  const paginatedShipments = filteredShipments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleStatusFilter = (status: 'all' | 'delivered' | 'cancelled') => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  const handleDateRangeChange = (from: string, to: string) => {
    setDateRange({ from, to })
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setStatusFilter('all')
    setDateRange({ from: '', to: '' })
    setCurrentPage(1)
  }

  const totalAmount = filteredShipments.reduce((sum, s) => sum + s.amount, 0)
  const deliveredCount = filteredShipments.filter(s => s.status === 'delivered').length
  const cancelledCount = filteredShipments.filter(s => s.status === 'cancelled').length

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" asChild className="hover:bg-muted">
              <a href="./daftar-pengiriman-saya.html">
                <SafeIcon name="ArrowLeft" className="w-5 h-5" />
              </a>
            </Button>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Arsip Pengiriman</h1>
              <p className="text-muted-foreground mt-1">
                Kelola dan tinjau riwayat pengiriman yang telah selesai atau dibatalkan
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Pengiriman</p>
                  <p className="text-2xl font-bold">{filteredShipments.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <SafeIcon name="Package" className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Terkirim</p>
                  <p className="text-2xl font-bold">{deliveredCount}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <SafeIcon name="CheckCircle2" className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Nilai</p>
                  <p className="text-2xl font-bold">Rp {(totalAmount / 1000000).toFixed(1)}M</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <SafeIcon name="DollarSign" className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Filter & Pencarian</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <SafeIcon 
                name="Search" 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" 
              />
              <Input
                placeholder="Cari nomor resi, pengirim, atau penerima..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>

            {/* Filters */}
            <ArchiveFilters
              statusFilter={statusFilter}
              dateRange={dateRange}
              onStatusChange={handleStatusFilter}
              onDateRangeChange={handleDateRangeChange}
              onReset={handleResetFilters}
            />
          </CardContent>
        </Card>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Menampilkan {paginatedShipments.length} dari {filteredShipments.length} pengiriman
          </p>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="hidden sm:flex"
            >
              <SafeIcon name="List" className="w-4 h-4 mr-2" />
              Tabel
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="hidden sm:flex"
            >
              <SafeIcon name="Grid" className="w-4 h-4 mr-2" />
              Grid
            </Button>
          </div>
        </div>

        {/* Content */}
        {filteredShipments.length === 0 ? (
          <EmptyState
            icon="Archive"
            title="Tidak Ada Pengiriman Arsip"
            description="Belum ada pengiriman yang selesai atau dibatalkan. Mulai buat pesanan baru untuk memulai pengiriman."
            actionLabel="Buat Pesanan Baru"
            actionHref="./buat-pesanan-awal.html"
          />
        ) : (
          <>
            {/* Table View */}
            {viewMode === 'table' && (
              <div className="hidden sm:block overflow-x-auto">
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Nomor Resi
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Pengirim
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Penerima
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Tanggal Selesai
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                          Nilai
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedShipments.map((shipment) => (
                        <tr 
                          key={shipment.id} 
                          className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <a 
                              href={`./detail-pengiriman-terdaftar.html?id=${shipment.id}`}
                              className="text-primary hover:underline font-mono text-sm"
                            >
                              {shipment.trackingNumber}
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium">{shipment.sender.name}</p>
                              <p className="text-xs text-muted-foreground">{shipment.sender.city}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium">{shipment.recipient.name}</p>
                              <p className="text-xs text-muted-foreground">{shipment.recipient.city}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <TrackingStatusBadge status={shipment.status} />
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {new Date(shipment.completedDate).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium">
                            Rp {shipment.amount.toLocaleString('id-ID')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedShipments.map((shipment) => (
                  <ShipmentArchiveCard key={shipment.id} shipment={shipment} />
                ))}
              </div>
            )}

            {/* Mobile Grid View (always shown on mobile) */}
            <div className="sm:hidden grid grid-cols-1 gap-4">
              {paginatedShipments.map((shipment) => (
                <ShipmentArchiveCard key={shipment.id} shipment={shipment} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

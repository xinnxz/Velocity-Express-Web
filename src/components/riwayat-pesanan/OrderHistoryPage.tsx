
'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SafeIcon from '@/components/common/SafeIcon'
import EmptyState from '@/components/common/EmptyState'
import OrderHistoryCard from './OrderHistoryCard'
import TrackingStatusBadge, { type TrackingStatus } from '@/components/common/TrackingStatusBadge'

interface OrderItem {
  id: string
  name: string
  quantity: number
  weight: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  recipient: string
  recipientPhone: string
  destination: string
  status: TrackingStatus
  totalPrice: number
  itemsCount: number
  items: OrderItem[]
  estimatedDelivery?: string
  courier: string
  trackingNumber: string
}

// Mock data - initialized at component level
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    recipient: 'Budi Santoso',
    recipientPhone: '+62812345678',
    destination: 'Jakarta Selatan, DKI Jakarta',
    status: 'delivered',
    totalPrice: 45000,
    itemsCount: 2,
    items: [
      { id: '1', name: 'Laptop Bag', quantity: 1, weight: '0.5 kg' },
      { id: '2', name: 'USB Cable', quantity: 2, weight: '0.1 kg' }
    ],
    courier: 'VeloCity Express Standard',
    trackingNumber: 'VEL-2024-001-ABC'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-18',
    recipient: 'Siti Nurhaliza',
    recipientPhone: '+62812345679',
    destination: 'Bandung, Jawa Barat',
    status: 'delivered',
    totalPrice: 65000,
    itemsCount: 1,
    items: [
      { id: '1', name: 'Smartphone Case', quantity: 1, weight: '0.2 kg' }
    ],
    courier: 'VeloCity Express Express',
    trackingNumber: 'VEL-2024-002-DEF'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-20',
    recipient: 'Ahmad Wijaya',
    recipientPhone: '+62812345680',
    destination: 'Surabaya, Jawa Timur',
    status: 'delivered',
    totalPrice: 85000,
    itemsCount: 3,
    items: [
      { id: '1', name: 'Monitor 24 inch', quantity: 1, weight: '3.5 kg' },
      { id: '2', name: 'HDMI Cable', quantity: 2, weight: '0.2 kg' }
    ],
    courier: 'VeloCity Express Drone',
    trackingNumber: 'VEL-2024-003-GHI'
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    date: '2024-01-22',
    recipient: 'Rina Kusuma',
    recipientPhone: '+62812345681',
    destination: 'Medan, Sumatera Utara',
    status: 'delivered',
    totalPrice: 125000,
    itemsCount: 4,
    items: [
      { id: '1', name: 'Keyboard Mechanical', quantity: 1, weight: '1.2 kg' },
      { id: '2', name: 'Mouse Wireless', quantity: 1, weight: '0.15 kg' },
      { id: '3', name: 'Mousepad', quantity: 1, weight: '0.3 kg' }
    ],
    courier: 'VeloCity Express Standard',
    trackingNumber: 'VEL-2024-004-JKL'
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    date: '2024-01-25',
    recipient: 'Doni Hermawan',
    recipientPhone: '+62812345682',
    destination: 'Yogyakarta, DI Yogyakarta',
    status: 'delivered',
    totalPrice: 55000,
    itemsCount: 1,
    items: [
      { id: '1', name: 'Book Set (3 books)', quantity: 1, weight: '1.5 kg' }
    ],
    courier: 'VeloCity Express Standard',
    trackingNumber: 'VEL-2024-005-MNO'
  },
  {
    id: '6',
    orderNumber: 'ORD-2024-006',
    date: '2024-01-28',
    recipient: 'Lina Wijaya',
    recipientPhone: '+62812345683',
    destination: 'Makassar, Sulawesi Selatan',
    status: 'delivered',
    totalPrice: 95000,
    itemsCount: 2,
    items: [
      { id: '1', name: 'Headphones Wireless', quantity: 1, weight: '0.25 kg' },
      { id: '2', name: 'Charging Cable', quantity: 2, weight: '0.1 kg' }
    ],
    courier: 'VeloCity Express Express',
    trackingNumber: 'VEL-2024-006-PQR'
  },
  {
    id: '7',
    orderNumber: 'ORD-2024-007',
    date: '2024-02-01',
    recipient: 'Bambang Sutrisno',
    recipientPhone: '+62812345684',
    destination: 'Palembang, Sumatera Selatan',
    status: 'delivered',
    totalPrice: 75000,
    itemsCount: 1,
    items: [
      { id: '1', name: 'External Hard Drive 1TB', quantity: 1, weight: '0.4 kg' }
    ],
    courier: 'VeloCity Express Standard',
    trackingNumber: 'VEL-2024-007-STU'
  },
  {
    id: '8',
    orderNumber: 'ORD-2024-008',
    date: '2024-02-05',
    recipient: 'Citra Dewi',
    recipientPhone: '+62812345685',
    destination: 'Semarang, Jawa Tengah',
    status: 'delivered',
    totalPrice: 105000,
    itemsCount: 2,
    items: [
      { id: '1', name: 'Webcam HD', quantity: 1, weight: '0.3 kg' },
      { id: '2', name: 'Microphone USB', quantity: 1, weight: '0.2 kg' }
    ],
    courier: 'VeloCity Express Express',
    trackingNumber: 'VEL-2024-008-VWX'
  }
]

export default function OrderHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date-desc')
  const [filterStatus, setFilterStatus] = useState('all')

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    let filtered = mockOrders

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(query) ||
        order.recipient.toLowerCase().includes(query) ||
        order.destination.toLowerCase().includes(query) ||
        order.trackingNumber.toLowerCase().includes(query)
      )
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus)
    }

    // Sorting
    const sorted = [...filtered]
    switch (sortBy) {
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'price-high':
        sorted.sort((a, b) => b.totalPrice - a.totalPrice)
        break
      case 'price-low':
        sorted.sort((a, b) => a.totalPrice - b.totalPrice)
        break
    }

    return sorted
  }, [searchQuery, sortBy, filterStatus])

  const handleViewDetails = (orderId: string) => {
    // Navigate to detail page with order ID
    window.location.href = `./detail-pengiriman-terdaftar.html?id=${orderId}`
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header Section */}
      <div className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="container-custom py-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <SafeIcon name="History" className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Riwayat Pesanan</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Lihat semua pesanan dan pengiriman Anda
              </p>
            </div>
          </div>

          {/* Navigation Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="./pengaturan-akun.html" className="hover:text-primary transition-colors">
              Pengaturan Akun
            </a>
            <SafeIcon name="ChevronRight" className="w-4 h-4" />
            <span className="text-primary">Riwayat Pesanan</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Filters and Search */}
        <div className="glass-effect rounded-lg p-6 mb-8 border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Cari Pesanan</label>
              <div className="relative">
                <SafeIcon 
                  name="Search" 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" 
                />
                <Input
                  type="text"
                  placeholder="Cari berdasarkan nomor pesanan, nama penerima, atau nomor resi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-2">Urutkan</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Terbaru Dulu</SelectItem>
                  <SelectItem value="date-asc">Terlama Dulu</SelectItem>
                  <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                  <SelectItem value="price-low">Harga Terendah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Filter Status</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
                className="rounded-full"
              >
                Semua ({mockOrders.length})
              </Button>
              <Button
                variant={filterStatus === 'delivered' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('delivered')}
                className="rounded-full"
              >
                Terkirim ({mockOrders.filter(o => o.status === 'delivered').length})
              </Button>
              <Button
                variant={filterStatus === 'in_transit' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('in_transit')}
                className="rounded-full"
              >
                Dalam Perjalanan ({mockOrders.filter(o => o.status === 'in_transit').length})
              </Button>
              <Button
                variant={filterStatus === 'cancelled' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('cancelled')}
                className="rounded-full"
              >
                Dibatalkan ({mockOrders.filter(o => o.status === 'cancelled').length})
              </Button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderHistoryCard
                key={order.id}
                order={order}
                onViewDetails={() => handleViewDetails(order.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="PackageOpen"
            title="Tidak Ada Pesanan"
            description={
              searchQuery || filterStatus !== 'all'
                ? 'Tidak ada pesanan yang sesuai dengan filter Anda. Coba ubah pencarian atau filter.'
                : 'Anda belum memiliki riwayat pesanan. Mulai buat pesanan baru sekarang.'
            }
            actionLabel="Buat Pesanan Baru"
            actionHref="./buat-pesanan-awal.html"
          />
        )}

        {/* Results Info */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border/50 text-sm text-muted-foreground">
            Menampilkan <span className="font-semibold text-foreground">{filteredOrders.length}</span> dari{' '}
            <span className="font-semibold text-foreground">{mockOrders.length}</span> pesanan
          </div>
        )}
      </div>
    </div>
  )
}

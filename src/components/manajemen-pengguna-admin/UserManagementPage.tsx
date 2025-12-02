
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import UserActions from './UserActions'
import { cn } from '@/lib/utils'

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'courier' | 'customer'
  status: 'active' | 'inactive'
  registeredDate: string
  lastLogin: string
  totalShipments?: number
}

const mockUsers: User[] = [
  {
    id: 'USR001',
    name: 'Ahmad Wijaya',
    email: 'ahmad.wijaya@velocity.com',
    phone: '+62812345678',
    role: 'admin',
    status: 'active',
    registeredDate: '2024-01-15',
    lastLogin: '2024-12-19',
  },
  {
    id: 'USR002',
    name: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@velocity.com',
    phone: '+62812345679',
    role: 'courier',
    status: 'active',
    registeredDate: '2024-02-20',
    lastLogin: '2024-12-19',
    totalShipments: 1250,
  },
  {
    id: 'USR003',
    name: 'Budi Santoso',
    email: 'budi.santoso@velocity.com',
    phone: '+62812345680',
    role: 'courier',
    status: 'active',
    registeredDate: '2024-03-10',
    lastLogin: '2024-12-18',
    totalShipments: 890,
  },
  {
    id: 'USR004',
    name: 'Rina Kusuma',
    email: 'rina.kusuma@velocity.com',
    phone: '+62812345681',
    role: 'customer',
    status: 'active',
    registeredDate: '2024-04-05',
    lastLogin: '2024-12-19',
  },
  {
    id: 'USR005',
    name: 'Doni Hermawan',
    email: 'doni.hermawan@velocity.com',
    phone: '+62812345682',
    role: 'courier',
    status: 'inactive',
    registeredDate: '2024-05-12',
    lastLogin: '2024-11-20',
    totalShipments: 450,
  },
  {
    id: 'USR006',
    name: 'Lina Wijaya',
    email: 'lina.wijaya@velocity.com',
    phone: '+62812345683',
    role: 'customer',
    status: 'active',
    registeredDate: '2024-06-08',
    lastLogin: '2024-12-17',
  },
  {
    id: 'USR007',
    name: 'Rudi Hartono',
    email: 'rudi.hartono@velocity.com',
    phone: '+62812345684',
    role: 'admin',
    status: 'active',
    registeredDate: '2024-01-20',
    lastLogin: '2024-12-19',
  },
  {
    id: 'USR008',
    name: 'Maya Putri',
    email: 'maya.putri@velocity.com',
    phone: '+62812345685',
    role: 'courier',
    status: 'active',
    registeredDate: '2024-07-15',
    lastLogin: '2024-12-19',
    totalShipments: 2100,
  },
  {
    id: 'USR009',
    name: 'Eko Suryanto',
    email: 'eko.suryanto@velocity.com',
    phone: '+62812345686',
    role: 'customer',
    status: 'inactive',
    registeredDate: '2024-08-22',
    lastLogin: '2024-10-15',
  },
  {
    id: 'USR010',
    name: 'Hana Setiawan',
    email: 'hana.setiawan@velocity.com',
    phone: '+62812345687',
    role: 'courier',
    status: 'active',
    registeredDate: '2024-09-10',
    lastLogin: '2024-12-19',
    totalShipments: 1680,
  },
  {
    id: 'USR011',
    name: 'Joko Prabowo',
    email: 'joko.prabowo@velocity.com',
    phone: '+62812345688',
    role: 'customer',
    status: 'active',
    registeredDate: '2024-10-05',
    lastLogin: '2024-12-18',
  },
  {
    id: 'USR012',
    name: 'Karina Dewi',
    email: 'karina.dewi@velocity.com',
    phone: '+62812345689',
    role: 'courier',
    status: 'active',
    registeredDate: '2024-11-01',
    lastLogin: '2024-12-19',
    totalShipments: 920,
  },
]

const ITEMS_PER_PAGE = 10

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'courier' | 'customer'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'status'>('date')

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let result = mockUsers

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.phone.includes(query)
      )
    }

    // Role filter
    if (roleFilter !== 'all') {
      result = result.filter((user) => user.role === roleFilter)
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((user) => user.status === statusFilter)
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'date') {
        return new Date(b.registeredDate).getTime() - new Date(a.registeredDate).getTime()
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status)
      }
      return 0
    })

    return result
  }, [searchQuery, roleFilter, statusFilter, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      case 'courier':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
      case 'customer':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Admin'
      case 'courier':
        return 'Kurir'
      case 'customer':
        return 'Pelanggan'
      default:
        return role
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manajemen Pengguna</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Kelola data pengguna terdaftar dan hak akses mereka
            </p>
          </div>
          <Button asChild className="neon-glow w-full sm:w-auto">
            <a href="./tambah-pengguna-admin.html">
              <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
              Tambah Pengguna
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Total Pengguna</div>
            <div className="text-2xl font-bold mt-1">{mockUsers.length}</div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Admin</div>
            <div className="text-2xl font-bold mt-1">
              {mockUsers.filter((u) => u.role === 'admin').length}
            </div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Kurir</div>
            <div className="text-2xl font-bold mt-1">
              {mockUsers.filter((u) => u.role === 'courier').length}
            </div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Aktif</div>
            <div className="text-2xl font-bold mt-1">
              {mockUsers.filter((u) => u.status === 'active').length}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder="Cari nama, email, atau nomor telepon..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="bg-background/50"
          />

          <Select value={roleFilter} onValueChange={(value: any) => {
            setRoleFilter(value)
            setCurrentPage(1)
          }}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Filter Peran" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Peran</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="courier">Kurir</SelectItem>
              <SelectItem value="customer">Pelanggan</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(value: any) => {
            setStatusFilter(value)
            setCurrentPage(1)
          }}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="inactive">Tidak Aktif</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Urutkan Berdasarkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Tanggal Terbaru</SelectItem>
              <SelectItem value="name">Nama (A-Z)</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results info */}
        <div className="text-sm text-muted-foreground">
          Menampilkan {paginatedUsers.length} dari {filteredUsers.length} pengguna
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-6">
        <div className="glass-effect rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/50 hover:bg-transparent">
                <TableHead className="text-primary">Nama</TableHead>
                <TableHead className="text-primary">Email</TableHead>
                <TableHead className="text-primary">Peran</TableHead>
                <TableHead className="text-primary">Status</TableHead>
                <TableHead className="text-primary">Terdaftar</TableHead>
                <TableHead className="text-primary text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary-foreground">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn('border', getRoleColor(user.role))}
                    >
                      {getRoleLabel(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === 'active' ? 'default' : 'secondary'}
                      className={
                        user.status === 'active'
                          ? 'bg-green-500/20 text-green-400 border-green-500/50 border'
                          : 'bg-muted text-muted-foreground'
                      }
                    >
                      {user.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(user.registeredDate).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <UserActions user={user} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-border p-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={page === currentPage}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
                return null
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={
                    currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

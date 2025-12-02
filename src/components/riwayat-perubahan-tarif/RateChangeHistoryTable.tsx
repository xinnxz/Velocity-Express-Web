
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'
import RateChangeHistoryRow from './RateChangeHistoryRow'
import type { RateChangeHistory } from './mockData'

interface RateChangeHistoryTableProps {
  data: RateChangeHistory[]
}

type SortField = 'changedAt' | 'serviceName' | 'changedBy' | 'changeType'
type SortOrder = 'asc' | 'desc'

export default function RateChangeHistoryTable({ data }: RateChangeHistoryTableProps) {
  const [sortField, setSortField] = useState<SortField>('changedAt')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
    setCurrentPage(1)
  }

  const sortedData = [...data].sort((a, b) => {
    let aValue: any = a[sortField]
    let bValue: any = b[sortField]

    if (sortField === 'changedAt') {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <SafeIcon name="ArrowUpDown" className="w-4 h-4 opacity-50" />
    }
    return sortOrder === 'asc' ? (
      <SafeIcon name="ArrowUp" className="w-4 h-4" />
    ) : (
      <SafeIcon name="ArrowDown" className="w-4 h-4" />
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="w-[180px]">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-2 -ml-3"
                  onClick={() => handleSort('changedAt')}
                >
                  Tanggal & Waktu
                  <SortIcon field="changedAt" />
                </Button>
              </TableHead>
              <TableHead className="w-[150px]">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-2 -ml-3"
                  onClick={() => handleSort('serviceName')}
                >
                  Layanan
                  <SortIcon field="serviceName" />
                </Button>
              </TableHead>
              <TableHead className="w-[120px]">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-2 -ml-3"
                  onClick={() => handleSort('changedBy')}
                >
                  Diubah Oleh
                  <SortIcon field="changedBy" />
                </Button>
              </TableHead>
              <TableHead className="w-[100px]">Nilai Lama</TableHead>
              <TableHead className="w-[100px]">Nilai Baru</TableHead>
              <TableHead className="w-[120px]">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-2 -ml-3"
                  onClick={() => handleSort('changeType')}
                >
                  Tipe Perubahan
                  <SortIcon field="changeType" />
                </Button>
              </TableHead>
              <TableHead className="w-[80px] text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <RateChangeHistoryRow key={item.id} item={item} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <SafeIcon name="PackageOpen" className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Tidak ada data perubahan tarif</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Menampilkan {startIndex + 1} hingga {Math.min(startIndex + itemsPerPage, sortedData.length)} dari {sortedData.length} hasil
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <SafeIcon name="ChevronLeft" className="w-4 h-4" />
              Sebelumnya
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Berikutnya
              <SafeIcon name="ChevronRight" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

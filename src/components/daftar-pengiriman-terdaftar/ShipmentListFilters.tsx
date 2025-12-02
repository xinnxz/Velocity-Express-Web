
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
import type { FilterState } from './types'

interface ShipmentListFiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
}

export default function ShipmentListFilters({
  filters,
  onFilterChange,
}: ShipmentListFiltersProps) {
  const handleStatusChange = (status: string) => {
    onFilterChange({
      ...filters,
      status: status as FilterState['status'],
    })
  }

  const handleDateFromChange = (date: string) => {
    onFilterChange({
      ...filters,
      dateFrom: date,
    })
  }

  const handleDateToChange = (date: string) => {
    onFilterChange({
      ...filters,
      dateTo: date,
    })
  }

  const handleReset = () => {
    onFilterChange({
      status: 'all',
      dateFrom: '',
      dateTo: '',
    })
  }

  const isFiltered =
    filters.status !== 'all' || filters.dateFrom || filters.dateTo

  return (
    <div className="mb-6 p-4 rounded-lg border border-border bg-card/50 glass-effect">
      <div className="flex flex-col gap-4">
        {/* Filter Title */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <SafeIcon name="Filter" className="w-4 h-4" />
            Filter Pengiriman
          </h3>
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs"
            >
              <SafeIcon name="X" className="w-3 h-3 mr-1" />
              Reset Filter
            </Button>
          )}
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Status
            </label>
            <Select value={filters.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="bg-background/50 border-border">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="picked_up">Dijemput</SelectItem>
                <SelectItem value="in_transit">Dalam Perjalanan</SelectItem>
                <SelectItem value="out_for_delivery">Sedang Dikirim</SelectItem>
                <SelectItem value="delivered">Terkirim</SelectItem>
                <SelectItem value="failed">Gagal</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date From Filter */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Dari Tanggal
            </label>
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleDateFromChange(e.target.value)}
              className="bg-background/50 border-border"
            />
          </div>

          {/* Date To Filter */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Sampai Tanggal
            </label>
            <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleDateToChange(e.target.value)}
              className="bg-background/50 border-border"
            />
          </div>

          {/* Quick Filters */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Filter Cepat
            </label>
            <div className="flex gap-2">
              <Button
                variant={filters.status === 'in_transit' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStatusChange('in_transit')}
                className="text-xs flex-1"
              >
                Aktif
              </Button>
              <Button
                variant={filters.status === 'delivered' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStatusChange('delivered')}
                className="text-xs flex-1"
              >
                Selesai
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

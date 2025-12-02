
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import SafeIcon from '@/components/common/SafeIcon'

type FilterStatus = 'all' | 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed' | 'cancelled'

interface ShipmentFiltersProps {
  filterStatus: FilterStatus
  onStatusChange: (status: FilterStatus) => void
  dateRange: { from?: string; to?: string }
  onDateRangeChange: (range: { from?: string; to?: string }) => void
}

const statusOptions = [
  { value: 'all', label: 'Semua Status' },
  { value: 'pending', label: 'Menunggu' },
  { value: 'picked_up', label: 'Dijemput' },
  { value: 'in_transit', label: 'Dalam Perjalanan' },
  { value: 'out_for_delivery', label: 'Sedang Dikirim' },
  { value: 'delivered', label: 'Terkirim' },
  { value: 'failed', label: 'Gagal' },
  { value: 'cancelled', label: 'Dibatalkan' },
]

export default function ShipmentFilters({
  filterStatus,
  onStatusChange,
  dateRange,
  onDateRangeChange,
}: ShipmentFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hasActiveFilters = filterStatus !== 'all' || dateRange.from || dateRange.to

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <Select value={filterStatus} onValueChange={(value) => onStatusChange(value as FilterStatus)}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            <SafeIcon name="Calendar" className="w-4 h-4 mr-2" />
            Tanggal
            {(dateRange.from || dateRange.to) && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs">
                1
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Dari Tanggal</label>
              <Input
                type="date"
                value={dateRange.from || ''}
                onChange={(e) =>
                  onDateRangeChange({ ...dateRange, from: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Sampai Tanggal</label>
              <Input
                type="date"
                value={dateRange.to || ''}
                onChange={(e) =>
                  onDateRangeChange({ ...dateRange, to: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  onDateRangeChange({})
                  setIsOpen(false)
                }}
              >
                Reset
              </Button>
              <Button
                size="sm"
                className="flex-1"
                onClick={() => setIsOpen(false)}
              >
                Terapkan
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onStatusChange('all')
            onDateRangeChange({})
          }}
          className="text-muted-foreground hover:text-foreground"
        >
          <SafeIcon name="X" className="w-4 h-4 mr-1" />
          Hapus Filter
        </Button>
      )}
    </div>
  )
}


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
import type { TrackingStatus } from '@/types/shipment'

interface ShipmentFiltersProps {
  selectedStatus: TrackingStatus | 'all'
  onStatusChange: (status: TrackingStatus | 'all') => void
  dateRange: { from: string; to: string }
  onDateRangeChange: (range: { from: string; to: string }) => void
}

const statusOptions: Array<{ value: TrackingStatus | 'all'; label: string }> = [
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
  selectedStatus,
  onStatusChange,
  dateRange,
  onDateRangeChange,
}: ShipmentFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
      <div className="flex-1 min-w-0">
        <label className="text-sm font-medium mb-2 block">Status</label>
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger>
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
      </div>

      <div className="flex-1 min-w-0">
        <label className="text-sm font-medium mb-2 block">Dari Tanggal</label>
        <Input
          type="date"
          value={dateRange.from}
          onChange={(e) =>
            onDateRangeChange({ ...dateRange, from: e.target.value })
          }
        />
      </div>

      <div className="flex-1 min-w-0">
        <label className="text-sm font-medium mb-2 block">Hingga Tanggal</label>
        <Input
          type="date"
          value={dateRange.to}
          onChange={(e) =>
            onDateRangeChange({ ...dateRange, to: e.target.value })
          }
        />
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          onStatusChange('all')
          onDateRangeChange({ from: '', to: '' })
        }}
        title="Reset filters"
      >
        <SafeIcon name="RotateCcw" className="w-4 h-4" />
      </Button>
    </div>
  )
}


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'

interface ArchiveFiltersProps {
  statusFilter: 'all' | 'delivered' | 'cancelled'
  dateRange: { from: string; to: string }
  onStatusChange: (status: 'all' | 'delivered' | 'cancelled') => void
  onDateRangeChange: (from: string, to: string) => void
  onReset: () => void
}

export default function ArchiveFilters({
  statusFilter,
  dateRange,
  onStatusChange,
  onDateRangeChange,
  onReset
}: ArchiveFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Status Filter */}
      <div>
        <label className="text-sm font-medium mb-2 block">Status Pengiriman</label>
        <Tabs value={statusFilter} onValueChange={(v) => onStatusChange(v as any)}>
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="delivered">Terkirim</TabsTrigger>
            <TabsTrigger value="cancelled">Dibatalkan</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Date Range Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Dari Tanggal</label>
          <Input
            type="date"
            value={dateRange.from}
            onChange={(e) => onDateRangeChange(e.target.value, dateRange.to)}
            className="bg-background/50"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Sampai Tanggal</label>
          <Input
            type="date"
            value={dateRange.to}
            onChange={(e) => onDateRangeChange(dateRange.from, e.target.value)}
            className="bg-background/50"
          />
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="w-full sm:w-auto"
      >
        <SafeIcon name="RotateCcw" className="w-4 h-4 mr-2" />
        Reset Filter
      </Button>
    </div>
  )
}

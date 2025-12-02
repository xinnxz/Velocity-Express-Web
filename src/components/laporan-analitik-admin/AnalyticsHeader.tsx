
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'

interface DateRange {
  from: Date
  to: Date
}

interface AnalyticsHeaderProps {
  dateRange: DateRange
  onDateRangeChange: (from: Date, to: Date) => void
  reportType: string
  onReportTypeChange: (type: string) => void
  onExport: () => void
}

export default function AnalyticsHeader({
  dateRange,
  onDateRangeChange,
  reportType,
  onReportTypeChange,
  onExport
}: AnalyticsHeaderProps) {
  const handleQuickRange = (days: number) => {
    const to = new Date()
    const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    onDateRangeChange(from, to)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card className="glass-effect border-border/50">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Date Range Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Rentang Waktu</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={dateRange.from.getTime() === new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime() ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleQuickRange(7)}
              >
                7 Hari
              </Button>
              <Button
                variant={dateRange.from.getTime() === new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getTime() ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleQuickRange(30)}
              >
                30 Hari
              </Button>
              <Button
                variant={dateRange.from.getTime() === new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).getTime() ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleQuickRange(90)}
              >
                90 Hari
              </Button>
              <Button
                variant={dateRange.from.getTime() === new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).getTime() ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleQuickRange(365)}
              >
                1 Tahun
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Report Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Jenis Laporan</label>
              <Select value={reportType} onValueChange={onReportTypeChange}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Pilih jenis laporan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Laporan</SelectItem>
                  <SelectItem value="performance">Kinerja Pengiriman</SelectItem>
                  <SelectItem value="revenue">Pendapatan</SelectItem>
                  <SelectItem value="volume">Volume Paket</SelectItem>
                  <SelectItem value="customer">Kepuasan Pelanggan</SelectItem>
                  <SelectItem value="operational">Operasional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Aksi</label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={onExport}
                >
                  <SafeIcon name="Download" className="w-4 h-4 mr-2" />
                  Ekspor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <SafeIcon name="RefreshCw" className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

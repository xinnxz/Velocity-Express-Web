
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

interface DateRangeSelectorProps {
  startDate: string
  endDate: string
  onDateRangeChange: (startDate: string, endDate: string) => void
}

export default function DateRangeSelector({
  startDate,
  endDate,
  onDateRangeChange
}: DateRangeSelectorProps) {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateRangeChange(e.target.value, endDate)
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateRangeChange(startDate, e.target.value)
  }

  const setLast7Days = () => {
    const end = new Date()
    const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000)
    onDateRangeChange(
      start.toISOString().split('T')[0],
      end.toISOString().split('T')[0]
    )
  }

  const setLast30Days = () => {
    const end = new Date()
    const start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000)
    onDateRangeChange(
      start.toISOString().split('T')[0],
      end.toISOString().split('T')[0]
    )
  }

  const setLast90Days = () => {
    const end = new Date()
    const start = new Date(end.getTime() - 90 * 24 * 60 * 60 * 1000)
    onDateRangeChange(
      start.toISOString().split('T')[0],
      end.toISOString().split('T')[0]
    )
  }

  const setThisYear = () => {
    const end = new Date()
    const start = new Date(end.getFullYear(), 0, 1)
    onDateRangeChange(
      start.toISOString().split('T')[0],
      end.toISOString().split('T')[0]
    )
  }

  // Calculate days difference
  const start = new Date(startDate)
  const end = new Date(endDate)
  const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="space-y-4">
      {/* Date Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Tanggal Mulai</Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            max={endDate}
            className="bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">Tanggal Akhir</Label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate}
            className="bg-background/50"
          />
        </div>
      </div>

      {/* Quick Select Buttons */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Pilihan Cepat</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={setLast7Days}
            className="text-xs"
          >
            7 Hari Terakhir
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={setLast30Days}
            className="text-xs"
          >
            30 Hari Terakhir
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={setLast90Days}
            className="text-xs"
          >
            90 Hari Terakhir
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={setThisYear}
            className="text-xs"
          >
            Tahun Ini
          </Button>
        </div>
      </div>

      {/* Date Range Info */}
      <div className="bg-muted/30 rounded-lg p-3 flex items-center gap-2 text-sm">
        <SafeIcon name="Calendar" className="w-4 h-4 text-primary flex-shrink-0" />
        <span className="text-muted-foreground">
          Rentang: <span className="font-medium text-foreground">{daysDiff + 1} hari</span>
        </span>
      </div>
    </div>
  )
}


import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SafeIcon from '@/components/common/SafeIcon'

interface DateRange {
  from: string
  to: string
}

interface FilterPanelProps {
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
}

export default function FilterPanel({ dateRange, onDateRangeChange }: FilterPanelProps) {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateRangeChange({ ...dateRange, from: e.target.value })
  }

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateRangeChange({ ...dateRange, to: e.target.value })
  }

  const handleReset = () => {
    onDateRangeChange({ from: '2024-01-01', to: '2024-12-31' })
  }

  return (
    <Card className="border-border/50 bg-card/50">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <Label htmlFor="from-date" className="text-sm font-medium mb-2 block">
              Dari Tanggal
            </Label>
            <Input
              id="from-date"
              type="date"
              value={dateRange.from}
              onChange={handleFromChange}
              className="w-full"
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="to-date" className="text-sm font-medium mb-2 block">
              Sampai Tanggal
            </Label>
            <Input
              id="to-date"
              type="date"
              value={dateRange.to}
              onChange={handleToChange}
              className="w-full"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant="outline"
              onClick={handleReset}
              className="flex-1 sm:flex-none"
            >
              <SafeIcon name="RotateCcw" className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button 
              className="flex-1 sm:flex-none"
            >
              <SafeIcon name="Filter" className="w-4 h-4 mr-2" />
              Terapkan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

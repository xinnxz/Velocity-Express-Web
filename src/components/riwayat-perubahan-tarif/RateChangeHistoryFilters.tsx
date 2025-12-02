
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'

interface RateChangeHistoryFiltersProps {
  onFilterChange: (
    dateRange: { from: string; to: string },
    admin: string,
    service: string
  ) => void
  onSearch: (query: string) => void
  searchQuery: string
  dateRange: { from: string; to: string }
  selectedAdmin: string
  selectedService: string
  admins: string[]
  services: string[]
}

export default function RateChangeHistoryFilters({
  onFilterChange,
  onSearch,
  searchQuery,
  dateRange,
  selectedAdmin,
  selectedService,
  admins,
  services,
}: RateChangeHistoryFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Cari Perubahan</CardTitle>
          <CardDescription>
            Cari berdasarkan nama layanan, admin, atau tipe perubahan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <SafeIcon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Ketik untuk mencari..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Filter</CardTitle>
          <CardDescription>
            Saring hasil berdasarkan kriteria tertentu
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Dari Tanggal</label>
              <Input
                type="date"
                value={dateRange.from}
                onChange={(e) =>
                  onFilterChange(
                    { ...dateRange, from: e.target.value },
                    selectedAdmin,
                    selectedService
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Hingga Tanggal</label>
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e) =>
                  onFilterChange(
                    { ...dateRange, to: e.target.value },
                    selectedAdmin,
                    selectedService
                  )
                }
              />
            </div>
          </div>

          {/* Admin Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Diubah Oleh</label>
            <Select
              value={selectedAdmin}
              onValueChange={(value) =>
                onFilterChange(dateRange, value, selectedService)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih admin..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua Admin</SelectItem>
                {admins.map((admin) => (
                  <SelectItem key={admin} value={admin}>
                    {admin}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Service Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Layanan</label>
            <Select
              value={selectedService}
              onValueChange={(value) =>
                onFilterChange(dateRange, selectedAdmin, value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih layanan..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua Layanan</SelectItem>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Info */}
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-xs text-primary">
              <SafeIcon name="Info" className="w-3 h-3 inline mr-1" />
              Gunakan filter di atas untuk mempersempit hasil pencarian
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Filters */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Filter Cepat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              const today = new Date().toISOString().split('T')[0]
              onFilterChange({ from: today, to: today }, selectedAdmin, selectedService)
            }}
          >
            <SafeIcon name="Calendar" className="w-4 h-4 mr-2" />
            Hari Ini
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              const today = new Date()
              const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
              onFilterChange(
                {
                  from: weekAgo.toISOString().split('T')[0],
                  to: today.toISOString().split('T')[0]
                },
                selectedAdmin,
                selectedService
              )
            }}
          >
            <SafeIcon name="Calendar" className="w-4 h-4 mr-2" />
            7 Hari Terakhir
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              const today = new Date()
              const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
              onFilterChange(
                {
                  from: monthAgo.toISOString().split('T')[0],
                  to: today.toISOString().split('T')[0]
                },
                selectedAdmin,
                selectedService
              )
            }}
          >
            <SafeIcon name="Calendar" className="w-4 h-4 mr-2" />
            30 Hari Terakhir
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

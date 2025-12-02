
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'
import RateChangeHistoryTable from './RateChangeHistoryTable'
import RateChangeHistoryFilters from './RateChangeHistoryFilters'
import { mockRateChangeHistory } from './mockData'

export default function RateChangeHistoryContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState(mockRateChangeHistory)
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: '',
    to: ''
  })
  const [selectedAdmin, setSelectedAdmin] = useState<string>('')
  const [selectedService, setSelectedService] = useState<string>('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterData(query, dateRange, selectedAdmin, selectedService)
  }

  const handleFilterChange = (
    newDateRange: { from: string; to: string },
    newAdmin: string,
    newService: string
  ) => {
    setDateRange(newDateRange)
    setSelectedAdmin(newAdmin)
    setSelectedService(newService)
    filterData(searchQuery, newDateRange, newAdmin, newService)
  }

  const filterData = (
    query: string,
    range: { from: string; to: string },
    admin: string,
    service: string
  ) => {
    let filtered = mockRateChangeHistory

    // Search filter
    if (query) {
      filtered = filtered.filter(item =>
        item.serviceName.toLowerCase().includes(query.toLowerCase()) ||
        item.changedBy.toLowerCase().includes(query.toLowerCase()) ||
        item.changeType.toLowerCase().includes(query.toLowerCase())
      )
    }

    // Date range filter
    if (range.from || range.to) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.changedAt)
        if (range.from && itemDate < new Date(range.from)) return false
        if (range.to && itemDate > new Date(range.to)) return false
        return true
      })
    }

    // Admin filter
    if (admin) {
      filtered = filtered.filter(item => item.changedBy === admin)
    }

    // Service filter
    if (service) {
      filtered = filtered.filter(item => item.serviceName === service)
    }

    setFilteredData(filtered)
  }

  const handleReset = () => {
    setSearchQuery('')
    setDateRange({ from: '', to: '' })
    setSelectedAdmin('')
    setSelectedService('')
    setFilteredData(mockRateChangeHistory)
  }

  const uniqueAdmins = Array.from(new Set(mockRateChangeHistory.map(item => item.changedBy)))
  const uniqueServices = Array.from(new Set(mockRateChangeHistory.map(item => item.serviceName)))

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Riwayat Perubahan Tarif</h1>
          <p className="text-muted-foreground mt-1">
            Pantau semua perubahan tarif layanan untuk audit dan pemecahan masalah
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="./pengaturan-tarif-layanan.html">
            <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Kembali ke Pengaturan Tarif
          </a>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Perubahan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRateChangeHistory.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Sepanjang waktu
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Perubahan Bulan Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockRateChangeHistory.filter(item => {
                const itemDate = new Date(item.changedAt)
                const now = new Date()
                return itemDate.getMonth() === now.getMonth() && 
                       itemDate.getFullYear() === now.getFullYear()
              }).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Bulan saat ini
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Admin Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueAdmins.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Melakukan perubahan
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Layanan Diubah
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueServices.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Jenis layanan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="glass-effect border-border/50">
        <CardHeader className="border-b border-border/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Riwayat Perubahan</CardTitle>
              <CardDescription>
                Menampilkan {filteredData.length} dari {mockRateChangeHistory.length} perubahan
              </CardDescription>
            </div>
            {(searchQuery || dateRange.from || dateRange.to || selectedAdmin || selectedService) && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleReset}
              >
                <SafeIcon name="RotateCcw" className="w-4 h-4 mr-2" />
                Reset Filter
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="table">Tabel</TabsTrigger>
              <TabsTrigger value="filters">Filter & Cari</TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="space-y-4">
              <RateChangeHistoryTable data={filteredData} />
            </TabsContent>

            <TabsContent value="filters" className="space-y-4">
              <RateChangeHistoryFilters
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                searchQuery={searchQuery}
                dateRange={dateRange}
                selectedAdmin={selectedAdmin}
                selectedService={selectedService}
                admins={uniqueAdmins}
                services={uniqueServices}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Export Section */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Ekspor Data</CardTitle>
          <CardDescription>
            Unduh riwayat perubahan tarif dalam format CSV atau PDF
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex-1">
            <SafeIcon name="Download" className="w-4 h-4 mr-2" />
            Ekspor CSV
          </Button>
          <Button variant="outline" className="flex-1">
            <SafeIcon name="Download" className="w-4 h-4 mr-2" />
            Ekspor PDF
          </Button>
          <Button variant="outline" className="flex-1">
            <SafeIcon name="Printer" className="w-4 h-4 mr-2" />
            Cetak
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

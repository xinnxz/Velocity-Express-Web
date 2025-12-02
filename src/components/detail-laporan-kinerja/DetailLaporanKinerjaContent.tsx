
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'
import PerformanceMetricsCards from './PerformanceMetricsCards'
import PerformanceChart from './PerformanceChart'
import PerformanceTable from './PerformanceTable'
import FilterPanel from './FilterPanel'
import { mockPerformanceData } from './mockData'

export default function DetailLaporanKinerjaContent() {
  const [dateRange, setDateRange] = useState({ from: '2024-01-01', to: '2024-12-31' })
  const [selectedMetric, setSelectedMetric] = useState('delivery_performance')
  const [activeTab, setActiveTab] = useState('overview')

  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    console.log(`Exporting report as ${format}`)
    // Export logic would go here
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <a href="./laporan-analitik-admin.html" className="text-primary hover:text-primary/80 transition-colors">
              <SafeIcon name="ChevronLeft" className="w-5 h-5" />
            </a>
            <h1 className="text-3xl font-bold">Detail Laporan Kinerja</h1>
          </div>
          <p className="text-muted-foreground">
            Analisis mendalam performa pengiriman dan metrik operasional
          </p>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleExport('pdf')}
            className="flex-1 sm:flex-none"
          >
            <SafeIcon name="FileText" className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleExport('csv')}
            className="flex-1 sm:flex-none"
          >
            <SafeIcon name="Download" className="w-4 h-4 mr-2" />
            CSV
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleExport('excel')}
            className="flex-1 sm:flex-none"
          >
            <SafeIcon name="Sheet" className="w-4 h-4 mr-2" />
            Excel
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel 
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {/* Metrics Cards */}
      <PerformanceMetricsCards metrics={mockPerformanceData.metrics} />

      {/* Tabs for different views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="trends">Tren</TabsTrigger>
          <TabsTrigger value="details">Detail Data</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceChart 
              title="Performa Pengiriman"
              description="Tingkat keberhasilan pengiriman per minggu"
              data={mockPerformanceData.deliveryPerformance}
              type="line"
            />
            <PerformanceChart 
              title="Distribusi Status Pengiriman"
              description="Persentase status pengiriman saat ini"
              data={mockPerformanceData.deliveryStatus}
              type="pie"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceChart 
              title="Pendapatan Bulanan"
              description="Total pendapatan per bulan"
              data={mockPerformanceData.monthlyRevenue}
              type="bar"
            />
            <PerformanceChart 
              title="Volume Pengiriman"
              description="Jumlah paket yang diproses"
              data={mockPerformanceData.deliveryVolume}
              type="bar"
            />
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <PerformanceChart 
              title="Tren Performa 12 Bulan"
              description="Analisis tren performa pengiriman sepanjang tahun"
              data={mockPerformanceData.yearlyTrend}
              type="line"
            />
            <PerformanceChart 
              title="Tren Kepuasan Pelanggan"
              description="Rating kepuasan pelanggan per bulan"
              data={mockPerformanceData.customerSatisfaction}
              type="line"
            />
          </div>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <PerformanceTable data={mockPerformanceData.detailTable} />
        </TabsContent>
      </Tabs>

      {/* Export Section */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SafeIcon name="Download" className="w-5 h-5" />
            Ekspor Laporan
          </CardTitle>
          <CardDescription>
            Unduh laporan lengkap dalam berbagai format untuk analisis lebih lanjut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => handleExport('pdf')}
            >
              <SafeIcon name="FileText" className="w-6 h-6" />
              <span className="text-sm font-medium">PDF Report</span>
              <span className="text-xs text-muted-foreground">Format profesional</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => handleExport('csv')}
            >
              <SafeIcon name="Sheet" className="w-6 h-6" />
              <span className="text-sm font-medium">CSV Export</span>
              <span className="text-xs text-muted-foreground">Untuk spreadsheet</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => handleExport('excel')}
            >
              <SafeIcon name="BarChart3" className="w-6 h-6" />
              <span className="text-sm font-medium">Excel Report</span>
              <span className="text-xs text-muted-foreground">Dengan grafik</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

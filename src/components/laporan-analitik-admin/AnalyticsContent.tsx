
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'
import AnalyticsHeader from './AnalyticsHeader'
import MetricsGrid from './MetricsGrid'
import PerformanceChart from './PerformanceChart'
import RevenueChart from './RevenueChart'
import VolumeChart from './VolumeChart'
import ReportsList from './ReportsList'

export default function AnalyticsContent() {
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date()
  })
  const [reportType, setReportType] = useState('all')

  const handleDateRangeChange = (from: Date, to: Date) => {
    setDateRange({ from, to })
  }

  const handleExport = () => {
    // Navigate to export page
    window.location.href = './ekspor-data-laporan.html'
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="container-custom py-8 space-y-8">
          {/* Header Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-text">Laporan & Analitik</h1>
            <p className="text-muted-foreground">
              Pantau kinerja operasional kurir, pendapatan, dan metrik penting lainnya
            </p>
          </div>

          {/* Analytics Header with Controls */}
          <AnalyticsHeader 
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            reportType={reportType}
            onReportTypeChange={setReportType}
            onExport={handleExport}
          />

          {/* Key Metrics Grid */}
          <MetricsGrid dateRange={dateRange} />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceChart dateRange={dateRange} />
            <RevenueChart dateRange={dateRange} />
          </div>

          {/* Volume Chart - Full Width */}
          <VolumeChart dateRange={dateRange} />

          {/* Reports List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Laporan Tersedia</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Pilih laporan untuk melihat detail atau ekspor data
                </p>
              </div>
              <Button 
                onClick={handleExport}
                className="gap-2"
              >
                <SafeIcon name="Download" className="w-4 h-4" />
                Ekspor Data
              </Button>
            </div>
            <ReportsList dateRange={dateRange} />
          </div>
        </div>
      </div>
    </div>
  )
}

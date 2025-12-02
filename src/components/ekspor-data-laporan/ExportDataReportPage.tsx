
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'
import ExportFormatSelector from './ExportFormatSelector'
import ColumnSelector from './ColumnSelector'
import DateRangeSelector from './DateRangeSelector'
import ExportPreview from './ExportPreview'

export type ExportFormat = 'csv' | 'pdf' | 'excel'

interface ExportConfig {
  format: ExportFormat
  columns: string[]
  startDate: string
  endDate: string
}

const DEFAULT_COLUMNS = [
  'tanggal',
  'nomor_resi',
  'pengirim',
  'penerima',
  'status',
  'biaya',
  'jenis_layanan',
  'lokasi_terkini',
  'estimasi_tiba'
]

export default function ExportDataReportPage() {
  const [config, setConfig] = useState<ExportConfig>({
    format: 'csv',
    columns: DEFAULT_COLUMNS,
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })

  const [isExporting, setIsExporting] = useState(false)

  const handleFormatChange = (format: ExportFormat) => {
    setConfig(prev => ({ ...prev, format }))
  }

  const handleColumnsChange = (columns: string[]) => {
    setConfig(prev => ({ ...prev, columns }))
  }

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setConfig(prev => ({ ...prev, startDate, endDate }))
  }

  const handleExport = async () => {
    setIsExporting(true)
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create mock data based on config
    const mockData = generateMockExportData(config)
    
    // Trigger download
    downloadFile(mockData, config.format)
    
    setIsExporting(false)
  }

  const handleCancel = () => {
    window.history.back()
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <SafeIcon name="Download" className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">Ekspor Data Laporan</h1>
        </div>
        <p className="text-muted-foreground">
          Konfigurasi dan unduh laporan analitik dalam format yang Anda inginkan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Format Selection */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Format Ekspor</CardTitle>
              <CardDescription>
                Pilih format file untuk mengunduh laporan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExportFormatSelector 
                selectedFormat={config.format}
                onFormatChange={handleFormatChange}
              />
            </CardContent>
          </Card>

          {/* Date Range Selection */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Rentang Tanggal</CardTitle>
              <CardDescription>
                Pilih periode data yang ingin diekspor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DateRangeSelector
                startDate={config.startDate}
                endDate={config.endDate}
                onDateRangeChange={handleDateRangeChange}
              />
            </CardContent>
          </Card>

          {/* Column Selection */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Kolom yang Disertakan</CardTitle>
              <CardDescription>
                Pilih kolom mana yang ingin disertakan dalam laporan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ColumnSelector
                availableColumns={DEFAULT_COLUMNS}
                selectedColumns={config.columns}
                onColumnsChange={handleColumnsChange}
              />
            </CardContent>
          </Card>
        </div>

        {/* Preview & Actions Panel */}
        <div className="space-y-6">
          {/* Preview Card */}
          <ExportPreview config={config} />

          {/* Action Buttons */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm sticky top-24">
            <CardContent className="pt-6 space-y-3">
              <Button 
                onClick={handleExport}
                disabled={isExporting || config.columns.length === 0}
                className="w-full neon-glow"
                size="lg"
              >
                {isExporting ? (
                  <>
                    <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                    Mengekspor...
                  </>
                ) : (
                  <>
                    <SafeIcon name="Download" className="w-4 h-4 mr-2" />
                    Unduh Laporan
                  </>
                )}
              </Button>
              
              <Button 
                onClick={handleCancel}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <SafeIcon name="X" className="w-4 h-4 mr-2" />
                Batal
              </Button>

              <Separator className="my-4" />

              {/* Info Box */}
              <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <SafeIcon name="Info" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Tips Ekspor</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Pilih hanya kolom yang Anda butuhkan untuk mengurangi ukuran file. Format PDF cocok untuk presentasi, CSV untuk analisis lebih lanjut.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function generateMockExportData(config: ExportConfig): string {
  const startDate = new Date(config.startDate)
  const endDate = new Date(config.endDate)
  
  // Generate mock rows
  const rows = []
  const currentDate = new Date(startDate)
  
  while (currentDate <= endDate) {
    rows.push({
      tanggal: currentDate.toISOString().split('T')[0],
      nomor_resi: `VEL${Math.random().toString(36).substring(7).toUpperCase()}`,
      pengirim: `Pengirim ${Math.floor(Math.random() * 1000)}`,
      penerima: `Penerima ${Math.floor(Math.random() * 1000)}`,
      status: ['Terkirim', 'Dalam Perjalanan', 'Menunggu'][Math.floor(Math.random() * 3)],
      biaya: `Rp ${(Math.random() * 500000 + 50000).toFixed(0)}`,
      jenis_layanan: ['Regular', 'Express', 'Drone'][Math.floor(Math.random() * 3)],
      lokasi_terkini: ['Jakarta', 'Surabaya', 'Bandung', 'Medan'][Math.floor(Math.random() * 4)],
      estimasi_tiba: new Date(currentDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })
    
    currentDate.setDate(currentDate.getDate() + 1)
  }

  if (config.format === 'csv') {
    // CSV format
    const headers = config.columns
    const csvContent = [
      headers.join(','),
      ...rows.map(row => 
        headers.map(col => {
          const value = (row as any)[col] || ''
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value
        }).join(',')
      )
    ].join('\n')
    
    return csvContent
  } else if (config.format === 'excel') {
    // Simple Excel-like format (TSV)
    const headers = config.columns
    const excelContent = [
      headers.join('\t'),
      ...rows.map(row => 
        headers.map(col => (row as any)[col] || '').join('\t')
      )
    ].join('\n')
    
    return excelContent
  } else {
    // PDF-like text format
    const headers = config.columns
    let pdfContent = 'LAPORAN ANALITIK VELOCITY EXPRESS\n'
    pdfContent += `Periode: ${config.startDate} hingga ${config.endDate}\n`
    pdfContent += '='.repeat(80) + '\n\n'
    
    pdfContent += headers.join(' | ') + '\n'
    pdfContent += '-'.repeat(80) + '\n'
    
    rows.forEach(row => {
      pdfContent += headers.map(col => (row as any)[col] || '').join(' | ') + '\n'
    })
    
    return pdfContent
  }
}

function downloadFile(content: string, format: ExportFormat) {
  const element = document.createElement('a')
  const mimeType = format === 'csv' 
    ? 'text/csv' 
    : format === 'excel' 
    ? 'application/vnd.ms-excel' 
    : 'application/pdf'
  
  const extension = format === 'csv' ? 'csv' : format === 'excel' ? 'xlsx' : 'pdf'
  
  element.setAttribute(
    'href',
    `data:${mimeType};charset=utf-8,${encodeURIComponent(content)}`
  )
  element.setAttribute(
    'download',
    `laporan-analitik-${new Date().toISOString().split('T')[0]}.${extension}`
  )
  element.style.display = 'none'
  
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

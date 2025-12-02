
import { Card, CardContent } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import type { ExportConfig } from './ExportDataReportPage'

interface ExportPreviewProps {
  config: ExportConfig
}

export default function ExportPreview({ config }: ExportPreviewProps) {
  // Calculate estimated file size
  const estimatedRows = 100 // Mock estimate
  const bytesPerRow = config.columns.length * 50 // Rough estimate
  const estimatedSize = (estimatedRows * bytesPerRow) / 1024 // KB

  const formatInfo = {
    csv: {
      icon: 'FileText',
      description: 'Format teks universal',
      extension: '.csv'
    },
    excel: {
      icon: 'Sheet',
      description: 'Spreadsheet Excel',
      extension: '.xlsx'
    },
    pdf: {
      icon: 'FileText',
      description: 'Dokumen PDF',
      extension: '.pdf'
    }
  }

  const info = formatInfo[config.format]
  const startDate = new Date(config.startDate)
  const endDate = new Date(config.endDate)
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm">
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Ringkasan Ekspor</h3>
          
          {/* Format Info */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
            <SafeIcon name={info.icon} className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Format</p>
              <p className="text-xs text-muted-foreground">{info.description}</p>
            </div>
            <span className="text-xs font-mono text-primary">{info.extension}</span>
          </div>

          {/* Date Range Info */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
            <SafeIcon name="Calendar" className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Periode</p>
              <p className="text-xs text-muted-foreground">
                {config.startDate} hingga {config.endDate}
              </p>
            </div>
            <span className="text-xs font-medium text-primary">{daysDiff + 1} hari</span>
          </div>

          {/* Columns Info */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
            <SafeIcon name="Columns3" className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Kolom</p>
              <p className="text-xs text-muted-foreground">
                {config.columns.length} kolom dipilih
              </p>
            </div>
            <span className="text-xs font-medium text-primary">{config.columns.length}</span>
          </div>

          {/* File Size Estimate */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
            <SafeIcon name="HardDrive" className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Ukuran Estimasi</p>
              <p className="text-xs text-muted-foreground">
                Perkiraan ukuran file
              </p>
            </div>
            <span className="text-xs font-medium text-primary">
              {estimatedSize.toFixed(1)} KB
            </span>
          </div>
        </div>

        {/* Filename Preview */}
        <div className="pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-2">Nama File</p>
          <div className="bg-background/50 rounded-lg p-2 border border-border/50 font-mono text-xs text-primary break-all">
            laporan-analitik-{new Date().toISOString().split('T')[0]}{info.extension}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import SafeIcon from '@/components/common/SafeIcon'
import type { ExportFormat } from './ExportDataReportPage'

interface ExportFormatSelectorProps {
  selectedFormat: ExportFormat
  onFormatChange: (format: ExportFormat) => void
}

const formats: Array<{
  value: ExportFormat
  label: string
  description: string
  icon: string
}> = [
  {
    value: 'csv',
    label: 'CSV (Comma-Separated Values)',
    description: 'Format teks universal, cocok untuk analisis di Excel atau tools lainnya',
    icon: 'FileText'
  },
  {
    value: 'excel',
    label: 'Excel (.xlsx)',
    description: 'Format spreadsheet Microsoft Excel dengan formatting dan formula',
    icon: 'Sheet'
  },
  {
    value: 'pdf',
    label: 'PDF (Portable Document Format)',
    description: 'Format dokumen profesional, cocok untuk presentasi dan arsip',
    icon: 'FileText'
  }
]

export default function ExportFormatSelector({
  selectedFormat,
  onFormatChange
}: ExportFormatSelectorProps) {
  return (
    <RadioGroup value={selectedFormat} onValueChange={(value) => onFormatChange(value as ExportFormat)}>
      <div className="space-y-3">
        {formats.map((format) => (
          <div key={format.value} className="flex items-start space-x-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 cursor-pointer transition-colors">
            <RadioGroupItem value={format.value} id={format.value} className="mt-1" />
            <Label htmlFor={format.value} className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <SafeIcon name={format.icon} className="w-4 h-4 text-primary" />
                <span className="font-medium">{format.label}</span>
              </div>
              <p className="text-sm text-muted-foreground">{format.description}</p>
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  )
}

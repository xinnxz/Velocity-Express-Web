
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

interface ColumnSelectorProps {
  availableColumns: string[]
  selectedColumns: string[]
  onColumnsChange: (columns: string[]) => void
}

const columnLabels: Record<string, string> = {
  tanggal: 'Tanggal',
  nomor_resi: 'Nomor Resi',
  pengirim: 'Pengirim',
  penerima: 'Penerima',
  status: 'Status',
  biaya: 'Biaya',
  jenis_layanan: 'Jenis Layanan',
  lokasi_terkini: 'Lokasi Terkini',
  estimasi_tiba: 'Estimasi Tiba'
}

export default function ColumnSelector({
  availableColumns,
  selectedColumns,
  onColumnsChange
}: ColumnSelectorProps) {
  const handleSelectAll = () => {
    onColumnsChange(availableColumns)
  }

  const handleDeselectAll = () => {
    onColumnsChange([])
  }

  const handleColumnToggle = (column: string) => {
    if (selectedColumns.includes(column)) {
      onColumnsChange(selectedColumns.filter(c => c !== column))
    } else {
      onColumnsChange([...selectedColumns, column])
    }
  }

  return (
    <div className="space-y-4">
      {/* Select All / Deselect All */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSelectAll}
          className="text-xs"
        >
          <SafeIcon name="Check" className="w-3 h-3 mr-1" />
          Pilih Semua
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDeselectAll}
          className="text-xs"
        >
          <SafeIcon name="X" className="w-3 h-3 mr-1" />
          Hapus Semua
        </Button>
      </div>

      {/* Column Checkboxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {availableColumns.map((column) => (
          <div key={column} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/30 transition-colors">
            <Checkbox
              id={column}
              checked={selectedColumns.includes(column)}
              onCheckedChange={() => handleColumnToggle(column)}
            />
            <Label
              htmlFor={column}
              className="flex-1 cursor-pointer text-sm font-medium"
            >
              {columnLabels[column] || column}
            </Label>
          </div>
        ))}
      </div>

      {/* Selected Count */}
      <div className="bg-muted/30 rounded-lg p-3 flex items-center gap-2 text-sm">
        <SafeIcon name="Columns3" className="w-4 h-4 text-primary flex-shrink-0" />
        <span className="text-muted-foreground">
          Kolom dipilih: <span className="font-medium text-foreground">{selectedColumns.length} dari {availableColumns.length}</span>
        </span>
      </div>
    </div>
  )
}

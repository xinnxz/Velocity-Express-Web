
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SafeIcon from '@/components/common/SafeIcon'

interface DimensionInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  error?: string
  unit?: string
}

export default function DimensionInput({
  label,
  value,
  onChange,
  error,
  unit = 'cm'
}: DimensionInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()} className="text-sm">
        {label}
      </Label>
      <div className="flex gap-2">
        <Input
          id={label.toLowerCase()}
          type="number"
          min="0"
          step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="bg-background/50"
          placeholder="0"
        />
        <div className="flex items-center px-3 bg-muted/30 rounded-md border border-border/50 text-sm text-muted-foreground whitespace-nowrap">
          {unit}
        </div>
      </div>
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <SafeIcon name="AlertCircle" className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  )
}

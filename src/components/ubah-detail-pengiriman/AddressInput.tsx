
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

interface AddressInputProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  disabled?: boolean
  error?: string
  touched?: boolean
  placeholder?: string
}

export default function AddressInput({
  value,
  onChange,
  onBlur,
  disabled = false,
  error,
  touched = false,
  placeholder = 'Cari atau masukkan alamat...'
}: AddressInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Mock address suggestions
  const suggestions = [
    'Jl. Sudirman No. 123, Jakarta Pusat',
    'Jl. Gatot Subroto No. 456, Jakarta Selatan',
    'Jl. Thamrin No. 789, Jakarta Pusat',
    'Jl. Rasuna Said No. 321, Jakarta Selatan',
  ].filter(addr => 
    addr.toLowerCase().includes(value.toLowerCase()) && value.length > 0
  )

  return (
    <div className="relative">
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setShowSuggestions(true)
          }}
          onBlur={() => {
            onBlur?.()
            setTimeout(() => setShowSuggestions(false), 200)
          }}
          onFocus={() => setShowSuggestions(true)}
          disabled={disabled}
          placeholder={placeholder}
          className={error && touched ? 'border-destructive' : ''}
        />
        {value && !disabled && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => onChange('')}
          >
            <SafeIcon name="X" className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className="w-full text-left px-3 py-2 hover:bg-muted transition-colors text-sm border-b border-border/50 last:border-b-0"
              onClick={() => {
                onChange(suggestion)
                setShowSuggestions(false)
              }}
            >
              <div className="flex items-center gap-2">
                <SafeIcon name="MapPin" className="w-4 h-4 text-muted-foreground" />
                <span>{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {error && touched && (
        <p className="text-xs text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}

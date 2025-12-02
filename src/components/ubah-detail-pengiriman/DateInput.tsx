
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import SafeIcon from '@/components/common/SafeIcon'

interface DateInputProps {
  id?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  disabled?: boolean
  error?: string
  touched?: boolean
  minDate?: string
}

export default function DateInput({
  id,
  value,
  onChange,
  onBlur,
  disabled = false,
  error,
  touched = false,
  minDate
}: DateInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handleDateSelect = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dateString = selected.toISOString().split('T')[0]
    onChange(dateString)
    setIsOpen(false)
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const monthName = currentMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={`w-full justify-start text-left font-normal ${
              error && touched ? 'border-destructive' : ''
            }`}
          >
            <SafeIcon name="Calendar" className="w-4 h-4 mr-2" />
            {value ? formatDate(value) : 'Pilih tanggal...'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 space-y-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              >
                <SafeIcon name="ChevronLeft" className="w-4 h-4" />
              </Button>
              <h3 className="text-sm font-semibold">{monthName}</h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              >
                <SafeIcon name="ChevronRight" className="w-4 h-4" />
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day headers */}
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-muted-foreground">
                  {day}
                </div>
              ))}

              {/* Empty cells */}
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {/* Days */}
              {days.map(day => {
                const isSelected = value === `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                const isDisabled = isDateDisabled(day)

                return (
                  <Button
                    key={day}
                    type="button"
                    variant={isSelected ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={isDisabled}
                    onClick={() => handleDateSelect(day)}
                  >
                    {day}
                  </Button>
                )
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {error && touched && (
        <p className="text-xs text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}

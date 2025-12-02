
import { Input } from '@/components/ui/input'
import SafeIcon from '@/components/common/SafeIcon'
import { cn } from '@/lib/utils'

interface CardNumberInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
  cardType: 'visa' | 'mastercard' | 'amex' | 'unknown'
}

export default function CardNumberInput({
  value,
  onChange,
  error,
  cardType
}: CardNumberInputProps) {
  // Format card number with spaces
  const formatCardNumber = (input: string): string => {
    const cleaned = input.replace(/\s/g, '')
    const chunks = cleaned.match(/.{1,4}/g) || []
    return chunks.join(' ')
  }

  // Get card icon
  const getCardIcon = () => {
    switch (cardType) {
      case 'visa':
        return 'CreditCard'
      case 'mastercard':
        return 'CreditCard'
      case 'amex':
        return 'CreditCard'
      default:
        return 'CreditCard'
    }
  }

  // Get card color
  const getCardColor = () => {
    switch (cardType) {
      case 'visa':
        return 'text-blue-400'
      case 'mastercard':
        return 'text-red-400'
      case 'amex':
        return 'text-green-400'
      default:
        return 'text-muted-foreground'
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const cleaned = input.replace(/\s/g, '').replace(/\D/g, '')
    const formatted = formatCardNumber(cleaned)
    onChange(formatted)
  }

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="1234 5678 9012 3456"
        value={value}
        onChange={handleChange}
        maxLength={19}
        className={cn(
          'bg-background/50 border-border/50 pl-10',
          error && 'border-destructive'
        )}
      />
      <div className={cn('absolute left-3 top-1/2 -translate-y-1/2', getCardColor())}>
        <SafeIcon name={getCardIcon()} className="w-5 h-5" />
      </div>
    </div>
  )
}

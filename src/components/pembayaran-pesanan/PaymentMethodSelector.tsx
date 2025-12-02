
import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import SafeIcon from '@/components/common/SafeIcon'
import { cn } from '@/lib/utils'

interface PaymentMethod {
  id: string
  name: string
  icon: string
  description: string
  available: boolean
}

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[]
  selectedMethod: string | null
  onSelectMethod: (methodId: string) => void
}

export default function PaymentMethodSelector({
  methods,
  selectedMethod,
  onSelectMethod
}: PaymentMethodSelectorProps) {
  return (
    <RadioGroup value={selectedMethod || ''} onValueChange={onSelectMethod}>
      <div className="space-y-3">
        {methods.map((method) => (
          <div key={method.id}>
            <Label
              htmlFor={method.id}
              className={cn(
                'flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all',
                selectedMethod === method.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-background/30 hover:border-primary/50',
                !method.available && 'opacity-50 cursor-not-allowed'
              )}
            >
              <RadioGroupItem 
                value={method.id} 
                id={method.id}
                disabled={!method.available}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <SafeIcon name={method.icon} className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{method.name}</span>
                  {!method.available && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                      Segera Hadir
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
              {selectedMethod === method.id && (
                <SafeIcon name="CheckCircle2" className="w-5 h-5 text-primary flex-shrink-0" />
              )}
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  )
}


import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'
import CardNumberInput from '@/components/detail-pembayaran-online/CardNumberInput'
import OrderSummary from '@/components/detail-pembayaran-online/OrderSummary'
import PaymentSecurityInfo from '@/components/detail-pembayaran-online/PaymentSecurityInfo'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormData {
  cardNumber: string
  cardholderName: string
  expiryMonth: string
  expiryYear: string
  cvv: string
}

interface FormErrors {
  cardNumber?: string
  cardholderName?: string
  expiryMonth?: string
  expiryYear?: string
  cvv?: string
}

// Mock order data
const mockOrderData = {
  orderId: 'VEL-2024-001234',
  items: [
    { name: 'Pengiriman Paket Regular', quantity: 1, price: 50000 }
  ],
  subtotal: 50000,
  tax: 5000,
  shippingFee: 0,
  discount: 0,
  total: 55000,
  currency: 'IDR'
}

export default function PaymentFormCard() {
  const [formData, setFormData] = useState<FormData>({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'amex' | 'unknown'>('unknown')

  // Validate card number
  const validateCardNumber = (number: string): boolean => {
    const cleaned = number.replace(/\s/g, '')
    if (!/^\d{13,19}$/.test(cleaned)) return false
    
    // Luhn algorithm
    let sum = 0
    let isEven = false
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i], 10)
      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      sum += digit
      isEven = !isEven
    }
    return sum % 10 === 0
  }

  // Detect card type
  const detectCardType = (number: string): 'visa' | 'mastercard' | 'amex' | 'unknown' => {
    const cleaned = number.replace(/\s/g, '')
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cleaned)) return 'visa'
    if (/^5[1-5][0-9]{14}$/.test(cleaned)) return 'mastercard'
    if (/^3[47][0-9]{13}$/.test(cleaned)) return 'amex'
    return 'unknown'
  }

  // Validate expiry date
  const validateExpiry = (month: string, year: string): boolean => {
    if (!month || !year) return false
    const m = parseInt(month, 10)
    const y = parseInt(year, 10)
    if (m < 1 || m > 12) return false
    
    const now = new Date()
    const currentYear = now.getFullYear() % 100
    const currentMonth = now.getMonth() + 1
    
    if (y < currentYear) return false
    if (y === currentYear && m < currentMonth) return false
    return true
  }

  // Validate CVV
  const validateCVV = (cvv: string, type: string): boolean => {
    if (type === 'amex') {
      return /^\d{4}$/.test(cvv)
    }
    return /^\d{3}$/.test(cvv)
  }

  // Handle card number change
  const handleCardNumberChange = (value: string) => {
    setFormData(prev => ({ ...prev, cardNumber: value }))
    const type = detectCardType(value)
    setCardType(type)
    
    if (value && !validateCardNumber(value)) {
      setErrors(prev => ({ ...prev, cardNumber: 'Nomor kartu tidak valid' }))
    } else {
      setErrors(prev => ({ ...prev, cardNumber: undefined }))
    }
  }

  // Handle cardholder name change
  const handleCardholderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, cardholderName: value }))
    
    if (value && !/^[a-zA-Z\s]+$/.test(value)) {
      setErrors(prev => ({ ...prev, cardholderName: 'Nama hanya boleh mengandung huruf' }))
    } else {
      setErrors(prev => ({ ...prev, cardholderName: undefined }))
    }
  }

  // Handle expiry month change
  const handleExpiryMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 2)
    setFormData(prev => ({ ...prev, expiryMonth: value }))
    
    if (value && (parseInt(value, 10) < 1 || parseInt(value, 10) > 12)) {
      setErrors(prev => ({ ...prev, expiryMonth: 'Bulan harus 01-12' }))
    } else {
      setErrors(prev => ({ ...prev, expiryMonth: undefined }))
    }
  }

  // Handle expiry year change
  const handleExpiryYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 2)
    setFormData(prev => ({ ...prev, expiryYear: value }))
    
    if (value) {
      const year = parseInt(value, 10)
      const currentYear = new Date().getFullYear() % 100
      if (year < currentYear) {
        setErrors(prev => ({ ...prev, expiryYear: 'Tahun sudah kadaluwarsa' }))
      } else {
        setErrors(prev => ({ ...prev, expiryYear: undefined }))
      }
    }
  }

  // Handle CVV change
  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    const maxLength = cardType === 'amex' ? 4 : 3
    const sliced = value.slice(0, maxLength)
    setFormData(prev => ({ ...prev, cvv: sliced }))
    
    if (sliced && !validateCVV(sliced, cardType)) {
      setErrors(prev => ({ ...prev, cvv: `CVV harus ${maxLength} digit` }))
    } else {
      setErrors(prev => ({ ...prev, cvv: undefined }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: FormErrors = {}
    
    if (!formData.cardNumber || !validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Nomor kartu tidak valid'
    }
    if (!formData.cardholderName) {
      newErrors.cardholderName = 'Nama pemegang kartu diperlukan'
    }
    if (!formData.expiryMonth || !formData.expiryYear || !validateExpiry(formData.expiryMonth, formData.expiryYear)) {
      newErrors.expiryMonth = 'Tanggal kadaluwarsa tidak valid'
    }
    if (!formData.cvv || !validateCVV(formData.cvv, cardType)) {
      newErrors.cvv = `CVV harus ${cardType === 'amex' ? 4 : 3} digit`
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Process payment
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      // Redirect to success page
      window.location.href = './konfirmasi-pembayaran-sukses.html'
    }, 2000)
  }

  // Handle back button
  const handleBack = () => {
    window.location.href = './pilih-metode-pembayaran.html'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Payment Form */}
      <div className="lg:col-span-2">
        <Card className="glass-effect border-border/50">
          <CardHeader>
            <CardTitle>Detail Kartu Kredit/Debit</CardTitle>
            <CardDescription>
              Informasi kartu Anda dienkripsi dan aman
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Card Number */}
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Nomor Kartu</Label>
                <CardNumberInput
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  error={errors.cardNumber}
                  cardType={cardType}
                />
                {errors.cardNumber && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <SafeIcon name="AlertCircle" className="w-4 h-4" />
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              {/* Cardholder Name */}
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Nama Pemegang Kartu</Label>
                <Input
                  id="cardholderName"
                  placeholder="Nama seperti di kartu"
                  value={formData.cardholderName}
                  onChange={handleCardholderNameChange}
                  className={cn(
                    'bg-background/50 border-border/50',
                    errors.cardholderName && 'border-destructive'
                  )}
                />
                {errors.cardholderName && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <SafeIcon name="AlertCircle" className="w-4 h-4" />
                    {errors.cardholderName}
                  </p>
                )}
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryMonth">Bulan Kadaluwarsa</Label>
                  <div className="flex gap-2">
                    <Input
                      id="expiryMonth"
                      placeholder="MM"
                      maxLength={2}
                      value={formData.expiryMonth}
                      onChange={handleExpiryMonthChange}
                      className={cn(
                        'bg-background/50 border-border/50 flex-1',
                        errors.expiryMonth && 'border-destructive'
                      )}
                    />
                    <span className="flex items-center text-muted-foreground">/</span>
                    <Input
                      placeholder="YY"
                      maxLength={2}
                      value={formData.expiryYear}
                      onChange={handleExpiryYearChange}
                      className={cn(
                        'bg-background/50 border-border/50 flex-1',
                        errors.expiryMonth && 'border-destructive'
                      )}
                    />
                  </div>
                  {errors.expiryMonth && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <SafeIcon name="AlertCircle" className="w-4 h-4" />
                      {errors.expiryMonth}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV/CVC</Label>
                  <Input
                    id="cvv"
                    placeholder={cardType === 'amex' ? '1234' : '123'}
                    maxLength={cardType === 'amex' ? 4 : 3}
                    value={formData.cvv}
                    onChange={handleCVVChange}
                    type="password"
                    className={cn(
                      'bg-background/50 border-border/50',
                      errors.cvv && 'border-destructive'
                    )}
                  />
                  {errors.cvv && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <SafeIcon name="AlertCircle" className="w-4 h-4" />
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Security Info */}
              <PaymentSecurityInfo />

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                  Kembali
                </Button>
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 neon-glow"
                >
                  {isProcessing ? (
                    <>
                      <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <SafeIcon name="Lock" className="w-4 h-4 mr-2" />
                      Bayar Sekarang
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1">
        <OrderSummary orderData={mockOrderData} />
      </div>
    </div>
  )
}

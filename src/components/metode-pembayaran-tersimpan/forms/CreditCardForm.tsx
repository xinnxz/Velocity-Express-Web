
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SafeIcon from '@/components/common/SafeIcon'

interface CreditCardFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

const CARD_ISSUERS = [
  { value: 'Visa', label: 'Visa' },
  { value: 'Mastercard', label: 'Mastercard' },
  { value: 'AmEx', label: 'American Express' },
  { value: 'JCB', label: 'JCB' },
]

export default function CreditCardForm({ onSubmit, onCancel }: CreditCardFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    issuer: 'Visa',
    isDefault: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Nama metode harus diisi'
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Nomor kartu harus diisi'
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Nomor kartu harus 16 digit'
    }
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Tanggal berlaku harus diisi'
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV harus diisi'
    if (formData.cvv.length !== 3) newErrors.cvv = 'CVV harus 3 digit'
    if (!formData.cardholderName.trim()) newErrors.cardholderName = 'Nama pemegang kartu harus diisi'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        ...formData,
        cardNumber: `${formData.cardNumber.slice(0, 4)} **** **** ${formData.cardNumber.slice(-4)}`
      })
    }
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim()
    return formatted.slice(0, 19)
  }

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
    }
    return cleaned
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Nama Metode Pembayaran</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Contoh: Kartu Utama"
          className="bg-background/50"
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      {/* Card Issuer */}
      <div className="space-y-2">
        <Label htmlFor="issuer">Penerbit Kartu</Label>
        <Select value={formData.issuer} onValueChange={(value) => setFormData({ ...formData, issuer: value })}>
          <SelectTrigger className="bg-background/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CARD_ISSUERS.map((issuer) => (
              <SelectItem key={issuer.value} value={issuer.value}>
                {issuer.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Card Number */}
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Nomor Kartu</Label>
        <Input
          id="cardNumber"
          value={formData.cardNumber}
          onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
          placeholder="1234 5678 9012 3456"
          className="bg-background/50 font-mono"
          maxLength={19}
        />
        {errors.cardNumber && <p className="text-xs text-destructive">{errors.cardNumber}</p>}
      </div>

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Berlaku Hingga</Label>
          <Input
            id="expiryDate"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) })}
            placeholder="MM/YY"
            className="bg-background/50 font-mono"
            maxLength={5}
          />
          {errors.expiryDate && <p className="text-xs text-destructive">{errors.expiryDate}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            type="password"
            value={formData.cvv}
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
            placeholder="123"
            className="bg-background/50 font-mono"
            maxLength={3}
          />
          {errors.cvv && <p className="text-xs text-destructive">{errors.cvv}</p>}
        </div>
      </div>

      {/* Cardholder Name */}
      <div className="space-y-2">
        <Label htmlFor="cardholderName">Nama Pemegang Kartu</Label>
        <Input
          id="cardholderName"
          value={formData.cardholderName}
          onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value.toUpperCase() })}
          placeholder="JOHN DOE"
          className="bg-background/50 uppercase"
        />
        {errors.cardholderName && <p className="text-xs text-destructive">{errors.cardholderName}</p>}
      </div>

      {/* Default Checkbox */}
      <div className="flex items-center space-x-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <Checkbox
          id="isDefault"
          checked={formData.isDefault}
          onCheckedChange={(checked) => setFormData({ ...formData, isDefault: checked as boolean })}
        />
        <Label htmlFor="isDefault" className="cursor-pointer flex-1">
          <span className="font-medium">Jadikan Metode Default</span>
        </Label>
      </div>

      {/* Security Notice */}
      <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
        <div className="flex gap-2">
          <SafeIcon name="Shield" className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <p>Data kartu Anda dienkripsi dan tidak akan disimpan di server kami</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Batal
        </Button>
        <Button type="submit" className="flex-1 neon-glow">
          <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
          Tambah Kartu
        </Button>
      </div>
    </form>
  )
}

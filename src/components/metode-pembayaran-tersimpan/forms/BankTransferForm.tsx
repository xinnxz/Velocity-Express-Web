
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

interface BankTransferFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

const BANKS = [
  { value: 'BCA', label: 'Bank Central Asia (BCA)' },
  { value: 'Mandiri', label: 'Bank Mandiri' },
  { value: 'BNI', label: 'Bank Negara Indonesia (BNI)' },
  { value: 'BRI', label: 'Bank Rakyat Indonesia (BRI)' },
  { value: 'CIMB', label: 'CIMB Niaga' },
  { value: 'Permata', label: 'Bank Permata' },
  { value: 'Danamon', label: 'Bank Danamon' },
  { value: 'Maybank', label: 'Maybank' },
]

export default function BankTransferForm({ onSubmit, onCancel }: BankTransferFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    issuer: 'BCA',
    bankName: 'Bank Central Asia (BCA)',
    accountNumber: '',
    isDefault: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Nama metode harus diisi'
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Nomor rekening harus diisi'
    if (formData.accountNumber.replace(/\D/g, '').length < 8) {
      newErrors.accountNumber = 'Nomor rekening minimal 8 digit'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleBankChange = (value: string) => {
    const selectedBank = BANKS.find(b => b.value === value)
    setFormData({
      ...formData,
      issuer: value,
      bankName: selectedBank?.label || ''
    })
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
          placeholder="Contoh: BCA - Rekening Pribadi"
          className="bg-background/50"
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      {/* Bank Selection */}
      <div className="space-y-2">
        <Label htmlFor="bank">Pilih Bank</Label>
        <Select value={formData.issuer} onValueChange={handleBankChange}>
          <SelectTrigger className="bg-background/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {BANKS.map((bank) => (
              <SelectItem key={bank.value} value={bank.value}>
                {bank.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Account Number */}
      <div className="space-y-2">
        <Label htmlFor="accountNumber">Nomor Rekening</Label>
        <Input
          id="accountNumber"
          value={formData.accountNumber}
          onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, '') })}
          placeholder="Contoh: 1234567890"
          className="bg-background/50 font-mono"
        />
        {errors.accountNumber && <p className="text-xs text-destructive">{errors.accountNumber}</p>}
        <p className="text-xs text-muted-foreground">
          Masukkan nomor rekening tanpa spasi atau karakter khusus
        </p>
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
          <p>Nomor rekening Anda akan dienkripsi dan disimpan dengan aman</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Batal
        </Button>
        <Button type="submit" className="flex-1 neon-glow">
          <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
          Tambah Rekening Bank
        </Button>
      </div>
    </form>
  )
}

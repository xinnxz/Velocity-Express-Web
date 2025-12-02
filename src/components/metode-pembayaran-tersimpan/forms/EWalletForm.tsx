
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

interface EWalletFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

const EWALLET_PROVIDERS = [
  { value: 'GoPay', label: 'GoPay' },
  { value: 'OVO', label: 'OVO' },
  { value: 'DANA', label: 'DANA' },
  { value: 'LinkAja', label: 'LinkAja' },
  { value: 'Sakuku', label: 'Sakuku' },
]

export default function EWalletForm({ onSubmit, onCancel }: EWalletFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    issuer: 'GoPay',
    accountNumber: '',
    isDefault: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Nama metode harus diisi'
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Email atau nomor telepon harus diisi'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
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
          placeholder="Contoh: GoPay Pribadi"
          className="bg-background/50"
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      {/* E-Wallet Provider */}
      <div className="space-y-2">
        <Label htmlFor="issuer">Penyedia E-Wallet</Label>
        <Select value={formData.issuer} onValueChange={(value) => setFormData({ ...formData, issuer: value })}>
          <SelectTrigger className="bg-background/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {EWALLET_PROVIDERS.map((provider) => (
              <SelectItem key={provider.value} value={provider.value}>
                {provider.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Account Number */}
      <div className="space-y-2">
        <Label htmlFor="accountNumber">Email atau Nomor Telepon</Label>
        <Input
          id="accountNumber"
          value={formData.accountNumber}
          onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
          placeholder="contoh@email.com atau 08123456789"
          className="bg-background/50"
        />
        {errors.accountNumber && <p className="text-xs text-destructive">{errors.accountNumber}</p>}
        <p className="text-xs text-muted-foreground">
          Gunakan email atau nomor telepon yang terdaftar di {formData.issuer}
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
          <p>Anda akan diminta untuk login ke akun {formData.issuer} untuk verifikasi</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Batal
        </Button>
        <Button type="submit" className="flex-1 neon-glow">
          <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
          Tambah E-Wallet
        </Button>
      </div>
    </form>
  )
}

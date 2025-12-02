
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import SafeIcon from '@/components/common/SafeIcon'
import type { Address } from '@/components/manajemen-alamat/AddressManagementPage'

interface AddressFormProps {
  address?: Address
  onSubmit: (data: Omit<Address, 'id'>) => void
  onCancel: () => void
}

export default function AddressForm({
  address,
  onSubmit,
  onCancel
}: AddressFormProps) {
  const [formData, setFormData] = useState({
    label: address?.label || '',
    recipientName: address?.recipientName || '',
    phone: address?.phone || '',
    street: address?.street || '',
    district: address?.district || '',
    city: address?.city || '',
    province: address?.province || '',
    postalCode: address?.postalCode || '',
    type: address?.type || 'delivery' as const,
    isDefault: address?.isDefault || false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.label.trim()) newErrors.label = 'Label alamat diperlukan'
    if (!formData.recipientName.trim()) newErrors.recipientName = 'Nama penerima diperlukan'
    if (!formData.phone.trim()) newErrors.phone = 'Nomor telepon diperlukan'
    if (!formData.street.trim()) newErrors.street = 'Jalan/Alamat diperlukan'
    if (!formData.district.trim()) newErrors.district = 'Kelurahan diperlukan'
    if (!formData.city.trim()) newErrors.city = 'Kota diperlukan'
    if (!formData.province.trim()) newErrors.province = 'Provinsi diperlukan'
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Kode pos diperlukan'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Label */}
      <div className="space-y-2">
        <Label htmlFor="label">Label Alamat *</Label>
        <Input
          id="label"
          placeholder="Contoh: Rumah, Kantor, Gudang"
          value={formData.label}
          onChange={(e) => handleChange('label', e.target.value)}
          className={errors.label ? 'border-destructive' : ''}
        />
        {errors.label && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="w-4 h-4" />
            {errors.label}
          </p>
        )}
      </div>

      {/* Recipient Name */}
      <div className="space-y-2">
        <Label htmlFor="recipientName">Nama Penerima *</Label>
        <Input
          id="recipientName"
          placeholder="Nama lengkap penerima"
          value={formData.recipientName}
          onChange={(e) => handleChange('recipientName', e.target.value)}
          className={errors.recipientName ? 'border-destructive' : ''}
        />
        {errors.recipientName && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="w-4 h-4" />
            {errors.recipientName}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Nomor Telepon *</Label>
        <Input
          id="phone"
          placeholder="+62812345678"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={errors.phone ? 'border-destructive' : ''}
        />
        {errors.phone && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="w-4 h-4" />
            {errors.phone}
          </p>
        )}
      </div>

      {/* Street */}
      <div className="space-y-2">
        <Label htmlFor="street">Jalan/Alamat *</Label>
        <Input
          id="street"
          placeholder="Jl. Merdeka No. 123"
          value={formData.street}
          onChange={(e) => handleChange('street', e.target.value)}
          className={errors.street ? 'border-destructive' : ''}
        />
        {errors.street && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="w-4 h-4" />
            {errors.street}
          </p>
        )}
      </div>

      {/* District */}
      <div className="space-y-2">
        <Label htmlFor="district">Kelurahan *</Label>
        <Input
          id="district"
          placeholder="Menteng"
          value={formData.district}
          onChange={(e) => handleChange('district', e.target.value)}
          className={errors.district ? 'border-destructive' : ''}
        />
        {errors.district && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="w-4 h-4" />
            {errors.district}
          </p>
        )}
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="city">Kota *</Label>
        <Input
          id="city"
          placeholder="Jakarta Pusat"
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          className={errors.city ? 'border-destructive' : ''}
        />
        {errors.city && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="w-4 h-4" />
            {errors.city}
          </p>
        )}
      </div>

      {/* Province */}
      <div className="space-y-2">
        <Label htmlFor="province">Provinsi *</Label>
        <Input
          id="province"
          placeholder="DKI Jakarta"
          value={formData.province}
          onChange={(e) => handleChange('province', e.target.value)}
          className={errors.province ? 'border-destructive' : ''}
        />
        {errors.province && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="w-4 h-4" />
            {errors.province}
          </p>
        )}
      </div>

      {/* Postal Code */}
      <div className="space-y-2">
        <Label htmlFor="postalCode">Kode Pos *</Label>
        <Input
          id="postalCode"
          placeholder="10310"
          value={formData.postalCode}
          onChange={(e) => handleChange('postalCode', e.target.value)}
          className={errors.postalCode ? 'border-destructive' : ''}
        />
        {errors.postalCode && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="w-4 h-4" />
            {errors.postalCode}
          </p>
        )}
      </div>

      {/* Address Type */}
      <div className="space-y-3">
        <Label>Tipe Alamat *</Label>
        <RadioGroup value={formData.type} onValueChange={(value) => handleChange('type', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="delivery" id="delivery" />
            <Label htmlFor="delivery" className="font-normal cursor-pointer">
              Pengiriman
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pickup" id="pickup" />
            <Label htmlFor="pickup" className="font-normal cursor-pointer">
              Penjemputan
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Set as Default */}
      <div className="flex items-center space-x-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
        <input
          type="checkbox"
          id="isDefault"
          checked={formData.isDefault}
          onChange={(e) => handleChange('isDefault', e.target.checked)}
          className="w-4 h-4 rounded cursor-pointer"
        />
        <Label htmlFor="isDefault" className="font-normal cursor-pointer flex-1">
          Jadikan alamat default
        </Label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-border/50">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Batal
        </Button>
        <Button
          type="submit"
          className="flex-1 neon-glow"
        >
          <SafeIcon name="Save" className="w-4 h-4 mr-2" />
          {address ? 'Simpan Perubahan' : 'Tambah Alamat'}
        </Button>
      </div>
    </form>
  )
}

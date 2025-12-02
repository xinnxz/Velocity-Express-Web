
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SafeIcon from '@/components/common/SafeIcon'

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  city: string
  province: string
  postalCode: string
  profileImage?: string
}

interface EditProfileFormProps {
  initialData: UserProfile
  onSave: (data: Partial<UserProfile>) => void
  onCancel: () => void
}

const provinces = [
  'DKI Jakarta',
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
  'Sumatera Utara',
  'Sumatera Barat',
  'Riau',
  'Jambi',
  'Sumatera Selatan',
  'Lampung',
  'Bangka Belitung',
  'Kepulauan Riau',
  'Kalimantan Barat',
  'Kalimantan Tengah',
  'Kalimantan Selatan',
  'Kalimantan Timur',
  'Kalimantan Utara',
  'Sulawesi Utara',
  'Sulawesi Tengah',
  'Sulawesi Selatan',
  'Sulawesi Tenggara',
  'Gorontalo',
  'Sulawesi Barat',
  'Bali',
  'Nusa Tenggara Barat',
  'Nusa Tenggara Timur',
  'Maluku',
  'Maluku Utara',
  'Papua',
  'Papua Barat',
]

export default function EditProfileForm({
  initialData,
  onSave,
  onCancel
}: EditProfileFormProps) {
  const [formData, setFormData] = useState<Partial<UserProfile>>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'Nama depan harus diisi'
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Nama belakang harus diisi'
    }
    if (!formData.email?.trim()) {
      newErrors.email = 'Email harus diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid'
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Nomor telepon harus diisi'
    } else if (!/^(\+62|0)[0-9]{9,12}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Format nomor telepon tidak valid'
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Tanggal lahir harus diisi'
    }
    if (!formData.gender) {
      newErrors.gender = 'Jenis kelamin harus dipilih'
    }
    if (!formData.address?.trim()) {
      newErrors.address = 'Alamat harus diisi'
    }
    if (!formData.city?.trim()) {
      newErrors.city = 'Kota harus diisi'
    }
    if (!formData.province) {
      newErrors.province = 'Provinsi harus dipilih'
    }
    if (!formData.postalCode?.trim()) {
      newErrors.postalCode = 'Kode pos harus diisi'
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Kode pos harus 5 digit'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    onSave(formData)
    setIsSubmitting(false)
  }

  const handleChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nama Depan *</Label>
          <Input
            id="firstName"
            value={formData.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Masukkan nama depan"
            className={errors.firstName ? 'border-destructive' : ''}
          />
          {errors.firstName && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" className="w-3.5 h-3.5" />
              {errors.firstName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Nama Belakang *</Label>
          <Input
            id="lastName"
            value={formData.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Masukkan nama belakang"
            className={errors.lastName ? 'border-destructive' : ''}
          />
          {errors.lastName && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" className="w-3.5 h-3.5" />
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Masukkan email"
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="w-3.5 h-3.5" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Nomor Telepon *</Label>
        <Input
          id="phone"
          value={formData.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="Masukkan nomor telepon (contoh: +62812345678)"
          className={errors.phone ? 'border-destructive' : ''}
        />
        {errors.phone && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="w-3.5 h-3.5" />
            {errors.phone}
          </p>
        )}
      </div>

      {/* Date of Birth & Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Tanggal Lahir *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className={errors.dateOfBirth ? 'border-destructive' : ''}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" className="w-3.5 h-3.5" />
              {errors.dateOfBirth}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Jenis Kelamin *</Label>
          <Select value={formData.gender || ''} onValueChange={(value) => handleChange('gender', value)}>
            <SelectTrigger className={errors.gender ? 'border-destructive' : ''}>
              <SelectValue placeholder="Pilih jenis kelamin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Laki-laki</SelectItem>
              <SelectItem value="female">Perempuan</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" className="w-3.5 h-3.5" />
              {errors.gender}
            </p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">Alamat *</Label>
        <Input
          id="address"
          value={formData.address || ''}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="Masukkan alamat lengkap"
          className={errors.address ? 'border-destructive' : ''}
        />
        {errors.address && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="w-3.5 h-3.5" />
            {errors.address}
          </p>
        )}
      </div>

      {/* City, Province, Postal Code */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Kota *</Label>
          <Input
            id="city"
            value={formData.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="Masukkan kota"
            className={errors.city ? 'border-destructive' : ''}
          />
          {errors.city && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" className="w-3.5 h-3.5" />
              {errors.city}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="province">Provinsi *</Label>
          <Select value={formData.province || ''} onValueChange={(value) => handleChange('province', value)}>
            <SelectTrigger className={errors.province ? 'border-destructive' : ''}>
              <SelectValue placeholder="Pilih provinsi" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.province && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" className="w-3.5 h-3.5" />
              {errors.province}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Kode Pos *</Label>
          <Input
            id="postalCode"
            value={formData.postalCode || ''}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            placeholder="Masukkan kode pos"
            maxLength={5}
            className={errors.postalCode ? 'border-destructive' : ''}
          />
          {errors.postalCode && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" className="w-3.5 h-3.5" />
              {errors.postalCode}
            </p>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-4 border-t border-border">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 sm:flex-none"
        >
          {isSubmitting ? (
            <>
              <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <SafeIcon name="Save" className="w-4 h-4 mr-2" />
              Simpan Perubahan
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 sm:flex-none"
        >
          <SafeIcon name="X" className="w-4 h-4 mr-2" />
          Batal
        </Button>
      </div>
    </form>
  )
}

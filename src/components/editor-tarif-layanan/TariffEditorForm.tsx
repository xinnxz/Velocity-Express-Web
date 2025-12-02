
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'
import { MOCK_TARIFFS } from '@/data/admin_dashboard'
import type { TariffModel } from '@/data/admin_dashboard'

interface TariffEditorFormProps {
  editId?: number
  onSave: (data: Partial<TariffModel>) => void
  onCancel: () => void
  isLoading?: boolean
}

const ZONE_OPTIONS = [
  { value: 'Zone A (Jawa & Sumatera Selatan)', label: 'Zone A - Jawa & Sumatera Selatan' },
  { value: 'Zone B (Urban Priority)', label: 'Zone B - Urban Priority (Jabodetabek)' },
  { value: 'Zone C (Sumatera Utara)', label: 'Zone C - Sumatera Utara' },
  { value: 'Zone D (Kalimantan)', label: 'Zone D - Kalimantan' },
  { value: 'Zone E (Sulawesi)', label: 'Zone E - Sulawesi' },
  { value: 'Zone F (Bali & Nusa Tenggara)', label: 'Zone F - Bali & Nusa Tenggara' },
  { value: 'Zone G (Papua)', label: 'Zone G - Papua' },
]

const STATUS_OPTIONS = [
  { value: 'Draft', label: 'Draft (Belum Aktif)' },
  { value: 'Active', label: 'Aktif' },
  { value: 'Archived', label: 'Arsip' },
]

export default function TariffEditorForm({
  editId,
  onSave,
  onCancel,
  isLoading = false
}: TariffEditorFormProps) {
  const [formData, setFormData] = useState<Partial<TariffModel>>({
    serviceName: '',
    baseRateIDR: 0,
    ratePerKgIDR: 0,
    zoneCoverage: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    status: 'Draft',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Initialize with existing tariff data if editing
  useEffect(() => {
    if (editId) {
      const tariff = MOCK_TARIFFS.find(t => t.id === editId)
      if (tariff) {
        setFormData(tariff)
      }
    }
  }, [editId])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.serviceName?.trim()) {
      newErrors.serviceName = 'Nama layanan harus diisi'
    }

    if (!formData.baseRateIDR || formData.baseRateIDR < 0) {
      newErrors.baseRateIDR = 'Tarif dasar harus lebih dari 0'
    }

    if (!formData.ratePerKgIDR || formData.ratePerKgIDR < 0) {
      newErrors.ratePerKgIDR = 'Tarif per kg harus lebih dari 0'
    }

    if (!formData.zoneCoverage) {
      newErrors.zoneCoverage = 'Pilih zona cakupan'
    }

    if (!formData.effectiveDate) {
      newErrors.effectiveDate = 'Tanggal efektif harus diisi'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (touched[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSave(formData)
    }
  }

  const calculateEstimatedPrice = (weight: number = 5) => {
    const base = formData.baseRateIDR || 0
    const perKg = formData.ratePerKgIDR || 0
    return base + (perKg * weight)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service Name Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <SafeIcon name="Package" className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Informasi Layanan</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="serviceName" className="text-sm font-medium">
            Nama Layanan <span className="text-destructive">*</span>
          </Label>
          <Input
            id="serviceName"
            placeholder="Contoh: Drone Kilat Max, Eco-Ground Standard"
            value={formData.serviceName || ''}
            onChange={(e) => handleChange('serviceName', e.target.value)}
            onBlur={() => handleBlur('serviceName')}
            className={errors.serviceName && touched.serviceName ? 'border-destructive' : ''}
            disabled={isLoading}
          />
          {errors.serviceName && touched.serviceName && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" className="w-3 h-3" />
              {errors.serviceName}
            </p>
          )}
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Pricing Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <SafeIcon name="DollarSign" className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Struktur Harga</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="baseRate" className="text-sm font-medium">
              Tarif Dasar (Rp) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="baseRate"
              type="number"
              placeholder="15000"
              value={formData.baseRateIDR || ''}
              onChange={(e) => handleChange('baseRateIDR', parseInt(e.target.value) || 0)}
              onBlur={() => handleBlur('baseRateIDR')}
              className={errors.baseRateIDR && touched.baseRateIDR ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.baseRateIDR && touched.baseRateIDR && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <SafeIcon name="AlertCircle" className="w-3 h-3" />
                {errors.baseRateIDR}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Biaya minimum untuk setiap pengiriman
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ratePerKg" className="text-sm font-medium">
              Tarif per Kg (Rp) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ratePerKg"
              type="number"
              placeholder="5000"
              value={formData.ratePerKgIDR || ''}
              onChange={(e) => handleChange('ratePerKgIDR', parseInt(e.target.value) || 0)}
              onBlur={() => handleBlur('ratePerKgIDR')}
              className={errors.ratePerKgIDR && touched.ratePerKgIDR ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.ratePerKgIDR && touched.ratePerKgIDR && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <SafeIcon name="AlertCircle" className="w-3 h-3" />
                {errors.ratePerKgIDR}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Biaya tambahan per kilogram berat paket
            </p>
          </div>
        </div>

        {/* Price Estimation Preview */}
        <Card className="bg-muted/30 border-border/50 mt-4">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground mb-3">Estimasi Harga untuk Paket 5 Kg:</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                Rp {calculateEstimatedPrice(5).toLocaleString('id-ID')}
              </span>
              <span className="text-xs text-muted-foreground">
                (Rp {formData.baseRateIDR?.toLocaleString('id-ID')} + Rp {(formData.ratePerKgIDR! * 5).toLocaleString('id-ID')})
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="bg-border/50" />

      {/* Zone & Date Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <SafeIcon name="MapPin" className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Zona & Tanggal Efektif</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zone" className="text-sm font-medium">
              Zona Cakupan <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.zoneCoverage || ''}
              onValueChange={(value) => handleChange('zoneCoverage', value)}
              disabled={isLoading}
            >
              <SelectTrigger 
                id="zone"
                className={errors.zoneCoverage && touched.zoneCoverage ? 'border-destructive' : ''}
              >
                <SelectValue placeholder="Pilih zona cakupan" />
              </SelectTrigger>
              <SelectContent>
                {ZONE_OPTIONS.map(zone => (
                  <SelectItem key={zone.value} value={zone.value}>
                    {zone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.zoneCoverage && touched.zoneCoverage && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <SafeIcon name="AlertCircle" className="w-3 h-3" />
                {errors.zoneCoverage}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="effectiveDate" className="text-sm font-medium">
              Tanggal Efektif <span className="text-destructive">*</span>
            </Label>
            <Input
              id="effectiveDate"
              type="date"
              value={formData.effectiveDate || ''}
              onChange={(e) => handleChange('effectiveDate', e.target.value)}
              onBlur={() => handleBlur('effectiveDate')}
              className={errors.effectiveDate && touched.effectiveDate ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.effectiveDate && touched.effectiveDate && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <SafeIcon name="AlertCircle" className="w-3 h-3" />
                {errors.effectiveDate}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Tarif mulai berlaku dari tanggal ini
            </p>
          </div>
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Status Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <SafeIcon name="CheckCircle2" className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Status Tarif</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium">
            Status <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.status || 'Draft'}
            onValueChange={(value) => handleChange('status', value)}
            disabled={isLoading}
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map(status => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {formData.status === 'Draft' && 'Tarif disimpan sebagai draft dan belum berlaku'}
            {formData.status === 'Active' && 'Tarif langsung berlaku untuk pengiriman baru'}
            {formData.status === 'Archived' && 'Tarif tidak lagi digunakan untuk pengiriman baru'}
          </p>
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 neon-glow"
        >
          {isLoading ? (
            <>
              <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <SafeIcon name="Save" className="w-4 h-4 mr-2" />
              Simpan Tarif
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          <SafeIcon name="X" className="w-4 h-4 mr-2" />
          Batal
        </Button>
      </div>

      {/* Help Text */}
      <Card className="bg-muted/20 border-border/50">
        <CardContent className="pt-4 text-xs text-muted-foreground space-y-2">
          <p className="flex items-start gap-2">
            <SafeIcon name="Lightbulb" className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
            <span>Semua perubahan tarif akan dicatat dalam riwayat untuk keperluan audit dan transparansi</span>
          </p>
        </CardContent>
      </Card>
    </form>
  )
}

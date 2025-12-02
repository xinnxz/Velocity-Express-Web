
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import SafeIcon from '@/components/common/SafeIcon'
import { type Tariff } from './tariffMockData'

interface TariffEditorProps {
  tariff: Tariff | null
  onSave: (tariffData: Omit<Tariff, 'id' | 'createdAt' | 'updatedAt'>) => void
  onClose: () => void
}

const serviceTypes = ['Regular', 'Express', 'Drone', 'Same Day']

export default function TariffEditor({ tariff, onSave, onClose }: TariffEditorProps) {
  const [formData, setFormData] = useState({
    name: tariff?.name || '',
    description: tariff?.description || '',
    serviceType: tariff?.serviceType || 'Regular',
    basePrice: tariff?.basePrice || 0,
    additionalFee: tariff?.additionalFee || 0,
    discountPercentage: tariff?.discountPercentage || 0,
    estimatedDays: tariff?.estimatedDays || 1,
    maxWeight: tariff?.maxWeight || 30,
    isActive: tariff?.isActive ?? true,
    effectiveDate: tariff?.effectiveDate || new Date().toISOString().split('T')[0],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nama layanan harus diisi'
    }
    if (formData.basePrice < 0) {
      newErrors.basePrice = 'Harga dasar tidak boleh negatif'
    }
    if (formData.additionalFee < 0) {
      newErrors.additionalFee = 'Biaya tambahan tidak boleh negatif'
    }
    if (formData.discountPercentage < 0 || formData.discountPercentage > 100) {
      newErrors.discountPercentage = 'Diskon harus antara 0-100%'
    }
    if (formData.estimatedDays < 1) {
      newErrors.estimatedDays = 'Estimasi hari harus minimal 1'
    }
    if (formData.maxWeight < 1) {
      newErrors.maxWeight = 'Berat maksimal harus minimal 1 kg'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {tariff ? 'Edit Tarif Layanan' : 'Tambah Tarif Layanan Baru'}
          </DialogTitle>
          <DialogDescription>
            {tariff 
              ? 'Perbarui informasi tarif layanan pengiriman'
              : 'Buat tarif layanan pengiriman baru dengan harga dan ketentuan yang sesuai'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Informasi Dasar</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Layanan *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Pengiriman Regular Jakarta"
                  className="bg-background/50"
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceType">Jenis Layanan *</Label>
                <select
                  id="serviceType"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-background/50 border border-border text-foreground text-sm"
                >
                  {serviceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Deskripsi detail tentang layanan ini..."
                className="bg-background/50 resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Harga & Biaya</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="basePrice">Harga Dasar (Rp) *</Label>
                <Input
                  id="basePrice"
                  type="number"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                  placeholder="0"
                  className="bg-background/50"
                />
                {errors.basePrice && <p className="text-xs text-destructive">{errors.basePrice}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalFee">Biaya Tambahan (Rp)</Label>
                <Input
                  id="additionalFee"
                  type="number"
                  value={formData.additionalFee}
                  onChange={(e) => setFormData({ ...formData, additionalFee: Number(e.target.value) })}
                  placeholder="0"
                  className="bg-background/50"
                />
                {errors.additionalFee && <p className="text-xs text-destructive">{errors.additionalFee}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountPercentage">Diskon (%)</Label>
                <Input
                  id="discountPercentage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discountPercentage}
                  onChange={(e) => setFormData({ ...formData, discountPercentage: Number(e.target.value) })}
                  placeholder="0"
                  className="bg-background/50"
                />
                {errors.discountPercentage && <p className="text-xs text-destructive">{errors.discountPercentage}</p>}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Harga Dasar</p>
                  <p className="font-semibold">Rp {formData.basePrice.toLocaleString('id-ID')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Biaya Tambahan</p>
                  <p className="font-semibold">Rp {formData.additionalFee.toLocaleString('id-ID')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Diskon</p>
                  <p className="font-semibold text-green-400">-{formData.discountPercentage}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total</p>
                  <p className="font-semibold text-primary">
                    Rp {Math.round((formData.basePrice + formData.additionalFee) * (1 - formData.discountPercentage / 100)).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Detail Layanan</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedDays">Estimasi Pengiriman (Hari) *</Label>
                <Input
                  id="estimatedDays"
                  type="number"
                  min="1"
                  value={formData.estimatedDays}
                  onChange={(e) => setFormData({ ...formData, estimatedDays: Number(e.target.value) })}
                  placeholder="1"
                  className="bg-background/50"
                />
                {errors.estimatedDays && <p className="text-xs text-destructive">{errors.estimatedDays}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxWeight">Berat Maksimal (kg) *</Label>
                <Input
                  id="maxWeight"
                  type="number"
                  min="1"
                  value={formData.maxWeight}
                  onChange={(e) => setFormData({ ...formData, maxWeight: Number(e.target.value) })}
                  placeholder="30"
                  className="bg-background/50"
                />
                {errors.maxWeight && <p className="text-xs text-destructive">{errors.maxWeight}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="effectiveDate">Tanggal Berlaku *</Label>
              <Input
                id="effectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                className="bg-background/50"
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-muted/30 border border-border/50 rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="isActive" className="text-base">Status Layanan</Label>
              <p className="text-sm text-muted-foreground">
                {formData.isActive ? 'Layanan ini aktif dan tersedia' : 'Layanan ini tidak aktif'}
              </p>
            </div>
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" className="neon-glow">
              <SafeIcon name="Save" className="w-4 h-4 mr-2" />
              {tariff ? 'Simpan Perubahan' : 'Tambah Tarif'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

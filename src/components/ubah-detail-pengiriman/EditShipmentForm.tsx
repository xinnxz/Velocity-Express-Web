
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'
import AddressInput from '@/components/ubah-detail-pengiriman/AddressInput'
import DateInput from '@/components/ubah-detail-pengiriman/DateInput'
import type { ShipmentDetail } from '@/data/mockShipmentData'

interface EditShipmentFormProps {
  shipment: ShipmentDetail
  onSave: (formData: any) => void
  onCancel: () => void
  isSaving: boolean
}

export default function EditShipmentForm({
  shipment,
  onSave,
  onCancel,
  isSaving
}: EditShipmentFormProps) {
  const [formData, setFormData] = useState({
    destinationAddress: shipment.destination.address,
    destinationCity: shipment.destination.city,
    destinationPostalCode: shipment.destination.postalCode,
    recipientName: shipment.recipient.name,
    recipientPhone: shipment.recipient.phone,
    deliveryDate: shipment.estimatedDeliveryDate,
    specialInstructions: shipment.specialInstructions || '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.destinationAddress.trim()) {
      newErrors.destinationAddress = 'Alamat tujuan tidak boleh kosong'
    }
    if (!formData.destinationCity.trim()) {
      newErrors.destinationCity = 'Kota tujuan tidak boleh kosong'
    }
    if (!formData.destinationPostalCode.trim()) {
      newErrors.destinationPostalCode = 'Kode pos tidak boleh kosong'
    }
    if (!formData.recipientName.trim()) {
      newErrors.recipientName = 'Nama penerima tidak boleh kosong'
    }
    if (!formData.recipientPhone.trim()) {
      newErrors.recipientPhone = 'Nomor telepon tidak boleh kosong'
    }
    if (!formData.deliveryDate) {
      newErrors.deliveryDate = 'Tanggal pengiriman tidak boleh kosong'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (touched[field]) {
      validateField(field, value)
    }
  }

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors }

    switch (field) {
      case 'destinationAddress':
        if (!value.trim()) {
          newErrors.destinationAddress = 'Alamat tujuan tidak boleh kosong'
        } else {
          delete newErrors.destinationAddress
        }
        break
      case 'destinationCity':
        if (!value.trim()) {
          newErrors.destinationCity = 'Kota tujuan tidak boleh kosong'
        } else {
          delete newErrors.destinationCity
        }
        break
      case 'destinationPostalCode':
        if (!value.trim()) {
          newErrors.destinationPostalCode = 'Kode pos tidak boleh kosong'
        } else if (!/^\d{5,6}$/.test(value)) {
          newErrors.destinationPostalCode = 'Kode pos harus 5-6 digit'
        } else {
          delete newErrors.destinationPostalCode
        }
        break
      case 'recipientPhone':
        if (!value.trim()) {
          newErrors.recipientPhone = 'Nomor telepon tidak boleh kosong'
        } else if (!/^(\+62|0)[0-9]{9,12}$/.test(value.replace(/\s/g, ''))) {
          newErrors.recipientPhone = 'Format nomor telepon tidak valid'
        } else {
          delete newErrors.recipientPhone
        }
        break
    }

    setErrors(newErrors)
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }))
    validateField(field, formData[field as keyof typeof formData])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  const isAddressEditable = shipment.status === 'pending' || shipment.status === 'picked_up'
  const isDateEditable = shipment.status === 'pending'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Alert */}
      {!isAddressEditable && (
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <SafeIcon name="AlertCircle" className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-400">
            Pengiriman Anda sudah dalam perjalanan. Beberapa informasi tidak dapat diubah.
          </AlertDescription>
        </Alert>
      )}

      {/* Recipient Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Informasi Penerima
        </h3>

        <div className="space-y-2">
          <Label htmlFor="recipientName">Nama Penerima</Label>
          <Input
            id="recipientName"
            value={formData.recipientName}
            onChange={(e) => handleChange('recipientName', e.target.value)}
            onBlur={() => handleBlur('recipientName')}
            className={errors.recipientName ? 'border-destructive' : ''}
            disabled={isSaving}
          />
          {errors.recipientName && touched.recipientName && (
            <p className="text-xs text-destructive">{errors.recipientName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipientPhone">Nomor Telepon Penerima</Label>
          <Input
            id="recipientPhone"
            type="tel"
            placeholder="+62 atau 0..."
            value={formData.recipientPhone}
            onChange={(e) => handleChange('recipientPhone', e.target.value)}
            onBlur={() => handleBlur('recipientPhone')}
            className={errors.recipientPhone ? 'border-destructive' : ''}
            disabled={isSaving}
          />
          {errors.recipientPhone && touched.recipientPhone && (
            <p className="text-xs text-destructive">{errors.recipientPhone}</p>
          )}
        </div>
      </div>

      {/* Destination Address */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Alamat Tujuan
        </h3>

        <div className="space-y-2">
          <Label htmlFor="destinationAddress">
            Alamat Lengkap
            {!isAddressEditable && <span className="text-muted-foreground ml-2">(Tidak dapat diubah)</span>}
          </Label>
          <Textarea
            id="destinationAddress"
            value={formData.destinationAddress}
            onChange={(e) => handleChange('destinationAddress', e.target.value)}
            onBlur={() => handleBlur('destinationAddress')}
            className={errors.destinationAddress ? 'border-destructive' : ''}
            disabled={!isAddressEditable || isSaving}
            rows={3}
            placeholder="Jalan, nomor rumah, RT/RW, dll"
          />
          {errors.destinationAddress && touched.destinationAddress && (
            <p className="text-xs text-destructive">{errors.destinationAddress}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="destinationCity">
              Kota/Kabupaten
              {!isAddressEditable && <span className="text-muted-foreground ml-2">(Tidak dapat diubah)</span>}
            </Label>
            <Input
              id="destinationCity"
              value={formData.destinationCity}
              onChange={(e) => handleChange('destinationCity', e.target.value)}
              onBlur={() => handleBlur('destinationCity')}
              className={errors.destinationCity ? 'border-destructive' : ''}
              disabled={!isAddressEditable || isSaving}
            />
            {errors.destinationCity && touched.destinationCity && (
              <p className="text-xs text-destructive">{errors.destinationCity}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="destinationPostalCode">
              Kode Pos
              {!isAddressEditable && <span className="text-muted-foreground ml-2">(Tidak dapat diubah)</span>}
            </Label>
            <Input
              id="destinationPostalCode"
              value={formData.destinationPostalCode}
              onChange={(e) => handleChange('destinationPostalCode', e.target.value)}
              onBlur={() => handleBlur('destinationPostalCode')}
              className={errors.destinationPostalCode ? 'border-destructive' : ''}
              disabled={!isAddressEditable || isSaving}
              placeholder="12345"
            />
            {errors.destinationPostalCode && touched.destinationPostalCode && (
              <p className="text-xs text-destructive">{errors.destinationPostalCode}</p>
            )}
          </div>
        </div>
      </div>

      {/* Delivery Date */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Jadwal Pengiriman
        </h3>

        <div className="space-y-2">
          <Label htmlFor="deliveryDate">
            Tanggal Pengiriman yang Diinginkan
            {!isDateEditable && <span className="text-muted-foreground ml-2">(Tidak dapat diubah)</span>}
          </Label>
          <DateInput
            id="deliveryDate"
            value={formData.deliveryDate}
            onChange={(value) => handleChange('deliveryDate', value)}
            onBlur={() => handleBlur('deliveryDate')}
            disabled={!isDateEditable || isSaving}
            error={errors.deliveryDate}
            touched={touched.deliveryDate}
          />
        </div>
      </div>

      {/* Special Instructions */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Instruksi Khusus
        </h3>

        <div className="space-y-2">
          <Label htmlFor="specialInstructions">
            Catatan atau Instruksi Khusus (Opsional)
          </Label>
          <Textarea
            id="specialInstructions"
            value={formData.specialInstructions}
            onChange={(e) => handleChange('specialInstructions', e.target.value)}
            className="resize-none"
            disabled={isSaving}
            rows={3}
            placeholder="Contoh: Letakkan di depan pintu, hubungi sebelum tiba, dll"
          />
          <p className="text-xs text-muted-foreground">
            {formData.specialInstructions.length}/500 karakter
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
          className="flex-1"
        >
          Batal
        </Button>
        <Button
          type="submit"
          disabled={isSaving}
          className="flex-1 neon-glow"
        >
          {isSaving ? (
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
      </div>
    </form>
  )
}

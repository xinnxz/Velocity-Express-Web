
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'
import PackageTypeSelector from './PackageTypeSelector'
import DimensionInput from './DimensionInput'
import CostEstimator from './CostEstimator'
import { AVAILABLE_PACKAGE_TYPES, MOCK_PACKAGE_DETAILS, type PackageDetailModel } from '@/data/order_data'

export default function PackageDetailForm() {
  const [packageDetails, setPackageDetails] = useState<PackageDetailModel>(MOCK_PACKAGE_DETAILS)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handlePackageTypeChange = (typeId: string) => {
    const selectedType = AVAILABLE_PACKAGE_TYPES.find(t => t.id === typeId)
    if (selectedType) {
      setPackageDetails(prev => ({
        ...prev,
        packageType: selectedType
      }))
      // Clear error for package type
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.packageType
        return newErrors
      })
    }
  }

  const handleDimensionChange = (field: 'lengthCm' | 'widthCm' | 'heightCm', value: number) => {
    if (value < 0) return
    setPackageDetails(prev => ({
      ...prev,
      [field]: value
    }))
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  const handleWeightChange = (value: number) => {
    if (value < 0) return
    setPackageDetails(prev => ({
      ...prev,
      weightKg: value
    }))
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.weightKg
      return newErrors
    })
  }

  const handleDeclaredValueChange = (value: number) => {
    if (value < 0) return
    setPackageDetails(prev => ({
      ...prev,
      declaredValueIDR: value
    }))
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.declaredValueIDR
      return newErrors
    })
  }

  const handleInstructionsChange = (value: string) => {
    setPackageDetails(prev => ({
      ...prev,
      specialInstructions: value
    }))
  }

  const handleFragileToggle = (checked: boolean) => {
    setPackageDetails(prev => ({
      ...prev,
      isFragile: checked
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!packageDetails.packageType.id) {
      newErrors.packageType = 'Pilih jenis paket'
    }

    if (packageDetails.lengthCm <= 0) {
      newErrors.lengthCm = 'Panjang harus lebih dari 0'
    }

    if (packageDetails.widthCm <= 0) {
      newErrors.widthCm = 'Lebar harus lebih dari 0'
    }

    if (packageDetails.heightCm <= 0) {
      newErrors.heightCm = 'Tinggi harus lebih dari 0'
    }

    if (packageDetails.weightKg <= 0) {
      newErrors.weightKg = 'Berat harus lebih dari 0'
    }

    if (packageDetails.declaredValueIDR < 0) {
      newErrors.declaredValueIDR = 'Nilai deklarasi tidak boleh negatif'
    }

    // Check weight limit based on package type
    if (packageDetails.weightKg > 50) {
      newErrors.weightKg = 'Berat paket melebihi batas maksimal (50 kg)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) {
      // Store package details in session/state management
      // Then navigate to next page
      window.location.href = './pilih-layanan-kurir.html'
    }
  }

  const handleBack = () => {
    window.location.href = './pilih-lokasi-pesanan.html'
  }

  const volume = (packageDetails.lengthCm * packageDetails.widthCm * packageDetails.heightCm) / 1000 // in liters

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">
              <span className="text-sm font-bold">3</span>
            </div>
            <h1 className="text-3xl font-bold">Masukkan Detail Paket</h1>
          </div>
          <p className="text-muted-foreground">
            Tentukan jenis, ukuran, dan berat paket Anda untuk estimasi biaya yang akurat
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Type Selection */}
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SafeIcon name="Package" className="w-5 h-5" />
                  Jenis Paket
                </CardTitle>
                <CardDescription>
                  Pilih jenis paket yang paling sesuai dengan isi pengiriman Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PackageTypeSelector
                  selectedTypeId={packageDetails.packageType.id}
                  onSelect={handlePackageTypeChange}
                  error={errors.packageType}
                />
              </CardContent>
            </Card>

            {/* Dimensions */}
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SafeIcon name="Ruler" className="w-5 h-5" />
                  Dimensi Paket
                </CardTitle>
                <CardDescription>
                  Masukkan ukuran paket dalam sentimeter (cm)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <DimensionInput
                    label="Panjang"
                    value={packageDetails.lengthCm}
                    onChange={(value) => handleDimensionChange('lengthCm', value)}
                    error={errors.lengthCm}
                    unit="cm"
                  />
                  <DimensionInput
                    label="Lebar"
                    value={packageDetails.widthCm}
                    onChange={(value) => handleDimensionChange('widthCm', value)}
                    error={errors.widthCm}
                    unit="cm"
                  />
                  <DimensionInput
                    label="Tinggi"
                    value={packageDetails.heightCm}
                    onChange={(value) => handleDimensionChange('heightCm', value)}
                    error={errors.heightCm}
                    unit="cm"
                  />
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Volume:</span> {volume.toFixed(2)} L
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Weight */}
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SafeIcon name="Weight" className="w-5 h-5" />
                  Berat Paket
                </CardTitle>
                <CardDescription>
                  Masukkan berat paket dalam kilogram (kg)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="weight">Berat (kg)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="weight"
                      type="number"
                      min="0"
                      step="0.1"
                      value={packageDetails.weightKg}
                      onChange={(e) => handleWeightChange(parseFloat(e.target.value) || 0)}
                      className="bg-background/50"
                      placeholder="Contoh: 2.5"
                    />
                    <div className="flex items-center px-3 bg-muted/30 rounded-md border border-border/50 text-sm text-muted-foreground">
                      kg
                    </div>
                  </div>
                  {errors.weightKg && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <SafeIcon name="AlertCircle" className="w-4 h-4" />
                      {errors.weightKg}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Declared Value */}
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SafeIcon name="DollarSign" className="w-5 h-5" />
                  Nilai Deklarasi
                </CardTitle>
                <CardDescription>
                  Nilai barang untuk keperluan asuransi (opsional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="declared-value">Nilai Barang (IDR)</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 bg-muted/30 rounded-md border border-border/50 text-sm text-muted-foreground">
                      Rp
                    </div>
                    <Input
                      id="declared-value"
                      type="number"
                      min="0"
                      step="1000"
                      value={packageDetails.declaredValueIDR}
                      onChange={(e) => handleDeclaredValueChange(parseFloat(e.target.value) || 0)}
                      className="bg-background/50"
                      placeholder="Contoh: 15000000"
                    />
                  </div>
                  {errors.declaredValueIDR && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <SafeIcon name="AlertCircle" className="w-4 h-4" />
                      {errors.declaredValueIDR}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Asuransi: Rp {(packageDetails.declaredValueIDR * 0.005).toLocaleString('id-ID')} (0.5%)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Special Instructions */}
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SafeIcon name="MessageSquare" className="w-5 h-5" />
                  Instruksi Khusus
                </CardTitle>
                <CardDescription>
                  Tambahkan catatan atau instruksi khusus untuk pengiriman (opsional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={packageDetails.specialInstructions}
                  onChange={(e) => handleInstructionsChange(e.target.value)}
                  placeholder="Contoh: Hanya terima oleh penerima, jangan diletakkan di bawah sinar matahari langsung..."
                  className="bg-background/50 min-h-24"
                />
              </CardContent>
            </Card>

            {/* Fragile Checkbox */}
            <Card className="glass-effect border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="fragile"
                    checked={packageDetails.isFragile}
                    onCheckedChange={handleFragileToggle}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="fragile" className="text-base font-semibold cursor-pointer">
                      Paket Mudah Pecah
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Centang jika paket berisi barang yang mudah pecah atau memerlukan penanganan khusus
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                <SafeIcon name="ChevronLeft" className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <Button
                onClick={handleContinue}
                className="flex-1 neon-glow"
              >
                Lanjutkan ke Layanan Kurir
                <SafeIcon name="ChevronRight" className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <CostEstimator packageDetails={packageDetails} />
          </div>
        </div>
      </div>
    </div>
  )
}


import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import EditShipmentForm from '@/components/ubah-detail-pengiriman/EditShipmentForm'
import ShipmentInfoDisplay from '@/components/ubah-detail-pengiriman/ShipmentInfoDisplay'
import { mockShipmentDetail } from '@/data/mockShipmentData'

export default function EditShipmentPage() {
  const [isEditing, setIsEditing] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (formData: any) => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    // Redirect to detail page
    window.location.href = './detail-pengiriman-terdaftar.html'
  }

  const handleCancel = () => {
    window.location.href = './detail-pengiriman-terdaftar.html'
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <SafeIcon name="ArrowLeft" className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold">Ubah Detail Pengiriman</h1>
        </div>
        <p className="text-muted-foreground">
          Perbarui informasi pengiriman Anda. Beberapa field mungkin tidak dapat diubah sesuai kebijakan layanan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-2">
          <Card className="border-border/50 glass-effect">
            <CardHeader>
              <CardTitle>Edit Informasi Pengiriman</CardTitle>
              <CardDescription>
                Resi: {mockShipmentDetail.trackingNumber}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditShipmentForm 
                shipment={mockShipmentDetail}
                onSave={handleSave}
                onCancel={handleCancel}
                isSaving={isSaving}
              />
            </CardContent>
          </Card>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-1">
          <ShipmentInfoDisplay shipment={mockShipmentDetail} />
        </div>
      </div>
    </div>
  )
}

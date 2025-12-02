
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import TariffEditorForm from '@/components/editor-tarif-layanan/TariffEditorForm'
import type { TariffModel } from '@/data/admin_dashboard'

interface TariffEditorPageProps {
  editId?: number
}

export default function TariffEditorPage({ editId }: TariffEditorPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = async (formData: Partial<TariffModel>) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSaved(true)
      
      // Redirect after brief delay
      setTimeout(() => {
        window.location.href = './pengaturan-tarif-layanan.html'
      }, 500)
    } catch (error) {
      console.error('Error saving tariff:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    window.location.href = './pengaturan-tarif-layanan.html'
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header Section */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container-custom py-6">
          <div className="flex items-center gap-3 mb-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleCancel}
              className="h-8 w-8"
            >
              <SafeIcon name="ArrowLeft" className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold gradient-text">
              {editId ? 'Edit Tarif Layanan' : 'Buat Tarif Layanan Baru'}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground ml-11">
            {editId 
              ? 'Ubah detail tarif layanan pengiriman yang sudah ada'
              : 'Tambahkan tarif layanan pengiriman baru ke sistem'
            }
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container-custom py-8">
          <div className="max-w-3xl mx-auto">
            {/* Success Message */}
            {isSaved && (
              <Card className="mb-6 border-green-500/50 bg-green-500/10">
                <CardContent className="pt-6 flex items-center gap-3">
                  <SafeIcon name="CheckCircle2" className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium text-green-400">Tarif berhasil disimpan</p>
                    <p className="text-sm text-green-400/80">Anda akan diarahkan kembali ke halaman pengaturan tarif...</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Editor Form Card */}
            <Card className="glass-effect border-primary/20">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  <SafeIcon name="DollarSign" className="w-5 h-5 text-primary" />
                  Detail Tarif Layanan
                </CardTitle>
                <CardDescription>
                  Isi semua informasi yang diperlukan untuk membuat atau mengubah tarif layanan
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <TariffEditorForm 
                  editId={editId}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>

            {/* Info Box */}
            <Card className="mt-6 border-blue-500/20 bg-blue-500/5">
              <CardContent className="pt-6 flex gap-3">
                <SafeIcon name="Info" className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-400/90">
                  <p className="font-medium mb-1">Informasi Penting</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Tarif yang disimpan akan berlaku mulai tanggal efektif yang ditentukan</li>
                    <li>• Anda dapat menyimpan sebagai Draft sebelum mengaktifkannya</li>
                    <li>• Perubahan tarif akan dicatat dalam riwayat perubahan untuk audit</li>
                    <li>• Pastikan harga sudah termasuk semua biaya tambahan yang relevan</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

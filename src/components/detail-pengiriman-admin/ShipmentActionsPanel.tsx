
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface ShipmentActionsPanelProps {}

export default function ShipmentActionsPanel({}: ShipmentActionsPanelProps) {
  const [selectedStatus, setSelectedStatus] = useState('in_transit')
  const [isUpdating, setIsUpdating] = useState(false)

  const statusOptions = [
    { value: 'pending', label: 'Menunggu' },
    { value: 'picked_up', label: 'Dijemput' },
    { value: 'in_transit', label: 'Dalam Perjalanan' },
    { value: 'out_for_delivery', label: 'Sedang Dikirim' },
    { value: 'delivered', label: 'Terkirim' },
    { value: 'failed', label: 'Gagal' },
    { value: 'cancelled', label: 'Dibatalkan' },
  ]

  const handleStatusUpdate = () => {
    setIsUpdating(true)
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
    }, 1000)
  }

  return (
    <div className="space-y-4">
      {/* Status Update Card */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Perbarui Status</CardTitle>
          <CardDescription>Ubah status pengiriman</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            className="w-full neon-glow"
            onClick={handleStatusUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                Memperbarui...
              </>
            ) : (
              <>
                <SafeIcon name="CheckCircle2" className="w-4 h-4 mr-2" />
                Perbarui Status
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Tindakan Cepat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="./riwayat-pelacakan-admin.html">
              <SafeIcon name="History" className="w-4 h-4 mr-2" />
              Lihat Riwayat Lengkap
            </a>
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <SafeIcon name="Phone" className="w-4 h-4 mr-2" />
            Hubungi Pengirim
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <SafeIcon name="Phone" className="w-4 h-4 mr-2" />
            Hubungi Penerima
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <SafeIcon name="MapPin" className="w-4 h-4 mr-2" />
            Lihat di Peta
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone Card */}
      <Card className="glass-effect border-destructive/20 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-base text-destructive">Zona Berbahaya</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full justify-start">
                <SafeIcon name="AlertTriangle" className="w-4 h-4 mr-2" />
                Batalkan Pengiriman
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Batalkan Pengiriman?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini tidak dapat dibatalkan. Pengiriman akan dibatalkan dan pengirim akan diberitahu.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                  Batalkan Pengiriman
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-destructive border-destructive/50 hover:bg-destructive/10">
                <SafeIcon name="Trash2" className="w-4 h-4 mr-2" />
                Hapus Pengiriman
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus Pengiriman?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini akan menghapus semua data pengiriman secara permanen. Ini tidak dapat dibatalkan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                  Hapus Permanen
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="glass-effect border-border/50 bg-primary/5">
        <CardContent className="pt-6">
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <SafeIcon name="Info" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>
                <span className="font-semibold">ID Pengiriman:</span> VEL-2024-001234
              </p>
            </div>
            <div className="flex items-start gap-2">
              <SafeIcon name="Info" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>
                <span className="font-semibold">Dibuat:</span> 2024-01-15 08:00:00
              </p>
            </div>
            <div className="flex items-start gap-2">
              <SafeIcon name="Info" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>
                <span className="font-semibold">Terakhir Diperbarui:</span> 2024-01-15 14:30:00
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

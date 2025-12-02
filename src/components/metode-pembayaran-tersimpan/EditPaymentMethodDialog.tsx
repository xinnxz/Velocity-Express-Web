
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import SafeIcon from '@/components/common/SafeIcon'
import type { PaymentMethod } from './types'

interface EditPaymentMethodDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  method: PaymentMethod
  onSave: (data: Partial<PaymentMethod>) => void
}

export default function EditPaymentMethodDialog({
  isOpen,
  onOpenChange,
  method,
  onSave
}: EditPaymentMethodDialogProps) {
  const [formData, setFormData] = useState({
    name: method.name,
    isDefault: method.isDefault
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name: formData.name,
      isDefault: formData.isDefault
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md glass-effect border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SafeIcon name="Edit2" className="w-5 h-5 text-primary" />
            Edit Metode Pembayaran
          </DialogTitle>
          <DialogDescription>
            Ubah nama atau pengaturan default untuk metode pembayaran ini
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Method Info Display */}
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Metode Pembayaran</p>
            <p className="font-semibold">
              {method.type === 'credit_card' && method.cardNumber}
              {method.type === 'ewallet' && method.accountNumber}
              {method.type === 'bank_transfer' && method.accountNumber}
            </p>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Nama Metode Pembayaran</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Kartu Utama, GoPay Pribadi"
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">
              Gunakan nama yang mudah diingat untuk membedakan metode pembayaran Anda
            </p>
          </div>

          {/* Default Checkbox */}
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <Checkbox
              id="default"
              checked={formData.isDefault}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isDefault: checked as boolean })
              }
            />
            <Label htmlFor="default" className="cursor-pointer flex-1">
              <span className="font-medium">Jadikan Metode Default</span>
              <p className="text-xs text-muted-foreground mt-1">
                Metode ini akan dipilih secara otomatis saat melakukan pembayaran
              </p>
            </Label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Batal
            </Button>
            <Button type="submit" className="flex-1 neon-glow">
              <SafeIcon name="Save" className="w-4 h-4 mr-2" />
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

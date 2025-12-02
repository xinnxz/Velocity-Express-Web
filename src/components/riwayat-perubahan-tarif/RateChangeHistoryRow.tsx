
import { useState } from 'react'
import { TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import SafeIcon from '@/components/common/SafeIcon'
import type { RateChangeHistory } from './mockData'

interface RateChangeHistoryRowProps {
  item: RateChangeHistory
}

export default function RateChangeHistoryRow({ item }: RateChangeHistoryRowProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'price_update':
        return 'DollarSign'
      case 'discount_update':
        return 'Percent'
      case 'surcharge_update':
        return 'Plus'
      case 'service_added':
        return 'Plus'
      case 'service_removed':
        return 'Minus'
      default:
        return 'Edit'
    }
  }

  const getChangeTypeLabel = (type: string) => {
    switch (type) {
      case 'price_update':
        return 'Update Harga'
      case 'discount_update':
        return 'Update Diskon'
      case 'surcharge_update':
        return 'Update Biaya Tambahan'
      case 'service_added':
        return 'Layanan Ditambah'
      case 'service_removed':
        return 'Layanan Dihapus'
      default:
        return 'Perubahan Lainnya'
    }
  }

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'price_update':
        return 'text-blue-400'
      case 'discount_update':
        return 'text-green-400'
      case 'surcharge_update':
        return 'text-orange-400'
      case 'service_added':
        return 'text-green-400'
      case 'service_removed':
        return 'text-red-400'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <>
      <TableRow className="border-border/50 hover:bg-muted/20 transition-colors">
        <TableCell className="text-sm">
          <div className="flex flex-col">
            <span className="font-medium">{formatDate(item.changedAt)}</span>
            <span className="text-xs text-muted-foreground">{item.changedAt.split('T')[1]?.slice(0, 5)}</span>
          </div>
        </TableCell>
        <TableCell className="text-sm font-medium">{item.serviceName}</TableCell>
        <TableCell className="text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <SafeIcon name="User" className="w-3 h-3 text-primary" />
            </div>
            <span>{item.changedBy}</span>
          </div>
        </TableCell>
        <TableCell className="text-sm">
          <code className="bg-muted/50 px-2 py-1 rounded text-xs">
            {item.oldValue}
          </code>
        </TableCell>
        <TableCell className="text-sm">
          <code className="bg-primary/20 px-2 py-1 rounded text-xs text-primary">
            {item.newValue}
          </code>
        </TableCell>
        <TableCell className="text-sm">
          <div className={`flex items-center gap-1.5 ${getChangeTypeColor(item.changeType)}`}>
            <SafeIcon name={getChangeTypeIcon(item.changeType)} className="w-4 h-4" />
            <span className="text-xs">{getChangeTypeLabel(item.changeType)}</span>
          </div>
        </TableCell>
        <TableCell className="text-right">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <SafeIcon name="Eye" className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Detail Perubahan Tarif</DialogTitle>
                <DialogDescription>
                  Informasi lengkap tentang perubahan yang dilakukan
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Tanggal & Waktu</p>
                    <p className="text-sm font-medium mt-1">{formatDate(item.changedAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Diubah Oleh</p>
                    <p className="text-sm font-medium mt-1">{item.changedBy}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Nama Layanan</p>
                  <p className="text-sm font-medium mt-1">{item.serviceName}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Tipe Perubahan</p>
                  <div className={`flex items-center gap-1.5 mt-1 ${getChangeTypeColor(item.changeType)}`}>
                    <SafeIcon name={getChangeTypeIcon(item.changeType)} className="w-4 h-4" />
                    <span className="text-sm font-medium">{getChangeTypeLabel(item.changeType)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Nilai Lama</p>
                    <code className="bg-muted/50 px-2 py-1.5 rounded text-xs block mt-1">
                      {item.oldValue}
                    </code>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Nilai Baru</p>
                    <code className="bg-primary/20 px-2 py-1.5 rounded text-xs block mt-1 text-primary">
                      {item.newValue}
                    </code>
                  </div>
                </div>

                {item.notes && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Catatan</p>
                    <p className="text-sm mt-1 text-muted-foreground">{item.notes}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">ID Perubahan</p>
                  <code className="text-xs text-muted-foreground mt-1 block">{item.id}</code>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TableCell>
      </TableRow>
    </>
  )
}

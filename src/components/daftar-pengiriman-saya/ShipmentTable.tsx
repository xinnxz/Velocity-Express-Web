
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'
import SafeIcon from '@/components/common/SafeIcon'
import type { Shipment } from './mockData'

interface ShipmentTableProps {
  shipments: Shipment[]
}

export default function ShipmentTable({ shipments }: ShipmentTableProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="glass-effect rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-primary">Nomor Resi</TableHead>
            <TableHead className="text-primary">Penerima</TableHead>
            <TableHead className="text-primary">Tujuan</TableHead>
            <TableHead className="text-primary">Status</TableHead>
            <TableHead className="text-primary">Tanggal</TableHead>
            <TableHead className="text-primary">Biaya</TableHead>
            <TableHead className="text-primary text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments.map((shipment) => (
            <TableRow key={shipment.id} className="border-border hover:bg-muted/30 transition-colors">
              <TableCell className="font-mono text-sm font-semibold">
                {shipment.trackingNumber}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{shipment.recipientName}</p>
                  <p className="text-xs text-muted-foreground">{shipment.recipientPhone}</p>
                </div>
              </TableCell>
              <TableCell className="text-sm">{shipment.destination}</TableCell>
              <TableCell>
                <TrackingStatusBadge status={shipment.status} />
              </TableCell>
              <TableCell className="text-sm">{formatDate(shipment.createdAt)}</TableCell>
              <TableCell className="font-semibold">{formatPrice(shipment.totalCost)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    title="Lihat Detail"
                  >
                    <a href={`./detail-pengiriman-terdaftar.html?id=${shipment.id}`}>
                      <SafeIcon name="Eye" className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    title="Lacak Real-time"
                  >
                    <a href={`./pelacakan-real-time.html?id=${shipment.id}`}>
                      <SafeIcon name="MapPin" className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

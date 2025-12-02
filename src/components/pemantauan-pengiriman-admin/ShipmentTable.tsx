
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'
import type { Shipment } from '@/types/shipment'

interface ShipmentTableProps {
  shipments: Shipment[]
  sortField: 'date' | 'status' | 'tracking_number' | 'amount'
  sortOrder: 'asc' | 'desc'
  onSort: (field: 'date' | 'status' | 'tracking_number' | 'amount') => void
}

const SortHeader = ({
  label,
  field,
  currentField,
  sortOrder,
  onSort,
}: {
  label: string
  field: 'date' | 'status' | 'tracking_number' | 'amount'
  currentField: string
  sortOrder: 'asc' | 'desc'
  onSort: (field: 'date' | 'status' | 'tracking_number' | 'amount') => void
}) => (
  <button
    onClick={() => onSort(field)}
    className="flex items-center gap-2 hover:text-primary transition-colors"
  >
    {label}
    {currentField === field && (
      <SafeIcon
        name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
        className="w-4 h-4"
      />
    )}
  </button>
)

export default function ShipmentTable({
  shipments,
  sortField,
  sortOrder,
  onSort,
}: ShipmentTableProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden glass-effect">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-[140px]">
                <SortHeader
                  label="Nomor Resi"
                  field="tracking_number"
                  currentField={sortField}
                  sortOrder={sortOrder}
                  onSort={onSort}
                />
              </TableHead>
              <TableHead>Pengirim</TableHead>
              <TableHead>Penerima</TableHead>
              <TableHead>
                <SortHeader
                  label="Status"
                  field="status"
                  currentField={sortField}
                  sortOrder={sortOrder}
                  onSort={onSort}
                />
              </TableHead>
              <TableHead>
                <SortHeader
                  label="Tanggal"
                  field="date"
                  currentField={sortField}
                  sortOrder={sortOrder}
                  onSort={onSort}
                />
              </TableHead>
              <TableHead className="text-right">
                <SortHeader
                  label="Biaya"
                  field="amount"
                  currentField={sortField}
                  sortOrder={sortOrder}
                  onSort={onSort}
                />
              </TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.id} className="border-border hover:bg-muted/50">
                <TableCell className="font-mono text-sm font-semibold">
                  {shipment.tracking_number}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="font-medium">{shipment.sender_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {shipment.sender_phone}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="font-medium">{shipment.receiver_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {shipment.receiver_phone}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <TrackingStatusBadge status={shipment.status} />
                </TableCell>
                <TableCell className="text-sm">
                  {formatDate(shipment.created_at)}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatCurrency(shipment.amount)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="gap-2"
                  >
                    <a href={`./detail-pengiriman-admin.html?id=${shipment.id}`}>
                      <SafeIcon name="Eye" className="w-4 h-4" />
                      <span className="hidden sm:inline">Lihat</span>
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

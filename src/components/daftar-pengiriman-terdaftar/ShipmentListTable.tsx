
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingStatusBadge from '@/components/common/TrackingStatusBadge'
import ShipmentListItem from './ShipmentListItem'
import type { Shipment } from './types'

interface ShipmentListTableProps {
  shipments: Shipment[]
}

export default function ShipmentListTable({
  shipments,
}: ShipmentListTableProps) {
  return (
    <div className="space-y-3">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Nomor Resi</th>
              <th className="px-4 py-3 text-left font-semibold">Penerima</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Tanggal</th>
              <th className="px-4 py-3 text-left font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {shipments.map((shipment) => (
              <tr
                key={shipment.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <SafeIcon name="Package" className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-xs font-semibold text-primary">
                      {shipment.trackingNumber}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{shipment.recipient.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {shipment.recipient.address}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <TrackingStatusBadge status={shipment.status} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(shipment.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-primary hover:text-primary hover:bg-primary/10"
                  >
                    <a href={`./detail-pelacakan-akun.html?id=${shipment.id}`}>
                      <SafeIcon name="ChevronRight" className="w-4 h-4" />
                    </a>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {shipments.map((shipment) => (
          <ShipmentListItem key={shipment.id} shipment={shipment} />
        ))}
      </div>
    </div>
  )
}


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import type { TrackingEvent } from './mockData'
import { cn } from '@/lib/utils'

interface TrackingHistoryTableProps {
  events: TrackingEvent[]
}

const statusColorMap: Record<string, string> = {
  pending: 'bg-muted text-muted-foreground',
  picked_up: 'bg-blue-500/20 text-blue-400 border border-blue-500/50',
  in_transit: 'bg-primary/20 text-primary border border-primary/50',
  out_for_delivery: 'bg-purple-500/20 text-purple-400 border border-purple-500/50',
  delivered: 'bg-green-500/20 text-green-400 border border-green-500/50',
  failed: 'bg-destructive/20 text-destructive border border-destructive/50',
}

const eventTypeConfig: Record<string, { icon: string; color: string }> = {
  pickup: { icon: 'PackageCheck', color: 'text-blue-400' },
  transit: { icon: 'Truck', color: 'text-primary' },
  location_update: { icon: 'MapPin', color: 'text-purple-400' },
  delivery_attempt: { icon: 'AlertCircle', color: 'text-yellow-400' },
  delivered: { icon: 'CheckCircle2', color: 'text-green-400' },
  failed: { icon: 'XCircle', color: 'text-destructive' },
  note: { icon: 'MessageSquare', color: 'text-muted-foreground' },
}

export default function TrackingHistoryTable({ events }: TrackingHistoryTableProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden glass-effect">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="w-12">Tipe</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Koordinat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, index) => {
              const config = eventTypeConfig[event.eventType] || eventTypeConfig.note
              return (
                <TableRow 
                  key={index}
                  className="border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="w-12">
                    <div className="flex items-center justify-center">
                      <SafeIcon 
                        name={config.icon} 
                        className={cn('w-4 h-4', config.color)}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    {event.timestamp}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{event.description}</span>
                      {event.notes && (
                        <span className="text-xs text-muted-foreground">
                          {event.notes}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {event.location}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      'whitespace-nowrap',
                      statusColorMap[event.status] || 'bg-muted'
                    )}>
                      {event.statusLabel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-xs font-mono text-muted-foreground">
                    {event.coordinates || '-'}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

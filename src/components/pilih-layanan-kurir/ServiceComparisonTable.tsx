
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
import type { CourierServiceModel } from '@/data/carrier_services'
import { cn } from '@/lib/utils'

interface ServiceComparisonTableProps {
  services: CourierServiceModel[]
  selectedServiceId: number
  onSelect: (serviceId: number) => void
}

export default function ServiceComparisonTable({
  services,
  selectedServiceId,
  onSelect
}: ServiceComparisonTableProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden glass-effect">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="font-semibold">Layanan</TableHead>
            <TableHead className="text-center">Kendaraan</TableHead>
            <TableHead className="text-center">Estimasi</TableHead>
            <TableHead className="text-center">Max Berat</TableHead>
            <TableHead className="text-center">Garansi</TableHead>
            <TableHead className="text-right">Harga</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow
              key={service.id}
              className={cn(
                'border-border cursor-pointer transition-colors',
                selectedServiceId === service.id
                  ? 'bg-primary/10 hover:bg-primary/15'
                  : 'hover:bg-muted/50'
              )}
              onClick={() => onSelect(service.id)}
            >
              {/* Service Name */}
              <TableCell className="font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <SafeIcon name={service.iconName} className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{service.name}</p>
                    <p className="text-xs text-muted-foreground">{service.slogan}</p>
                  </div>
                </div>
              </TableCell>

              {/* Vehicle Type */}
              <TableCell className="text-center text-sm">
                {service.vehicleType}
              </TableCell>

              {/* ETA */}
              <TableCell className="text-center text-sm font-semibold">
                {service.etaDays < 1
                  ? `${Math.round(service.etaDays * 24)} jam`
                  : `${service.etaDays} hari`}
              </TableCell>

              {/* Max Weight */}
              <TableCell className="text-center text-sm">
                {service.maxWeightKg} kg
              </TableCell>

              {/* Guarantee */}
              <TableCell className="text-center">
                {service.isGuaranteed ? (
                  <span className="inline-flex items-center gap-1 text-xs text-green-400">
                    <SafeIcon name="CheckCircle2" className="w-4 h-4" />
                    Ya
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">Tidak</span>
                )}
              </TableCell>

              {/* Price */}
              <TableCell className="text-right font-bold gradient-text">
                Rp {service.priceIDR.toLocaleString('id-ID')}
              </TableCell>

              {/* Action */}
              <TableCell className="text-center">
                <Button
                  size="sm"
                  variant={selectedServiceId === service.id ? 'default' : 'outline'}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelect(service.id)
                  }}
                  className="gap-1"
                >
                  {selectedServiceId === service.id ? (
                    <>
                      <SafeIcon name="Check" className="w-3 h-3" />
                      <span className="hidden sm:inline">Dipilih</span>
                    </>
                  ) : (
                    <>
                      <SafeIcon name="Plus" className="w-3 h-3" />
                      <span className="hidden sm:inline">Pilih</span>
                    </>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

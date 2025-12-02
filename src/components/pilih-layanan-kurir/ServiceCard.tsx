
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'
import type { CourierServiceModel } from '@/data/carrier_services'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  service: CourierServiceModel
  isSelected: boolean
  onSelect: () => void
}

export default function ServiceCard({
  service,
  isSelected,
  onSelect
}: ServiceCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/50',
        isSelected
          ? 'border-primary/80 bg-primary/10 neon-glow'
          : 'border-border hover:bg-card/80'
      )}
      onClick={onSelect}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-primary rounded-bl-lg flex items-center justify-center">
          <SafeIcon name="Check" className="w-6 h-6 text-primary-foreground" />
        </div>
      )}

      <div className="p-4 space-y-4">
        {/* Service Image */}
        <div className="relative h-40 rounded-lg overflow-hidden bg-muted/50">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        {/* Service Name & Icon */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm leading-tight flex-1">
              {service.name}
            </h3>
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <SafeIcon name={service.iconName} className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic line-clamp-2">
            {service.slogan}
          </p>
        </div>

        {/* Key Details */}
        <div className="space-y-2 pt-2 border-t border-border/50">
          {/* ETA */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1">
              <SafeIcon name="Clock" className="w-3 h-3" />
              Estimasi
            </span>
            <span className="font-semibold">
              {service.etaDays < 1
                ? `${Math.round(service.etaDays * 24)}h`
                : `${service.etaDays}d`}
            </span>
          </div>

          {/* Max Weight */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1">
              <SafeIcon name="Weight" className="w-3 h-3" />
              Max Berat
            </span>
            <span className="font-semibold">{service.maxWeightKg}kg</span>
          </div>

          {/* Guarantee Badge */}
          {service.isGuaranteed && (
            <div className="flex items-center gap-1 text-xs text-green-400">
              <SafeIcon name="Shield" className="w-3 h-3" />
              <span>Terjamin</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-border/50 space-y-2">
          <p className="text-xs text-muted-foreground">Harga</p>
          <p className="text-lg font-bold gradient-text">
            Rp {service.priceIDR.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Select Button */}
        <Button
          onClick={onSelect}
          variant={isSelected ? 'default' : 'outline'}
          className="w-full"
        >
          {isSelected ? 'Dipilih' : 'Pilih Layanan'}
        </Button>
      </div>
    </Card>
  )
}

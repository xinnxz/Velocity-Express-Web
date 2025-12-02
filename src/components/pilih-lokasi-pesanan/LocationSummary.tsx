
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import type { LocationModel } from '@/data/order_data'

interface LocationSummaryProps {
  origin: LocationModel | null
  destination: LocationModel | null
  distance: number | null
}

export default function LocationSummary({ 
  origin, 
  destination, 
  distance 
}: LocationSummaryProps) {
  return (
    <Card className="glass-effect border-primary/20 sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Ringkasan Lokasi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Origin */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <SafeIcon name="MapPin" className="w-3 h-3 text-primary" />
            </div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Dari</p>
          </div>
          {origin ? (
            <div className="ml-7 space-y-1">
              <p className="text-sm font-medium">{origin.city}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {origin.addressLine1}
              </p>
              <p className="text-xs text-muted-foreground/70">
                {origin.postalCode}
              </p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground ml-7">Belum dipilih</p>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 py-2">
          <div className="flex-1 h-px bg-border/50"></div>
          {distance && (
            <div className="text-center">
              <p className="text-xs font-semibold text-primary">{distance} km</p>
            </div>
          )}
          <div className="flex-1 h-px bg-border/50"></div>
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <SafeIcon name="MapPin" className="w-3 h-3 text-secondary" />
            </div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Ke</p>
          </div>
          {destination ? (
            <div className="ml-7 space-y-1">
              <p className="text-sm font-medium">{destination.city}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {destination.addressLine1}
              </p>
              <p className="text-xs text-muted-foreground/70">
                {destination.postalCode}
              </p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground ml-7">Belum dipilih</p>
          )}
        </div>

        {/* Status */}
        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            {origin && destination ? (
              <>
                <SafeIcon name="CheckCircle2" className="w-4 h-4 text-green-500" />
                <p className="text-xs font-medium text-green-500">Lokasi lengkap</p>
              </>
            ) : (
              <>
                <SafeIcon name="AlertCircle" className="w-4 h-4 text-yellow-500" />
                <p className="text-xs font-medium text-yellow-500">Lengkapi lokasi</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

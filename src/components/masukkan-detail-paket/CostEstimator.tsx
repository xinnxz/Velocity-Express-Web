
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'
import { type PackageDetailModel } from '@/data/order_data'

interface CostEstimatorProps {
  packageDetails: PackageDetailModel
}

export default function CostEstimator({ packageDetails }: CostEstimatorProps) {
  // Calculate base cost based on weight and volume
  const weight = packageDetails.weightKg
  const volume = (packageDetails.lengthCm * packageDetails.widthCm * packageDetails.heightCm) / 1000
  
  // Base rate: Rp 5,000 per kg or per liter (whichever is higher)
  const baseCostPerKg = weight * 5000
  const baseCostPerVolume = volume * 5000
  const baseCost = Math.max(baseCostPerKg, baseCostPerVolume)
  
  // Fragile surcharge: 20%
  const fragileSurcharge = packageDetails.isFragile ? baseCost * 0.2 : 0
  
  // Insurance cost: 0.5% of declared value
  const insuranceCost = packageDetails.declaredValueIDR * 0.005
  
  // Total estimated cost (before courier service selection)
  const totalEstimatedCost = baseCost + fragileSurcharge + insuranceCost

  return (
    <Card className="glass-effect border-border/50 sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SafeIcon name="Calculator" className="w-5 h-5" />
          Estimasi Biaya
        </CardTitle>
        <CardDescription>
          Biaya dasar sebelum memilih layanan kurir
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Package Summary */}
        <div className="space-y-2 p-3 rounded-lg bg-muted/20 border border-border/50">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Jenis Paket:</span>
            <span className="font-semibold">{packageDetails.packageType.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Berat:</span>
            <span className="font-semibold">{packageDetails.weightKg} kg</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Volume:</span>
            <span className="font-semibold">
              {((packageDetails.lengthCm * packageDetails.widthCm * packageDetails.heightCm) / 1000).toFixed(2)} L
            </span>
          </div>
          {packageDetails.isFragile && (
            <div className="flex items-center gap-2 text-sm text-orange-400 pt-2 border-t border-border/50">
              <SafeIcon name="AlertTriangle" className="w-4 h-4" />
              <span>Paket mudah pecah</span>
            </div>
          )}
        </div>

        <Separator className="bg-border/50" />

        {/* Cost Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Biaya Dasar:</span>
            <span>Rp {baseCost.toLocaleString('id-ID')}</span>
          </div>
          
          {packageDetails.isFragile && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Surcharge Fragile (20%):</span>
              <span className="text-orange-400">+ Rp {fragileSurcharge.toLocaleString('id-ID')}</span>
            </div>
          )}
          
          {packageDetails.declaredValueIDR > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Asuransi (0.5%):</span>
              <span>+ Rp {insuranceCost.toLocaleString('id-ID')}</span>
            </div>
          )}
        </div>

        <Separator className="bg-border/50" />

        {/* Total */}
        <div className="flex justify-between items-center pt-2">
          <span className="font-semibold">Subtotal:</span>
          <span className="text-lg font-bold text-primary">
            Rp {totalEstimatedCost.toLocaleString('id-ID')}
          </span>
        </div>

        {/* Info */}
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-xs text-primary/80">
          <p>
            <SafeIcon name="Info" className="w-3 h-3 inline mr-1" />
            Biaya akhir akan ditambahkan dengan tarif layanan kurir yang dipilih
          </p>
        </div>

        {/* Weight Limit Warning */}
        {packageDetails.weightKg > 30 && (
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-xs text-yellow-600 dark:text-yellow-400">
            <p>
              <SafeIcon name="AlertTriangle" className="w-3 h-3 inline mr-1" />
              Paket berat. Beberapa layanan kurir mungkin tidak tersedia.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

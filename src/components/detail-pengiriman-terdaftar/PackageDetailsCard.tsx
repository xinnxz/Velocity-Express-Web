
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface PackageDetailsCardProps {
  package: {
    weight: number
    dimensions: string
    contents: string
    value: string
    insurance: boolean
    specialInstructions: string
  }
}

export default function PackageDetailsCard({ package: pkg }: PackageDetailsCardProps) {
  return (
    <Card className="glass-effect border-border/50 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
          <SafeIcon name="Box" className="w-4 h-4 text-secondary" />
        </div>
        <h3 className="font-semibold">Detail Paket</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Berat</p>
          <p className="text-sm font-medium">{pkg.weight} kg</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Dimensi</p>
          <p className="text-sm font-medium">{pkg.dimensions}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Nilai</p>
          <p className="text-sm font-medium">{pkg.value}</p>
        </div>
      </div>

      <div className="pt-4 border-t border-border/50 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Isi Paket</p>
          <p className="text-sm">{pkg.contents}</p>
        </div>

        <div className="flex items-center gap-2">
          {pkg.insurance && (
            <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/50">
              <SafeIcon name="Shield" className="w-3 h-3 mr-1" />
              Asuransi Aktif
            </Badge>
          )}
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">Instruksi Khusus</p>
          <div className="bg-background/50 rounded-lg p-3 border border-border/50">
            <p className="text-sm text-foreground/80">{pkg.specialInstructions}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

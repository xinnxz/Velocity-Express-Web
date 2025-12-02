
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'

interface Package {
  weight: string
  dimensions: string
  contents: string
  insurance: string
}

interface PackageDetailsCardProps {
  title: string
  package: Package
}

export default function PackageDetailsCard({ title, package: pkg }: PackageDetailsCardProps) {
  return (
    <Card className="glass-effect border-border">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <SafeIcon name="Weight" className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Berat</p>
              <p className="font-semibold">{pkg.weight}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <SafeIcon name="Box" className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Dimensi</p>
              <p className="font-semibold">{pkg.dimensions}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <SafeIcon name="Package" className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Isi Paket</p>
              <p className="font-semibold">{pkg.contents}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <SafeIcon name="Shield" className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Asuransi</p>
              <p className="font-semibold">{pkg.insurance}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

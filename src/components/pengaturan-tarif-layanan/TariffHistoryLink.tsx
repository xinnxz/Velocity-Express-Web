
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'

export default function TariffHistoryLink() {
  return (
    <Card className="glass-effect border-border/50">
      <CardHeader>
        <CardTitle>Riwayat Perubahan Tarif</CardTitle>
        <CardDescription>
          Lihat log lengkap semua perubahan tarif yang telah dilakukan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/30 border border-border/50 rounded-lg p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
            <SafeIcon name="History" className="w-8 h-8 text-primary" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Riwayat Perubahan Tarif</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Akses halaman riwayat perubahan tarif untuk melihat log lengkap semua modifikasi tarif, 
              termasuk siapa yang melakukan perubahan dan kapan perubahan tersebut dilakukan.
            </p>
          </div>

          <Button asChild className="neon-glow">
            <a href="./riwayat-perubahan-tarif.html">
              <SafeIcon name="ArrowRight" className="w-4 h-4 mr-2" />
              Lihat Riwayat Perubahan
            </a>
          </Button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-2">
          <div className="flex gap-3">
            <SafeIcon name="Info" className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-400 mb-1">Catatan Penting</p>
              <p className="text-blue-300/80">
                Setiap perubahan tarif akan dicatat secara otomatis dalam sistem. 
                Anda dapat melacak siapa yang membuat perubahan dan kapan perubahan tersebut dilakukan 
                untuk keperluan audit dan transparansi.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

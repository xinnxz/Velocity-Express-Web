
import SafeIcon from '@/components/common/SafeIcon'

export default function PaymentSecurityInfo() {
  const securityFeatures = [
    {
      icon: 'Lock',
      title: 'Enkripsi SSL',
      description: 'Data Anda dienkripsi dengan standar industri'
    },
    {
      icon: 'Shield',
      title: 'Perlindungan Fraud',
      description: 'Sistem deteksi penipuan real-time'
    },
    {
      icon: 'CheckCircle2',
      title: 'Verifikasi 3D Secure',
      description: 'Lapisan keamanan tambahan untuk transaksi'
    }
  ]

  return (
    <div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border/50">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        <SafeIcon name="Shield" className="w-4 h-4 text-primary" />
        Keamanan Pembayaran
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex gap-3">
            <SafeIcon 
              name={feature.icon} 
              className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" 
            />
            <div className="min-w-0">
              <p className="text-xs font-medium">{feature.title}</p>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
        <p>
          Kami tidak pernah menyimpan data kartu Anda. Semua transaksi diproses melalui gateway pembayaran tersertifikasi PCI DSS.
        </p>
      </div>
    </div>
  )
}

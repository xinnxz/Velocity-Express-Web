
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'
import SuccessAnimation from '@/components/konfirmasi-pembayaran-sukses/SuccessAnimation'
import TransactionDetails from '@/components/konfirmasi-pembayaran-sukses/TransactionDetails'
import OrderSummary from '@/components/konfirmasi-pembayaran-sukses/OrderSummary'
import DeliveryEstimate from '@/components/konfirmasi-pembayaran-sukses/DeliveryEstimate'

// Mock data for payment success
const mockPaymentData = {
  transactionId: 'TRX-2024-001847',
  timestamp: new Date('2024-01-15T14:30:00'),
  amount: 125000,
  paymentMethod: 'Kartu Kredit',
  status: 'Berhasil',
  order: {
    orderId: 'ORD-2024-001847',
    sender: {
      name: 'Budi Santoso',
      address: 'Jl. Merdeka No. 123, Jakarta Pusat, 12190',
      phone: '+62812-3456-7890'
    },
    recipient: {
      name: 'Siti Nurhaliza',
      address: 'Jl. Sudirman No. 456, Bandung, 40123',
      phone: '+62812-9876-5432'
    },
    package: {
      type: 'Dokumen Penting',
      weight: '0.5 kg',
      dimensions: '20x15x5 cm',
      description: 'Dokumen kontrak bisnis'
    },
    service: {
      name: 'Express Drone',
      estimatedTime: '2-3 jam',
      icon: 'Zap'
    },
    cost: {
      baseCost: 100000,
      insurance: 15000,
      discount: 0,
      total: 125000
    }
  }
}

export default function PaymentSuccessContent() {
  return (
    <div className="container-custom py-8 md:py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Success Animation */}
        <SuccessAnimation />

        {/* Main Success Message */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">
            Pembayaran Berhasil!
          </h1>
          <p className="text-lg text-muted-foreground">
            Pesanan Anda telah dikonfirmasi dan siap diproses
          </p>
        </div>

        {/* Transaction Details Card */}
        <Card className="border-primary/30 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SafeIcon name="Receipt" className="w-5 h-5 text-primary" />
              Detail Transaksi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionDetails data={mockPaymentData} />
          </CardContent>
        </Card>

        {/* Order Summary Card */}
        <Card className="border-primary/30 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SafeIcon name="Package" className="w-5 h-5 text-primary" />
              Ringkasan Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OrderSummary order={mockPaymentData.order} />
          </CardContent>
        </Card>

        {/* Delivery Estimate Card */}
        <Card className="border-primary/30 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SafeIcon name="Clock" className="w-5 h-5 text-primary" />
              Estimasi Pengiriman
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DeliveryEstimate service={mockPaymentData.order.service} />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button 
            asChild 
            className="flex-1 neon-glow"
            size="lg"
          >
            <a href="./detail-pengiriman-terdaftar.html">
              <SafeIcon name="Eye" className="w-4 h-4 mr-2" />
              Lihat Detail Pengiriman
            </a>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            className="flex-1"
            size="lg"
          >
            <a href="./beranda.html">
              <SafeIcon name="Home" className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </a>
          </Button>
        </div>

        {/* Additional Info */}
        <Card className="border-border/50 bg-muted/20">
          <CardContent className="pt-6">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <SafeIcon name="Info" className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Konfirmasi Email</p>
                  <p className="text-muted-foreground">
                    Kami telah mengirimkan konfirmasi pembayaran dan detail pesanan ke email Anda
                  </p>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex items-start gap-3">
                <SafeIcon name="Truck" className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Lacak Paket Anda</p>
                  <p className="text-muted-foreground">
                    Anda dapat melacak paket Anda secara real-time melalui aplikasi atau website kami
                  </p>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex items-start gap-3">
                <SafeIcon name="Headphones" className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Butuh Bantuan?</p>
                  <p className="text-muted-foreground">
                    Hubungi tim dukungan kami di <a href="tel:+62212345678" className="text-primary hover:underline">+62 (21) 2345-678</a> atau <a href="mailto:support@velocity.com" className="text-primary hover:underline">support@velocity.com</a>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

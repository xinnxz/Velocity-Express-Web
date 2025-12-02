
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'

interface PaymentFailureData {
  orderId: string
  orderDate: string
  failureReason: string
  failureCode: string
  amount: number
  currency: string
  recipientName: string
  recipientAddress: string
  senderName: string
  senderAddress: string
  serviceType: string
  estimatedDelivery: string
}

const mockPaymentFailure: PaymentFailureData = {
  orderId: 'VEL-2024-001234',
  orderDate: '2024-01-15 14:30',
  failureReason: 'Kartu kredit ditolak oleh bank penerbit',
  failureCode: 'CARD_DECLINED',
  amount: 125000,
  currency: 'IDR',
  recipientName: 'Budi Santoso',
  recipientAddress: 'Jl. Merdeka No. 42, Jakarta Pusat 12190',
  senderName: 'Ahmad Wijaya',
  senderAddress: 'Jl. Sudirman No. 15, Jakarta Selatan 12920',
  serviceType: 'Express Delivery',
  estimatedDelivery: '2024-01-16 10:00 - 14:00'
}

const failureReasons = [
  {
    code: 'CARD_DECLINED',
    title: 'Kartu Ditolak',
    description: 'Bank penerbit kartu Anda menolak transaksi ini. Hubungi bank Anda untuk informasi lebih lanjut.'
  },
  {
    code: 'INSUFFICIENT_FUNDS',
    title: 'Saldo Tidak Cukup',
    description: 'Saldo di rekening atau kartu Anda tidak cukup untuk melakukan transaksi ini.'
  },
  {
    code: 'EXPIRED_CARD',
    title: 'Kartu Kadaluarsa',
    description: 'Tanggal kadaluarsa kartu Anda telah terlewati. Gunakan kartu yang masih berlaku.'
  },
  {
    code: 'INVALID_CVV',
    title: 'CVV Tidak Valid',
    description: 'Kode keamanan (CVV) yang Anda masukkan tidak sesuai dengan kartu Anda.'
  },
  {
    code: 'NETWORK_ERROR',
    title: 'Kesalahan Jaringan',
    description: 'Terjadi kesalahan koneksi saat memproses pembayaran. Silakan coba lagi.'
  },
  {
    code: 'TIMEOUT',
    title: 'Waktu Habis',
    description: 'Proses pembayaran memakan waktu terlalu lama. Silakan coba lagi dengan koneksi yang lebih stabil.'
  }
]

export default function PaymentFailureContent() {
  const [paymentData] = useState<PaymentFailureData>(mockPaymentFailure)
  
  const failureDetail = failureReasons.find(r => r.code === paymentData.failureCode) || {
    code: paymentData.failureCode,
    title: 'Pembayaran Gagal',
    description: paymentData.failureReason
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Failure Status Card */}
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center">
                <SafeIcon name="XCircle" className="w-10 h-10 text-destructive" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Pembayaran Gagal</h1>
                <p className="text-muted-foreground">
                  Transaksi Anda tidak dapat diproses. Silakan coba lagi dengan metode pembayaran lain.
                </p>
              </div>

              <div className="bg-background/50 rounded-lg p-4 w-full text-left">
                <p className="text-sm text-muted-foreground mb-1">Nomor Pesanan</p>
                <p className="text-lg font-semibold font-mono">{paymentData.orderId}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Failure Reason Alert */}
        <Alert variant="destructive" className="border-destructive/50">
          <SafeIcon name="AlertCircle" className="h-4 w-4" />
          <AlertTitle>{failureDetail.title}</AlertTitle>
          <AlertDescription className="mt-2">
            {failureDetail.description}
          </AlertDescription>
        </Alert>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detail Pesanan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tanggal Pesanan</p>
                <p className="font-medium">{paymentData.orderDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Jenis Layanan</p>
                <p className="font-medium">{paymentData.serviceType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estimasi Pengiriman</p>
                <p className="font-medium">{paymentData.estimatedDelivery}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Pembayaran</p>
                <p className="font-bold text-primary">{formatCurrency(paymentData.amount)}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <SafeIcon name="MapPin" className="w-4 h-4" />
                  Pengirim
                </p>
                <div className="bg-muted/30 rounded-lg p-3 space-y-1">
                  <p className="font-medium">{paymentData.senderName}</p>
                  <p className="text-sm text-muted-foreground">{paymentData.senderAddress}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <SafeIcon name="MapPin" className="w-4 h-4" />
                  Penerima
                </p>
                <div className="bg-muted/30 rounded-lg p-3 space-y-1">
                  <p className="font-medium">{paymentData.recipientName}</p>
                  <p className="text-sm text-muted-foreground">{paymentData.recipientAddress}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full h-11 neon-glow" 
            asChild
          >
            <a href="./pilih-metode-pembayaran.html">
              <SafeIcon name="CreditCard" className="w-4 h-4 mr-2" />
              Coba Lagi dengan Metode Lain
            </a>
          </Button>

          <Button 
            variant="outline" 
            className="w-full h-11"
            asChild
          >
            <a href="./ringkasan-konfirmasi-pesanan.html">
              <SafeIcon name="ChevronLeft" className="w-4 h-4 mr-2" />
              Kembali ke Ringkasan Pesanan
            </a>
          </Button>

          <Button 
            variant="ghost" 
            className="w-full h-11"
            asChild
          >
            <a href="./kontak-dukungan-pembayaran.html">
              <SafeIcon name="HelpCircle" className="w-4 h-4 mr-2" />
              Hubungi Dukungan Pelanggan
            </a>
          </Button>
        </div>

        {/* Help Section */}
        <Card className="bg-muted/30 border-muted">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <SafeIcon name="Lightbulb" className="w-5 h-5 text-primary" />
              Tips untuk Mengatasi Masalah Pembayaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <SafeIcon name="CheckCircle2" className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Pastikan data kartu kredit/debit Anda benar, termasuk nomor, tanggal kadaluarsa, dan CVV</span>
              </li>
              <li className="flex gap-3">
                <SafeIcon name="CheckCircle2" className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Periksa saldo rekening atau limit kartu Anda untuk memastikan cukup untuk transaksi</span>
              </li>
              <li className="flex gap-3">
                <SafeIcon name="CheckCircle2" className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Hubungi bank Anda jika kartu Anda sering ditolak atau ada aktivitas mencurigakan</span>
              </li>
              <li className="flex gap-3">
                <SafeIcon name="CheckCircle2" className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Coba gunakan metode pembayaran alternatif seperti transfer bank atau e-wallet</span>
              </li>
              <li className="flex gap-3">
                <SafeIcon name="CheckCircle2" className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Pastikan koneksi internet Anda stabil saat melakukan transaksi</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Support Card */}
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base">Butuh Bantuan?</CardTitle>
            <CardDescription>
              Tim dukungan pelanggan kami siap membantu Anda 24/7
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <SafeIcon name="Phone" className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Telepon</p>
                <p className="font-medium">1500-VELOCITY (1500-835-4829)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SafeIcon name="Mail" className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">support@velocity-express.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SafeIcon name="MessageCircle" className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Live Chat</p>
                <p className="font-medium">Tersedia di aplikasi VeloCity Express</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <Button 
          variant="ghost" 
          className="w-full"
          asChild
        >
          <a href="./beranda.html">
            <SafeIcon name="Home" className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </a>
        </Button>
      </div>
    </div>
  )
}

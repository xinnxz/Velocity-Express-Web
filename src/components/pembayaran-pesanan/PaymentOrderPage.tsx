
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'
import OrderSummaryCard from '@/components/pembayaran-pesanan/OrderSummaryCard'
import PaymentMethodSelector from '@/components/pembayaran-pesanan/PaymentMethodSelector'
import PaymentStatusIndicator from '@/components/pembayaran-pesanan/PaymentStatusIndicator'

// Mock order data
const mockOrderData = {
  orderId: 'ORD-2024-001234',
  createdAt: '2024-01-15T10:30:00Z',
  items: [
    {
      id: 1,
      name: 'Paket Dokumen Penting',
      quantity: 1,
      price: 50000,
      weight: '0.5 kg',
      dimensions: '20x15x5 cm'
    },
    {
      id: 2,
      name: 'Barang Elektronik',
      quantity: 2,
      price: 150000,
      weight: '2 kg',
      dimensions: '30x20x10 cm'
    }
  ],
  pickupLocation: 'Jl. Merdeka No. 123, Jakarta Pusat',
  deliveryLocation: 'Jl. Sudirman No. 456, Jakarta Selatan',
  serviceType: 'Express Drone Delivery',
  estimatedDelivery: '2024-01-16T14:00:00Z',
  subtotal: 200000,
  shippingFee: 75000,
  tax: 27500,
  discount: 0,
  total: 302500
}

const mockPaymentMethods = [
  {
    id: 'card',
    name: 'Kartu Kredit/Debit',
    icon: 'CreditCard',
    description: 'Visa, Mastercard, atau kartu debit lokal',
    available: true
  },
  {
    id: 'bank_transfer',
    name: 'Transfer Bank',
    icon: 'Building2',
    description: 'Transfer langsung ke rekening VeloCity Express',
    available: true
  },
  {
    id: 'ewallet',
    name: 'E-Wallet',
    icon: 'Wallet',
    description: 'GCash, OVO, DANA, atau e-wallet lainnya',
    available: true
  },
  {
    id: 'installment',
    name: 'Cicilan 0%',
    icon: 'Percent',
    description: 'Cicilan tanpa bunga hingga 12 bulan',
    available: false
  }
]

const mockPaymentStatus = {
  status: 'pending', // pending, processing, completed, failed
  message: 'Menunggu pembayaran Anda',
  lastAttempt: null,
  attempts: 0
}

export default function PaymentOrderPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [paymentStatus, setPaymentStatus] = useState(mockPaymentStatus)

  const handleContinuePayment = () => {
    if (selectedMethod === 'card') {
      window.location.href = './detail-pembayaran-online.html'
    } else if (selectedMethod === 'bank_transfer') {
      window.location.href = './instruksi-pembayaran-transfer-bank.html'
    } else if (selectedMethod === 'ewallet') {
      // In real app, would redirect to e-wallet payment gateway
      window.location.href = './detail-pembayaran-online.html'
    }
  }

  const handleGetHelp = () => {
    window.location.href = './kontak-dukungan-pembayaran.html'
  }

  const handleBack = () => {
    window.location.href = './ringkasan-konfirmasi-pesanan.html'
  }

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <SafeIcon name="CreditCard" className="w-6 h-6 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Pembayaran Pesanan</h1>
          </div>
          <p className="text-muted-foreground">
            Pilih metode pembayaran untuk menyelesaikan pesanan Anda
          </p>
        </div>

        {/* Payment Status */}
        <div className="mb-8">
          <PaymentStatusIndicator status={paymentStatus.status} message={paymentStatus.message} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Summary */}
            <OrderSummaryCard order={mockOrderData} />

            {/* Payment Methods */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SafeIcon name="Wallet" className="w-5 h-5 text-primary" />
                  Pilih Metode Pembayaran
                </CardTitle>
                <CardDescription>
                  Pilih salah satu metode pembayaran yang tersedia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentMethodSelector 
                  methods={mockPaymentMethods}
                  selectedMethod={selectedMethod}
                  onSelectMethod={setSelectedMethod}
                />
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <SafeIcon name="Info" className="w-5 h-5 text-primary" />
                  Informasi Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nomor Pesanan:</span>
                    <span className="font-mono font-semibold">{mockOrderData.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tanggal Pesanan:</span>
                    <span>{new Date(mockOrderData.createdAt).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimasi Pengiriman:</span>
                    <span>{new Date(mockOrderData.estimatedDelivery).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
                <Separator />
                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <SafeIcon name="Lock" className="w-4 h-4 inline mr-2" />
                    Pembayaran Anda dilindungi dengan enkripsi SSL 256-bit
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <SafeIcon name="Shield" className="w-4 h-4 inline mr-2" />
                    Kami menjamin keamanan data pribadi dan transaksi Anda
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Total & Actions */}
          <div className="lg:col-span-1">
            <Card className="border-border bg-card/50 backdrop-blur-sm sticky top-24 space-y-6">
              <CardHeader>
                <CardTitle className="text-lg">Ringkasan Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>Rp {mockOrderData.subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Biaya Pengiriman:</span>
                    <span>Rp {mockOrderData.shippingFee.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pajak:</span>
                    <span>Rp {mockOrderData.tax.toLocaleString('id-ID')}</span>
                  </div>
                  {mockOrderData.discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Diskon:</span>
                      <span>-Rp {mockOrderData.discount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Total */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Pembayaran:</span>
                    <span className="text-2xl font-bold gradient-text">
                      Rp {mockOrderData.total.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Termasuk semua biaya dan pajak
                  </p>
                </div>

                <Separator />

                {/* Actions */}
                <div className="space-y-3 pt-4">
                  <Button 
                    onClick={handleContinuePayment}
                    disabled={!selectedMethod}
                    className="w-full neon-glow"
                    size="lg"
                  >
                    <SafeIcon name="ArrowRight" className="w-4 h-4 mr-2" />
                    Lanjutkan Pembayaran
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleBack}
                    className="w-full"
                    size="lg"
                  >
                    <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                    Kembali
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleGetHelp}
                    className="w-full"
                    size="sm"
                  >
                    <SafeIcon name="HelpCircle" className="w-4 h-4 mr-2" />
                    Bantuan Pembayaran
                  </Button>
                </div>

                {/* Payment Methods Info */}
                <div className="bg-muted/20 rounded-lg p-3 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Metode Pembayaran Tersedia
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 text-xs bg-background/50 px-2 py-1 rounded">
                      <SafeIcon name="CreditCard" className="w-3 h-3" />
                      <span>Kartu</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs bg-background/50 px-2 py-1 rounded">
                      <SafeIcon name="Building2" className="w-3 h-3" />
                      <span>Transfer</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs bg-background/50 px-2 py-1 rounded">
                      <SafeIcon name="Wallet" className="w-3 h-3" />
                      <span>E-Wallet</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-12 border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SafeIcon name="HelpCircle" className="w-5 h-5 text-primary" />
              Pertanyaan Umum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <SafeIcon name="CheckCircle2" className="w-4 h-4 text-primary" />
                  Apakah pembayaran saya aman?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Ya, semua transaksi dilindungi dengan enkripsi SSL 256-bit dan sistem keamanan berlapis.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <SafeIcon name="Clock" className="w-4 h-4 text-primary" />
                  Berapa lama proses pembayaran?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Pembayaran kartu dan e-wallet diproses secara instan. Transfer bank memerlukan 1-2 jam.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <SafeIcon name="RotateCcw" className="w-4 h-4 text-primary" />
                  Bisakah saya membatalkan pembayaran?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Ya, Anda dapat membatalkan dalam 5 menit setelah pembayaran dimulai.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <SafeIcon name="AlertCircle" className="w-4 h-4 text-primary" />
                  Bagaimana jika pembayaran gagal?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Hubungi tim dukungan kami atau coba metode pembayaran lain.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

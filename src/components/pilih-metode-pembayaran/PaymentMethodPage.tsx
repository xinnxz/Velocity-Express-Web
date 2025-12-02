
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import OrderSummaryCompact from '@/components/pilih-metode-pembayaran/OrderSummaryCompact'
import PaymentMethodCard from '@/components/pilih-metode-pembayaran/PaymentMethodCard'
import { Separator } from '@/components/ui/separator'

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: string
  processingTime: string
  fee: number
  available: boolean
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Kartu Kredit/Debit',
    description: 'Visa, Mastercard, atau kartu debit lokal',
    icon: 'CreditCard',
    processingTime: 'Instan',
    fee: 0,
    available: true
  },
  {
    id: 'bank_transfer',
    name: 'Transfer Bank',
    description: 'Transfer langsung dari rekening bank Anda',
    icon: 'Building2',
    processingTime: '1-2 jam',
    fee: 0,
    available: true
  },
  {
    id: 'ewallet',
    name: 'E-Wallet',
    description: 'GCash, Dana, OVO, atau dompet digital lainnya',
    icon: 'Wallet',
    processingTime: 'Instan',
    fee: 0,
    available: true
  },
  {
    id: 'installment',
    name: 'Cicilan',
    description: 'Cicilan 3, 6, atau 12 bulan tanpa bunga',
    icon: 'Percent',
    processingTime: 'Instan',
    fee: 0,
    available: true
  }
]

const MOCK_ORDER = {
  orderId: 'VEL-2024-001234',
  totalAmount: 125000,
  itemCount: 2,
  estimatedDelivery: '2024-01-15',
  from: 'Jakarta Pusat',
  to: 'Bandung'
}

export default function PaymentMethodPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>('card')
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = () => {
    setIsLoading(true)
    // Simulate navigation delay
    setTimeout(() => {
      if (selectedMethod === 'card') {
        window.location.href = './detail-pembayaran-online.html'
      } else if (selectedMethod === 'bank_transfer') {
        window.location.href = './instruksi-pembayaran-transfer-bank.html'
      } else {
        // For e-wallet and installment, go to online payment detail
        window.location.href = './detail-pembayaran-online.html'
      }
    }, 300)
  }

  const handleBack = () => {
    window.location.href = './ringkasan-konfirmasi-pesanan.html'
  }

  const handleSupport = () => {
    window.location.href = './kontak-dukungan-pembayaran.html'
  }

  return (
    <div className="container-custom py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <a href="./beranda.html" className="hover:text-primary transition-colors">
          Beranda
        </a>
        <SafeIcon name="ChevronRight" className="w-4 h-4" />
        <a href="./ringkasan-konfirmasi-pesanan.html" className="hover:text-primary transition-colors">
          Ringkasan Pesanan
        </a>
        <SafeIcon name="ChevronRight" className="w-4 h-4" />
        <span className="text-primary">Pilih Metode Pembayaran</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              Pilih Metode Pembayaran
            </h1>
            <p className="text-muted-foreground">
              Pilih metode pembayaran yang paling sesuai untuk Anda
            </p>
          </div>

          {/* Payment Methods Grid */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Metode Pembayaran Tersedia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PAYMENT_METHODS.map((method) => (
                <PaymentMethodCard
                  key={method.id}
                  method={method}
                  isSelected={selectedMethod === method.id}
                  onSelect={() => setSelectedMethod(method.id)}
                />
              ))}
            </div>
          </div>

          {/* Selected Method Details */}
          {selectedMethod && (
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base">Detail Metode Terpilih</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <SafeIcon 
                      name={PAYMENT_METHODS.find(m => m.id === selectedMethod)?.icon || 'CreditCard'} 
                      className="w-6 h-6 text-primary" 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <SafeIcon name="Clock" className="w-4 h-4 text-muted-foreground" />
                        <span>
                          Waktu proses: {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.processingTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="sm:flex-1"
            >
              <SafeIcon name="ChevronLeft" className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <Button 
              onClick={handleContinue}
              disabled={isLoading}
              className="sm:flex-1 neon-glow"
            >
              {isLoading ? (
                <>
                  <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  Lanjutkan Pembayaran
                  <SafeIcon name="ChevronRight" className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Support Link */}
          <div className="pt-4 border-t border-border">
            <button
              onClick={handleSupport}
              className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
            >
              <SafeIcon name="HelpCircle" className="w-4 h-4" />
              Butuh bantuan dengan pembayaran?
            </button>
          </div>
        </div>

        {/* Sidebar - Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummaryCompact order={MOCK_ORDER} />
        </div>
      </div>
    </div>
  )
}

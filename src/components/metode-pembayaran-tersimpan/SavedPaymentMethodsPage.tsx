
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'
import SavedPaymentMethodList from './SavedPaymentMethodList'
import AddPaymentMethodDialog from './AddPaymentMethodDialog'
import type { PaymentMethod } from './types'

// Mock data - initial payment methods
const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit_card',
    name: 'Visa - Kartu Utama',
    cardNumber: '4532 **** **** 1234',
    expiryDate: '12/25',
    cardholderName: 'John Doe',
    isDefault: true,
    lastUsed: '2024-01-15',
    issuer: 'Visa'
  },
  {
    id: '2',
    type: 'credit_card',
    name: 'Mastercard - Cadangan',
    cardNumber: '5425 **** **** 5678',
    expiryDate: '08/26',
    cardholderName: 'John Doe',
    isDefault: false,
    lastUsed: '2024-01-10',
    issuer: 'Mastercard'
  },
  {
    id: '3',
    type: 'ewallet',
    name: 'GoPay',
    accountNumber: 'gopay@example.com',
    isDefault: false,
    lastUsed: '2024-01-08',
    issuer: 'GoPay'
  },
  {
    id: '4',
    type: 'bank_transfer',
    name: 'BCA - Rekening Pribadi',
    accountNumber: '1234567890',
    bankName: 'Bank Central Asia',
    isDefault: false,
    lastUsed: '2024-01-05',
    issuer: 'BCA'
  }
]

export default function SavedPaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(MOCK_PAYMENT_METHODS)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)

  const handleAddPaymentMethod = (newMethod: Omit<PaymentMethod, 'id' | 'lastUsed'>) => {
    const method: PaymentMethod = {
      ...newMethod,
      id: Date.now().toString(),
      lastUsed: new Date().toISOString().split('T')[0]
    }
    setPaymentMethods([...paymentMethods, method])
    setIsAddDialogOpen(false)
  }

  const handleDeletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })))
  }

  const handleEditPaymentMethod = (id: string, updatedData: Partial<PaymentMethod>) => {
    setPaymentMethods(paymentMethods.map(method =>
      method.id === id ? { ...method, ...updatedData } : method
    ))
    setSelectedMethod(null)
  }

  const creditCards = paymentMethods.filter(m => m.type === 'credit_card')
  const ewallets = paymentMethods.filter(m => m.type === 'ewallet')
  const bankTransfers = paymentMethods.filter(m => m.type === 'bank_transfer')

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-gradient-radial-at-t from-primary/20 via-transparent to-transparent" />
      </div>

      <div className="container-custom py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
              <SafeIcon name="CreditCard" className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Metode Pembayaran Tersimpan</h1>
              <p className="text-muted-foreground">Kelola kartu kredit, e-wallet, dan rekening bank Anda</p>
            </div>
          </div>
        </div>

        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
          <a href="./pengaturan-akun.html" className="hover:text-primary transition-colors">
            Pengaturan Akun
          </a>
          <SafeIcon name="ChevronRight" className="w-4 h-4" />
          <span className="text-primary">Metode Pembayaran</span>
        </div>

        {/* Main Content */}
        <div className="grid gap-6">
          {/* Add Payment Method Card */}
          <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Tambah Metode Pembayaran Baru</span>
                <SafeIcon name="Plus" className="w-5 h-5 text-primary" />
              </CardTitle>
              <CardDescription>
                Tambahkan kartu kredit, e-wallet, atau rekening bank baru untuk kemudahan pembayaran
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddPaymentMethodDialog
                isOpen={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onAdd={handleAddPaymentMethod}
              >
                <Button className="w-full sm:w-auto neon-glow">
                  <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
                  Tambah Metode Pembayaran
                </Button>
              </AddPaymentMethodDialog>
            </CardContent>
          </Card>

          {/* Payment Methods Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 glass-effect border border-border">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <SafeIcon name="Wallet" className="w-4 h-4" />
                <span className="hidden sm:inline">Semua</span>
                <span className="sm:hidden text-xs">{paymentMethods.length}</span>
              </TabsTrigger>
              <TabsTrigger value="cards" className="flex items-center gap-2">
                <SafeIcon name="CreditCard" className="w-4 h-4" />
                <span className="hidden sm:inline">Kartu</span>
                <span className="sm:hidden text-xs">{creditCards.length}</span>
              </TabsTrigger>
              <TabsTrigger value="ewallets" className="flex items-center gap-2">
                <SafeIcon name="Smartphone" className="w-4 h-4" />
                <span className="hidden sm:inline">E-Wallet</span>
                <span className="sm:hidden text-xs">{ewallets.length}</span>
              </TabsTrigger>
              <TabsTrigger value="banks" className="flex items-center gap-2">
                <SafeIcon name="Building2" className="w-4 h-4" />
                <span className="hidden sm:inline">Bank</span>
                <span className="sm:hidden text-xs">{bankTransfers.length}</span>
              </TabsTrigger>
            </TabsList>

            {/* All Methods */}
            <TabsContent value="all" className="space-y-4 mt-6">
              {paymentMethods.length > 0 ? (
                <SavedPaymentMethodList
                  methods={paymentMethods}
                  onDelete={handleDeletePaymentMethod}
                  onSetDefault={handleSetDefault}
                  onEdit={handleEditPaymentMethod}
                  selectedMethod={selectedMethod}
                  onSelectMethod={setSelectedMethod}
                />
              ) : (
                <Card className="glass-effect border-border/50">
                  <CardContent className="pt-12 pb-12 text-center">
                    <SafeIcon name="Wallet" className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground mb-4">Belum ada metode pembayaran tersimpan</p>
                    <AddPaymentMethodDialog
                      isOpen={isAddDialogOpen}
                      onOpenChange={setIsAddDialogOpen}
                      onAdd={handleAddPaymentMethod}
                    >
                      <Button className="neon-glow">
                        <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
                        Tambah Metode Pembayaran
                      </Button>
                    </AddPaymentMethodDialog>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Credit Cards */}
            <TabsContent value="cards" className="space-y-4 mt-6">
              {creditCards.length > 0 ? (
                <SavedPaymentMethodList
                  methods={creditCards}
                  onDelete={handleDeletePaymentMethod}
                  onSetDefault={handleSetDefault}
                  onEdit={handleEditPaymentMethod}
                  selectedMethod={selectedMethod}
                  onSelectMethod={setSelectedMethod}
                />
              ) : (
                <Card className="glass-effect border-border/50">
                  <CardContent className="pt-12 pb-12 text-center">
                    <SafeIcon name="CreditCard" className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground mb-4">Belum ada kartu kredit tersimpan</p>
                    <AddPaymentMethodDialog
                      isOpen={isAddDialogOpen}
                      onOpenChange={setIsAddDialogOpen}
                      onAdd={handleAddPaymentMethod}
                    >
                      <Button className="neon-glow">
                        <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
                        Tambah Kartu Kredit
                      </Button>
                    </AddPaymentMethodDialog>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* E-Wallets */}
            <TabsContent value="ewallets" className="space-y-4 mt-6">
              {ewallets.length > 0 ? (
                <SavedPaymentMethodList
                  methods={ewallets}
                  onDelete={handleDeletePaymentMethod}
                  onSetDefault={handleSetDefault}
                  onEdit={handleEditPaymentMethod}
                  selectedMethod={selectedMethod}
                  onSelectMethod={setSelectedMethod}
                />
              ) : (
                <Card className="glass-effect border-border/50">
                  <CardContent className="pt-12 pb-12 text-center">
                    <SafeIcon name="Smartphone" className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground mb-4">Belum ada e-wallet tersimpan</p>
                    <AddPaymentMethodDialog
                      isOpen={isAddDialogOpen}
                      onOpenChange={setIsAddDialogOpen}
                      onAdd={handleAddPaymentMethod}
                    >
                      <Button className="neon-glow">
                        <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
                        Tambah E-Wallet
                      </Button>
                    </AddPaymentMethodDialog>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Bank Transfers */}
            <TabsContent value="banks" className="space-y-4 mt-6">
              {bankTransfers.length > 0 ? (
                <SavedPaymentMethodList
                  methods={bankTransfers}
                  onDelete={handleDeletePaymentMethod}
                  onSetDefault={handleSetDefault}
                  onEdit={handleEditPaymentMethod}
                  selectedMethod={selectedMethod}
                  onSelectMethod={setSelectedMethod}
                />
              ) : (
                <Card className="glass-effect border-border/50">
                  <CardContent className="pt-12 pb-12 text-center">
                    <SafeIcon name="Building2" className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground mb-4">Belum ada rekening bank tersimpan</p>
                    <AddPaymentMethodDialog
                      isOpen={isAddDialogOpen}
                      onOpenChange={setIsAddDialogOpen}
                      onAdd={handleAddPaymentMethod}
                    >
                      <Button className="neon-glow">
                        <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
                        Tambah Rekening Bank
                      </Button>
                    </AddPaymentMethodDialog>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Security Info */}
          <Card className="glass-effect border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <SafeIcon name="Shield" className="w-5 h-5 text-primary" />
                Keamanan Data Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Data pembayaran Anda dienkripsi dengan standar industri (SSL/TLS)</p>
              <p>✓ Kami tidak menyimpan nomor PIN atau CVV kartu Anda</p>
              <p>✓ Semua transaksi dilindungi oleh sistem keamanan berlapis</p>
              <p>✓ Anda dapat menghapus metode pembayaran kapan saja</p>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="flex gap-4 pt-4">
            <Button variant="outline" asChild className="flex-1 sm:flex-none">
              <a href="./pengaturan-akun.html">
                <SafeIcon name="ChevronLeft" className="w-4 h-4 mr-2" />
                Kembali ke Pengaturan Akun
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

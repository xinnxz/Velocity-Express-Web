
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'
import CreditCardForm from './forms/CreditCardForm'
import EWalletForm from './forms/EWalletForm'
import BankTransferForm from './forms/BankTransferForm'
import type { PaymentMethod } from './types'

interface AddPaymentMethodDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (method: Omit<PaymentMethod, 'id' | 'lastUsed'>) => void
  children: React.ReactNode
}

export default function AddPaymentMethodDialog({
  isOpen,
  onOpenChange,
  onAdd,
  children
}: AddPaymentMethodDialogProps) {
  const [activeTab, setActiveTab] = useState('credit_card')

  const handleAddCreditCard = (data: any) => {
    onAdd({
      type: 'credit_card',
      name: data.name,
      cardNumber: data.cardNumber,
      expiryDate: data.expiryDate,
      cardholderName: data.cardholderName,
      issuer: data.issuer,
      isDefault: data.isDefault
    })
  }

  const handleAddEWallet = (data: any) => {
    onAdd({
      type: 'ewallet',
      name: data.name,
      accountNumber: data.accountNumber,
      issuer: data.issuer,
      isDefault: data.isDefault
    })
  }

  const handleAddBankTransfer = (data: any) => {
    onAdd({
      type: 'bank_transfer',
      name: data.name,
      accountNumber: data.accountNumber,
      bankName: data.bankName,
      issuer: data.issuer,
      isDefault: data.isDefault
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <div onClick={() => onOpenChange(true)}>
        {children}
      </div>

      <DialogContent className="max-w-2xl glass-effect border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SafeIcon name="Plus" className="w-5 h-5 text-primary" />
            Tambah Metode Pembayaran
          </DialogTitle>
          <DialogDescription>
            Pilih jenis metode pembayaran yang ingin Anda tambahkan
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass-effect border border-border">
            <TabsTrigger value="credit_card" className="flex items-center gap-2">
              <SafeIcon name="CreditCard" className="w-4 h-4" />
              <span className="hidden sm:inline">Kartu Kredit</span>
              <span className="sm:hidden text-xs">Kartu</span>
            </TabsTrigger>
            <TabsTrigger value="ewallet" className="flex items-center gap-2">
              <SafeIcon name="Smartphone" className="w-4 h-4" />
              <span className="hidden sm:inline">E-Wallet</span>
              <span className="sm:hidden text-xs">E-Wallet</span>
            </TabsTrigger>
            <TabsTrigger value="bank" className="flex items-center gap-2">
              <SafeIcon name="Building2" className="w-4 h-4" />
              <span className="hidden sm:inline">Bank</span>
              <span className="sm:hidden text-xs">Bank</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credit_card" className="mt-6">
            <CreditCardForm
              onSubmit={handleAddCreditCard}
              onCancel={() => onOpenChange(false)}
            />
          </TabsContent>

          <TabsContent value="ewallet" className="mt-6">
            <EWalletForm
              onSubmit={handleAddEWallet}
              onCancel={() => onOpenChange(false)}
            />
          </TabsContent>

          <TabsContent value="bank" className="mt-6">
            <BankTransferForm
              onSubmit={handleAddBankTransfer}
              onCancel={() => onOpenChange(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

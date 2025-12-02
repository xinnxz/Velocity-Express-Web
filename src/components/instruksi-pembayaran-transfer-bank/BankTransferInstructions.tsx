
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'
import BankDetailsCard from './BankDetailsCard'
import PaymentSummaryCard from './PaymentSummaryCard'
import PaymentProofUpload from './PaymentProofUpload'

interface BankTransferData {
  orderId: string
  amount: number
  currency: string
  deadline: string
  referenceCode: string
  bankName: string
  accountNumber: string
  accountHolder: string
  bankCode: string
}

const mockPaymentData: BankTransferData = {
  orderId: 'VEL-2024-001234',
  amount: 125000,
  currency: 'IDR',
  deadline: '2024-01-20 23:59:59',
  referenceCode: 'TRF-VEL-001234-2024',
  bankName: 'Bank Central Asia (BCA)',
  accountNumber: '1234567890',
  accountHolder: 'PT VeloCity Express',
  bankCode: 'BCA'
}

export default function BankTransferInstructions() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
  }

  const handleSubmitProof = async () => {
    if (!uploadedFile) return
    
    setIsSubmitting(true)
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to success page
    window.location.href = './konfirmasi-pembayaran-sukses.html'
  }

  const handleBackToPayment = () => {
    window.location.href = './pilih-metode-pembayaran.html'
  }

  const handleContactSupport = () => {
    window.location.href = './kontak-dukungan-pembayaran.html'
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50">
              <SafeIcon name="Banknote" className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Transfer Bank</h1>
              <p className="text-muted-foreground">Selesaikan pembayaran melalui transfer bank</p>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <PaymentSummaryCard 
          orderId={mockPaymentData.orderId}
          amount={mockPaymentData.amount}
          currency={mockPaymentData.currency}
          deadline={mockPaymentData.deadline}
        />

        {/* Important Alert */}
        <Alert className="border-primary/50 bg-primary/10">
          <SafeIcon name="AlertCircle" className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary/90">
            Pastikan Anda mentransfer tepat sesuai jumlah yang tertera. Transfer dengan jumlah berbeda mungkin tidak terdeteksi otomatis.
          </AlertDescription>
        </Alert>

        {/* Bank Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Rincian Rekening Tujuan</h2>
          <BankDetailsCard 
            bankName={mockPaymentData.bankName}
            accountNumber={mockPaymentData.accountNumber}
            accountHolder={mockPaymentData.accountHolder}
            bankCode={mockPaymentData.bankCode}
            onCopyAccountNumber={() => copyToClipboard(mockPaymentData.accountNumber)}
          />
        </div>

        {/* Transfer Instructions */}
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SafeIcon name="BookOpen" className="w-5 h-5 text-primary" />
              Langkah-Langkah Transfer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                {
                  step: 1,
                  title: 'Buka Aplikasi Bank Anda',
                  description: 'Buka aplikasi mobile banking atau akses website bank Anda'
                },
                {
                  step: 2,
                  title: 'Pilih Menu Transfer',
                  description: 'Pilih opsi "Transfer" atau "Kirim Uang"'
                },
                {
                  step: 3,
                  title: 'Masukkan Detail Rekening',
                  description: 'Masukkan nomor rekening tujuan dan nama penerima sesuai data di atas'
                },
                {
                  step: 4,
                  title: 'Masukkan Jumlah',
                  description: `Masukkan jumlah tepat: ${mockPaymentData.amount.toLocaleString('id-ID')} ${mockPaymentData.currency}`
                },
                {
                  step: 5,
                  title: 'Verifikasi dan Konfirmasi',
                  description: 'Periksa kembali semua detail sebelum mengkonfirmasi transfer'
                },
                {
                  step: 6,
                  title: 'Unggah Bukti Transfer',
                  description: 'Unggah bukti transfer (screenshot atau file PDF) di bawah'
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/20 border border-primary/50">
                      <span className="text-sm font-semibold text-primary">{item.step}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reference Code */}
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base">Kode Referensi (Opsional)</CardTitle>
            <CardDescription>
              Anda dapat menambahkan kode ini di catatan transfer untuk identifikasi lebih cepat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 border border-border">
              <code className="flex-1 text-sm font-mono text-primary">
                {mockPaymentData.referenceCode}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(mockPaymentData.referenceCode)}
                className="text-primary hover:text-primary hover:bg-primary/10"
              >
                <SafeIcon name="Copy" className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* File Upload */}
        <PaymentProofUpload 
          onFileSelect={handleFileUpload}
          selectedFile={uploadedFile}
        />

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={handleSubmitProof}
            disabled={!uploadedFile || isSubmitting}
            className="w-full neon-glow"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <SafeIcon name="Upload" className="w-4 h-4 mr-2" />
                Unggah Bukti Transfer
              </>
            )}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleBackToPayment}
              size="lg"
            >
              <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <Button
              variant="ghost"
              onClick={handleContactSupport}
              size="lg"
            >
              <SafeIcon name="HelpCircle" className="w-4 h-4 mr-2" />
              Bantuan
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <Card className="border-border/50 bg-muted/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <SafeIcon name="Info" className="w-5 h-5 text-muted-foreground" />
              Informasi Penting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              • Pembayaran harus diterima sebelum batas waktu: <span className="text-foreground font-semibold">{mockPaymentData.deadline}</span>
            </p>
            <p>
              • Biaya transfer ditanggung oleh pengirim (transfer atas beban pengirim)
            </p>
            <p>
              • Konfirmasi pembayaran biasanya diproses dalam 1-2 jam setelah bukti diterima
            </p>
            <p>
              • Jika ada masalah, hubungi tim dukungan kami melalui tombol "Bantuan" di atas
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

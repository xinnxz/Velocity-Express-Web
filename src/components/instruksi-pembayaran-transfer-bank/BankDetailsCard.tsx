
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'

interface BankDetailsCardProps {
  bankName: string
  accountNumber: string
  accountHolder: string
  bankCode: string
  onCopyAccountNumber: () => void
}

export default function BankDetailsCard({
  bankName,
  accountNumber,
  accountHolder,
  bankCode,
  onCopyAccountNumber
}: BankDetailsCardProps) {
  const getBankIcon = (code: string) => {
    const iconMap: Record<string, string> = {
      'BCA': 'Building2',
      'MANDIRI': 'Building2',
      'BNI': 'Building2',
      'BRI': 'Building2',
    }
    return iconMap[code] || 'Building2'
  }

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm">
      <CardContent className="pt-6 space-y-4">
        {/* Bank Name */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <SafeIcon name={getBankIcon(bankCode)} className="w-4 h-4" />
            Bank
          </div>
          <p className="text-lg font-semibold text-foreground">{bankName}</p>
        </div>

        {/* Account Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Nomor Rekening</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 p-3 rounded-lg bg-background/50 border border-border">
              <code className="text-sm font-mono text-primary font-semibold">
                {accountNumber}
              </code>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={onCopyAccountNumber}
              className="border-primary/50 hover:bg-primary/10"
              title="Salin nomor rekening"
            >
              <SafeIcon name="Copy" className="w-4 h-4 text-primary" />
            </Button>
          </div>
        </div>

        {/* Account Holder */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Atas Nama</label>
          <div className="p-3 rounded-lg bg-background/50 border border-border">
            <p className="text-sm font-semibold text-foreground">{accountHolder}</p>
          </div>
        </div>

        {/* Warning */}
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex gap-2">
          <SafeIcon name="AlertTriangle" className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-xs text-destructive/90">
            Pastikan nama rekening sesuai. Transfer ke rekening dengan nama berbeda mungkin ditolak oleh bank.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

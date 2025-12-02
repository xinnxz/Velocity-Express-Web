
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'

interface PaymentSummaryCardProps {
  orderId: string
  amount: number
  currency: string
  deadline: string
}

export default function PaymentSummaryCard({
  orderId,
  amount,
  currency,
  deadline
}: PaymentSummaryCardProps) {
  const formatCurrency = (value: number, curr: string) => {
    if (curr === 'IDR') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(value)
    }
    return `${value} ${curr}`
  }

  const formatDeadline = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(date)
    } catch {
      return dateString
    }
  }

const isDeadlineApproaching = () => {
    const deadlineDate = new Date(deadline)
    const now = new Date()
    const hoursLeft = (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60)
    return hoursLeft < 24 && hoursLeft > 0
  }

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-base">Ringkasan Pembayaran</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order ID */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">ID Pesanan</span>
          <span className="text-sm font-semibold text-foreground">{orderId}</span>
        </div>

        <Separator className="bg-border/50" />

        {/* Amount */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Jumlah Pembayaran</span>
          <span className="text-2xl font-bold gradient-text">
            {formatCurrency(amount, currency)}
          </span>
        </div>

        <Separator className="bg-border/50" />

        {/* Deadline */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Batas Waktu Pembayaran</span>
            <p className="text-sm font-semibold text-foreground">
              {formatDeadline(deadline)}
            </p>
          </div>
          {isDeadlineApproaching() && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-destructive/20 border border-destructive/50">
              <SafeIcon name="Clock" className="w-3 h-3 text-destructive" />
              <span className="text-xs font-semibold text-destructive">Segera</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

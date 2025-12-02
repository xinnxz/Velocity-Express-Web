
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'

interface TransactionDetailsProps {
  data: {
    transactionId: string
    timestamp: Date
    amount: number
    paymentMethod: string
    status: string
  }
}

export default function TransactionDetails({ data }: TransactionDetailsProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-4">
      {/* Transaction ID */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
        <div className="flex items-center gap-3">
          <SafeIcon name="Hash" className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Nomor Transaksi</p>
            <p className="font-mono font-semibold text-lg">{data.transactionId}</p>
          </div>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(data.transactionId)
          }}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          title="Salin nomor transaksi"
        >
          <SafeIcon name="Copy" className="w-4 h-4 text-muted-foreground hover:text-primary" />
        </button>
      </div>

      {/* Timestamp */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
        <SafeIcon name="Calendar" className="w-5 h-5 text-primary flex-shrink-0" />
        <div>
          <p className="text-sm text-muted-foreground">Waktu Transaksi</p>
          <p className="font-medium">{formatDate(data.timestamp)}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
        <SafeIcon name="CreditCard" className="w-5 h-5 text-primary flex-shrink-0" />
        <div>
          <p className="text-sm text-muted-foreground">Metode Pembayaran</p>
          <p className="font-medium">{data.paymentMethod}</p>
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/30">
        <div className="flex items-center gap-3">
          <SafeIcon name="DollarSign" className="w-5 h-5 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">Jumlah Pembayaran</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(data.amount)}</p>
          </div>
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/50 border">
          <SafeIcon name="CheckCircle2" className="w-3 h-3 mr-1" />
          {data.status}
        </Badge>
      </div>
    </div>
  )
}

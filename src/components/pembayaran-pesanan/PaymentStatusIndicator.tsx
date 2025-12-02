
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'
import { cn } from '@/lib/utils'

type PaymentStatusType = 'pending' | 'processing' | 'completed' | 'failed'

interface PaymentStatusIndicatorProps {
  status: PaymentStatusType
  message?: string
}

const statusConfig: Record<PaymentStatusType, {
  icon: string
  title: string
  description: string
  variant: 'default' | 'destructive'
  className: string
}> = {
  pending: {
    icon: 'Clock',
    title: 'Menunggu Pembayaran',
    description: 'Silakan pilih metode pembayaran dan lanjutkan untuk menyelesaikan transaksi',
    variant: 'default',
    className: 'border-primary/50 bg-primary/10'
  },
  processing: {
    icon: 'Loader2',
    title: 'Pembayaran Diproses',
    description: 'Sistem sedang memproses pembayaran Anda. Mohon tunggu...',
    variant: 'default',
    className: 'border-blue-500/50 bg-blue-500/10'
  },
  completed: {
    icon: 'CheckCircle2',
    title: 'Pembayaran Berhasil',
    description: 'Pembayaran Anda telah berhasil diproses. Pesanan siap dikirim.',
    variant: 'default',
    className: 'border-green-500/50 bg-green-500/10'
  },
  failed: {
    icon: 'XCircle',
    title: 'Pembayaran Gagal',
    description: 'Pembayaran tidak berhasil diproses. Silakan coba lagi atau gunakan metode lain.',
    variant: 'destructive',
    className: 'border-destructive/50 bg-destructive/10'
  }
}

export default function PaymentStatusIndicator({
  status,
  message
}: PaymentStatusIndicatorProps) {
  const config = statusConfig[status]

  return (
    <Alert className={cn('border-2', config.className)}>
      <SafeIcon 
        name={config.icon} 
        className={cn(
          'w-5 h-5',
          status === 'completed' && 'text-green-400',
          status === 'failed' && 'text-destructive',
          status === 'processing' && 'text-blue-400 animate-spin',
          status === 'pending' && 'text-primary'
        )}
      />
      <AlertTitle className="text-base">{config.title}</AlertTitle>
      <AlertDescription className="text-sm mt-1">
        {message || config.description}
      </AlertDescription>
    </Alert>
  )
}

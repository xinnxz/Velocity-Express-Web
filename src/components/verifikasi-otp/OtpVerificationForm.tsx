
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'
import OtpInput from '@/components/verifikasi-otp/OtpInput'

interface OtpVerificationFormProps {
  phoneOrEmail?: string
  flowType?: 'registration' | 'login'
  onSuccess?: (otp: string) => void
}

export default function OtpVerificationForm({
  phoneOrEmail = '+62 812-3456-7890',
  flowType = 'registration',
  onSuccess
}: OtpVerificationFormProps) {
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendCountdown, setResendCountdown] = useState(0)
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize countdown on mount
  useEffect(() => {
    setResendCountdown(60)
    setIsResendDisabled(true)
  }, [])

  // Handle countdown timer
  useEffect(() => {
    if (resendCountdown > 0) {
      countdownIntervalRef.current = setTimeout(() => {
        setResendCountdown(resendCountdown - 1)
      }, 1000)
    } else if (resendCountdown === 0 && isResendDisabled) {
      setIsResendDisabled(false)
    }

    return () => {
      if (countdownIntervalRef.current) {
        clearTimeout(countdownIntervalRef.current)
      }
    }
  }, [resendCountdown, isResendDisabled])

  const handleOtpChange = (value: string) => {
    setOtp(value)
    setError('')
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (otp.length !== 6) {
      setError('Kode OTP harus 6 digit')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock validation - accept any 6-digit code for demo
      if (otp === '000000') {
        setError('Kode OTP tidak valid')
        setIsLoading(false)
        return
      }

      // Success
      if (onSuccess) {
        onSuccess(otp)
      }

      // Navigate based on flow type
      if (flowType === 'registration') {
        window.location.href = './atur-kata-sandi.html'
      } else {
        window.location.href = './beranda.html'
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.')
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setIsResendDisabled(true)
    setResendCountdown(60)
    setOtp('')
    setError('')

    try {
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000))
      // In real app, show success message
    } catch (err) {
      setError('Gagal mengirim ulang OTP. Silakan coba lagi.')
    }
  }

  const maskPhoneOrEmail = (value: string) => {
    if (value.includes('@')) {
      // Email
      const [name, domain] = value.split('@')
      const maskedName = name.substring(0, 2) + '*'.repeat(Math.max(0, name.length - 4)) + name.substring(name.length - 2)
      return `${maskedName}@${domain}`
    } else {
      // Phone
      return value.substring(0, 5) + '*'.repeat(Math.max(0, value.length - 9)) + value.substring(value.length - 4)
    }
  }

return (
<div className="w-full max-w-md" id="i3yec" style={{ margin: '50px 0px 50px 0px' }}>
      <Card className="border-border/50 glass-effect" id="ibi7g">
        <CardHeader className="space-y-2 text-center" id="ir2qd">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
              <SafeIcon name="Shield" className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Verifikasi Identitas</CardTitle>
          <CardDescription>
            Kami telah mengirimkan kode OTP ke {maskPhoneOrEmail(phoneOrEmail)}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleVerify} className="space-y-6">
            {/* OTP Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Masukkan Kode OTP</label>
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground text-center">
                Kode OTP terdiri dari 6 digit
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                <SafeIcon name="AlertCircle" className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Verify Button */}
            <Button
              type="submit"
              className="w-full neon-glow"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? (
                <>
                  <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                <>
                  <SafeIcon name="CheckCircle2" className="w-4 h-4 mr-2" />
                  Verifikasi OTP
                </>
              )}
            </Button>

            {/* Resend OTP */}
            <div className="space-y-3">
              <div className="text-center text-sm text-muted-foreground">
                Tidak menerima kode?
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleResendOtp}
                disabled={isResendDisabled || isLoading}
              >
                {isResendDisabled ? (
                  <>
                    <SafeIcon name="Clock" className="w-4 h-4 mr-2" />
                    Kirim Ulang OTP ({resendCountdown}s)
                  </>
                ) : (
                  <>
                    <SafeIcon name="RotateCw" className="w-4 h-4 mr-2" />
                    Kirim Ulang OTP
                  </>
                )}
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">atau</span>
              </div>
            </div>

            {/* Alternative Actions */}
            <div className="space-y-2">
              <Button
                type="button"
                variant="ghost"
                className="w-full justify-start"
                onClick={() => window.location.href = './lupa-kata-sandi.html'}
              >
                <SafeIcon name="Phone" className="w-4 h-4 mr-2" />
                Hubungi Dukungan
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  if (flowType === 'registration') {
                    window.location.href = './registrasi.html'
                  } else {
                    window.location.href = './login.html'
                  }
                }}
              >
                <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Info Box */}
      <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
        <div className="flex gap-3">
          <SafeIcon name="Info" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Tips Keamanan:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Jangan bagikan kode OTP kepada siapapun</li>
              <li>Kode OTP berlaku selama 10 menit</li>
              <li>Gunakan kode OTP hanya untuk akun Anda</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

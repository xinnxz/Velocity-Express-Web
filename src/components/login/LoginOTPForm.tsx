
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'
import { cn } from '@/lib/utils'

interface LoginOTPFormProps {
  onSwitchToPassword: () => void
}

export default function LoginOTPForm({ onSwitchToPassword }: LoginOTPFormProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [otpError, setOtpError] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(0)

  const validatePhone = () => {
    setPhoneError('')
    if (!phone.trim()) {
      setPhoneError('Nomor telepon harus diisi')
      return false
    }
    if (!/^(\+62|0)[0-9]{9,12}$/.test(phone)) {
      setPhoneError('Format nomor telepon tidak valid')
      return false
    }
    return true
  }

  const validateOTP = () => {
    setOtpError('')
    if (!otp.trim()) {
      setOtpError('Kode OTP harus diisi')
      return false
    }
    if (!/^\d{6}$/.test(otp)) {
      setOtpError('Kode OTP harus 6 digit')
      return false
    }
    return true
  }

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validatePhone()) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setStep('otp')
      setOtpSent(true)
      setResendCountdown(60)
      
      // Countdown timer
      const interval = setInterval(() => {
        setResendCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      setError('Gagal mengirim OTP. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateOTP()) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock successful login - redirect to dashboard
      window.location.href = './beranda.html'
    } catch (err) {
      setError('Kode OTP tidak valid. Silakan coba lagi.')
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (resendCountdown > 0) return

    setIsLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setResendCountdown(60)
      setOtp('')
      
      // Countdown timer
      const interval = setInterval(() => {
        setResendCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      setError('Gagal mengirim ulang OTP. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="glass-effect border-border/50 shadow-card">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center">
            <SafeIcon name="Smartphone" className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl">Masuk dengan OTP</CardTitle>
        <CardDescription>
          {step === 'phone' 
            ? 'Masukkan nomor telepon Anda untuk menerima kode OTP'
            : `Masukkan kode OTP yang dikirim ke ${phone}`
          }
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
            <SafeIcon name="AlertCircle" className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            {/* Phone Input */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Nomor Telepon
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+62812345678 atau 08123456789"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    setPhoneError('')
                  }}
                  className={cn(
                    'bg-background/50 border-border/50 pl-10',
                    phoneError && 'border-destructive/50 focus-visible:ring-destructive/50'
                  )}
                  disabled={isLoading}
                />
                <SafeIcon 
                  name="Phone" 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" 
                />
              </div>
              {phoneError && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <SafeIcon name="AlertCircle" className="w-3 h-3" />
                  {phoneError}
                </p>
              )}
            </div>

            {/* Send OTP Button */}
            <Button 
              type="submit" 
              className="w-full neon-glow"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Mengirim OTP...
                </>
              ) : (
                <>
                  <SafeIcon name="Send" className="w-4 h-4 mr-2" />
                  Kirim Kode OTP
                </>
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            {/* OTP Input */}
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-medium">
                Kode OTP (6 digit)
              </Label>
              <div className="relative">
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                    setOtp(value)
                    setOtpError('')
                  }}
                  maxLength={6}
                  className={cn(
                    'bg-background/50 border-border/50 pl-10 text-center text-2xl tracking-widest font-mono',
                    otpError && 'border-destructive/50 focus-visible:ring-destructive/50'
                  )}
                  disabled={isLoading}
                />
                <SafeIcon 
                  name="Lock" 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" 
                />
              </div>
              {otpError && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <SafeIcon name="AlertCircle" className="w-3 h-3" />
                  {otpError}
                </p>
              )}
            </div>

            {/* Verify OTP Button */}
            <Button 
              type="submit" 
              className="w-full neon-glow"
              disabled={isLoading}
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
            <div className="text-center text-sm text-muted-foreground">
              Tidak menerima kode?{' '}
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendCountdown > 0 || isLoading}
                className={cn(
                  'text-primary hover:text-primary/80 transition-colors font-semibold',
                  (resendCountdown > 0 || isLoading) && 'opacity-50 cursor-not-allowed'
                )}
              >
                {resendCountdown > 0 
                  ? `Kirim ulang dalam ${resendCountdown}s`
                  : 'Kirim ulang'
                }
              </button>
            </div>

            {/* Back to Phone Input */}
            <Button 
              type="button"
              variant="outline"
              className="w-full border-border/50"
              onClick={() => {
                setStep('phone')
                setOtp('')
                setOtpError('')
              }}
              disabled={isLoading}
            >
              <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Ubah Nomor Telepon
            </Button>
          </form>
        )}

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Atau</span>
          </div>
        </div>

        {/* Switch to Password Login */}
        <Button 
          type="button"
          variant="outline"
          className="w-full border-border/50"
          onClick={onSwitchToPassword}
          disabled={isLoading}
        >
          <SafeIcon name="LogIn" className="w-4 h-4 mr-2" />
          Masuk dengan Kata Sandi
        </Button>

        {/* Sign Up Link */}
        <div className="text-center text-sm text-muted-foreground">
          Belum punya akun?{' '}
          <a 
            href="./registrasi.html"
            className="text-primary hover:text-primary/80 transition-colors font-semibold"
          >
            Daftar sekarang
          </a>
        </div>

        {/* Back to Home */}
        <Button 
          type="button"
          variant="ghost"
          className="w-full text-muted-foreground hover:text-foreground"
          asChild
        >
          <a href="./beranda.html">
            <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

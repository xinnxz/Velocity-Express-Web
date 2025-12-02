
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'
import { cn } from '@/lib/utils'

interface LoginFormProps {
  onSwitchToOTP: () => void
}

export default function LoginForm({ onSwitchToOTP }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const validateForm = () => {
    let isValid = true
    setEmailError('')
    setPasswordError('')
    setError('')

    // Email/Phone validation
    if (!email.trim()) {
      setEmailError('Email atau nomor telepon harus diisi')
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$|^(\+62|0)[0-9]{9,12}$/.test(email)) {
      setEmailError('Format email atau nomor telepon tidak valid')
      isValid = false
    }

    // Password validation
    if (!password) {
      setPasswordError('Kata sandi harus diisi')
      isValid = false
    } else if (password.length < 6) {
      setPasswordError('Kata sandi minimal 6 karakter')
      isValid = false
    }

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
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
      setError('Email/nomor telepon atau kata sandi salah. Silakan coba lagi.')
      setIsLoading(false)
    }
  }

return (
    <Card className="glass-effect border-border/50 shadow-card" id="i6gjq">
      <CardHeader className="space-y-2 text-center" id="in5xb">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center">
            <SafeIcon name="Zap" className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl">Masuk ke VeloCity</CardTitle>
        <CardDescription>
          Akses akun Anda untuk melacak pengiriman dan mengelola pesanan
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
            <SafeIcon name="AlertCircle" className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email/Phone Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email atau Nomor Telepon
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="text"
                placeholder="nama@email.com atau +62812345678"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailError('')
                }}
                className={cn(
                  'bg-background/50 border-border/50 pl-10',
                  emailError && 'border-destructive/50 focus-visible:ring-destructive/50'
                )}
                disabled={isLoading}
              />
              <SafeIcon 
                name="Mail" 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" 
              />
            </div>
            {emailError && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <SafeIcon name="AlertCircle" className="w-3 h-3" />
                {emailError}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Kata Sandi
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Masukkan kata sandi Anda"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordError('')
                }}
                className={cn(
                  'bg-background/50 border-border/50 pl-10 pr-10',
                  passwordError && 'border-destructive/50 focus-visible:ring-destructive/50'
                )}
                disabled={isLoading}
              />
              <SafeIcon 
                name="Lock" 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                disabled={isLoading}
              >
                <SafeIcon 
                  name={showPassword ? 'EyeOff' : 'Eye'} 
                  className="w-4 h-4" 
                />
              </button>
            </div>
            {passwordError && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <SafeIcon name="AlertCircle" className="w-3 h-3" />
                {passwordError}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-border bg-background/50 cursor-pointer"
                disabled={isLoading}
              />
              <span className="text-muted-foreground">Ingat saya</span>
            </label>
            <a 
              href="./lupa-kata-sandi.html"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Lupa kata sandi?
            </a>
          </div>

          {/* Login Button */}
          <Button 
            type="submit" 
            className="w-full neon-glow"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                Sedang Masuk...
              </>
            ) : (
              <>
                <SafeIcon name="LogIn" className="w-4 h-4 mr-2" />
                Masuk
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Atau</span>
          </div>
        </div>

        {/* OTP Login Button */}
        <Button 
          type="button"
          variant="outline"
          className="w-full border-border/50"
          onClick={onSwitchToOTP}
          disabled={isLoading}
        >
          <SafeIcon name="Smartphone" className="w-4 h-4 mr-2" />
          Masuk dengan OTP
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

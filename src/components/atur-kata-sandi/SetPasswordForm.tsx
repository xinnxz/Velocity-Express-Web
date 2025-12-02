
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'
import { cn } from '@/lib/utils'

interface PasswordStrength {
  score: number
  label: string
  color: string
}

export default function SetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Password strength calculation
  const calculatePasswordStrength = (pwd: string): PasswordStrength => {
    let score = 0
    
    if (pwd.length >= 8) score++
    if (pwd.length >= 12) score++
    if (/[a-z]/.test(pwd)) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^a-zA-Z0-9]/.test(pwd)) score++

    const strengthLevels: PasswordStrength[] = [
      { score: 0, label: 'Sangat Lemah', color: 'bg-destructive' },
      { score: 1, label: 'Lemah', color: 'bg-orange-500' },
      { score: 2, label: 'Cukup', color: 'bg-yellow-500' },
      { score: 3, label: 'Baik', color: 'bg-blue-500' },
      { score: 4, label: 'Kuat', color: 'bg-primary' },
      { score: 6, label: 'Sangat Kuat', color: 'bg-green-500' },
    ]

    return strengthLevels[Math.min(score, 5)]
  }

  const passwordStrength = calculatePasswordStrength(password)

  // Validation
  const validateForm = (): boolean => {
    setError('')

    if (!password) {
      setError('Kata sandi tidak boleh kosong')
      return false
    }

    if (password.length < 8) {
      setError('Kata sandi minimal 8 karakter')
      return false
    }

    if (!confirmPassword) {
      setError('Konfirmasi kata sandi tidak boleh kosong')
      return false
    }

    if (password !== confirmPassword) {
      setError('Kata sandi tidak cocok')
      return false
    }

    if (!/[A-Z]/.test(password)) {
      setError('Kata sandi harus mengandung minimal 1 huruf besar')
      return false
    }

    if (!/[0-9]/.test(password)) {
      setError('Kata sandi harus mengandung minimal 1 angka')
      return false
    }

    return true
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      setSuccess(true)
      setPassword('')
      setConfirmPassword('')

      // Redirect after success
      setTimeout(() => {
        window.location.href = './beranda.html'
      }, 2000)
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="border-primary/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <SafeIcon name="CheckCircle2" className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Kata Sandi Berhasil Diatur</h3>
              <p className="text-sm text-muted-foreground">
                Anda akan diarahkan ke beranda dalam beberapa detik...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary mx-auto mb-2">
          <SafeIcon name="Lock" className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-center">Atur Kata Sandi</CardTitle>
        <CardDescription className="text-center">
          Buat kata sandi yang kuat untuk melindungi akun Anda
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <SafeIcon name="AlertCircle" className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password">Kata Sandi Baru</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Masukkan kata sandi baru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 bg-background/50"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <SafeIcon
                  name={showPassword ? 'EyeOff' : 'Eye'}
                  className="w-4 h-4"
                />
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Kekuatan kata sandi:</span>
                  <span className={cn(
                    'font-semibold',
                    passwordStrength.score <= 1 && 'text-destructive',
                    passwordStrength.score === 2 && 'text-yellow-500',
                    passwordStrength.score === 3 && 'text-blue-500',
                    passwordStrength.score >= 4 && 'text-green-500'
                  )}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full transition-all duration-300',
                      passwordStrength.color
                    )}
                    style={{
                      width: `${(passwordStrength.score / 6) * 100}%`
                    }}
                  />
                </div>
              </div>
            )}

            {/* Password Requirements */}
            <div className="space-y-1 text-xs text-muted-foreground mt-3">
              <div className="flex items-center gap-2">
                <SafeIcon
                  name={password.length >= 8 ? 'CheckCircle2' : 'Circle'}
                  className={cn(
                    'w-3.5 h-3.5',
                    password.length >= 8 ? 'text-green-500' : 'text-muted-foreground'
                  )}
                />
                <span>Minimal 8 karakter</span>
              </div>
              <div className="flex items-center gap-2">
                <SafeIcon
                  name={/[A-Z]/.test(password) ? 'CheckCircle2' : 'Circle'}
                  className={cn(
                    'w-3.5 h-3.5',
                    /[A-Z]/.test(password) ? 'text-green-500' : 'text-muted-foreground'
                  )}
                />
                <span>Minimal 1 huruf besar (A-Z)</span>
              </div>
              <div className="flex items-center gap-2">
                <SafeIcon
                  name={/[0-9]/.test(password) ? 'CheckCircle2' : 'Circle'}
                  className={cn(
                    'w-3.5 h-3.5',
                    /[0-9]/.test(password) ? 'text-green-500' : 'text-muted-foreground'
                  )}
                />
                <span>Minimal 1 angka (0-9)</span>
              </div>
              <div className="flex items-center gap-2">
                <SafeIcon
                  name={/[^a-zA-Z0-9]/.test(password) ? 'CheckCircle2' : 'Circle'}
                  className={cn(
                    'w-3.5 h-3.5',
                    /[^a-zA-Z0-9]/.test(password) ? 'text-green-500' : 'text-muted-foreground'
                  )}
                />
                <span>Minimal 1 karakter spesial (!@#$%)</span>
              </div>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Masukkan ulang kata sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10 bg-background/50"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <SafeIcon
                  name={showConfirmPassword ? 'EyeOff' : 'Eye'}
                  className="w-4 h-4"
                />
              </button>
            </div>

            {/* Password Match Indicator */}
            {confirmPassword && (
              <div className="flex items-center gap-2 text-xs">
                <SafeIcon
                  name={password === confirmPassword ? 'CheckCircle2' : 'XCircle'}
                  className={cn(
                    'w-3.5 h-3.5',
                    password === confirmPassword ? 'text-green-500' : 'text-destructive'
                  )}
                />
                <span className={password === confirmPassword ? 'text-green-500' : 'text-destructive'}>
                  {password === confirmPassword ? 'Kata sandi cocok' : 'Kata sandi tidak cocok'}
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full neon-glow"
            disabled={isLoading || !password || !confirmPassword}
          >
            {isLoading ? (
              <>
                <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <SafeIcon name="Lock" className="w-4 h-4 mr-2" />
                Simpan Kata Sandi
              </>
            )}
          </Button>

          {/* Back Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => window.history.back()}
            disabled={isLoading}
          >
            <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </form>

        {/* Help Text */}
        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-muted/50">
          <p className="text-xs text-muted-foreground">
            <strong>Tips Keamanan:</strong> Gunakan kombinasi huruf besar, huruf kecil, angka, dan karakter spesial untuk membuat kata sandi yang lebih aman. Jangan gunakan informasi pribadi seperti nama atau tanggal lahir.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

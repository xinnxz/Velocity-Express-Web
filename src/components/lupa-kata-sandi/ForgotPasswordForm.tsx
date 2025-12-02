
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'
import { cn } from '@/lib/utils'

type InputMethod = 'email' | 'phone'

interface FormErrors {
  [key: string]: string
}

export default function ForgotPasswordForm() {
  const [inputMethod, setInputMethod] = useState<InputMethod>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Email validation
  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  // Phone validation (Indonesian format)
  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^(\+62|0)[0-9]{9,12}$/
    return phoneRegex.test(value.replace(/\s/g, ''))
  }

  // Format phone number
  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length === 0) return ''
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 12)}`
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }))
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhone(formatPhoneNumber(value))
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (inputMethod === 'email') {
      if (!email.trim()) {
        newErrors.email = 'Email tidak boleh kosong'
      } else if (!validateEmail(email)) {
        newErrors.email = 'Format email tidak valid'
      }
    } else {
      if (!phone.trim()) {
        newErrors.phone = 'Nomor telepon tidak boleh kosong'
      } else if (!validatePhone(phone)) {
        newErrors.phone = 'Format nomor telepon tidak valid (gunakan format: 62-xxx-xxx-xxxx atau 0xxx-xxx-xxxx)'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccessMessage('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simulate success
      setSuccessMessage(
        inputMethod === 'email'
          ? `Kode verifikasi telah dikirim ke ${email}. Silakan periksa email Anda.`
          : `Kode verifikasi telah dikirim ke ${phone}. Silakan periksa SMS Anda.`
      )

      // Redirect to OTP verification after 2 seconds
      setTimeout(() => {
        window.location.href = './verifikasi-otp.html'
      }, 2000)
    } catch (error) {
      setErrors({
        submit: 'Terjadi kesalahan. Silakan coba lagi.'
      })
    } finally {
      setIsLoading(false)
    }
  }

return (
    <div className="w-full max-w-md" id="ipz7t" style={{ margin: '70px 0px 70px 0px' }}>
      <div id="iypdq" style={{ margin: '50px 0 0 0' }}>
        <Card className="border-border/50 shadow-card">
        <CardHeader className="space-y-2 text-center" id="isbok">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center">
              <SafeIcon name="KeyRound" className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Lupa Kata Sandi?</CardTitle>
          <CardDescription>
            Masukkan email atau nomor telepon terdaftar Anda untuk mengatur ulang kata sandi
          </CardDescription>
        </CardHeader>

        <CardContent>
          {successMessage && (
            <Alert className="mb-6 border-green-500/50 bg-green-500/10">
              <SafeIcon name="CheckCircle2" className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-400">
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          {errors.submit && (
            <Alert variant="destructive" className="mb-6">
              <SafeIcon name="AlertCircle" className="h-4 w-4" />
              <AlertDescription>
                {errors.submit}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs 
              value={inputMethod} 
              onValueChange={(value) => {
                setInputMethod(value as InputMethod)
                setErrors({})
                setSuccessMessage('')
              }}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                <TabsTrigger value="email" className="gap-2">
                  <SafeIcon name="Mail" className="w-4 h-4" />
                  <span className="hidden sm:inline">Email</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="gap-2">
                  <SafeIcon name="Phone" className="w-4 h-4" />
                  <span className="hidden sm:inline">Telepon</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Alamat Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isLoading}
                    className={cn(
                      'bg-background/50 border-border/50',
                      errors.email && 'border-destructive/50 focus-visible:ring-destructive/50'
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <SafeIcon name="AlertCircle" className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Nomor Telepon
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">+62</span>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="812-3456-7890"
                      value={phone}
                      onChange={handlePhoneChange}
                      disabled={isLoading}
                      className={cn(
                        'bg-background/50 border-border/50 flex-1',
                        errors.phone && 'border-destructive/50 focus-visible:ring-destructive/50'
                      )}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <SafeIcon name="AlertCircle" className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Format: 812-3456-7890 atau 0812-3456-7890
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              type="submit" 
              className="w-full neon-glow"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Mengirim Kode Verifikasi...
                </>
              ) : (
                <>
                  <SafeIcon name="Send" className="w-4 h-4 mr-2" />
                  Kirim Kode Verifikasi
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Atau</span>
              </div>
            </div>

            <Button 
              type="button"
              variant="outline"
              className="w-full border-border/50"
              disabled={isLoading}
              onClick={() => window.location.href = './login.html'}
            >
              <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Kembali ke Login
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Belum punya akun?{' '}
              <a 
                href="./registrasi.html" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Daftar di sini
              </a>
            </p>
          </div>
</CardContent>
       </Card>
      </div>

      {/* Decorative elements */}
      <div id="i3h8do" className="absolute top-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div id="i6qoee" className="absolute bottom-20 left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  )
}


'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'
import { cn } from '@/lib/utils'

interface FormData {
  fullName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phoneNumber?: string
  password?: string
  confirmPassword?: string
  general?: string
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap harus diisi'
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Nama lengkap minimal 3 karakter'
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid'
    }

    // Validate phone number
    const phoneRegex = /^(\+62|0)[0-9]{9,12}$/
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Nomor telepon harus diisi'
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Format nomor telepon tidak valid (gunakan +62 atau 0)'
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Kata sandi harus diisi'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Kata sandi minimal 8 karakter'
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Kata sandi harus mengandung huruf kecil'
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Kata sandi harus mengandung huruf besar'
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Kata sandi harus mengandung angka'
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi kata sandi harus diisi'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Kata sandi tidak cocok'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Store registration data in sessionStorage for OTP verification
      sessionStorage.setItem('registrationData', JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber
      }))

      // Redirect to OTP verification
      window.location.href = './verifikasi-otp.html'
    } catch (error) {
      setErrors({
        general: 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.'
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center neon-glow">
            <SafeIcon name="Zap" className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold gradient-text">VeloCity Express</h1>
        <p className="text-muted-foreground">Daftar akun baru untuk memulai pengiriman</p>
      </div>

      {/* Form Card */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle>Buat Akun Baru</CardTitle>
          <CardDescription>
            Isi informasi di bawah untuk membuat akun VeloCity Express Anda
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* General Error Alert */}
            {errors.general && (
              <Alert variant="destructive">
                <SafeIcon name="AlertCircle" className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Nama Lengkap</Label>
              <div className="relative">
                <SafeIcon 
                  name="User" 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Masukkan nama lengkap Anda"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={cn(
                    'pl-10',
                    errors.fullName && 'border-destructive focus-visible:ring-destructive'
                  )}
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <SafeIcon name="AlertCircle" className="w-3 h-3" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <SafeIcon 
                  name="Mail" 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={cn(
                    'pl-10',
                    errors.email && 'border-destructive focus-visible:ring-destructive'
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <SafeIcon name="AlertCircle" className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Nomor Telepon</Label>
              <div className="relative">
                <SafeIcon 
                  name="Phone" 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                />
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="+62 812 3456 7890"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={cn(
                    'pl-10',
                    errors.phoneNumber && 'border-destructive focus-visible:ring-destructive'
                  )}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <SafeIcon name="AlertCircle" className="w-3 h-3" />
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <div className="relative">
                <SafeIcon 
                  name="Lock" 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 8 karakter"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={cn(
                    'pl-10 pr-10',
                    errors.password && 'border-destructive focus-visible:ring-destructive'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <SafeIcon 
                    name={showPassword ? 'EyeOff' : 'Eye'} 
                    className="w-4 h-4"
                  />
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <SafeIcon name="AlertCircle" className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
              <div className="relative">
                <SafeIcon 
                  name="Lock" 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Ulangi kata sandi"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={cn(
                    'pl-10 pr-10',
                    errors.confirmPassword && 'border-destructive focus-visible:ring-destructive'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <SafeIcon 
                    name={showConfirmPassword ? 'EyeOff' : 'Eye'} 
                    className="w-4 h-4"
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <SafeIcon name="AlertCircle" className="w-3 h-3" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full neon-glow mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Mendaftar...
                </>
              ) : (
                <>
                  <SafeIcon name="UserPlus" className="w-4 h-4 mr-2" />
                  Daftar Akun
                </>
              )}
            </Button>

            {/* Login Link */}
            <div className="text-center text-sm text-muted-foreground">
              Sudah punya akun?{' '}
              <a 
                href="./login.html" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Masuk di sini
              </a>
            </div>

            {/* Back to Home */}
            <Button 
              type="button"
              variant="ghost" 
              className="w-full"
              disabled={isLoading}
              onClick={() => window.location.href = './beranda.html'}
            >
              <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-effect border border-border/50 rounded-lg p-4 text-center space-y-2">
          <SafeIcon name="Shield" className="w-6 h-6 text-primary mx-auto" />
          <p className="text-sm font-medium">Aman & Terpercaya</p>
          <p className="text-xs text-muted-foreground">Data Anda dilindungi dengan enkripsi</p>
        </div>
        <div className="glass-effect border border-border/50 rounded-lg p-4 text-center space-y-2">
          <SafeIcon name="Zap" className="w-6 h-6 text-primary mx-auto" />
          <p className="text-sm font-medium">Cepat & Mudah</p>
          <p className="text-xs text-muted-foreground">Proses pendaftaran hanya 2 menit</p>
        </div>
        <div className="glass-effect border border-border/50 rounded-lg p-4 text-center space-y-2">
          <SafeIcon name="Headphones" className="w-6 h-6 text-primary mx-auto" />
          <p className="text-sm font-medium">Dukungan 24/7</p>
          <p className="text-xs text-muted-foreground">Tim kami siap membantu Anda</p>
        </div>
      </div>
    </div>
  )
}

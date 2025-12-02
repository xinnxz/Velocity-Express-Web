
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'
import PasswordStrengthIndicator from '@/components/ubah-kata-sandi/PasswordStrengthIndicator'
import { toast } from 'sonner'

interface FormErrors {
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
  general?: string
}

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [successMessage, setSuccessMessage] = useState('')

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Current password validation
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = 'Kata sandi saat ini diperlukan'
    }

    // New password validation
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'Kata sandi baru diperlukan'
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Kata sandi minimal 8 karakter'
    } else if (!/(?=.*[a-z])/.test(formData.newPassword)) {
      newErrors.newPassword = 'Harus mengandung huruf kecil'
    } else if (!/(?=.*[A-Z])/.test(formData.newPassword)) {
      newErrors.newPassword = 'Harus mengandung huruf besar'
    } else if (!/(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Harus mengandung angka'
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Konfirmasi kata sandi diperlukan'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Kata sandi tidak cocok'
    }

    // Check if new password is same as current
    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'Kata sandi baru harus berbeda dari yang sekarang'
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
      toast.error('Mohon periksa kembali form Anda')
      return
    }

    setIsLoading(true)
    setSuccessMessage('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Success
      setSuccessMessage('Kata sandi berhasil diperbarui!')
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      toast.success('Kata sandi Anda telah diubah dengan aman')

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = './edit-profil.html'
      }, 2000)
    } catch (error) {
      setErrors({
        general: 'Gagal mengubah kata sandi. Silakan coba lagi.'
      })
      toast.error('Gagal mengubah kata sandi')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <Alert className="bg-green-500/10 border-green-500/30 text-green-400">
          <SafeIcon name="CheckCircle2" className="h-4 w-4" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* General Error */}
      {errors.general && (
        <Alert className="bg-destructive/10 border-destructive/30 text-destructive">
          <SafeIcon name="AlertCircle" className="h-4 w-4" />
          <AlertDescription>{errors.general}</AlertDescription>
        </Alert>
      )}

      {/* Current Password */}
      <div className="space-y-2">
        <Label htmlFor="currentPassword" className="text-sm font-medium">
          Kata Sandi Saat Ini
        </Label>
        <div className="relative">
          <Input
            id="currentPassword"
            name="currentPassword"
            type={showPasswords.current ? 'text' : 'password'}
            placeholder="Masukkan kata sandi saat ini"
            value={formData.currentPassword}
            onChange={handleChange}
            disabled={isLoading}
            className={`pr-10 ${errors.currentPassword ? 'border-destructive' : ''}`}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPasswords(prev => ({
              ...prev,
              current: !prev.current
            }))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            <SafeIcon 
              name={showPasswords.current ? 'EyeOff' : 'Eye'} 
              className="w-4 h-4" 
            />
          </button>
        </div>
        {errors.currentPassword && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="w-3 h-3" />
            {errors.currentPassword}
          </p>
        )}
      </div>

      {/* New Password */}
      <div className="space-y-2">
        <Label htmlFor="newPassword" className="text-sm font-medium">
          Kata Sandi Baru
        </Label>
        <div className="relative">
          <Input
            id="newPassword"
            name="newPassword"
            type={showPasswords.new ? 'text' : 'password'}
            placeholder="Masukkan kata sandi baru"
            value={formData.newPassword}
            onChange={handleChange}
            disabled={isLoading}
            className={`pr-10 ${errors.newPassword ? 'border-destructive' : ''}`}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPasswords(prev => ({
              ...prev,
              new: !prev.new
            }))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            <SafeIcon 
              name={showPasswords.new ? 'EyeOff' : 'Eye'} 
              className="w-4 h-4" 
            />
          </button>
        </div>

        {/* Password Strength Indicator */}
        {formData.newPassword && (
          <PasswordStrengthIndicator password={formData.newPassword} />
        )}

        {errors.newPassword && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="w-3 h-3" />
            {errors.newPassword}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">
          Konfirmasi Kata Sandi
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPasswords.confirm ? 'text' : 'password'}
            placeholder="Konfirmasi kata sandi baru"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            className={`pr-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPasswords(prev => ({
              ...prev,
              confirm: !prev.confirm
            }))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            <SafeIcon 
              name={showPasswords.confirm ? 'EyeOff' : 'Eye'} 
              className="w-4 h-4" 
            />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <SafeIcon name="AlertCircle" className="w-3 h-3" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Match Indicator */}
      {formData.newPassword && formData.confirmPassword && (
        <div className={`flex items-center gap-2 text-sm ${
          formData.newPassword === formData.confirmPassword
            ? 'text-green-400'
            : 'text-destructive'
        }`}>
          <SafeIcon 
            name={formData.newPassword === formData.confirmPassword ? 'CheckCircle2' : 'XCircle'} 
            className="w-4 h-4" 
          />
          {formData.newPassword === formData.confirmPassword
            ? 'Kata sandi cocok'
            : 'Kata sandi tidak cocok'
          }
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          asChild
        >
          <a href="./edit-profil.html">Batal</a>
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? (
            <>
              <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <SafeIcon name="Lock" className="w-4 h-4 mr-2" />
              Simpan Kata Sandi Baru
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

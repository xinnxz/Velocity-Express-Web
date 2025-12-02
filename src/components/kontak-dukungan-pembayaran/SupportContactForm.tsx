
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import { toast } from 'sonner'

interface FormData {
  name: string
  email: string
  phone: string
  orderNumber: string
  issueType: string
  message: string
}

const issueTypes = [
  { value: 'payment-failed', label: 'Pembayaran Gagal' },
  { value: 'payment-not-confirmed', label: 'Pembayaran Belum Dikonfirmasi' },
  { value: 'refund-request', label: 'Permintaan Refund' },
  { value: 'payment-duplicate', label: 'Pembayaran Ganda' },
  { value: 'payment-method-issue', label: 'Masalah Metode Pembayaran' },
  { value: 'other', label: 'Lainnya' },
]

export default function SupportContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    orderNumber: '',
    issueType: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      issueType: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.email || !formData.issueType || !formData.message) {
      toast.error('Mohon isi semua field yang diperlukan')
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Pesan Anda telah dikirim! Tim kami akan menghubungi Anda segera.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        orderNumber: '',
        issueType: '',
        message: '',
      })
    } catch (error) {
      toast.error('Gagal mengirim pesan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle>Hubungi Tim Dukungan</CardTitle>
        <CardDescription>
          Isi formulir di bawah dan tim kami akan merespons dalam waktu singkat
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Masukkan nama Anda"
              value={formData.name}
              onChange={handleChange}
              className="bg-background/50"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-background/50"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Nomor Telepon</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+62 812-3456-7890"
              value={formData.phone}
              onChange={handleChange}
              className="bg-background/50"
            />
          </div>

          {/* Order Number */}
          <div className="space-y-2">
            <Label htmlFor="orderNumber">Nomor Pesanan (Opsional)</Label>
            <Input
              id="orderNumber"
              name="orderNumber"
              placeholder="VEL-2024-001234"
              value={formData.orderNumber}
              onChange={handleChange}
              className="bg-background/50"
            />
          </div>

          {/* Issue Type */}
          <div className="space-y-2">
            <Label htmlFor="issueType">Jenis Masalah *</Label>
            <Select value={formData.issueType} onValueChange={handleSelectChange}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Pilih jenis masalah" />
              </SelectTrigger>
              <SelectContent>
                {issueTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Pesan *</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Jelaskan masalah Anda secara detail..."
              value={formData.message}
              onChange={handleChange}
              className="bg-background/50 min-h-32 resize-none"
              required
            />
            <p className="text-xs text-muted-foreground">
              Semakin detail penjelasan Anda, semakin cepat kami dapat membantu
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 neon-glow"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <SafeIcon name="Send" className="w-4 h-4 mr-2" />
                  Kirim Pesan
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setFormData({
                name: '',
                email: '',
                phone: '',
                orderNumber: '',
                issueType: '',
                message: '',
              })}
            >
              Bersihkan
            </Button>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex gap-3">
              <SafeIcon name="Info" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Informasi Penting</p>
                <p className="text-muted-foreground">
                  Pastikan email Anda benar agar kami dapat menghubungi Anda. 
                  Kami akan merespons dalam waktu kurang dari 1 jam pada jam kerja.
                </p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

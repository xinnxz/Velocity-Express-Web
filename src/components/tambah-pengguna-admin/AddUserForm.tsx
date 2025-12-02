
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import SafeIcon from '@/components/common/SafeIcon'
import { toast } from 'sonner'

// Validation schema
const userFormSchema = z.object({
  name: z.string().min(3, 'Nama harus minimal 3 karakter').max(100),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon harus minimal 10 digit').max(15),
  role: z.enum(['admin', 'operator', 'customer_service', 'finance'], {
    errorMap: () => ({ message: 'Pilih peran yang valid' })
  }),
  status: z.enum(['active', 'inactive'], {
    errorMap: () => ({ message: 'Pilih status yang valid' })
  }),
})

type UserFormValues = z.infer<typeof userFormSchema>

const defaultValues: UserFormValues = {
  name: '',
  email: '',
  phone: '',
  role: 'operator',
  status: 'active',
}

const roleOptions = [
  { value: 'admin', label: 'Administrator', description: 'Akses penuh ke semua fitur' },
  { value: 'operator', label: 'Operator', description: 'Kelola pengiriman dan pelacakan' },
  { value: 'customer_service', label: 'Customer Service', description: 'Dukungan pelanggan' },
  { value: 'finance', label: 'Finance', description: 'Manajemen keuangan dan laporan' },
]

const statusOptions = [
  { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Tidak Aktif' },
]

export default function AddUserForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  })

  const onSubmit = async (data: UserFormValues) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('User data:', data)
      toast.success('Pengguna berhasil ditambahkan')
      
      // Redirect to user management page
      setTimeout(() => {
        window.location.href = './manajemen-pengguna-admin.html'
      }, 500)
    } catch (error) {
      toast.error('Gagal menambahkan pengguna')
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    window.location.href = './manajemen-pengguna-admin.html'
  }

  return (
    <Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" id="imwmdz">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan nama lengkap pengguna"
                  {...field}
                  disabled={isSubmitting}
                  className="bg-background/50"
                />
              </FormControl>
              <FormDescription>
                Nama lengkap pengguna yang akan ditampilkan di sistem
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="nama@example.com"
                  {...field}
                  disabled={isSubmitting}
                  className="bg-background/50"
                />
              </FormControl>
              <FormDescription>
                Email akan digunakan untuk login dan notifikasi
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Field */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Telepon</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+62 812 3456 7890"
                  {...field}
                  disabled={isSubmitting}
                  className="bg-background/50"
                />
              </FormControl>
              <FormDescription>
                Nomor telepon untuk kontak darurat
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Field */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peran/Role</FormLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isSubmitting}>
                <FormControl>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Pilih peran pengguna" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex flex-col">
                        <span>{option.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {option.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Tentukan level akses dan izin pengguna
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status Field */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isSubmitting}>
                <FormControl>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Tentukan apakah pengguna aktif atau tidak
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Actions */}
<div className="flex gap-3 pt-6 border-t border-border" id="i2apg6">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1"
            id="ivgefm"
          >
            <SafeIcon name="X" className="w-4 h-4 mr-2" />
            Batal
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 neon-glow"
          >
            {isSubmitting ? (
              <>
                <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
                Tambah Pengguna
              </>
            )}
          </Button>
        </div>

        {/* Info Box */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-sm">
          <div className="flex gap-3">
            <SafeIcon name="Info" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-primary mb-1">Informasi Penting</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Password sementara akan dikirim ke email pengguna</li>
                <li>• Pengguna harus mengubah password saat login pertama kali</li>
                <li>• Pastikan email dan nomor telepon sudah benar sebelum menyimpan</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

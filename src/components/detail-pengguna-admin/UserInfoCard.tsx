
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import { cn } from '@/lib/utils'

interface UserData {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
  status: 'active' | 'inactive'
  role: string
  registeredDate: string
  lastLogin: string
  totalShipments: number
  totalSpent: number
  accountVerified: boolean
  phoneVerified: boolean
  emailVerified: boolean
}

interface UserInfoCardProps {
  userData: UserData
  isEditing: boolean
  onEdit: () => void
  onSave: () => void
  onCancel: () => void
}

export default function UserInfoCard({
  userData,
  isEditing,
  onEdit,
  onSave,
  onCancel
}: UserInfoCardProps) {
  const [editedData, setEditedData] = useState(userData)

  const handleInputChange = (field: keyof UserData, value: string) => {
    setEditedData(prev => ({ ...prev, [field]: value }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className="glass-effect border-border/50">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-2xl">Informasi Pengguna</CardTitle>
          <CardDescription>Data pribadi dan akun pengguna</CardDescription>
        </div>
        {!isEditing && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onEdit}
          >
            <SafeIcon name="Edit2" className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* User Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-border/50">
          <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
            <SafeIcon name="User" className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-bold">{editedData.name}</h2>
              <Badge 
                variant={editedData.status === 'active' ? 'default' : 'secondary'}
                className={cn(
                  editedData.status === 'active' 
                    ? 'bg-green-500/20 text-green-400 border-green-500/50'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {editedData.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">ID: {editedData.id}</p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
            Informasi Dasar
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={editedData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-background/50"
                />
              ) : (
                <p className="text-sm font-medium">{editedData.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={editedData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-background/50"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{editedData.email}</p>
                  {editedData.emailVerified && (
                    <SafeIcon name="CheckCircle2" className="w-4 h-4 text-green-500" />
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={editedData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-background/50"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{editedData.phone}</p>
                  {editedData.phoneVerified && (
                    <SafeIcon name="CheckCircle2" className="w-4 h-4 text-green-500" />
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Peran</Label>
              <p className="text-sm font-medium capitalize">{editedData.role}</p>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
            Alamat
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Alamat Lengkap</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={editedData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="bg-background/50"
                />
              ) : (
                <p className="text-sm font-medium">{editedData.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Kota</Label>
                {isEditing ? (
                  <Input
                    id="city"
                    value={editedData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="bg-background/50"
                  />
                ) : (
                  <p className="text-sm font-medium">{editedData.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">Provinsi</Label>
                {isEditing ? (
                  <Input
                    id="province"
                    value={editedData.province}
                    onChange={(e) => handleInputChange('province', e.target.value)}
                    className="bg-background/50"
                  />
                ) : (
                  <p className="text-sm font-medium">{editedData.province}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Kode Pos</Label>
                {isEditing ? (
                  <Input
                    id="postalCode"
                    value={editedData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="bg-background/50"
                  />
                ) : (
                  <p className="text-sm font-medium">{editedData.postalCode}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
            Statistik Akun
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-background/50 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Total Pengiriman</p>
              <p className="text-lg font-bold">{editedData.totalShipments}</p>
            </div>

            <div className="p-3 rounded-lg bg-background/50 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Total Pengeluaran</p>
              <p className="text-lg font-bold">
                Rp {(editedData.totalSpent / 1000000).toFixed(1)}M
              </p>
            </div>

            <div className="p-3 rounded-lg bg-background/50 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Terdaftar</p>
              <p className="text-sm font-bold">{formatDate(editedData.registeredDate)}</p>
            </div>

            <div className="p-3 rounded-lg bg-background/50 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Login Terakhir</p>
              <p className="text-sm font-bold">{formatDateTime(editedData.lastLogin)}</p>
            </div>
          </div>
        </div>

        {/* Edit Actions */}
        {isEditing && (
          <div className="flex gap-2 pt-4 border-t border-border/50">
            <Button 
              onClick={onSave}
              className="flex-1"
            >
              <SafeIcon name="Save" className="w-4 h-4 mr-2" />
              Simpan Perubahan
            </Button>
            <Button 
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Batal
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

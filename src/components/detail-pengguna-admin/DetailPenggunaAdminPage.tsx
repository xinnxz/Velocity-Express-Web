
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon'
import UserInfoCard from '@/components/detail-pengguna-admin/UserInfoCard'
import UserActivityTimeline from '@/components/detail-pengguna-admin/UserActivityTimeline'
import UserActionsPanel from '@/components/detail-pengguna-admin/UserActionsPanel'
import UserPermissionsSection from '@/components/detail-pengguna-admin/UserPermissionsSection'

// Mock user data for SSG
const mockUserData = {
  id: 'USR-2024-001',
  name: 'Ahmad Wijaya',
  email: 'ahmad.wijaya@example.com',
  phone: '+62812-3456-7890',
  address: 'Jl. Merdeka No. 123, Jakarta Pusat, DKI Jakarta 12190',
  city: 'Jakarta',
  province: 'DKI Jakarta',
  postalCode: '12190',
  status: 'active',
  role: 'customer',
  registeredDate: '2024-01-15',
  lastLogin: '2024-12-19T14:30:00',
  totalShipments: 45,
  totalSpent: 2500000,
  accountVerified: true,
  phoneVerified: true,
  emailVerified: true,
  activities: [
    {
      id: 1,
      type: 'shipment_created',
      description: 'Membuat pesanan pengiriman baru',
      timestamp: '2024-12-19T14:30:00',
      details: 'Pesanan #ORD-2024-12345'
    },
    {
      id: 2,
      type: 'payment_completed',
      description: 'Pembayaran berhasil diproses',
      timestamp: '2024-12-18T10:15:00',
      details: 'Rp 150.000 via Transfer Bank'
    },
    {
      id: 3,
      type: 'shipment_delivered',
      description: 'Paket berhasil diterima',
      timestamp: '2024-12-17T16:45:00',
      details: 'Pesanan #ORD-2024-12344'
    },
    {
      id: 4,
      type: 'login',
      description: 'Login ke aplikasi',
      timestamp: '2024-12-17T08:20:00',
      details: 'Login dari IP 192.168.1.1'
    },
    {
      id: 5,
      type: 'profile_updated',
      description: 'Profil pengguna diperbarui',
      timestamp: '2024-12-16T13:00:00',
      details: 'Nomor telepon diubah'
    }
  ],
  permissions: [
    { id: 1, name: 'Membuat Pesanan', granted: true },
    { id: 2, name: 'Melacak Pengiriman', granted: true },
    { id: 3, name: 'Mengakses Riwayat', granted: true },
    { id: 4, name: 'Mengubah Profil', granted: true },
    { id: 5, name: 'Akses Admin', granted: false }
  ]
}

export default function DetailPenggunaAdminPage() {
  const [userData, setUserData] = useState(mockUserData)
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false)

  const handleBackClick = () => {
    window.location.href = './manajemen-pengguna-admin.html'
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveChanges = () => {
    setIsEditing(false)
    // In real app, would send update to backend
  }

  const handleResetPassword = () => {
    setShowPasswordReset(true)
    // In real app, would trigger password reset email
    setTimeout(() => setShowPasswordReset(false), 3000)
  }

  const handleDeactivateAccount = () => {
    setShowDeactivateConfirm(true)
  }

  const confirmDeactivate = () => {
    setUserData(prev => ({ ...prev, status: 'inactive' }))
    setShowDeactivateConfirm(false)
  }

  const handleReactivateAccount = () => {
    setUserData(prev => ({ ...prev, status: 'active' }))
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleBackClick}
          >
            <SafeIcon name="ArrowLeft" className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Detail Pengguna</h1>
            <p className="text-muted-foreground">Kelola informasi dan pengaturan pengguna</p>
          </div>
        </div>
        <div className="flex gap-2">
          {userData.status === 'active' ? (
            <Button 
              variant="destructive" 
              onClick={handleDeactivateAccount}
            >
              <SafeIcon name="Ban" className="w-4 h-4 mr-2" />
              Nonaktifkan Akun
            </Button>
          ) : (
            <Button 
              variant="outline"
              onClick={handleReactivateAccount}
            >
              <SafeIcon name="CheckCircle2" className="w-4 h-4 mr-2" />
              Aktifkan Kembali
            </Button>
          )}
        </div>
      </div>

      {/* Status Alert */}
      {userData.status === 'inactive' && (
        <Alert className="border-destructive/50 bg-destructive/10">
          <SafeIcon name="AlertCircle" className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            Akun pengguna ini sedang tidak aktif. Pengguna tidak dapat mengakses layanan.
          </AlertDescription>
        </Alert>
      )}

      {showPasswordReset && (
        <Alert className="border-green-500/50 bg-green-500/10">
          <SafeIcon name="CheckCircle2" className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-500">
            Email reset password telah dikirim ke {userData.email}
          </AlertDescription>
        </Alert>
      )}

      {/* Deactivate Confirmation */}
      {showDeactivateConfirm && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Konfirmasi Nonaktifkan Akun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Anda yakin ingin menonaktifkan akun pengguna ini? Pengguna tidak akan dapat mengakses layanan sampai akun diaktifkan kembali.
            </p>
            <div className="flex gap-2">
              <Button 
                variant="destructive"
                onClick={confirmDeactivate}
              >
                Ya, Nonaktifkan
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowDeactivateConfirm(false)}
              >
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Info */}
        <div className="lg:col-span-2 space-y-6">
          <UserInfoCard 
            userData={userData}
            isEditing={isEditing}
            onEdit={handleEditClick}
            onSave={handleSaveChanges}
            onCancel={() => setIsEditing(false)}
          />

          {/* Tabs */}
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="activity">
                <SafeIcon name="History" className="w-4 h-4 mr-2" />
                Riwayat Aktivitas
              </TabsTrigger>
              <TabsTrigger value="permissions">
                <SafeIcon name="Lock" className="w-4 h-4 mr-2" />
                Izin Akses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              <UserActivityTimeline activities={userData.activities} />
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <UserPermissionsSection permissions={userData.permissions} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Actions */}
        <div>
          <UserActionsPanel 
            userData={userData}
            onResetPassword={handleResetPassword}
            onDeactivate={handleDeactivateAccount}
          />
        </div>
      </div>
    </div>
  )
}


import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'
import EditProfileForm from '@/components/edit-profil/EditProfileForm'
import ProfileInfoCard from '@/components/edit-profil/ProfileInfoCard'

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  city: string
  province: string
  postalCode: string
  profileImage?: string
}

const mockUserData: UserProfile = {
  id: 'USR-001',
  firstName: 'Ahmad',
  lastName: 'Wijaya',
  email: 'ahmad.wijaya@example.com',
  phone: '+62812345678',
  dateOfBirth: '1990-05-15',
  gender: 'male',
  address: 'Jl. Merdeka No. 123',
  city: 'Jakarta',
  province: 'DKI Jakarta',
  postalCode: '12345'
}

export default function EditProfileContent() {
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserData)
  const [isEditing, setIsEditing] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleSaveProfile = (updatedData: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updatedData }))
    setIsEditing(false)
    setSuccessMessage('Profil berhasil diperbarui')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
        <a href="./pengaturan-akun.html" className="hover:text-primary transition-colors">
          Pengaturan Akun
        </a>
        <SafeIcon name="ChevronRight" className="w-4 h-4" />
        <span className="text-foreground">Edit Profil</span>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400 flex items-center gap-2">
          <SafeIcon name="CheckCircle2" className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1">
          <ProfileInfoCard userProfile={userProfile} />
        </div>

        {/* Right Column - Edit Form & Options */}
        <div className="lg:col-span-2 space-y-6">
          {/* Edit Profile Form */}
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Informasi Pribadi</CardTitle>
                  <CardDescription>
                    Perbarui data pribadi Anda
                  </CardDescription>
                </div>
                {!isEditing && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <SafeIcon name="Edit2" className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <EditProfileForm 
                  initialData={userProfile}
                  onSave={handleSaveProfile}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nama Depan</label>
                      <p className="text-foreground mt-1">{userProfile.firstName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nama Belakang</label>
                      <p className="text-foreground mt-1">{userProfile.lastName}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-foreground mt-1">{userProfile.email}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nomor Telepon</label>
                    <p className="text-foreground mt-1">{userProfile.phone}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Tanggal Lahir</label>
                      <p className="text-foreground mt-1">
                        {new Date(userProfile.dateOfBirth).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Jenis Kelamin</label>
                      <p className="text-foreground mt-1 capitalize">
                        {userProfile.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Alamat</label>
                    <p className="text-foreground mt-1">{userProfile.address}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Kota</label>
                      <p className="text-foreground mt-1">{userProfile.city}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Provinsi</label>
                      <p className="text-foreground mt-1">{userProfile.province}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Kode Pos</label>
                      <p className="text-foreground mt-1">{userProfile.postalCode}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Change Password Card */}
            <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-pointer group">
              <a href="./ubah-kata-sandi.html" className="block p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <SafeIcon name="Lock" className="w-5 h-5 text-primary" />
                  </div>
                  <SafeIcon name="ArrowRight" className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold mb-1">Ubah Kata Sandi</h3>
                <p className="text-sm text-muted-foreground">
                  Perbarui kata sandi akun Anda
                </p>
              </a>
            </Card>

            {/* Manage Addresses Card */}
            <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-pointer group">
              <a href="./manajemen-alamat.html" className="block p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                    <SafeIcon name="MapPin" className="w-5 h-5 text-secondary" />
                  </div>
                  <SafeIcon name="ArrowRight" className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold mb-1">Manajemen Alamat</h3>
                <p className="text-sm text-muted-foreground">
                  Kelola alamat pengiriman Anda
                </p>
              </a>
            </Card>
          </div>

          {/* Back Button */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              asChild
              className="flex-1 sm:flex-none"
            >
              <a href="./pengaturan-akun.html">
                <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Kembali ke Pengaturan Akun
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

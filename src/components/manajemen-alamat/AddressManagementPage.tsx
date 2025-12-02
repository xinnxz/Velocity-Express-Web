
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import AddressList from '@/components/manajemen-alamat/AddressList'
import AddressForm from '@/components/manajemen-alamat/AddressForm'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export interface Address {
  id: string
  label: string
  recipientName: string
  phone: string
  street: string
  district: string
  city: string
  province: string
  postalCode: string
  isDefault: boolean
  type: 'pickup' | 'delivery'
}

const MOCK_ADDRESSES: Address[] = [
  {
    id: '1',
    label: 'Rumah',
    recipientName: 'Budi Santoso',
    phone: '+62812345678',
    street: 'Jl. Merdeka No. 123',
    district: 'Menteng',
    city: 'Jakarta Pusat',
    province: 'DKI Jakarta',
    postalCode: '10310',
    isDefault: true,
    type: 'delivery'
  },
  {
    id: '2',
    label: 'Kantor',
    recipientName: 'PT. Maju Jaya',
    phone: '+62213456789',
    street: 'Jl. Sudirman No. 456, Gedung A',
    district: 'Senayan',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    postalCode: '12190',
    isDefault: false,
    type: 'pickup'
  },
  {
    id: '3',
    label: 'Gudang',
    recipientName: 'Warehouse Manager',
    phone: '+62214567890',
    street: 'Jl. Industri No. 789',
    district: 'Cakung',
    city: 'Jakarta Timur',
    province: 'DKI Jakarta',
    postalCode: '13910',
    isDefault: false,
    type: 'pickup'
  }
]

export default function AddressManagementPage() {
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const handleAddAddress = (newAddress: Omit<Address, 'id'>) => {
    const address: Address = {
      ...newAddress,
      id: Date.now().toString()
    }
    setAddresses([...addresses, address])
    setIsFormOpen(false)
  }

  const handleEditAddress = (updatedAddress: Address) => {
    setAddresses(addresses.map(addr => 
      addr.id === updatedAddress.id ? updatedAddress : addr
    ))
    setEditingAddress(null)
    setIsFormOpen(false)
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
    setDeleteConfirmId(null)
  }

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })))
  }

  return (
    <div className="min-h-[calc(100vh-128px)] bg-gradient-dark">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="./edit-profil.html">
                <SafeIcon name="ArrowLeft" className="w-5 h-5" />
              </a>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Manajemen Alamat</h1>
              <p className="text-muted-foreground mt-1">
                Kelola alamat pengiriman dan penjemputan Anda
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Address Button */}
            <Button 
              onClick={() => {
                setEditingAddress(null)
                setIsFormOpen(true)
              }}
              className="w-full neon-glow"
              size="lg"
            >
              <SafeIcon name="Plus" className="w-5 h-5 mr-2" />
              Tambah Alamat Baru
            </Button>

            {/* Address List */}
            <AddressList
              addresses={addresses}
              onEdit={(address) => {
                setEditingAddress(address)
                setIsFormOpen(true)
              }}
              onDelete={(id) => setDeleteConfirmId(id)}
              onSetDefault={handleSetDefault}
            />

            {/* Empty State */}
            {addresses.length === 0 && (
              <Card className="border-border/50 glass-effect">
                <CardContent className="pt-12 pb-12 text-center">
                  <SafeIcon name="MapPin" className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Belum Ada Alamat</h3>
                  <p className="text-muted-foreground mb-6">
                    Tambahkan alamat pengiriman atau penjemputan untuk memudahkan proses pengiriman
                  </p>
                  <Button 
                    onClick={() => {
                      setEditingAddress(null)
                      setIsFormOpen(true)
                    }}
                  >
                    <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
                    Tambah Alamat Pertama
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="border-border/50 glass-effect sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Tips Manajemen Alamat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <SafeIcon name="CheckCircle2" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Alamat Default</p>
                    <p className="text-muted-foreground">
                      Atur alamat default untuk pengiriman cepat
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <SafeIcon name="MapPin" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Tipe Alamat</p>
                    <p className="text-muted-foreground">
                      Pilih tipe alamat (pengiriman atau penjemputan)
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <SafeIcon name="Edit2" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Edit Kapan Saja</p>
                    <p className="text-muted-foreground">
                      Ubah atau hapus alamat sesuai kebutuhan Anda
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Statistics */}
            <Card className="border-border/50 glass-effect">
              <CardHeader>
                <CardTitle className="text-lg">Statistik Alamat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Alamat</span>
                  <span className="text-2xl font-bold">{addresses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Alamat Pengiriman</span>
                  <span className="font-semibold">
                    {addresses.filter(a => a.type === 'delivery').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Alamat Penjemputan</span>
                  <span className="font-semibold">
                    {addresses.filter(a => a.type === 'pickup').length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add/Edit Address Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? 'Edit Alamat' : 'Tambah Alamat Baru'}
            </DialogTitle>
            <DialogDescription>
              {editingAddress 
                ? 'Perbarui informasi alamat Anda'
                : 'Masukkan detail alamat pengiriman atau penjemputan'
              }
            </DialogDescription>
          </DialogHeader>
          <AddressForm
            address={editingAddress || undefined}
            onSubmit={(data) => {
              if (editingAddress) {
                handleEditAddress({ ...editingAddress, ...data })
              } else {
                handleAddAddress(data)
              }
            }}
            onCancel={() => {
              setIsFormOpen(false)
              setEditingAddress(null)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Alamat</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus alamat ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end">
            <Button 
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
            >
              Batal
            </Button>
            <Button 
              variant="destructive"
              onClick={() => deleteConfirmId && handleDeleteAddress(deleteConfirmId)}
            >
              <SafeIcon name="Trash2" className="w-4 h-4 mr-2" />
              Hapus
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

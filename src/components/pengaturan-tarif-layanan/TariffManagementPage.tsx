
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import TariffList from './TariffList'
import TariffEditor from './TariffEditor'
import TariffHistoryLink from './TariffHistoryLink'
import { mockTariffs, type Tariff } from './tariffMockData'

export default function TariffManagementPage() {
  const [tariffs, setTariffs] = useState<Tariff[]>(mockTariffs)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterService, setFilterService] = useState<string>('all')
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingTariff, setEditingTariff] = useState<Tariff | null>(null)

  const filteredTariffs = tariffs.filter(tariff => {
    const matchesSearch = tariff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tariff.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterService === 'all' || tariff.serviceType === filterService
    return matchesSearch && matchesFilter
  })

  const serviceTypes = Array.from(new Set(tariffs.map(t => t.serviceType)))

  const handleAddTariff = () => {
    setEditingTariff(null)
    setIsEditorOpen(true)
  }

  const handleEditTariff = (tariff: Tariff) => {
    setEditingTariff(tariff)
    setIsEditorOpen(true)
  }

  const handleSaveTariff = (tariffData: Omit<Tariff, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTariff) {
      // Update existing tariff
      setTariffs(tariffs.map(t => 
        t.id === editingTariff.id 
          ? { ...t, ...tariffData, updatedAt: new Date().toISOString() }
          : t
      ))
    } else {
      // Add new tariff
      const newTariff: Tariff = {
        id: `tariff_${Date.now()}`,
        ...tariffData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setTariffs([...tariffs, newTariff])
    }
    setIsEditorOpen(false)
    setEditingTariff(null)
  }

  const handleDeleteTariff = (id: string) => {
    setTariffs(tariffs.filter(t => t.id !== id))
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Pengaturan Tarif Layanan</h1>
          <p className="text-muted-foreground mt-1">
            Kelola harga dan tarif untuk semua layanan pengiriman
          </p>
        </div>
        <Button onClick={handleAddTariff} className="neon-glow">
          <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
          Tambah Tarif Baru
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-effect border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tarif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tariffs.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Layanan pengiriman aktif
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Jenis Layanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceTypes.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Kategori layanan berbeda
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Harga Rata-rata
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {Math.round(tariffs.reduce((sum, t) => sum + t.basePrice, 0) / tariffs.length).toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Per pengiriman
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="tariffs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tariffs">Daftar Tarif</TabsTrigger>
          <TabsTrigger value="history">
            <SafeIcon name="History" className="w-4 h-4 mr-2" />
            Riwayat Perubahan
          </TabsTrigger>
        </TabsList>

        {/* Tariffs Tab */}
        <TabsContent value="tariffs" className="space-y-4">
          {/* Search and Filter */}
          <Card className="glass-effect border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Filter & Pencarian</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cari Tarif</label>
                  <Input
                    placeholder="Cari nama atau jenis layanan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Jenis Layanan</label>
                  <select
                    value={filterService}
                    onChange={(e) => setFilterService(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-background/50 border border-border text-foreground text-sm"
                  >
                    <option value="all">Semua Layanan</option>
                    {serviceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tariff List */}
          <TariffList
            tariffs={filteredTariffs}
            onEdit={handleEditTariff}
            onDelete={handleDeleteTariff}
          />
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <TariffHistoryLink />
        </TabsContent>
      </Tabs>

      {/* Tariff Editor Dialog */}
      {isEditorOpen && (
        <TariffEditor
          tariff={editingTariff}
          onSave={handleSaveTariff}
          onClose={() => {
            setIsEditorOpen(false)
            setEditingTariff(null)
          }}
        />
      )}
    </div>
  )
}

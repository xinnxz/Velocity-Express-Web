
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon'
import LocationInput from './LocationInput'
import MapDisplay from './MapDisplay'
import LocationSummary from './LocationSummary'
import { MOCK_ORIGIN_LOCATION, MOCK_DESTINATION_LOCATION } from '@/data/order_data'
import type { LocationModel } from '@/data/order_data'

interface LocationState {
  origin: LocationModel | null
  destination: LocationModel | null
  distance: number | null
}

export default function LocationPicker() {
  const [locations, setLocations] = useState<LocationState>({
    origin: MOCK_ORIGIN_LOCATION,
    destination: MOCK_DESTINATION_LOCATION,
    distance: calculateDistance(MOCK_ORIGIN_LOCATION.coordinate, MOCK_DESTINATION_LOCATION.coordinate)
  })

  const [activeTab, setActiveTab] = useState('map')
  const [isValidating, setIsValidating] = useState(false)

  function calculateDistance(coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }): number {
    const R = 6371 // Earth's radius in km
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180
    const dLng = (coord2.lng - coord1.lng) * Math.PI / 180
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return Math.round(R * c * 10) / 10
  }

  const handleOriginChange = (location: LocationModel) => {
    setLocations(prev => ({
      ...prev,
      origin: location,
      distance: prev.destination ? calculateDistance(location.coordinate, prev.destination.coordinate) : null
    }))
  }

  const handleDestinationChange = (location: LocationModel) => {
    setLocations(prev => ({
      ...prev,
      destination: location,
      distance: prev.origin ? calculateDistance(prev.origin.coordinate, location.coordinate) : null
    }))
  }

  const handleSwapLocations = () => {
    setLocations(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }))
  }

  const handleContinue = async () => {
    if (!locations.origin || !locations.destination) {
      alert('Mohon isi kedua lokasi terlebih dahulu')
      return
    }

    setIsValidating(true)
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsValidating(false)

    // Store locations in sessionStorage for next page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('orderLocations', JSON.stringify(locations))
      window.location.href = './masukkan-detail-paket.html'
    }
  }

  const isComplete = locations.origin && locations.destination && locations.distance

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/50">
            <span className="text-sm font-semibold text-primary">2</span>
          </div>
          <h1 className="text-3xl font-bold">Pilih Lokasi Pengiriman</h1>
        </div>
        <p className="text-muted-foreground">
          Tentukan lokasi penjemputan dan tujuan pengiriman Anda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="map" className="flex items-center gap-2">
                <SafeIcon name="Map" className="w-4 h-4" />
                <span className="hidden sm:inline">Peta</span>
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center gap-2">
                <SafeIcon name="Search" className="w-4 h-4" />
                <span className="hidden sm:inline">Cari Alamat</span>
              </TabsTrigger>
            </TabsList>

            {/* Map Tab */}
            <TabsContent value="map" className="space-y-4">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Peta Lokasi</CardTitle>
                  <CardDescription>
                    Klik pada peta untuk memilih lokasi atau gunakan pencarian
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MapDisplay 
                    origin={locations.origin}
                    destination={locations.destination}
                    distance={locations.distance}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Search Tab */}
            <TabsContent value="search" className="space-y-4">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Cari Alamat</CardTitle>
                  <CardDescription>
                    Masukkan alamat penjemputan dan tujuan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Origin Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <SafeIcon name="MapPin" className="w-4 h-4 text-primary" />
                      Lokasi Penjemputan
                    </label>
                    <LocationInput
                      value={locations.origin}
                      onChange={handleOriginChange}
                      placeholder="Cari lokasi penjemputan..."
                    />
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSwapLocations}
                      className="gap-2"
                    >
                      <SafeIcon name="ArrowUpDown" className="w-4 h-4" />
                      Tukar Lokasi
                    </Button>
                  </div>

                  {/* Destination Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <SafeIcon name="MapPin" className="w-4 h-4 text-secondary" />
                      Lokasi Tujuan
                    </label>
                    <LocationInput
                      value={locations.destination}
                      onChange={handleDestinationChange}
                      placeholder="Cari lokasi tujuan..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Distance Info */}
          {isComplete && (
            <Card className="glass-effect border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <SafeIcon name="Route" className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Estimasi Jarak</p>
                      <p className="text-2xl font-bold">{locations.distance} km</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Waktu Estimasi</p>
                    <p className="text-lg font-semibold">
                      {Math.ceil(locations.distance / 60)} - {Math.ceil(locations.distance / 40)} jam
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Location Summary */}
          <LocationSummary 
            origin={locations.origin}
            destination={locations.destination}
            distance={locations.distance}
          />

          {/* Navigation Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleContinue}
              disabled={!isComplete || isValidating}
              className="w-full neon-glow"
              size="lg"
            >
              {isValidating ? (
                <>
                  <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Memvalidasi...
                </>
              ) : (
                <>
                  <SafeIcon name="ChevronRight" className="w-4 h-4 mr-2" />
                  Lanjut ke Detail Paket
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => window.location.href = './buat-pesanan-awal.html'}
              className="w-full"
              size="lg"
            >
              <SafeIcon name="ChevronLeft" className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </div>

          {/* Info Card */}
          <Card className="glass-effect border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <SafeIcon name="Info" className="w-4 h-4 text-primary" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <p>• Pastikan alamat lengkap dan akurat</p>
              <p>• Sertakan nomor rumah/unit</p>
              <p>• Gunakan landmark jika diperlukan</p>
              <p>• Verifikasi koordinat lokasi</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

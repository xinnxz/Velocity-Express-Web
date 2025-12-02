
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon'
import { AVAILABLE_COURIER_SERVICES } from '@/data/carrier_services'
import ServiceCard from '@/components/pilih-layanan-kurir/ServiceCard'
import ServiceComparisonTable from '@/components/pilih-layanan-kurir/ServiceComparisonTable'
import type { CourierServiceModel } from '@/data/carrier_services'

export default function ServiceComparison() {
  const [selectedServiceId, setSelectedServiceId] = useState<number>(1)
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')

  const selectedService = AVAILABLE_COURIER_SERVICES.find(
    (s) => s.id === selectedServiceId
  )

  const handleContinue = () => {
    // Navigate to ringkasan_konfirmasi_pesanan with selected service
    window.location.href = './ringkasan-konfirmasi-pesanan.html'
  }

  const handleBack = () => {
    window.location.href = './masukkan-detail-paket.html'
  }

  return (
    <div className="container-custom py-8 md:py-12">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <SafeIcon name="Truck" className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">
            Pilih Layanan Kurir
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Pilih layanan pengiriman yang sesuai dengan kebutuhan Anda. Bandingkan harga, 
          waktu pengiriman, dan jenis kendaraan untuk membuat keputusan terbaik.
        </p>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={viewMode === 'cards' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('cards')}
          className="gap-2"
        >
          <SafeIcon name="Grid" className="w-4 h-4" />
          <span className="hidden sm:inline">Tampilan Kartu</span>
        </Button>
        <Button
          variant={viewMode === 'table' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('table')}
          className="gap-2"
        >
          <SafeIcon name="List" className="w-4 h-4" />
          <span className="hidden sm:inline">Tampilan Tabel</span>
        </Button>
      </div>

      {/* Services Display */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {AVAILABLE_COURIER_SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isSelected={selectedServiceId === service.id}
              onSelect={() => setSelectedServiceId(service.id)}
            />
          ))}
        </div>
      ) : (
        <div className="mb-8 overflow-x-auto">
          <ServiceComparisonTable
            services={AVAILABLE_COURIER_SERVICES}
            selectedServiceId={selectedServiceId}
            onSelect={setSelectedServiceId}
          />
        </div>
      )}

      {/* Selected Service Details */}
      {selectedService && (
        <Card className="glass-effect border-primary/30 mb-8 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service Image */}
              <div className="flex items-center justify-center">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Service Details */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedService.name}</h2>
                  <p className="text-primary italic">{selectedService.slogan}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Jenis Kendaraan:</span>
                    <span className="font-semibold">{selectedService.vehicleType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estimasi Pengiriman:</span>
                    <span className="font-semibold">
                      {selectedService.etaDays < 1
                        ? `${Math.round(selectedService.etaDays * 24)} jam`
                        : `${selectedService.etaDays} hari`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Berat Maksimal:</span>
                    <span className="font-semibold">{selectedService.maxWeightKg} kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Garansi Pengiriman:</span>
                    <span className="font-semibold">
                      {selectedService.isGuaranteed ? (
                        <span className="text-green-400 flex items-center gap-1">
                          <SafeIcon name="CheckCircle2" className="w-4 h-4" />
                          Terjamin
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Tidak</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing & Action */}
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Harga Pengiriman</p>
                  <div className="text-4xl font-bold gradient-text mb-4">
                    Rp {selectedService.priceIDR.toLocaleString('id-ID')}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Harga sudah termasuk pajak dan biaya administrasi
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-border">
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <p className="text-sm text-primary font-semibold flex items-center gap-2">
                      <SafeIcon name="Zap" className="w-4 h-4" />
                      Layanan Unggulan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          className="gap-2"
        >
          <SafeIcon name="ChevronLeft" className="w-4 h-4" />
          Kembali
        </Button>

        <Button
          onClick={handleContinue}
          className="neon-glow gap-2"
        >
          Lanjut ke Ringkasan Pesanan
          <SafeIcon name="ChevronRight" className="w-4 h-4" />
        </Button>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
        <p className="text-sm text-muted-foreground flex items-start gap-2">
          <SafeIcon name="Info" className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" />
          <span>
            Anda dapat mengubah pilihan layanan di halaman ringkasan pesanan sebelum melakukan pembayaran.
          </span>
        </p>
      </div>
    </div>
  )
}

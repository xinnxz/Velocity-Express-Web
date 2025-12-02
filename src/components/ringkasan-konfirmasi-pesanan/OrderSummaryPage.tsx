
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import { MOCK_ORDER_SUMMARY } from '@/data/order_data'
import OrderSummaryCard from './OrderSummaryCard'
import OrderCostBreakdown from './OrderCostBreakdown'
import OrderActionButtons from './OrderActionButtons'

export default function OrderSummaryPage() {
  const [orderData] = useState(MOCK_ORDER_SUMMARY)

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container-custom py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <SafeIcon name="CheckCircle2" className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Ringkasan Pesanan</h1>
              <p className="text-muted-foreground mt-1">Periksa detail pesanan Anda sebelum melanjutkan pembayaran</p>
            </div>
          </div>
          
          {/* Order ID Badge */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 border-primary/50">
              <SafeIcon name="Package" className="w-3.5 h-3.5 mr-1.5" />
              ID Pesanan: {orderData.orderId}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pengirim Section */}
            <OrderSummaryCard
              title="Pengirim"
              icon="User"
              editHref="./buat-pesanan-awal.html"
            >
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Nama</p>
                  <p className="font-medium">{orderData.sender.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nomor Telepon</p>
                  <p className="font-medium">{orderData.sender.phone}</p>
                </div>
                {orderData.sender.email && (
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{orderData.sender.email}</p>
                  </div>
                )}
              </div>
            </OrderSummaryCard>

            {/* Lokasi Penjemputan Section */}
            <OrderSummaryCard
              title="Lokasi Penjemputan"
              icon="MapPin"
              editHref="./pilih-lokasi-pesanan.html"
            >
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Alamat</p>
                  <p className="font-medium">{orderData.origin.addressLine1}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Kota</p>
                    <p className="font-medium">{orderData.origin.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Provinsi</p>
                    <p className="font-medium">{orderData.origin.province}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kode Pos</p>
                  <p className="font-medium">{orderData.origin.postalCode}</p>
                </div>
              </div>
            </OrderSummaryCard>

            {/* Penerima Section */}
            <OrderSummaryCard
              title="Penerima"
              icon="User"
              editHref="./buat-pesanan-awal.html"
            >
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Nama</p>
                  <p className="font-medium">{orderData.receiver.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nomor Telepon</p>
                  <p className="font-medium">{orderData.receiver.phone}</p>
                </div>
              </div>
            </OrderSummaryCard>

            {/* Lokasi Tujuan Section */}
            <OrderSummaryCard
              title="Lokasi Tujuan"
              icon="MapPin"
              editHref="./pilih-lokasi-pesanan.html"
            >
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Alamat</p>
                  <p className="font-medium">{orderData.destination.addressLine1}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Kota</p>
                    <p className="font-medium">{orderData.destination.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Provinsi</p>
                    <p className="font-medium">{orderData.destination.province}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kode Pos</p>
                  <p className="font-medium">{orderData.destination.postalCode}</p>
                </div>
              </div>
            </OrderSummaryCard>

            {/* Detail Paket Section */}
            <OrderSummaryCard
              title="Detail Paket"
              icon="Box"
              editHref="./masukkan-detail-paket.html"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <SafeIcon 
                      name={orderData.packageDetails.packageType.iconName} 
                      className="w-6 h-6 text-primary" 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{orderData.packageDetails.packageType.name}</p>
                    <p className="text-sm text-muted-foreground">{orderData.packageDetails.packageType.description}</p>
                  </div>
                </div>

                <Separator className="my-3" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Berat</p>
                    <p className="font-medium">{orderData.packageDetails.weightKg} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dimensi</p>
                    <p className="font-medium">
                      {orderData.packageDetails.lengthCm} × {orderData.packageDetails.widthCm} × {orderData.packageDetails.heightCm} cm
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Nilai Deklarasi</p>
                  <p className="font-medium">
                    Rp {orderData.packageDetails.declaredValueIDR.toLocaleString('id-ID')}
                  </p>
                </div>

                {orderData.packageDetails.isFragile && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                    <SafeIcon name="AlertTriangle" className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-destructive">Barang mudah pecah - Penanganan khusus diperlukan</span>
                  </div>
                )}

                {orderData.packageDetails.specialInstructions && (
                  <div>
                    <p className="text-sm text-muted-foreground">Instruksi Khusus</p>
                    <p className="text-sm italic text-foreground/80 mt-1">
                      "{orderData.packageDetails.specialInstructions}"
                    </p>
                  </div>
                )}
              </div>
            </OrderSummaryCard>

            {/* Layanan Kurir Section */}
            <OrderSummaryCard
              title="Layanan Kurir"
              icon="Truck"
              editHref="./pilih-layanan-kurir.html"
              editLabel="Ubah Layanan"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img 
                    src={orderData.selectedService.image}
                    alt={orderData.selectedService.name}
                    className="w-24 h-24 rounded-lg object-cover border border-border"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-lg">{orderData.selectedService.name}</h4>
                        <p className="text-sm text-muted-foreground italic">{orderData.selectedService.slogan}</p>
                      </div>
                      {orderData.selectedService.isGuaranteed && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50 border">
                          <SafeIcon name="Shield" className="w-3 h-3 mr-1" />
                          Terjamin
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Jenis Kendaraan</p>
                        <p className="font-medium">{orderData.selectedService.vehicleType}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Estimasi Pengiriman</p>
                        <p className="font-medium">
                          {orderData.selectedService.etaDays < 1 
                            ? `${Math.round(orderData.selectedService.etaDays * 24)} jam`
                            : `${orderData.selectedService.etaDays} hari`
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Berat Maksimal</p>
                        <p className="font-medium">{orderData.selectedService.maxWeightKg} kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Harga Dasar</p>
                        <p className="font-medium">Rp {orderData.selectedService.priceIDR.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </OrderSummaryCard>
          </div>

          {/* Sidebar - Right Side (1 column) */}
          <div className="lg:col-span-1">
            {/* Cost Breakdown Card */}
            <OrderCostBreakdown orderData={orderData} />

            {/* Estimated Delivery Card */}
            <Card className="glass-effect border-primary/30 mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <SafeIcon name="Calendar" className="w-5 h-5 text-primary" />
                  Estimasi Pengiriman
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary mb-2">
                  {orderData.estimatedDeliveryDate}
                </p>
                <p className="text-sm text-muted-foreground">
                  Paket Anda akan tiba pada tanggal dan waktu yang ditunjukkan di atas
                </p>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="glass-effect border-secondary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <SafeIcon name="Info" className="w-5 h-5 text-secondary" />
                  Informasi Penting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <SafeIcon name="CheckCircle2" className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <p>Pesanan Anda akan dikonfirmasi setelah pembayaran berhasil</p>
                </div>
                <div className="flex gap-2">
                  <SafeIcon name="CheckCircle2" className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <p>Anda akan menerima notifikasi real-time untuk setiap update pengiriman</p>
                </div>
                <div className="flex gap-2">
                  <SafeIcon name="CheckCircle2" className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <p>Asuransi otomatis untuk paket dengan nilai deklarasi</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <OrderActionButtons />
      </div>
    </div>
  )
}

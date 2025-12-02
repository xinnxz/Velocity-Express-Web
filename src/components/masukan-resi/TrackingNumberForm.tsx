
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'
import TrackingNumberCard from './TrackingNumberCard'
import TrackingNumberHistory from './TrackingNumberHistory'
import { cn } from '@/lib/utils'

interface TrackingNumber {
  id: string
  number: string
  isValid: boolean
}

export default function TrackingNumberForm() {
  const [inputValue, setInputValue] = useState('')
  const [trackingNumbers, setTrackingNumbers] = useState<TrackingNumber[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Validate tracking number format (simple validation: alphanumeric, 8-20 chars)
  const validateTrackingNumber = (number: string): boolean => {
    const trimmed = number.trim().toUpperCase()
    return /^[A-Z0-9]{8,20}$/.test(trimmed)
  }

  const handleAddTrackingNumber = () => {
    const trimmed = inputValue.trim().toUpperCase()
    
    if (!trimmed) {
      setError('Masukkan nomor resi terlebih dahulu')
      return
    }

    if (!validateTrackingNumber(trimmed)) {
      setError('Format nomor resi tidak valid. Gunakan 8-20 karakter alfanumerik')
      return
    }

    // Check for duplicates
    if (trackingNumbers.some(t => t.number === trimmed)) {
      setError('Nomor resi ini sudah ditambahkan')
      return
    }

    // Add new tracking number
    const newNumber: TrackingNumber = {
      id: `${trimmed}-${Date.now()}`,
      number: trimmed,
      isValid: true
    }

    setTrackingNumbers([...trackingNumbers, newNumber])
    setInputValue('')
    setError('')
  }

  const handleRemoveTrackingNumber = (id: string) => {
    setTrackingNumbers(trackingNumbers.filter(t => t.id !== id))
  }

  const handleTrack = async () => {
    if (trackingNumbers.length === 0) {
      setError('Tambahkan minimal satu nomor resi')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // Navigate to results page with tracking numbers
      const resiParam = trackingNumbers.map(t => t.number).join(',')
      window.location.href = `./hasil-pelacakan.html?resi=${encodeURIComponent(resiParam)}`
    } catch (err) {
      setError('Terjadi kesalahan saat melacak paket. Silakan coba lagi.')
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTrackingNumber()
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial-at-t from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <SafeIcon name="Zap" className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Lacak Paket Anda</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              Pantau Pengiriman Anda Secara Real-Time
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
              Masukkan nomor resi untuk melacak status paket Anda. Dapatkan update lokasi terkini dan estimasi waktu tiba.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-8 md:py-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Input Card */}
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SafeIcon name="Package" className="w-5 h-5 text-primary" />
                  Masukkan Nomor Resi
                </CardTitle>
                <CardDescription>
                  Anda dapat melacak satu atau lebih paket sekaligus
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Input Field */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Contoh: VEL20240001"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value)
                        setError('')
                      }}
                      onKeyPress={handleKeyPress}
                      className={cn(
                        'flex-1 bg-background/50 border-border/50',
                        error && 'border-destructive/50'
                      )}
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleAddTrackingNumber}
                      disabled={isLoading || !inputValue.trim()}
                      className="neon-glow"
                    >
                      <SafeIcon name="Plus" className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Tambah</span>
                    </Button>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <SafeIcon name="AlertCircle" className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Format: 8-20 karakter alfanumerik (contoh: VEL20240001, JNT123456789)
                  </p>
                </div>

                {/* Added Tracking Numbers */}
                {trackingNumbers.length > 0 && (
                  <div className="space-y-3">
                    <Separator className="bg-border/50" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground/80">
                        Nomor Resi yang Ditambahkan ({trackingNumbers.length})
                      </p>
                      <div className="space-y-2">
                        {trackingNumbers.map((tracking) => (
                          <TrackingNumberCard
                            key={tracking.id}
                            number={tracking.number}
                            onRemove={() => handleRemoveTrackingNumber(tracking.id)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleTrack}
                    disabled={trackingNumbers.length === 0 || isLoading}
                    className="flex-1 neon-glow"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                        Melacak...
                      </>
                    ) : (
                      <>
                        <SafeIcon name="Search" className="w-4 h-4 mr-2" />
                        Lacak Paket
                      </>
                    )}
                  </Button>

                  {trackingNumbers.length > 0 && (
                    <Button
                      onClick={() => {
                        setTrackingNumbers([])
                        setInputValue('')
                        setError('')
                      }}
                      variant="outline"
                      disabled={isLoading}
                    >
                      <SafeIcon name="X" className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Back to Home */}
                <Button
                  asChild
                  variant="ghost"
                  className="w-full"
                >
                  <a href="./beranda.html">
                    <SafeIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                    Kembali ke Beranda
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass-effect border-border/50">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <SafeIcon name="Clock" className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">Update Real-Time</h3>
                    <p className="text-xs text-muted-foreground">
                      Dapatkan update lokasi paket setiap saat
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border/50">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <SafeIcon name="MapPin" className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-semibold text-sm">Lokasi Akurat</h3>
                    <p className="text-xs text-muted-foreground">
                      Pantau posisi paket dengan presisi tinggi
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border/50">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <SafeIcon name="Smartphone" className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-sm">Multi-Paket</h3>
                    <p className="text-xs text-muted-foreground">
                      Lacak hingga 10 paket sekaligus
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Tracking History */}
            <TrackingNumberHistory />
          </div>
        </div>
      </section>
    </div>
  )
}

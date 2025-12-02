
'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'
import type { LocationModel } from '@/data/order_data'

// Mock location database
const MOCK_LOCATIONS: LocationModel[] = [
  {
    addressLine1: "Jl. Mega Kuningan Barat No. 12",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    postalCode: "12950",
    coordinate: { lat: -6.2255, lng: 106.8407 }
  },
  {
    addressLine1: "Eco Central Park Tower B, Unit 20A",
    city: "Bandung",
    province: "Jawa Barat",
    postalCode: "40115",
    coordinate: { lat: -6.9175, lng: 107.6191 }
  },
  {
    addressLine1: "Jl. Sudirman No. 1",
    city: "Jakarta Pusat",
    province: "DKI Jakarta",
    postalCode: "10220",
    coordinate: { lat: -6.2087, lng: 106.8456 }
  },
  {
    addressLine1: "Jl. Ahmad Yani No. 100",
    city: "Surabaya",
    province: "Jawa Timur",
    postalCode: "60188",
    coordinate: { lat: -7.2575, lng: 112.7521 }
  },
  {
    addressLine1: "Jl. Gatot Subroto No. 50",
    city: "Medan",
    province: "Sumatera Utara",
    postalCode: "20111",
    coordinate: { lat: 3.1957, lng: 98.6722 }
  },
  {
    addressLine1: "Jl. Diponegoro No. 25",
    city: "Yogyakarta",
    province: "DI Yogyakarta",
    postalCode: "55143",
    coordinate: { lat: -7.7956, lng: 110.3695 }
  }
]

interface LocationInputProps {
  value: LocationModel | null
  onChange: (location: LocationModel) => void
  placeholder?: string
}

export default function LocationInput({ 
  value, 
  onChange, 
  placeholder = "Cari lokasi..." 
}: LocationInputProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [filteredLocations, setFilteredLocations] = useState<LocationModel[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = MOCK_LOCATIONS.filter(loc =>
        loc.addressLine1.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.province.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredLocations(filtered)
      setIsOpen(true)
    } else {
      setFilteredLocations([])
      setIsOpen(false)
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectLocation = (location: LocationModel) => {
    onChange(location)
    setSearchQuery('')
    setIsOpen(false)
  }

  const handleClear = () => {
    setSearchQuery('')
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div className="relative">
        <SafeIcon 
          name="Search" 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" 
        />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setIsOpen(true)}
          className="pl-10 pr-10 bg-background/50 border-border/50"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
          >
            <SafeIcon name="X" className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && filteredLocations.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto glass-effect"
        >
          {filteredLocations.map((location, index) => (
            <button
              key={index}
              onClick={() => handleSelectLocation(location)}
              className="w-full px-4 py-3 text-left hover:bg-primary/10 border-b border-border/50 last:border-b-0 transition-colors"
            >
              <div className="flex items-start gap-3">
                <SafeIcon name="MapPin" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{location.addressLine1}</p>
                  <p className="text-xs text-muted-foreground">
                    {location.city}, {location.province} {location.postalCode}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected Location Display */}
      {value && !searchQuery && (
        <div className="mt-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start gap-2">
            <SafeIcon name="CheckCircle2" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{value.addressLine1}</p>
              <p className="text-xs text-muted-foreground">
                {value.city}, {value.province} {value.postalCode}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Koordinat: {value.coordinate.lat.toFixed(4)}, {value.coordinate.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && searchQuery && filteredLocations.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg p-4 text-center text-sm text-muted-foreground glass-effect">
          Lokasi tidak ditemukan. Coba pencarian lain.
        </div>
      )}
    </div>
  )
}

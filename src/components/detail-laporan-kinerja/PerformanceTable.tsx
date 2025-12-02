
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import SafeIcon from '@/components/common/SafeIcon'

interface TableRow {
  id: string
  date: string
  service: string
  deliveries: number
  successful: number
  failed: number
  successRate: number
  avgTime: string
  revenue: string
}

interface PerformanceTableProps {
  data: TableRow[]
}

export default function PerformanceTable({ data }: PerformanceTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<keyof TableRow>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredData = data.filter(row =>
    row.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.date.includes(searchTerm)
  )

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortBy]
    const bVal = b[sortBy]
    
    if (typeof aVal === 'string') {
      return sortOrder === 'asc' 
        ? aVal.localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal)
    }
    
    return sortOrder === 'asc' 
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number)
  })

  const handleSort = (key: keyof TableRow) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(key)
      setSortOrder('asc')
    }
  }

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle>Detail Data Pengiriman</CardTitle>
        <CardDescription>
          Tabel detail performa pengiriman per layanan dan tanggal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="flex gap-2">
          <Input
            placeholder="Cari berdasarkan layanan atau tanggal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" size="icon">
            <SafeIcon name="Search" className="w-4 h-4" />
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead 
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-2">
                    Tanggal
                    {sortBy === 'date' && (
                      <SafeIcon 
                        name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                        className="w-4 h-4" 
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('service')}
                >
                  <div className="flex items-center gap-2">
                    Layanan
                    {sortBy === 'service' && (
                      <SafeIcon 
                        name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                        className="w-4 h-4" 
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('deliveries')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Total Pengiriman
                    {sortBy === 'deliveries' && (
                      <SafeIcon 
                        name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                        className="w-4 h-4" 
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('successful')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Berhasil
                    {sortBy === 'successful' && (
                      <SafeIcon 
                        name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                        className="w-4 h-4" 
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('failed')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Gagal
                    {sortBy === 'failed' && (
                      <SafeIcon 
                        name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                        className="w-4 h-4" 
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('successRate')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Tingkat Sukses
                    {sortBy === 'successRate' && (
                      <SafeIcon 
                        name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                        className="w-4 h-4" 
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('avgTime')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Rata-rata Waktu
                    {sortBy === 'avgTime' && (
                      <SafeIcon 
                        name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                        className="w-4 h-4" 
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('revenue')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Pendapatan
                    {sortBy === 'revenue' && (
                      <SafeIcon 
                        name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                        className="w-4 h-4" 
                      />
                    )}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row) => (
                <TableRow key={row.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{row.date}</TableCell>
                  <TableCell>{row.service}</TableCell>
                  <TableCell className="text-right">{row.deliveries}</TableCell>
                  <TableCell className="text-right text-green-400">{row.successful}</TableCell>
                  <TableCell className="text-right text-destructive">{row.failed}</TableCell>
                  <TableCell className="text-right">
                    <span className={row.successRate >= 95 ? 'text-green-400' : 'text-yellow-400'}>
                      {row.successRate}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{row.avgTime}</TableCell>
                  <TableCell className="text-right font-medium">{row.revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Results info */}
        <div className="text-sm text-muted-foreground">
          Menampilkan {sortedData.length} dari {data.length} hasil
        </div>
      </CardContent>
    </Card>
  )
}


import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import SafeIcon from '@/components/common/SafeIcon'
import EmptyState from '@/components/common/EmptyState'
import { type Tariff } from './tariffMockData'

interface TariffListProps {
  tariffs: Tariff[]
  onEdit: (tariff: Tariff) => void
  onDelete: (id: string) => void
}

const serviceTypeColors: Record<string, string> = {
  'Regular': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  'Express': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  'Drone': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50',
  'Same Day': 'bg-red-500/20 text-red-400 border-red-500/50',
}

export default function TariffList({ tariffs, onEdit, onDelete }: TariffListProps) {
  if (tariffs.length === 0) {
    return (
      <Card className="glass-effect border-border/50">
        <CardContent className="pt-6">
          <EmptyState
            icon="DollarSign"
            title="Tidak Ada Tarif"
            description="Belum ada tarif layanan yang ditambahkan. Mulai dengan menambahkan tarif baru."
            actionLabel="Tambah Tarif Baru"
            actionHref="./pengaturan-tarif-layanan.html"
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-effect border-border/50 overflow-hidden">
      <CardHeader>
        <CardTitle>Daftar Tarif Layanan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead>Nama Layanan</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead className="text-right">Harga Dasar</TableHead>
                <TableHead className="text-right">Biaya Tambahan</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Berlaku Sejak</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tariffs.map((tariff) => (
                <TableRow key={tariff.id} className="border-border/50 hover:bg-muted/30">
                  <TableCell className="font-medium">{tariff.name}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={`border ${serviceTypeColors[tariff.serviceType] || 'bg-muted text-muted-foreground'}`}
                    >
                      {tariff.serviceType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    Rp {tariff.basePrice.toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell className="text-right">
                    {tariff.additionalFee > 0 ? (
                      <span className="text-orange-400">
                        +Rp {tariff.additionalFee.toLocaleString('id-ID')}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant={tariff.isActive ? 'default' : 'secondary'}
                      className={tariff.isActive ? 'bg-green-500/20 text-green-400 border-green-500/50 border' : ''}
                    >
                      {tariff.isActive ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {new Date(tariff.effectiveDate).toLocaleDateString('id-ID')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <SafeIcon name="MoreVertical" className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(tariff)}>
                          <SafeIcon name="Edit2" className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDelete(tariff.id)}
                          className="text-destructive"
                        >
                          <SafeIcon name="Trash2" className="w-4 h-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

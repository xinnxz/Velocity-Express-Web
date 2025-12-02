
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import SafeIcon from '@/components/common/SafeIcon'

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'courier' | 'customer'
  status: 'active' | 'inactive'
  registeredDate: string
  lastLogin: string
  totalShipments?: number
}

interface UserActionsProps {
  user: User
}

export default function UserActions({ user }: UserActionsProps) {
  const handleViewDetail = () => {
    // Navigate to detail page with user ID
    window.location.href = `./detail-pengguna-admin.html?id=${user.id}`
  }

  const handleEdit = () => {
    // Navigate to edit page
    window.location.href = `./detail-pengguna-admin.html?id=${user.id}&edit=true`
  }

  const handleToggleStatus = () => {
    // Toggle user status
    console.log(`Toggle status for user ${user.id}`)
  }

  const handleResetPassword = () => {
    // Reset password
    console.log(`Reset password for user ${user.id}`)
  }

  const handleDelete = () => {
    // Delete user
    if (confirm(`Apakah Anda yakin ingin menghapus pengguna ${user.name}?`)) {
      console.log(`Delete user ${user.id}`)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <SafeIcon name="MoreVertical" className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleViewDetail}>
          <SafeIcon name="Eye" className="w-4 h-4 mr-2" />
          Lihat Detail
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleEdit}>
          <SafeIcon name="Edit" className="w-4 h-4 mr-2" />
          Edit Pengguna
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleResetPassword}>
          <SafeIcon name="RotateCcw" className="w-4 h-4 mr-2" />
          Reset Password
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleToggleStatus}>
          {user.status === 'active' ? (
            <>
              <SafeIcon name="Ban" className="w-4 h-4 mr-2" />
              Nonaktifkan Pengguna
            </>
          ) : (
            <>
              <SafeIcon name="CheckCircle2" className="w-4 h-4 mr-2" />
              Aktifkan Pengguna
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          <SafeIcon name="Trash2" className="w-4 h-4 mr-2" />
          Hapus Pengguna
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

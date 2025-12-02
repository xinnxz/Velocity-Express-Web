
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'

interface UserData {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
}

interface UserActionsPanelProps {
  userData: UserData
  onResetPassword: () => void
  onDeactivate: () => void
}

export default function UserActionsPanel({
  userData,
  onResetPassword,
  onDeactivate
}: UserActionsPanelProps) {
  return (
    <Card className="glass-effect border-border/50 sticky top-6">
      <CardHeader>
        <CardTitle>Tindakan Admin</CardTitle>
        <CardDescription>Kelola akun pengguna</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Reset Password */}
        <Button 
          variant="outline"
          className="w-full justify-start"
          onClick={onResetPassword}
        >
          <SafeIcon name="RotateCcw" className="w-4 h-4 mr-2" />
          Reset Password
        </Button>

        {/* Send Email */}
        <Button 
          variant="outline"
          className="w-full justify-start"
        >
          <SafeIcon name="Mail" className="w-4 h-4 mr-2" />
          Kirim Email
        </Button>

        {/* View Login History */}
        <Button 
          variant="outline"
          className="w-full justify-start"
        >
          <SafeIcon name="LogIn" className="w-4 h-4 mr-2" />
          Riwayat Login
        </Button>

        <Separator className="my-3" />

        {/* Deactivate Account */}
        <Button 
          variant="destructive"
          className="w-full justify-start"
          onClick={onDeactivate}
          disabled={userData.status === 'inactive'}
        >
          <SafeIcon name="Ban" className="w-4 h-4 mr-2" />
          Nonaktifkan Akun
        </Button>

        {/* Delete Account */}
        <Button 
          variant="destructive"
          className="w-full justify-start opacity-50 cursor-not-allowed"
          disabled
        >
          <SafeIcon name="Trash2" className="w-4 h-4 mr-2" />
          Hapus Akun
        </Button>

        <Separator className="my-3" />

        {/* Quick Info */}
        <div className="space-y-2 text-xs">
          <div className="p-2 rounded bg-background/50 border border-border/50">
            <p className="text-muted-foreground mb-1">ID Pengguna</p>
            <p className="font-mono text-foreground">{userData.id}</p>
          </div>

          <div className="p-2 rounded bg-background/50 border border-border/50">
            <p className="text-muted-foreground mb-1">Email</p>
            <p className="font-mono text-foreground break-all">{userData.email}</p>
          </div>

          <div className="p-2 rounded bg-background/50 border border-border/50">
            <p className="text-muted-foreground mb-1">Status</p>
            <p className="font-mono text-foreground capitalize">
              {userData.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

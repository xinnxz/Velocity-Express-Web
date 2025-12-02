
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import SafeIcon from '@/components/common/SafeIcon'

interface Permission {
  id: number
  name: string
  granted: boolean
}

interface UserPermissionsSectionProps {
  permissions: Permission[]
}

export default function UserPermissionsSection({ permissions }: UserPermissionsSectionProps) {
  return (
    <Card className="glass-effect border-border/50">
      <CardHeader>
        <CardTitle>Izin Akses</CardTitle>
        <CardDescription>Kelola izin akses pengguna terhadap fitur aplikasi</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {permissions.length > 0 ? (
            permissions.map((permission) => (
              <div 
                key={permission.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-colors"
              >
                <Checkbox 
                  id={`permission-${permission.id}`}
                  checked={permission.granted}
                  disabled
                  className="cursor-not-allowed"
                />
                <Label 
                  htmlFor={`permission-${permission.id}`}
                  className="flex-1 cursor-not-allowed"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{permission.name}</span>
                    {permission.granted && (
                      <SafeIcon 
                        name="CheckCircle2" 
                        className="w-4 h-4 text-green-500"
                      />
                    )}
                  </div>
                </Label>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <SafeIcon name="Lock" className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Tidak ada izin akses</p>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex gap-2">
            <SafeIcon name="Info" className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Izin akses ditentukan berdasarkan peran pengguna. Untuk mengubah izin, ubah peran pengguna di halaman manajemen pengguna.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

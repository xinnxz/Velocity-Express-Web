
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar'
import SafeIcon from '@/components/common/SafeIcon'

export default function AppSidebar() {
  const adminMenuItems = [
    {
      title: 'Dasbor',
      icon: 'LayoutDashboard',
      href: './dasbor-admin.html'
    },
    {
      title: 'Manajemen Pengguna',
      icon: 'Users',
      href: './manajemen-pengguna-admin.html'
    },
    {
      title: 'Pemantauan Pengiriman',
      icon: 'Package',
      href: './pemantauan-pengiriman-admin.html'
    },
    {
      title: 'Pengaturan Tarif',
      icon: 'DollarSign',
      href: './pengaturan-tarif-layanan.html'
    },
    {
      title: 'Laporan & Analitik',
      icon: 'BarChart3',
      href: './laporan-analitik-admin.html'
    },
    {
      title: 'Pengaturan Sistem',
      icon: 'Settings',
      href: './pengaturan-sistem-admin.html'
    },
  ]

  const userMenuItems = [
    {
      title: 'Pengiriman Saya',
      icon: 'Package',
      href: './daftar-pengiriman-saya.html'
    },
    {
      title: 'Arsip',
      icon: 'Archive',
      href: './arsip-pengiriman.html'
    },
  ]

  return (
    <Sidebar 
      className="top-[--header-height] h-[calc(100vh-var(--header-height))] border-r border-border" 
      variant="inset"
    >
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <SafeIcon name="Zap" className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold">VeloCity</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Admin Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <SafeIcon name={item.icon} className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Pengguna</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <SafeIcon name={item.icon} className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="./beranda.html">
                <SafeIcon name="Home" className="w-4 h-4" />
                <span>Kembali ke Beranda</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

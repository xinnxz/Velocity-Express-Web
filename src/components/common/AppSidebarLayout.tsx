
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppSidebar from '@/components/common/AppSidebar'

interface AppSidebarLayoutProps {
  children: React.ReactNode
  headerHeight?: string
}

export default function AppSidebarLayout({ 
  children, 
  headerHeight = '64px'
}: AppSidebarLayoutProps) {
  return (
    <SidebarProvider 
      style={{
        '--header-height': headerHeight
      } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-[calc(100vh-var(--header-height))]">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

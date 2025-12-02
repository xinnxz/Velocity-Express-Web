
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import SafeIcon from '@/components/common/SafeIcon'

interface CommonHeaderProps {
  variant?: 'default' | 'transparent'
  isAuthenticated?: boolean
}

export default function CommonHeader({ 
  variant = 'default',
  isAuthenticated = false 
}: CommonHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Beranda', href: './beranda.html' },
    { name: 'Lacak Paket', href: './masukan-resi.html' },
    { name: 'Buat Pesanan', href: './buat-pesanan-awal.html' },
    { name: 'Layanan', href: './placeholder.html' },
  ]

  const headerClasses = `sticky top-0 z-50 w-full transition-all duration-300 ${
    variant === 'transparent' && !isScrolled
      ? 'bg-transparent'
      : 'bg-background/80 backdrop-blur-md border-b border-border'
  }`

  return (
<header className={headerClasses} id="ia2o">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="./beranda.html" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <SafeIcon name="Zap" className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline-block">
              VeloCity Express
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <a href="./placeholder.html">
                    <SafeIcon name="Bell" className="w-5 h-5" />
                  </a>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <SafeIcon name="User" className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <a href="./daftar-pengiriman-saya.html">
                        <SafeIcon name="Package" className="w-4 h-4 mr-2" />
                        Pengiriman Saya
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="./placeholder.html">
                        <SafeIcon name="Settings" className="w-4 h-4 mr-2" />
                        Pengaturan
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="./dasbor-admin.html">
                        <SafeIcon name="LayoutDashboard" className="w-4 h-4 mr-2" />
                        Dasbor Admin
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <SafeIcon name="LogOut" className="w-4 h-4 mr-2" />
                      Keluar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
<>
                <Button variant="ghost" asChild>
                  <a href="./login-akun.html" id="int9p" target="_blank">Masuk</a>
                </Button>
                <Button asChild className="neon-glow">
                  <a href="./placeholder.html">Daftar</a>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <SafeIcon name="Menu" className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-border space-y-2">
                  {isAuthenticated ? (
                    <>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href="./daftar-pengiriman-saya.html">
                          <SafeIcon name="Package" className="w-4 h-4 mr-2" />
                          Pengiriman Saya
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href="./placeholder.html">
                          <SafeIcon name="Settings" className="w-4 h-4 mr-2" />
                          Pengaturan
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href="./dasbor-admin.html">
                          <SafeIcon name="LayoutDashboard" className="w-4 h-4 mr-2" />
                          Dasbor Admin
                        </a>
                      </Button>
                      <Button variant="destructive" className="w-full justify-start">
                        <SafeIcon name="LogOut" className="w-4 h-4 mr-2" />
                        Keluar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full" asChild>
                        <a href="./placeholder.html">Masuk</a>
                      </Button>
                      <Button className="w-full" asChild>
                        <a href="./placeholder.html">Daftar</a>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

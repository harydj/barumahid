"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

const navigationLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Cari Kos",
    href: "/kos",
  },
  {
    name: "Simulasi",
    href: "/simulasi",
  },
  {
    name: "Tentang Kami",
    href: "/about",
  },
  {
    name: "Kontak",
    href: "/contact",
  },
] as any[]

export const PortfolioNavbar = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors duration-200"
              style={{
                fontFamily: "Figtree",
                fontWeight: "700",
              }}
            >
              <img
                src="/images/Logo BarumahID.png"
                alt="BarumahID Logo"
                className="h-10 w-auto"
              />
              <span>barumahID</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontWeight: "500",
                  }}
                >
                  <span>{link.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {user.role !== "admin" && user.role !== "kos_owner" && (
                  <Link
                    href="/dashboard"
                    className="text-foreground hover:text-primary px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="text-foreground hover:text-primary px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Admin
                  </Link>
                )}
                {user.role === "kos_owner" && (
                  <Link
                    href="/admin/kos"
                    className="text-foreground hover:text-primary px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Kelola Kos
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout()
                    router.push("/")
                  }}
                  className="flex items-center gap-2 text-foreground hover:text-red-600 px-4 py-2 text-sm font-medium transition-colors duration-200"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-foreground hover:text-primary px-4 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  Daftar Sekarang
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-foreground hover:text-primary p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="px-6 py-6 space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block w-full text-left text-foreground hover:text-primary py-3 text-lg font-medium transition-colors duration-200"
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontWeight: "500",
                  }}
                >
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-3">
                {user ? (
                  <>
                    {user.role !== "admin" && user.role !== "kos_owner" && (
                      <Link
                        href="/dashboard"
                        onClick={closeMobileMenu}
                        className="w-full inline-block text-center text-foreground px-4 py-2.5 rounded-lg text-base font-medium hover:bg-muted transition-all duration-200"
                      >
                        Dashboard
                      </Link>
                    )}
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={closeMobileMenu}
                        className="w-full inline-block text-center text-foreground px-4 py-2.5 rounded-lg text-base font-medium hover:bg-muted transition-all duration-200"
                      >
                        Admin
                      </Link>
                    )}
                    {user.role === "kos_owner" && (
                      <Link
                        href="/admin/kos"
                        onClick={closeMobileMenu}
                        className="w-full inline-block text-center text-foreground px-4 py-2.5 rounded-lg text-base font-medium hover:bg-muted transition-all duration-200"
                      >
                        Kelola Kos
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout()
                        closeMobileMenu()
                        router.push("/")
                      }}
                      className="w-full text-center text-foreground px-4 py-2.5 rounded-lg text-base font-medium hover:bg-red-50 hover:text-red-600 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className="w-full inline-block text-center text-foreground px-4 py-2.5 rounded-lg text-base font-medium hover:bg-muted transition-all duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={closeMobileMenu}
                      className="w-full inline-block text-center bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-base font-medium hover:bg-primary/90 transition-all duration-200"
                    >
                      Daftar Sekarang
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

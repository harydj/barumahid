"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogOut, LayoutDashboard, MessageSquare, FileText } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function AdminNavbar() {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/admin" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
            <img
              src="/images/Logo BarumahID.png"
              alt="BarumahID Logo"
              className="h-10 w-auto"
            />
            <span>barumahID</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary transition-colors rounded-lg hover:bg-gray-100"
            >
              <LayoutDashboard size={18} />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link
              href="/admin/consultations"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary transition-colors rounded-lg hover:bg-gray-100"
            >
              <MessageSquare size={18} />
              <span className="text-sm font-medium">Consultations</span>
            </Link>
            <Link
              href="/admin/content"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary transition-colors rounded-lg hover:bg-gray-100"
            >
              <FileText size={18} />
              <span className="text-sm font-medium">Content</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium hidden md:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

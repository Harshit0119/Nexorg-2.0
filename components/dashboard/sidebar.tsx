"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/types"
import {
  Calendar,
  LayoutDashboard,
  Users,
  Building2,
  FileSpreadsheet,
  Upload,
  Settings,
  CreditCard,
  Send,
  ClipboardList,
  UserCog,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  role: UserRole
  instituteName: string
}

const headNavItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Departments", href: "/dashboard/departments", icon: Building2 },
  { label: "Timetables", href: "/dashboard/timetables", icon: Calendar },
  { label: "Admins", href: "/dashboard/admins", icon: UserCog },
  { label: "Faculty", href: "/dashboard/faculty", icon: Users },
  { label: "Messages", href: "/dashboard/messages", icon: Send },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
]

const adminNavItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "CSV Upload", href: "/dashboard/csv-upload", icon: Upload },
  { label: "Faculty Data", href: "/dashboard/faculty-data", icon: FileSpreadsheet },
  { label: "Timetable", href: "/dashboard/timetable", icon: Calendar },
  { label: "Faculty", href: "/dashboard/faculty", icon: Users },
  { label: "Invitations", href: "/dashboard/invitations", icon: Send },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

const facultyNavItems = [
  { label: "My Schedule", href: "/dashboard", icon: Calendar },
  { label: "Swap Requests", href: "/dashboard/swap-requests", icon: ClipboardList },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar({ role, instituteName }: SidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = role === "head" 
    ? headNavItems 
    : role === "admin" 
    ? adminNavItems 
    : facultyNavItems

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <Calendar className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-sidebar-foreground">Nexorg</span>
          <span className="text-xs text-sidebar-foreground/60 truncate max-w-[140px]">
            {instituteName}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Role badge */}
      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-sidebar-accent/50 px-3 py-2">
          <div className="text-xs text-sidebar-foreground/60">Logged in as</div>
          <div className="text-sm font-medium text-sidebar-foreground capitalize">
            {role}
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform md:hidden",
        mobileOpen ? "translate-x-0 flex" : "-translate-x-full"
      )}>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        {sidebarContent}
      </aside>
    </>
  )
}

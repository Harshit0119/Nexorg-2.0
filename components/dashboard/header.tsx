"use client"

import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

interface HeaderProps {
  user: {
    email: string
    name: string
  }
  instituteName: string
}

// Mock notifications - TODO: Fetch from Supabase
const mockNotifications = [
  {
    id: "1",
    title: "Timetable Updated",
    message: "The timetable for CS Department has been regenerated.",
    read: false,
    time: "5 min ago",
  },
  {
    id: "2", 
    title: "New Faculty Added",
    message: "Dr. Sarah Johnson has been added to the system.",
    read: false,
    time: "1 hour ago",
  },
  {
    id: "3",
    title: "Swap Request",
    message: "Prof. Smith requested a schedule swap for Monday.",
    read: true,
    time: "2 hours ago",
  },
]

export function DashboardHeader({ user, instituteName }: HeaderProps) {
  const router = useRouter()
  const [notifications] = useState(mockNotifications)
  const unreadCount = notifications.filter(n => !n.read).length

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-4 ml-12 md:ml-0">
        <h1 className="text-lg font-semibold text-foreground">{instituteName}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              {unreadCount > 0 && (
                <span className="text-xs font-normal text-muted-foreground">
                  {unreadCount} unread
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                >
                  <div className="flex items-center gap-2 w-full">
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                    <span className="font-medium text-sm">{notification.title}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-4">
                    {notification.message}
                  </p>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center text-sm text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:block text-sm font-medium">
                {user.name}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user.name}</span>
                <span className="font-normal text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleSignOut}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

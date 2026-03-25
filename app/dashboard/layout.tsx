import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import type { UserRole } from "@/lib/types"

// Mock user data - TODO: Fetch from Supabase memberships table
async function getUserData(userId: string) {
  // TODO: Replace with actual Supabase query
  // const { data } = await supabase
  //   .from('memberships')
  //   .select('*, institutes(*), departments(*)')
  //   .eq('user_id', userId)
  //   .single()
  
  return {
    role: "admin" as UserRole,
    instituteName: "Westfield Academy",
    instituteId: "inst_123",
    departmentId: "dept_456",
    departmentName: "Computer Science",
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  const userData = await getUserData(user.id)

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar 
        role={userData.role}
        instituteName={userData.instituteName}
      />
      <div className="flex flex-1 flex-col">
        <DashboardHeader 
          user={{
            email: user.email ?? "",
            name: user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "User",
          }}
          instituteName={userData.instituteName}
        />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

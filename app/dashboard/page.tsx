import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardOverview } from "@/components/dashboard/overview"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // TODO: Fetch user role and redirect to appropriate dashboard
  // For now, show the admin overview as default
  // const { data: membership } = await supabase
  //   .from('memberships')
  //   .select('role')
  //   .eq('user_id', user.id)
  //   .single()
  
  // if (membership?.role === 'head') {
  //   redirect('/dashboard/head')
  // } else if (membership?.role === 'faculty') {
  //   redirect('/dashboard/faculty')
  // }

  return <DashboardOverview />
}

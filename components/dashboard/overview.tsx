"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Calendar, 
  Building2, 
  Clock, 
  TrendingUp,
  Upload,
  Wand2,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

// Mock data - TODO: Fetch from Supabase
const stats = [
  {
    title: "Total Faculty",
    value: "48",
    change: "+3 this month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Departments",
    value: "6",
    change: "All active",
    icon: Building2,
    trend: "neutral",
  },
  {
    title: "Schedules Generated",
    value: "12",
    change: "+2 this week",
    icon: Calendar,
    trend: "up",
  },
  {
    title: "Hours Saved",
    value: "156",
    change: "This semester",
    icon: Clock,
    trend: "up",
  },
]

const recentActivity = [
  {
    id: "1",
    action: "Timetable generated",
    department: "Computer Science",
    time: "2 hours ago",
  },
  {
    id: "2",
    action: "Faculty CSV uploaded",
    department: "Mathematics",
    time: "5 hours ago",
  },
  {
    id: "3",
    action: "Schedule published",
    department: "Physics",
    time: "1 day ago",
  },
  {
    id: "4",
    action: "New admin invited",
    department: "Chemistry",
    time: "2 days ago",
  },
]

const quickActions = [
  {
    title: "Upload Faculty CSV",
    description: "Import faculty data from a spreadsheet",
    href: "/dashboard/csv-upload",
    icon: Upload,
  },
  {
    title: "Generate Timetable",
    description: "Create a new clash-free schedule",
    href: "/dashboard/timetable",
    icon: Wand2,
  },
  {
    title: "View Timetable",
    description: "See current schedules",
    href: "/dashboard/timetable",
    icon: Calendar,
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your institute.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {stat.trend === "up" && (
                  <TrendingUp className="h-3 w-3 text-accent" />
                )}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to manage your institute
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {action.description}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions across your institute
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <div className="font-medium text-sm">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">
                      {activity.department}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4" asChild>
              <Link href="/dashboard/activity">
                View all activity
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Timetable preview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Current Timetable</CardTitle>
            <CardDescription>
              Computer Science Department - This Week
            </CardDescription>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard/timetable">
              View Full Timetable
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[600px] rounded-lg border border-border">
              <div className="grid grid-cols-6 text-sm">
                <div className="border-b border-r border-border bg-muted/50 p-3 font-medium text-muted-foreground">
                  Time
                </div>
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                  <div key={day} className="border-b border-border bg-muted/50 p-3 font-medium text-center text-muted-foreground">
                    {day}
                  </div>
                ))}
                {[
                  { time: "9:00 AM", slots: ["CS101", "CS201", "CS301", "CS101", "Lab"] },
                  { time: "10:00 AM", slots: ["CS201", "CS101", "CS201", "CS301", "CS201"] },
                  { time: "11:00 AM", slots: ["Break", "Break", "Break", "Break", "Break"] },
                  { time: "12:00 PM", slots: ["CS301", "Lab", "CS101", "CS201", "CS301"] },
                ].map((row, i) => (
                  <>
                    <div key={`time-${i}`} className="border-r border-b border-border p-3 text-xs text-muted-foreground">
                      {row.time}
                    </div>
                    {row.slots.map((slot, j) => (
                      <div
                        key={`slot-${i}-${j}`}
                        className={`border-b border-border p-3 text-xs text-center ${
                          slot === "Break" 
                            ? "bg-muted/30 text-muted-foreground" 
                            : slot === "Lab"
                            ? "bg-accent/10 text-accent font-medium"
                            : "bg-primary/10 text-primary font-medium"
                        }`}
                      >
                        {slot}
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

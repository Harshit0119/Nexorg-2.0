"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

// Mock data - TODO: Fetch from Supabase based on faculty user
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = [
  { start: "9:00 AM", end: "10:00 AM" },
  { start: "10:00 AM", end: "11:00 AM" },
  { start: "11:00 AM", end: "12:00 PM" },
  { start: "12:00 PM", end: "1:00 PM" },
  { start: "1:00 PM", end: "2:00 PM" },
  { start: "2:00 PM", end: "3:00 PM" },
  { start: "3:00 PM", end: "4:00 PM" },
]

interface ScheduleSlot {
  subject: string
  section: string
  room: string
  isFree: boolean
}

// Mock faculty schedule
const mockSchedule: Record<string, Record<string, ScheduleSlot>> = {
  Monday: {
    "9:00 AM": { subject: "Data Structures", section: "CS-A", room: "Room 101", isFree: false },
    "10:00 AM": { subject: "Data Structures", section: "CS-B", room: "Room 102", isFree: false },
    "11:00 AM": { subject: "", section: "", room: "", isFree: true },
    "12:00 PM": { subject: "Lunch Break", section: "", room: "", isFree: false },
    "1:00 PM": { subject: "Algorithms", section: "CS-A", room: "Room 103", isFree: false },
    "2:00 PM": { subject: "", section: "", room: "", isFree: true },
    "3:00 PM": { subject: "Lab", section: "CS-A", room: "Lab 1", isFree: false },
  },
  Tuesday: {
    "9:00 AM": { subject: "", section: "", room: "", isFree: true },
    "10:00 AM": { subject: "Algorithms", section: "CS-B", room: "Room 102", isFree: false },
    "11:00 AM": { subject: "Data Structures", section: "CS-A", room: "Room 101", isFree: false },
    "12:00 PM": { subject: "Lunch Break", section: "", room: "", isFree: false },
    "1:00 PM": { subject: "", section: "", room: "", isFree: true },
    "2:00 PM": { subject: "Algorithms", section: "CS-A", room: "Room 103", isFree: false },
    "3:00 PM": { subject: "", section: "", room: "", isFree: true },
  },
  Wednesday: {
    "9:00 AM": { subject: "Data Structures", section: "CS-B", room: "Room 102", isFree: false },
    "10:00 AM": { subject: "", section: "", room: "", isFree: true },
    "11:00 AM": { subject: "Lab", section: "CS-B", room: "Lab 2", isFree: false },
    "12:00 PM": { subject: "Lunch Break", section: "", room: "", isFree: false },
    "1:00 PM": { subject: "Data Structures", section: "CS-A", room: "Room 101", isFree: false },
    "2:00 PM": { subject: "", section: "", room: "", isFree: true },
    "3:00 PM": { subject: "", section: "", room: "", isFree: true },
  },
  Thursday: {
    "9:00 AM": { subject: "Algorithms", section: "CS-A", room: "Room 103", isFree: false },
    "10:00 AM": { subject: "Algorithms", section: "CS-B", room: "Room 102", isFree: false },
    "11:00 AM": { subject: "", section: "", room: "", isFree: true },
    "12:00 PM": { subject: "Lunch Break", section: "", room: "", isFree: false },
    "1:00 PM": { subject: "", section: "", room: "", isFree: true },
    "2:00 PM": { subject: "Data Structures", section: "CS-B", room: "Room 102", isFree: false },
    "3:00 PM": { subject: "", section: "", room: "", isFree: true },
  },
  Friday: {
    "9:00 AM": { subject: "", section: "", room: "", isFree: true },
    "10:00 AM": { subject: "Data Structures", section: "CS-A", room: "Room 101", isFree: false },
    "11:00 AM": { subject: "Algorithms", section: "CS-B", room: "Room 102", isFree: false },
    "12:00 PM": { subject: "Lunch Break", section: "", room: "", isFree: false },
    "1:00 PM": { subject: "Lab", section: "CS-A", room: "Lab 1", isFree: false },
    "2:00 PM": { subject: "", section: "", room: "", isFree: true },
    "3:00 PM": { subject: "", section: "", room: "", isFree: true },
  },
}

// Calculate stats
const totalSlots = days.length * (timeSlots.length - 1) // Excluding lunch
const freeSlots = Object.values(mockSchedule).reduce((acc, daySlots) => {
  return acc + Object.values(daySlots).filter(s => s.isFree).length
}, 0)
const classCount = totalSlots - freeSlots

// Today's schedule
const today = new Date().toLocaleDateString("en-US", { weekday: "long" })
const todaySchedule = mockSchedule[today] || mockSchedule["Monday"]

export function FacultySchedule() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Schedule</h2>
          <p className="text-muted-foreground">
            Your weekly teaching schedule
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/swap-requests">
            <RefreshCw className="mr-2 h-4 w-4" />
            Request Swap
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{classCount}</p>
                <p className="text-sm text-muted-foreground">Classes This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Clock className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">{freeSlots}</p>
                <p className="text-sm text-muted-foreground">Free Slots</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-chart-3" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Sections</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Schedule</CardTitle>
          <CardDescription>{today}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeSlots.map((slot) => {
              const scheduleSlot = todaySchedule[slot.start]
              const isBreak = scheduleSlot?.subject === "Lunch Break"
              
              return (
                <div
                  key={slot.start}
                  className={`flex items-center gap-4 rounded-lg border p-4 ${
                    scheduleSlot?.isFree 
                      ? "border-accent/50 bg-accent/5" 
                      : isBreak
                      ? "border-muted bg-muted/30"
                      : "border-border"
                  }`}
                >
                  <div className="w-24 text-sm font-medium text-muted-foreground">
                    {slot.start}
                  </div>
                  {scheduleSlot?.isFree ? (
                    <div className="flex-1 text-sm text-accent font-medium">
                      Free Slot
                    </div>
                  ) : isBreak ? (
                    <div className="flex-1 text-sm text-muted-foreground">
                      Lunch Break
                    </div>
                  ) : (
                    <div className="flex-1">
                      <div className="font-medium">{scheduleSlot?.subject}</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {scheduleSlot?.section}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {scheduleSlot?.room}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Full week view */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
          <CardDescription>
            Green cells indicate free slots
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[700px] rounded-lg border border-border">
              <div className="grid" style={{ gridTemplateColumns: `100px repeat(${days.length}, 1fr)` }}>
                {/* Header row */}
                <div className="border-b border-r border-border bg-muted/50 p-3 font-medium text-muted-foreground">
                  Time
                </div>
                {days.map((day) => (
                  <div 
                    key={day} 
                    className={`border-b border-border bg-muted/50 p-3 font-medium text-center text-muted-foreground ${
                      day === today ? "bg-primary/10 text-primary" : ""
                    }`}
                  >
                    {day}
                  </div>
                ))}

                {/* Time slots */}
                {timeSlots.map((slot) => (
                  <>
                    <div key={`time-${slot.start}`} className="border-r border-b border-border p-3 text-xs text-muted-foreground">
                      {slot.start}
                    </div>
                    {days.map((day) => {
                      const scheduleSlot = mockSchedule[day]?.[slot.start]
                      const isBreak = scheduleSlot?.subject === "Lunch Break"
                      
                      return (
                        <div
                          key={`${day}-${slot.start}`}
                          className={`border-b border-border p-2 text-center text-xs ${
                            scheduleSlot?.isFree 
                              ? "bg-accent/10" 
                              : isBreak
                              ? "bg-muted/30 text-muted-foreground"
                              : "bg-primary/10"
                          }`}
                        >
                          {scheduleSlot?.isFree ? (
                            <span className="text-accent font-medium">Free</span>
                          ) : isBreak ? (
                            <span>Break</span>
                          ) : (
                            <div>
                              <div className="font-medium text-primary">{scheduleSlot?.subject}</div>
                              <div className="text-muted-foreground">{scheduleSlot?.section}</div>
                            </div>
                          )}
                        </div>
                      )
                    })}
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

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  Download, 
  Eye,
  Building2,
  Clock,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import Link from "next/link"

// Mock data - TODO: Fetch from Supabase
const mockTimetables = [
  {
    id: "1",
    department: "Computer Science",
    section: "Section A",
    semester: "Fall 2024",
    lastUpdated: "2 hours ago",
    status: "published",
  },
  {
    id: "2",
    department: "Computer Science",
    section: "Section B",
    semester: "Fall 2024",
    lastUpdated: "1 day ago",
    status: "published",
  },
  {
    id: "3",
    department: "Mathematics",
    section: "Section A",
    semester: "Fall 2024",
    lastUpdated: "3 days ago",
    status: "draft",
  },
  {
    id: "4",
    department: "Physics",
    section: "Section A",
    semester: "Fall 2024",
    lastUpdated: "1 week ago",
    status: "published",
  },
]

const departments = [
  { value: "all", label: "All Departments" },
  { value: "cs", label: "Computer Science" },
  { value: "math", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
]

export default function TimetablesPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [timetables] = useState(mockTimetables)

  const filteredTimetables = selectedDepartment === "all" 
    ? timetables 
    : timetables.filter(t => t.department.toLowerCase().includes(selectedDepartment))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Timetables</h2>
          <p className="text-muted-foreground">
            View all generated timetables across departments
          </p>
        </div>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept.value} value={dept.value}>
                {dept.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredTimetables.map((timetable) => (
          <Card key={timetable.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{timetable.section}</CardTitle>
                    <CardDescription>{timetable.department}</CardDescription>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  timetable.status === "published" 
                    ? "bg-accent/10 text-accent" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {timetable.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {timetable.semester}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Updated {timetable.lastUpdated}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/timetable?id=${timetable.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

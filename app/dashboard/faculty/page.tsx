"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Search,
  Building2,
  MoreVertical,
  Eye,
  Mail,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

// Mock data - TODO: Fetch from Supabase
const mockFaculty = [
  {
    id: "1",
    name: "Dr. Alice Thompson",
    email: "a.thompson@institute.edu",
    department: "Computer Science",
    subjects: ["Data Structures", "Algorithms"],
    status: "active",
  },
  {
    id: "2",
    name: "Prof. James Wilson",
    email: "j.wilson@institute.edu",
    department: "Computer Science",
    subjects: ["Database Systems", "Web Development"],
    status: "active",
  },
  {
    id: "3",
    name: "Dr. Sarah Martinez",
    email: "s.martinez@institute.edu",
    department: "Mathematics",
    subjects: ["Calculus", "Linear Algebra"],
    status: "active",
  },
  {
    id: "4",
    name: "Prof. David Lee",
    email: "d.lee@institute.edu",
    department: "Physics",
    subjects: ["Mechanics", "Thermodynamics"],
    status: "active",
  },
  {
    id: "5",
    name: "Dr. Jennifer Clark",
    email: "j.clark@institute.edu",
    department: "Chemistry",
    subjects: ["Organic Chemistry", "Inorganic Chemistry"],
    status: "on_leave",
  },
]

const departments = [
  { value: "all", label: "All Departments" },
  { value: "cs", label: "Computer Science" },
  { value: "math", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
]

export default function FacultyPage() {
  const [faculty] = useState(mockFaculty)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDept = selectedDepartment === "all" || 
      f.department.toLowerCase().includes(selectedDepartment)
    return matchesSearch && matchesDept
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Faculty</h2>
        <p className="text-muted-foreground">
          View all faculty members across departments
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>All Faculty Members</CardTitle>
              <CardDescription>
                {filteredFaculty.length} of {faculty.length} faculty members
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search faculty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-full sm:w-[200px]"
                />
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Department" />
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
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaculty.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell className="text-muted-foreground">{member.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {member.department}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.subjects.slice(0, 2).map((subject) => (
                        <span key={subject} className="rounded-full bg-muted px-2 py-0.5 text-xs">
                          {subject}
                        </span>
                      ))}
                      {member.subjects.length > 2 && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                          +{member.subjects.length - 2}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      member.status === "active" 
                        ? "bg-accent/10 text-accent" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {member.status === "on_leave" ? "On Leave" : member.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

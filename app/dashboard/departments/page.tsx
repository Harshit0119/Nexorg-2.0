"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Building2, 
  Users, 
  Calendar, 
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

// Mock data - TODO: Fetch from Supabase
const mockDepartments = [
  {
    id: "1",
    name: "Computer Science",
    facultyCount: 12,
    schedulesCount: 4,
    adminName: "Dr. Smith",
  },
  {
    id: "2",
    name: "Mathematics",
    facultyCount: 8,
    schedulesCount: 3,
    adminName: "Prof. Johnson",
  },
  {
    id: "3",
    name: "Physics",
    facultyCount: 10,
    schedulesCount: 3,
    adminName: "Dr. Williams",
  },
  {
    id: "4",
    name: "Chemistry",
    facultyCount: 9,
    schedulesCount: 2,
    adminName: "Prof. Brown",
  },
  {
    id: "5",
    name: "Biology",
    facultyCount: 7,
    schedulesCount: 2,
    adminName: "Dr. Davis",
  },
  {
    id: "6",
    name: "English",
    facultyCount: 6,
    schedulesCount: 2,
    adminName: "Prof. Miller",
  },
]

export default function DepartmentsPage() {
  const [departments] = useState(mockDepartments)
  const [newDeptName, setNewDeptName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddDepartment = () => {
    // TODO: Add department to Supabase
    console.log("Adding department:", newDeptName)
    setNewDeptName("")
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Departments</h2>
          <p className="text-muted-foreground">
            Manage all departments in your institute
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>
                Create a new department for your institute.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="deptName">Department Name</Label>
                <Input
                  id="deptName"
                  placeholder="e.g., Computer Science"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                />
              </div>
              <Button onClick={handleAddDepartment} className="w-full">
                Create Department
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <Card key={dept.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <CardDescription>Admin: {dept.adminName}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {dept.facultyCount} Faculty
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {dept.schedulesCount} Schedules
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

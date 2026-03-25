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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  UserPlus, 
  Mail,
  Building2,
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
const mockAdmins = [
  {
    id: "1",
    name: "Dr. Robert Smith",
    email: "r.smith@institute.edu",
    department: "Computer Science",
    status: "active",
    joinedAt: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "Prof. Emily Johnson",
    email: "e.johnson@institute.edu",
    department: "Mathematics",
    status: "active",
    joinedAt: "Feb 20, 2024",
  },
  {
    id: "3",
    name: "Dr. Michael Williams",
    email: "m.williams@institute.edu",
    department: "Physics",
    status: "active",
    joinedAt: "Mar 10, 2024",
  },
  {
    id: "4",
    name: "Prof. Sarah Brown",
    email: "s.brown@institute.edu",
    department: "Chemistry",
    status: "pending",
    joinedAt: "Invited",
  },
]

const departments = [
  { value: "cs", label: "Computer Science" },
  { value: "math", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
]

export default function AdminsPage() {
  const [admins] = useState(mockAdmins)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [selectedDept, setSelectedDept] = useState("")

  const handleInviteAdmin = () => {
    // TODO: Send invite via Supabase
    console.log("Inviting admin:", inviteEmail, selectedDept)
    setInviteEmail("")
    setSelectedDept("")
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admins</h2>
          <p className="text-muted-foreground">
            Manage department administrators
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Department Admin</DialogTitle>
              <DialogDescription>
                Send an invitation to a new department administrator.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@institute.edu"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={selectedDept} onValueChange={setSelectedDept}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
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
              <Button onClick={handleInviteAdmin} className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Administrators</CardTitle>
          <CardDescription>
            {admins.length} administrators across all departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell className="text-muted-foreground">{admin.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {admin.department}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      admin.status === "active" 
                        ? "bg-accent/10 text-accent" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {admin.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{admin.joinedAt}</TableCell>
                  <TableCell>
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
                          Remove
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

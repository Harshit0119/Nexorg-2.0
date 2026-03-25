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
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useState } from "react"

// Mock data - TODO: Fetch from Supabase invites table
const mockInvites = [
  {
    id: "1",
    email: "j.smith@institute.edu",
    role: "faculty",
    status: "pending",
    sentAt: "2 hours ago",
    expiresIn: "22 hours",
  },
  {
    id: "2",
    email: "m.jones@institute.edu",
    role: "faculty",
    status: "pending",
    sentAt: "1 day ago",
    expiresIn: "Expired",
  },
  {
    id: "3",
    email: "s.brown@institute.edu",
    role: "faculty",
    status: "accepted",
    sentAt: "3 days ago",
    expiresIn: "-",
  },
  {
    id: "4",
    email: "r.williams@institute.edu",
    role: "admin",
    status: "pending",
    sentAt: "5 hours ago",
    expiresIn: "19 hours",
  },
]

const roles = [
  { value: "faculty", label: "Faculty" },
  { value: "admin", label: "Admin" },
]

export default function InvitationsPage() {
  const [invites] = useState(mockInvites)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [selectedRole, setSelectedRole] = useState("")

  const handleSendInvite = () => {
    // TODO: Send invite via Supabase with token system
    console.log("Sending invite:", { inviteEmail, selectedRole })
    setInviteEmail("")
    setSelectedRole("")
    setIsDialogOpen(false)
  }

  const handleResendInvite = (id: string) => {
    // TODO: Resend invite via Supabase
    console.log("Resending invite:", id)
  }

  const pendingCount = invites.filter(i => i.status === "pending").length
  const acceptedCount = invites.filter(i => i.status === "accepted").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Invitations</h2>
          <p className="text-muted-foreground">
            Manage faculty and admin invitations
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Send Invite
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Invitation</DialogTitle>
              <DialogDescription>
                Invite a new member to join your institute.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="member@institute.edu"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSendInvite} className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Mail className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{invites.length}</p>
                <p className="text-sm text-muted-foreground">Total Invites</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">{acceptedCount}</p>
                <p className="text-sm text-muted-foreground">Accepted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invites table */}
      <Card>
        <CardHeader>
          <CardTitle>All Invitations</CardTitle>
          <CardDescription>
            Track and manage sent invitations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell className="font-medium">{invite.email}</TableCell>
                  <TableCell className="capitalize">{invite.role}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {invite.status === "accepted" ? (
                        <CheckCircle className="h-4 w-4 text-accent" />
                      ) : invite.expiresIn === "Expired" ? (
                        <XCircle className="h-4 w-4 text-destructive" />
                      ) : (
                        <Clock className="h-4 w-4 text-primary" />
                      )}
                      <span className={`capitalize ${
                        invite.status === "accepted" 
                          ? "text-accent" 
                          : invite.expiresIn === "Expired"
                          ? "text-destructive"
                          : ""
                      }`}>
                        {invite.expiresIn === "Expired" ? "Expired" : invite.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{invite.sentAt}</TableCell>
                  <TableCell className="text-muted-foreground">{invite.expiresIn}</TableCell>
                  <TableCell>
                    {invite.status === "pending" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResendInvite(invite.id)}
                      >
                        <RefreshCw className="mr-2 h-3 w-3" />
                        Resend
                      </Button>
                    )}
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

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react"
import { useState } from "react"

// Mock data - TODO: Fetch from Supabase
const mockRequests = [
  {
    id: "1",
    fromSlot: "Monday 9:00 AM - Data Structures",
    toSlot: "Tuesday 2:00 PM",
    reason: "Doctor appointment scheduled for Monday morning",
    status: "pending",
    createdAt: "2 days ago",
  },
  {
    id: "2",
    fromSlot: "Wednesday 11:00 AM - Lab",
    toSlot: "Friday 3:00 PM",
    reason: "Conference attendance",
    status: "approved",
    createdAt: "1 week ago",
  },
  {
    id: "3",
    fromSlot: "Thursday 10:00 AM - Algorithms",
    toSlot: "Friday 10:00 AM",
    reason: "Personal commitment",
    status: "rejected",
    createdAt: "2 weeks ago",
  },
]

const availableSlots = [
  { value: "mon-9", label: "Monday 9:00 AM - Data Structures (CS-A)" },
  { value: "mon-10", label: "Monday 10:00 AM - Data Structures (CS-B)" },
  { value: "mon-13", label: "Monday 1:00 PM - Algorithms (CS-A)" },
  { value: "mon-15", label: "Monday 3:00 PM - Lab (CS-A)" },
  { value: "tue-10", label: "Tuesday 10:00 AM - Algorithms (CS-B)" },
  { value: "tue-11", label: "Tuesday 11:00 AM - Data Structures (CS-A)" },
]

const freeSlots = [
  { value: "mon-11", label: "Monday 11:00 AM" },
  { value: "mon-14", label: "Monday 2:00 PM" },
  { value: "tue-9", label: "Tuesday 9:00 AM" },
  { value: "tue-13", label: "Tuesday 1:00 PM" },
  { value: "tue-15", label: "Tuesday 3:00 PM" },
  { value: "wed-10", label: "Wednesday 10:00 AM" },
]

export default function SwapRequestsPage() {
  const [requests] = useState(mockRequests)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [fromSlot, setFromSlot] = useState("")
  const [toSlot, setToSlot] = useState("")
  const [reason, setReason] = useState("")

  const handleSubmitRequest = () => {
    // TODO: Submit swap request to Supabase
    console.log("Submitting swap request:", { fromSlot, toSlot, reason })
    setFromSlot("")
    setToSlot("")
    setReason("")
    setIsDialogOpen(false)
  }

  const pendingCount = requests.filter(r => r.status === "pending").length
  const approvedCount = requests.filter(r => r.status === "approved").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Swap Requests</h2>
          <p className="text-muted-foreground">
            Request schedule changes with admin approval
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Schedule Swap</DialogTitle>
              <DialogDescription>
                Submit a request to swap your class slot. Admin approval required.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Current Slot</Label>
                <Select value={fromSlot} onValueChange={setFromSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class to swap" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSlots.map((slot) => (
                      <SelectItem key={slot.value} value={slot.value}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferred New Slot</Label>
                <Select value={toSlot} onValueChange={setToSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select free slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {freeSlots.map((slot) => (
                      <SelectItem key={slot.value} value={slot.value}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Reason for Swap</Label>
                <Textarea
                  placeholder="Briefly explain why you need this swap..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                />
              </div>
              <Button onClick={handleSubmitRequest} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Submit Request
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
              <RefreshCw className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{requests.length}</p>
                <p className="text-sm text-muted-foreground">Total Requests</p>
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
                <p className="text-2xl font-bold">{approvedCount}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests list */}
      <Card>
        <CardHeader>
          <CardTitle>Your Requests</CardTitle>
          <CardDescription>
            Track the status of your swap requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="rounded-lg border border-border p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {request.status === "pending" ? (
                      <Clock className="h-5 w-5 text-primary" />
                    ) : request.status === "approved" ? (
                      <CheckCircle className="h-5 w-5 text-accent" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                    <span className={`text-sm font-medium capitalize ${
                      request.status === "approved" 
                        ? "text-accent" 
                        : request.status === "rejected"
                        ? "text-destructive"
                        : "text-primary"
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {request.createdAt}
                  </span>
                </div>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-16">From:</span>
                    <span className="font-medium">{request.fromSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-16">To:</span>
                    <span className="font-medium">{request.toSlot}</span>
                  </div>
                  <div className="flex items-start gap-2 mt-2">
                    <span className="text-muted-foreground w-16">Reason:</span>
                    <span className="text-muted-foreground">{request.reason}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {requests.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No swap requests yet. Click &quot;New Request&quot; to submit one.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

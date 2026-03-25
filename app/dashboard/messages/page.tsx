"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Send,
  Users,
  Clock,
} from "lucide-react"
import { useState } from "react"

// Mock data - TODO: Fetch from Supabase
const mockMessages = [
  {
    id: "1",
    to: "All Admins",
    subject: "Timetable Deadline",
    preview: "Please ensure all timetables are submitted by Friday...",
    sentAt: "2 hours ago",
  },
  {
    id: "2",
    to: "CS Department",
    subject: "Faculty Meeting",
    preview: "Reminder: Department meeting scheduled for tomorrow at 3 PM...",
    sentAt: "1 day ago",
  },
  {
    id: "3",
    to: "All Departments",
    subject: "New Semester Updates",
    preview: "Important updates regarding the upcoming semester schedule...",
    sentAt: "3 days ago",
  },
]

const recipients = [
  { value: "all_admins", label: "All Admins" },
  { value: "all_faculty", label: "All Faculty" },
  { value: "cs", label: "Computer Science Department" },
  { value: "math", label: "Mathematics Department" },
  { value: "physics", label: "Physics Department" },
]

export default function MessagesPage() {
  const [messages] = useState(mockMessages)
  const [recipient, setRecipient] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    // TODO: Send message via Supabase
    console.log("Sending message:", { recipient, subject, message })
    setRecipient("")
    setSubject("")
    setMessage("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">
          Send announcements to admins and faculty
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Compose message */}
        <Card>
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
            <CardDescription>
              Send a message to admins or department faculty
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">To</Label>
              <Select value={recipient} onValueChange={setRecipient}>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  {recipients.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Message subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button onClick={handleSendMessage} className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </CardContent>
        </Card>

        {/* Recent messages */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>
              Messages you&apos;ve sent recently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-lg border border-border p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{msg.to}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {msg.sentAt}
                    </div>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{msg.subject}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {msg.preview}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View all messages
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

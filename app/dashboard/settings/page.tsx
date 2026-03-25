"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  User,
  Building2,
  Bell,
  Shield,
  Save,
  Loader2,
} from "lucide-react"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  
  // Profile settings
  const [fullName, setFullName] = useState("Dr. John Smith")
  const [email, setEmail] = useState("j.smith@institute.edu")
  
  // Institute settings (for heads/admins)
  const [instituteName, setInstituteName] = useState("Westfield Academy")
  const [instituteEmail, setInstituteEmail] = useState("admin@westfield.edu")
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [scheduleAlerts, setScheduleAlerts] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(false)

  const handleSaveProfile = () => {
    setIsLoading(true)
    // TODO: Save profile to Supabase
    setTimeout(() => {
      setIsLoading(false)
      alert("Profile saved! (Mock)")
    }, 1000)
  }

  const handleSaveInstitute = () => {
    setIsLoading(true)
    // TODO: Save institute settings to Supabase
    setTimeout(() => {
      setIsLoading(false)
      alert("Institute settings saved! (Mock)")
    }, 1000)
  }

  const handleSaveNotifications = () => {
    setIsLoading(true)
    // TODO: Save notification preferences to Supabase
    setTimeout(() => {
      setIsLoading(false)
      alert("Notification preferences saved! (Mock)")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleSaveProfile} className="mt-4" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Institute settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Institute</CardTitle>
              <CardDescription>Manage institute details</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="instituteName">Institute Name</Label>
              <Input
                id="instituteName"
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instituteEmail">Contact Email</Label>
              <Input
                id="instituteEmail"
                type="email"
                value={instituteEmail}
                onChange={(e) => setInstituteEmail(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleSaveInstitute} className="mt-4" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Notification settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive updates</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive important updates via email
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Schedule Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when schedules change
                </p>
              </div>
              <Switch
                checked={scheduleAlerts}
                onCheckedChange={setScheduleAlerts}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">
                  Receive a summary every Monday
                </p>
              </div>
              <Switch
                checked={weeklyDigest}
                onCheckedChange={setWeeklyDigest}
              />
            </div>
          </div>
          <Button onClick={handleSaveNotifications} className="mt-4" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Security settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Password</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Change your password to keep your account secure
              </p>
              <Button variant="outline">Change Password</Button>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-1 text-destructive">Danger Zone</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Permanently delete your account and all associated data
              </p>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

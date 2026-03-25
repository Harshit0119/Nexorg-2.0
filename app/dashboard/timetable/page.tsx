"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Wand2,
  RefreshCw,
  Save,
  Download,
  Send,
} from "lucide-react"
import { useState } from "react"

// Mock timetable data
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

const subjects = ["CS101", "CS201", "CS301", "Math", "Physics", "Lab", "Break"]
const colors: Record<string, string> = {
  "CS101": "bg-primary/20 text-primary",
  "CS201": "bg-accent/20 text-accent",
  "CS301": "bg-chart-3/20 text-chart-3",
  "Math": "bg-chart-4/20 text-chart-4",
  "Physics": "bg-chart-5/20 text-chart-5",
  "Lab": "bg-chart-1/20 text-chart-1",
  "Break": "bg-muted text-muted-foreground",
}

// Generate mock timetable
const generateMockTimetable = () => {
  const timetable: Record<string, Record<string, string>> = {}
  
  days.forEach(day => {
    timetable[day] = {}
    timeSlots.forEach((slot, index) => {
      if (index === 3) {
        timetable[day][slot.start] = "Break"
      } else {
        const randomSubject = subjects[Math.floor(Math.random() * (subjects.length - 1))]
        timetable[day][slot.start] = randomSubject
      }
    })
  })
  
  return timetable
}

export default function TimetablePage() {
  const [timetable, setTimetable] = useState<Record<string, Record<string, string>> | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [lecturesPerDay, setLecturesPerDay] = useState("6")
  const [labsPerWeek, setLabsPerWeek] = useState("2")
  const [lunchBreak, setLunchBreak] = useState("12:00")
  const [sections, setSections] = useState("1")
  const [editingCell, setEditingCell] = useState<{ day: string; time: string } | null>(null)

  const handleGenerate = () => {
    setIsGenerating(true)
    
    // TODO: Replace with actual timetable generation algorithm
    setTimeout(() => {
      setTimetable(generateMockTimetable())
      setIsGenerating(false)
    }, 2000)
  }

  const handleRegenerate = () => {
    handleGenerate()
  }

  const handleCellClick = (day: string, time: string) => {
    setEditingCell({ day, time })
  }

  const handleCellChange = (day: string, time: string, value: string) => {
    if (timetable) {
      setTimetable({
        ...timetable,
        [day]: {
          ...timetable[day],
          [time]: value,
        },
      })
    }
    setEditingCell(null)
  }

  const handlePublish = () => {
    // TODO: Publish timetable to Supabase and notify faculty
    console.log("Publishing timetable:", timetable)
    alert("Timetable published successfully! (Mock)")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Timetable Generator</h2>
          <p className="text-muted-foreground">
            Configure and generate clash-free timetables
          </p>
        </div>
        {timetable && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRegenerate} disabled={isGenerating}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
              Regenerate
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={handlePublish}>
              <Send className="mr-2 h-4 w-4" />
              Publish
            </Button>
          </div>
        )}
      </div>

      {/* Configuration form */}
      {!timetable && (
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Set parameters for timetable generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lectures">Lectures per Day</Label>
                <Input
                  id="lectures"
                  type="number"
                  min="1"
                  max="10"
                  value={lecturesPerDay}
                  onChange={(e) => setLecturesPerDay(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="labs">Labs per Week</Label>
                <Input
                  id="labs"
                  type="number"
                  min="0"
                  max="10"
                  value={labsPerWeek}
                  onChange={(e) => setLabsPerWeek(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lunch">Lunch Break Time</Label>
                <Select value={lunchBreak} onValueChange={setLunchBreak}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sections">Number of Sections</Label>
                <Input
                  id="sections"
                  type="number"
                  min="1"
                  max="10"
                  value={sections}
                  onChange={(e) => setSections(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleGenerate} className="mt-6 w-full" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Timetable
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Timetable grid */}
      {timetable && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Timetable</CardTitle>
            <CardDescription>
              Click on any cell to edit. Colors indicate different subjects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[800px] rounded-lg border border-border">
                <div className="grid" style={{ gridTemplateColumns: `100px repeat(${days.length}, 1fr)` }}>
                  {/* Header row */}
                  <div className="border-b border-r border-border bg-muted/50 p-3 font-medium text-muted-foreground">
                    Time
                  </div>
                  {days.map((day) => (
                    <div key={day} className="border-b border-border bg-muted/50 p-3 font-medium text-center text-muted-foreground">
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
                        const subject = timetable[day][slot.start]
                        const isEditing = editingCell?.day === day && editingCell?.time === slot.start

                        return (
                          <div
                            key={`${day}-${slot.start}`}
                            className={`border-b border-border p-2 text-center transition-colors ${
                              isEditing ? "bg-background" : colors[subject] || "bg-muted/30"
                            }`}
                            onClick={() => handleCellClick(day, slot.start)}
                          >
                            {isEditing ? (
                              <Select
                                value={subject}
                                onValueChange={(value) => handleCellChange(day, slot.start, value)}
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {subjects.map((s) => (
                                    <SelectItem key={s} value={s}>
                                      {s}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <span className="text-xs font-medium cursor-pointer">
                                {subject}
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-3">
              {subjects.filter(s => s !== "Break").map((subject) => (
                <div key={subject} className="flex items-center gap-2 text-sm">
                  <div className={`h-3 w-3 rounded ${colors[subject]?.split(" ")[0]}`} />
                  <span>{subject}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

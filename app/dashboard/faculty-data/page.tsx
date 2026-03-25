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
  Save,
  Plus,
  Trash2,
  Search,
} from "lucide-react"
import { useState } from "react"

interface FacultyRow {
  id: string
  name: string
  email: string
  subject: string
  role: string
  isEdited: boolean
}

// Mock data - TODO: Fetch from csv_rows table
const initialData: FacultyRow[] = [
  { id: "1", name: "Dr. Alice Thompson", email: "a.thompson@institute.edu", subject: "Data Structures", role: "Professor", isEdited: false },
  { id: "2", name: "Prof. James Wilson", email: "j.wilson@institute.edu", subject: "Database Systems", role: "Associate Professor", isEdited: false },
  { id: "3", name: "Dr. Sarah Martinez", email: "s.martinez@institute.edu", subject: "Calculus", role: "Professor", isEdited: false },
  { id: "4", name: "Prof. David Lee", email: "d.lee@institute.edu", subject: "Mechanics", role: "Assistant Professor", isEdited: false },
  { id: "5", name: "Dr. Jennifer Clark", email: "j.clark@institute.edu", subject: "Organic Chemistry", role: "Professor", isEdited: false },
]

export default function FacultyDataPage() {
  const [data, setData] = useState<FacultyRow[]>(initialData)
  const [searchQuery, setSearchQuery] = useState("")
  const [hasChanges, setHasChanges] = useState(false)

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCellChange = (id: string, field: keyof FacultyRow, value: string) => {
    setData(prev => prev.map(row => 
      row.id === id 
        ? { ...row, [field]: value, isEdited: true }
        : row
    ))
    setHasChanges(true)
  }

  const handleAddRow = () => {
    const newRow: FacultyRow = {
      id: Date.now().toString(),
      name: "",
      email: "",
      subject: "",
      role: "",
      isEdited: true,
    }
    setData(prev => [...prev, newRow])
    setHasChanges(true)
  }

  const handleDeleteRow = (id: string) => {
    setData(prev => prev.filter(row => row.id !== id))
    setHasChanges(true)
  }

  const handleSave = () => {
    // TODO: Save changes to Supabase csv_rows table
    console.log("Saving data:", data)
    setData(prev => prev.map(row => ({ ...row, isEdited: false })))
    setHasChanges(false)
    alert("Changes saved successfully! (Mock)")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Faculty Data</h2>
          <p className="text-muted-foreground">
            Edit and manage uploaded faculty information
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleAddRow}>
            <Plus className="mr-2 h-4 w-4" />
            Add Row
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Editable Faculty Table</CardTitle>
              <CardDescription>
                Click on any cell to edit. Changes are highlighted in blue.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-full sm:w-[200px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id} className={row.isEdited ? "bg-primary/5" : ""}>
                    <TableCell className="p-1">
                      <Input
                        value={row.name}
                        onChange={(e) => handleCellChange(row.id, "name", e.target.value)}
                        className="border-0 bg-transparent focus-visible:ring-1 h-9"
                        placeholder="Name"
                      />
                    </TableCell>
                    <TableCell className="p-1">
                      <Input
                        value={row.email}
                        onChange={(e) => handleCellChange(row.id, "email", e.target.value)}
                        className="border-0 bg-transparent focus-visible:ring-1 h-9"
                        placeholder="Email"
                        type="email"
                      />
                    </TableCell>
                    <TableCell className="p-1">
                      <Input
                        value={row.subject}
                        onChange={(e) => handleCellChange(row.id, "subject", e.target.value)}
                        className="border-0 bg-transparent focus-visible:ring-1 h-9"
                        placeholder="Subject"
                      />
                    </TableCell>
                    <TableCell className="p-1">
                      <Input
                        value={row.role}
                        onChange={(e) => handleCellChange(row.id, "role", e.target.value)}
                        className="border-0 bg-transparent focus-visible:ring-1 h-9"
                        placeholder="Role"
                      />
                    </TableCell>
                    <TableCell className="p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteRow(row.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? "No results found" : "No data available. Upload a CSV or add rows manually."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

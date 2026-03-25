"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  X,
  Download,
} from "lucide-react"
import { useState, useCallback } from "react"

interface ParsedRow {
  name: string
  email: string
  subject: string
  role: string
  isValid: boolean
  errors?: string[]
}

// Mock parsed data for preview
const mockParsedData: ParsedRow[] = [
  { name: "Dr. Alice Thompson", email: "a.thompson@institute.edu", subject: "Data Structures", role: "Professor", isValid: true },
  { name: "Prof. James Wilson", email: "j.wilson@institute.edu", subject: "Database Systems", role: "Associate Professor", isValid: true },
  { name: "Dr. Sarah Martinez", email: "invalid-email", subject: "Calculus", role: "Professor", isValid: false, errors: ["Invalid email format"] },
  { name: "Prof. David Lee", email: "d.lee@institute.edu", subject: "Mechanics", role: "Assistant Professor", isValid: true },
]

export default function CsvUploadPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [parsedData, setParsedData] = useState<ParsedRow[] | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type === "text/csv") {
      handleFileSelect(file)
    }
  }, [])

  const handleFileSelect = (file: File) => {
    setUploadedFile(file)
    setIsUploading(true)
    
    // TODO: Parse CSV file and validate data
    // For now, use mock data
    setTimeout(() => {
      setParsedData(mockParsedData)
      setIsUploading(false)
    }, 1000)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleSaveData = () => {
    // TODO: Save parsed data to Supabase csv_rows table
    console.log("Saving data:", parsedData)
    alert("Data saved successfully! (Mock)")
  }

  const handleClearFile = () => {
    setUploadedFile(null)
    setParsedData(null)
  }

  const validCount = parsedData?.filter(r => r.isValid).length ?? 0
  const invalidCount = parsedData?.filter(r => !r.isValid).length ?? 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">CSV Upload</h2>
        <p className="text-muted-foreground">
          Import faculty data from a CSV file
        </p>
      </div>

      {!uploadedFile ? (
        <Card>
          <CardContent className="pt-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
                isDragging 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Upload className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload CSV File</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Drag and drop your CSV file here, or click to browse
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileInputChange}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload">
                <Button asChild>
                  <span>Select File</span>
                </Button>
              </label>
              <p className="text-xs text-muted-foreground mt-4">
                Supported format: CSV (.csv)
              </p>
            </div>

            {/* Template download */}
            <div className="mt-6 flex items-center justify-center gap-4 text-sm">
              <span className="text-muted-foreground">Need a template?</span>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* File info */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileSpreadsheet className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{uploadedFile.name}</CardTitle>
                    <CardDescription>
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleClearFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Preview */}
          {isUploading ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">Parsing CSV file...</p>
                </div>
              </CardContent>
            </Card>
          ) : parsedData && (
            <>
              {/* Summary */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <FileSpreadsheet className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="text-2xl font-bold">{parsedData.length}</p>
                        <p className="text-sm text-muted-foreground">Total Rows</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <CheckCircle className="h-8 w-8 text-accent" />
                      <div>
                        <p className="text-2xl font-bold">{validCount}</p>
                        <p className="text-sm text-muted-foreground">Valid Rows</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <AlertCircle className="h-8 w-8 text-destructive" />
                      <div>
                        <p className="text-2xl font-bold">{invalidCount}</p>
                        <p className="text-sm text-muted-foreground">Invalid Rows</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Data preview table */}
              <Card>
                <CardHeader>
                  <CardTitle>Preview Data</CardTitle>
                  <CardDescription>
                    Review the parsed data before saving
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">Status</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Role</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parsedData.map((row, index) => (
                          <TableRow key={index} className={!row.isValid ? "bg-destructive/5" : ""}>
                            <TableCell>
                              {row.isValid ? (
                                <CheckCircle className="h-4 w-4 text-accent" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-destructive" />
                              )}
                            </TableCell>
                            <TableCell className="font-medium">{row.name}</TableCell>
                            <TableCell>
                              <span className={!row.isValid ? "text-destructive" : ""}>
                                {row.email}
                              </span>
                              {row.errors && (
                                <p className="text-xs text-destructive mt-1">
                                  {row.errors.join(", ")}
                                </p>
                              )}
                            </TableCell>
                            <TableCell>{row.subject}</TableCell>
                            <TableCell>{row.role}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={handleClearFile}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveData} disabled={invalidCount > 0}>
                      Save {validCount} Records
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  )
}

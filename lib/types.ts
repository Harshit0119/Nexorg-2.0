// User roles for the application
export type UserRole = "head" | "admin" | "faculty"

// Institute types
export interface Institute {
  id: string
  name: string
  slug: string
  created_at: string
}

// Department types
export interface Department {
  id: string
  name: string
  institute_id: string
  created_at: string
}

// Membership types (links users to institutes with roles)
export interface Membership {
  id: string
  user_id: string
  institute_id: string
  department_id?: string
  role: UserRole
  created_at: string
}

// Faculty types
export interface Faculty {
  id: string
  user_id?: string
  name: string
  email: string
  department_id: string
  subjects: string[]
  created_at: string
}

// Subject types
export interface Subject {
  id: string
  name: string
  code: string
  department_id: string
  credits: number
}

// Timetable slot types
export interface TimetableSlot {
  id: string
  day: string
  start_time: string
  end_time: string
  subject_id?: string
  faculty_id?: string
  room?: string
  section: string
  is_break: boolean
}

// CSV upload types
export interface CsvUpload {
  id: string
  filename: string
  uploaded_by: string
  institute_id: string
  department_id?: string
  upload_type: "faculty" | "subjects" | "rooms"
  created_at: string
}

export interface CsvRow {
  id: string
  csv_upload_id: string
  row_data: Record<string, string>
  row_number: number
  is_valid: boolean
  validation_errors?: string[]
}

// Notification types
export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  read: boolean
  created_at: string
}

// Invite types
export interface Invite {
  id: string
  email: string
  institute_id: string
  department_id?: string
  role: UserRole
  token: string
  expires_at: string
  accepted: boolean
  created_at: string
}

// Subscription types
export interface Subscription {
  id: string
  institute_id: string
  plan: "essentials_monthly" | "essentials_yearly" | "campus_monthly" | "campus_yearly"
  status: "active" | "cancelled" | "past_due"
  stripe_customer_id?: string
  stripe_subscription_id?: string
  current_period_end: string
  created_at: string
}

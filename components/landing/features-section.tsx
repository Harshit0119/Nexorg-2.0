"use client"

import { 
  Zap, 
  Building2, 
  Bell, 
  Users, 
  FileSpreadsheet, 
  Shield 
} from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Zap,
    title: "Automatic Timetable Generation",
    description: "Our AI algorithm generates clash-free timetables instantly, considering faculty availability, room capacity, and resource constraints.",
  },
  {
    icon: Building2,
    title: "Multi-Department Management",
    description: "Manage multiple departments, courses, and sections from a single dashboard. Perfect for large institutes with complex structures.",
  },
  {
    icon: Bell,
    title: "Real-Time Updates & Notifications",
    description: "Get instant notifications for schedule changes. Faculty and students stay informed with automatic updates.",
  },
  {
    icon: Users,
    title: "Faculty Schedule Management",
    description: "View and manage faculty workload, track availability, and ensure fair distribution of classes across your team.",
  },
  {
    icon: FileSpreadsheet,
    title: "CSV Bulk Upload System",
    description: "Import existing data easily with our CSV upload feature. Migrate from spreadsheets to Nexorg in minutes.",
  },
  {
    icon: Shield,
    title: "Role-Based Access Control",
    description: "Secure your data with granular permissions. Heads, admins, and faculty each get appropriate access levels.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
              Everything You Need to Schedule Smarter
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Powerful features designed specifically for educational institutions to streamline timetable management.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

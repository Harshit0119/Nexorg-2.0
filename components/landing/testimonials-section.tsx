"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Principal, Westfield Academy",
    content: "Nexorg transformed our scheduling process. What used to take our admin team a full week now happens in hours. The AI catches conflicts we would have missed.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Prof. Michael Rodriguez",
    role: "Dean, Metro Technical College",
    content: "Managing 12 departments with over 200 faculty members seemed impossible until we found Nexorg. The multi-department support is exactly what we needed.",
    rating: 5,
    avatar: "MR",
  },
  {
    name: "Amanda Foster",
    role: "Academic Coordinator, Brighton School",
    content: "The CSV upload feature made migration so easy. We imported our entire faculty database and course catalog in minutes. Fantastic customer support too!",
    rating: 5,
    avatar: "AF",
  },
  {
    name: "Dr. James Park",
    role: "Vice Chancellor, Oakwood University",
    content: "Real-time notifications keep everyone informed. Faculty love seeing their schedules update instantly. It has significantly improved our communication.",
    rating: 5,
    avatar: "JP",
  },
  {
    name: "Linda Thompson",
    role: "Admin Manager, St. Mary&apos;s College",
    content: "We went from spreadsheet chaos to organized bliss. The interface is intuitive and our staff learned it quickly. Worth every penny of the subscription.",
    rating: 5,
    avatar: "LT",
  },
  {
    name: "Robert Kim",
    role: "IT Director, Pacific Institute",
    content: "The API access in the Campus plan let us integrate Nexorg with our existing student management system. Seamless data flow across platforms.",
    rating: 5,
    avatar: "RK",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
              Trusted by Educators Worldwide
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              See what academic leaders are saying about Nexorg.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

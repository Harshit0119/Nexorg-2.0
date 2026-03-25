"use client"

import { Building, Upload, Wand2, Share2 } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    step: 1,
    icon: Building,
    title: "Create Your Institute",
    description: "Sign up and set up your institute profile with departments, courses, and basic configuration.",
  },
  {
    step: 2,
    icon: Upload,
    title: "Upload Faculty & Resources",
    description: "Import your faculty list, rooms, and subjects via CSV or add them manually through our intuitive interface.",
  },
  {
    step: 3,
    icon: Wand2,
    title: "Generate Timetable",
    description: "Click generate and let our AI create a clash-free, optimized timetable considering all constraints.",
  },
  {
    step: 4,
    icon: Share2,
    title: "Publish & Manage",
    description: "Review, make adjustments if needed, and publish. Faculty and students get instant access to their schedules.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
              Get Started in Four Simple Steps
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              From setup to your first timetable in minutes, not hours.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-12 md:space-y-0">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Step number */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary text-2xl font-bold text-primary-foreground shadow-lg">
                    {step.step}
                  </div>

                  {/* Content */}
                  <div className={`ml-24 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className={`rounded-2xl border border-border bg-card p-6 shadow-sm ${index % 2 === 0 ? "md:ml-auto md:mr-8" : "md:ml-8"} max-w-md`}>
                      <div className={`flex items-center gap-3 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <step.icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className={`mt-3 text-sm text-muted-foreground leading-relaxed ${index % 2 === 0 ? "md:text-right" : ""}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Clock, Users, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Scheduling Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance"
          >
            Smart Timetable Scheduling for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Modern Institutes
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl text-pretty"
          >
            Automatically generate clash-free timetables in seconds. Save hours of manual work with our intelligent scheduling algorithm that manages faculty, rooms, and resources effortlessly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
              <Link href="#how-it-works">
                <Play className="mr-2 h-4 w-4" />
                View Demo
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-3xl font-bold text-foreground">
                <Clock className="h-6 w-6 text-primary" />
                90%
              </div>
              <p className="text-sm text-muted-foreground">Time Saved</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-3xl font-bold text-foreground">
                <CheckCircle className="h-6 w-6 text-accent" />
                0
              </div>
              <p className="text-sm text-muted-foreground">Schedule Clashes</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-3xl font-bold text-foreground">
                <Users className="h-6 w-6 text-primary" />
                500+
              </div>
              <p className="text-sm text-muted-foreground">Institutes</p>
            </div>
          </motion.div>
        </div>

        {/* Hero Image/Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 mx-auto max-w-5xl"
        >
          <div className="relative rounded-xl border border-border bg-card p-2 shadow-2xl shadow-primary/10">
            <div className="rounded-lg border border-border bg-muted/30 p-4 md:p-8">
              {/* Timetable Preview */}
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="grid grid-cols-6 text-sm">
                  <div className="border-b border-r border-border bg-muted/50 p-3 font-medium text-muted-foreground">
                    Time
                  </div>
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                    <div key={day} className="border-b border-border bg-muted/50 p-3 font-medium text-center text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  {/* Sample timetable rows */}
                  {[
                    { time: "9:00 AM", slots: ["Math 101", "Physics", "Chemistry", "Math 101", "Lab"] },
                    { time: "10:00 AM", slots: ["English", "Math 101", "Physics", "Chemistry", "English"] },
                    { time: "11:00 AM", slots: ["Break", "Break", "Break", "Break", "Break"] },
                  ].map((row, i) => (
                    <>
                      <div key={`time-${i}`} className="border-r border-b border-border p-3 text-xs text-muted-foreground">
                        {row.time}
                      </div>
                      {row.slots.map((slot, j) => (
                        <div
                          key={`slot-${i}-${j}`}
                          className={`border-b border-border p-3 text-xs text-center ${
                            slot === "Break" 
                              ? "bg-muted/30 text-muted-foreground" 
                              : slot === "Lab"
                              ? "bg-accent/10 text-accent font-medium"
                              : "bg-primary/10 text-primary font-medium"
                          }`}
                        >
                          {slot}
                        </div>
                      ))}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

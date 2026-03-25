"use client"

import { Clock, AlertCircle, Scale, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: Clock,
    title: "Save Hours of Manual Work",
    description: "What used to take days now takes minutes. Our intelligent algorithm handles all the complex calculations and constraint checking automatically.",
    stat: "10+ hours",
    statLabel: "saved weekly",
  },
  {
    icon: AlertCircle,
    title: "Eliminate Scheduling Conflicts",
    description: "No more double-booked rooms or faculty. Our system guarantees clash-free schedules with real-time validation.",
    stat: "100%",
    statLabel: "conflict-free",
  },
  {
    icon: Scale,
    title: "Scale with Your Institute",
    description: "Whether you have 10 or 1000 faculty members, Nexorg handles it all. Manage multiple departments and thousands of students effortlessly.",
    stat: "Unlimited",
    statLabel: "scalability",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
              Why Institutes Choose Nexorg
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Join hundreds of educational institutions that have transformed their scheduling process.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-8 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <benefit.icon className="h-7 w-7" />
              </div>
              <div className="mt-6">
                <div className="text-4xl font-bold text-primary">{benefit.stat}</div>
                <div className="text-sm text-muted-foreground">{benefit.statLabel}</div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button size="lg" asChild>
            <Link href="/auth/sign-up">
              Start Scheduling Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

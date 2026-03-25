"use client"

import { Check, Star } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const plans = [
  {
    name: "Essentials Monthly",
    description: "Perfect for small institutes",
    price: 8,
    period: "month",
    popular: false,
    features: [
      "Single admin account",
      "Up to 50 faculty members",
      "1 department",
      "Basic timetable generation",
      "CSV import/export",
      "Email support",
    ],
  },
  {
    name: "Essentials Yearly",
    description: "Save 18% with annual billing",
    price: 79,
    period: "year",
    popular: false,
    features: [
      "Single admin account",
      "Up to 50 faculty members",
      "1 department",
      "Basic timetable generation",
      "CSV import/export",
      "Email support",
      "2 months free",
    ],
  },
  {
    name: "Campus Monthly",
    description: "For growing institutions",
    price: 49,
    period: "month",
    popular: true,
    features: [
      "Unlimited admin accounts",
      "Unlimited faculty members",
      "Unlimited departments",
      "Advanced AI scheduling",
      "Real-time notifications",
      "Priority support",
      "Custom branding",
      "API access",
    ],
  },
  {
    name: "Campus Yearly",
    description: "Best value for large institutes",
    price: 499,
    period: "year",
    popular: false,
    features: [
      "Unlimited admin accounts",
      "Unlimited faculty members",
      "Unlimited departments",
      "Advanced AI scheduling",
      "Real-time notifications",
      "Priority support",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "2 months free",
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Choose the plan that fits your institute. No hidden fees, cancel anytime.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-6",
                plan.popular 
                  ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]" 
                  : "border-border"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    <Star className="h-3 w-3 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mt-6 text-center">
                <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="mt-6 w-full" 
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                {/* TODO: Implement Stripe checkout integration */}
                <Link href="/auth/sign-up">
                  Get Started
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Feature comparison note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

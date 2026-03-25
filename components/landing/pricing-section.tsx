"use client"

import { useState } from "react"
import { Check, Star, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import Link from "next/link"

const monthlyPlans = [
  {
    id: "essentials_monthly",
    name: "Essentials",
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
    id: "campus_monthly",
    name: "Campus",
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
]

const yearlyPlans = [
  {
    id: "essentials_yearly",
    name: "Essentials",
    description: "Save 18% with annual billing",
    price: 79,
    period: "year",
    popular: false,
    monthlyEquivalent: 6.58,
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
    id: "campus_yearly",
    name: "Campus",
    description: "Best value - Save 15%",
    price: 499,
    period: "year",
    popular: true,
    monthlyEquivalent: 41.58,
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

const featureComparison = [
  {
    category: "Admins & Users",
    features: [
      { name: "Number of admins", essentials: "1", campus: "Unlimited" },
      { name: "Faculty members", essentials: "Up to 50", campus: "Unlimited" },
    ],
  },
  {
    category: "Departments",
    features: [
      { name: "Departments support", essentials: "1", campus: "Unlimited" },
      { name: "Multi-department view", essentials: false, campus: true },
    ],
  },
  {
    category: "Scheduling",
    features: [
      { name: "Timetable generation", essentials: "Basic", campus: "Advanced AI" },
      { name: "Clash detection", essentials: true, campus: true },
      { name: "Auto-optimization", essentials: false, campus: true },
    ],
  },
  {
    category: "Data Management",
    features: [
      { name: "CSV upload", essentials: true, campus: true },
      { name: "Bulk import/export", essentials: true, campus: true },
      { name: "API access", essentials: false, campus: true },
    ],
  },
  {
    category: "Communication",
    features: [
      { name: "Email notifications", essentials: true, campus: true },
      { name: "Real-time notifications", essentials: false, campus: true },
      { name: "In-app messaging", essentials: false, campus: true },
    ],
  },
  {
    category: "Support",
    features: [
      { name: "Email support", essentials: true, campus: true },
      { name: "Priority support", essentials: false, campus: true },
      { name: "Dedicated account manager", essentials: false, campus: "Yearly only" },
    ],
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const plans = isYearly ? yearlyPlans : monthlyPlans

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

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <span className={cn(
              "text-sm font-medium transition-colors",
              !isYearly ? "text-foreground" : "text-muted-foreground"
            )}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={cn(
              "text-sm font-medium transition-colors",
              isYearly ? "text-foreground" : "text-muted-foreground"
            )}>
              Yearly
              <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                Save up to 18%
              </span>
            </span>
          </motion.div>
        </div>

        {/* Pricing cards */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <AnimatePresence mode="wait">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-card p-8",
                  plan.popular 
                    ? "border-primary shadow-xl shadow-primary/10" 
                    : "border-border"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-lg">
                      <Star className="h-4 w-4 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mt-8 text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-foreground">${plan.price}</span>
                    <span className="text-lg text-muted-foreground">/{plan.period}</span>
                  </div>
                  {isYearly && 'monthlyEquivalent' in plan && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      ${plan.monthlyEquivalent.toFixed(2)}/month billed annually
                    </p>
                  )}
                </div>

                <ul className="mt-8 flex-1 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={cn(
                    "mt-8 w-full h-12 text-base font-medium",
                    plan.popular && "shadow-lg"
                  )}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  asChild
                >
                  {/* TODO: Integrate Stripe checkout */}
                  <Link href="/auth/sign-up">
                    Subscribe Now
                  </Link>
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Feature comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-20 max-w-4xl"
        >
          <h3 className="text-center text-2xl font-bold mb-8">Feature Comparison</h3>
          
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {/* Table header */}
            <div className="grid grid-cols-3 border-b border-border bg-muted/30 p-4">
              <div className="font-medium text-foreground">Features</div>
              <div className="text-center font-medium text-foreground">Essentials</div>
              <div className="text-center font-medium text-primary">Campus</div>
            </div>

            {/* Table body */}
            {featureComparison.map((category, categoryIndex) => (
              <div key={category.category}>
                {/* Category header */}
                <div className="bg-muted/50 px-4 py-2 text-sm font-semibold text-foreground border-b border-border">
                  {category.category}
                </div>
                
                {/* Category features */}
                {category.features.map((feature, featureIndex) => (
                  <div 
                    key={feature.name}
                    className={cn(
                      "grid grid-cols-3 items-center px-4 py-3",
                      featureIndex !== category.features.length - 1 || categoryIndex !== featureComparison.length - 1
                        ? "border-b border-border"
                        : ""
                    )}
                  >
                    <div className="text-sm text-muted-foreground">{feature.name}</div>
                    <div className="text-center">
                      {typeof feature.essentials === "boolean" ? (
                        feature.essentials ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-muted-foreground">{feature.essentials}</span>
                      )}
                    </div>
                    <div className="text-center">
                      {typeof feature.campus === "boolean" ? (
                        feature.campus ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm font-medium text-primary">{feature.campus}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trial notice */}
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

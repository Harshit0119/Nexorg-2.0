"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CreditCard,
  Check,
  Star,
  AlertTriangle,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

// Mock current subscription - TODO: Fetch from Supabase
const currentSubscription = {
  plan: "essentials_monthly",
  planName: "Essentials Monthly",
  price: 8,
  period: "month",
  status: "active",
  currentPeriodEnd: "April 26, 2026",
  features: [
    "Single admin account",
    "Up to 50 faculty members",
    "1 department",
    "Basic timetable generation",
    "CSV import/export",
    "Email support",
  ],
}

const plans = [
  {
    id: "essentials_monthly",
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
    id: "essentials_yearly",
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
    id: "campus_monthly",
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
    id: "campus_yearly",
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

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleUpgrade = (planId: string) => {
    // TODO: Implement Stripe checkout
    console.log("Upgrading to plan:", planId)
    alert("Stripe checkout would open here (TODO: Implement Stripe integration)")
  }

  const handleManageBilling = () => {
    // TODO: Redirect to Stripe customer portal
    console.log("Opening billing portal")
    alert("Stripe customer portal would open here (TODO: Implement Stripe integration)")
  }

  const isCurrentPlan = (planId: string) => currentSubscription.plan === planId

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Subscription</h2>
        <p className="text-muted-foreground">
          Manage your subscription and billing
        </p>
      </div>

      {/* Current plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Your active subscription details
              </CardDescription>
            </div>
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${
              currentSubscription.status === "active"
                ? "bg-accent/10 text-accent"
                : "bg-destructive/10 text-destructive"
            }`}>
              {currentSubscription.status}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CreditCard className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{currentSubscription.planName}</h3>
                <p className="text-muted-foreground">
                  ${currentSubscription.price}/{currentSubscription.period}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={handleManageBilling}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Manage Billing
              </Button>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                Your subscription renews on <strong>{currentSubscription.currentPeriodEnd}</strong>
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3">Included Features</h4>
            <ul className="grid gap-2 sm:grid-cols-2">
              {currentSubscription.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade options */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Upgrade Your Plan</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative cursor-pointer transition-all",
                isCurrentPlan(plan.id)
                  ? "border-primary/50 bg-primary/5"
                  : selectedPlan === plan.id
                  ? "border-primary shadow-md"
                  : "hover:border-primary/30",
                plan.popular && !isCurrentPlan(plan.id) && "border-primary shadow-lg"
              )}
              onClick={() => !isCurrentPlan(plan.id) && setSelectedPlan(plan.id)}
            >
              {plan.popular && !isCurrentPlan(plan.id) && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    <Star className="h-3 w-3 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              {isCurrentPlan(plan.id) && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    Current Plan
                  </div>
                </div>
              )}

              <CardHeader className="pb-3">
                <CardTitle className="text-base">{plan.name}</CardTitle>
                <CardDescription className="text-xs">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>

                <ul className="space-y-2 mb-4">
                  {plan.features.slice(0, 5).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs">
                      <Check className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                  {plan.features.length > 5 && (
                    <li className="text-xs text-muted-foreground">
                      +{plan.features.length - 5} more features
                    </li>
                  )}
                </ul>

                {isCurrentPlan(plan.id) ? (
                  <Button className="w-full" variant="secondary" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUpgrade(plan.id)
                    }}
                  >
                    {plan.price > currentSubscription.price ? "Upgrade" : "Switch"}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Usage note */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">Need more capacity?</h4>
              <p className="text-sm text-muted-foreground">
                If you need custom limits or enterprise features, contact our sales team for a tailored solution.
              </p>
              <Button variant="link" className="px-0 h-auto mt-2">
                Contact Sales
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

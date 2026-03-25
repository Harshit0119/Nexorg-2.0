"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { 
  CreditCard,
  Check,
  Star,
  Calendar,
  Users,
  Building2,
  Clock,
  TrendingUp,
  ExternalLink,
  X,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

// Mock current subscription - TODO: Fetch from Supabase
const currentSubscription = {
  plan: "essentials_monthly",
  planName: "Essentials",
  planType: "monthly",
  price: 8,
  period: "month",
  status: "active",
  currentPeriodStart: "March 26, 2026",
  currentPeriodEnd: "April 26, 2026",
  daysRemaining: 31,
}

// Mock usage data - TODO: Fetch from Supabase
const usageData = {
  admins: { used: 1, limit: 1, label: "Admin accounts" },
  faculty: { used: 32, limit: 50, label: "Faculty members" },
  departments: { used: 1, limit: 1, label: "Departments" },
  timetables: { used: 8, limit: "Unlimited", label: "Timetables generated" },
}

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

export default function SubscriptionPage() {
  const [isYearly, setIsYearly] = useState(currentSubscription.planType === "yearly")
  const plans = isYearly ? yearlyPlans : monthlyPlans

  const handleUpgrade = (planId: string) => {
    // TODO: Implement Stripe checkout
    console.log("Upgrading to plan:", planId)
    alert("Stripe checkout integration coming soon!")
  }

  const handleManageBilling = () => {
    // TODO: Redirect to Stripe customer portal
    console.log("Opening billing portal")
    alert("Stripe customer portal integration coming soon!")
  }

  const handleCancelSubscription = () => {
    // TODO: Implement cancel subscription flow
    console.log("Cancelling subscription")
    alert("Cancel subscription flow coming soon!")
  }

  const isCurrentPlan = (planId: string) => currentSubscription.plan === planId

  const getUsagePercentage = (used: number, limit: number | string) => {
    if (typeof limit === "string") return 0
    return Math.min((used / limit) * 100, 100)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Subscription</h2>
        <p className="text-muted-foreground">
          Manage your subscription and billing
        </p>
      </div>

      {/* Current Plan Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Current Plan</CardTitle>
                <CardDescription>
                  Your active subscription details
                </CardDescription>
              </div>
              <span className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium",
                currentSubscription.status === "active"
                  ? "bg-accent/20 text-accent"
                  : "bg-destructive/20 text-destructive"
              )}>
                {currentSubscription.status.charAt(0).toUpperCase() + currentSubscription.status.slice(1)}
              </span>
            </div>
          </CardHeader>
        </div>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            {/* Plan info */}
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <CreditCard className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{currentSubscription.planName}</h3>
                <p className="text-lg text-muted-foreground">
                  <span className="text-3xl font-bold text-foreground">${currentSubscription.price}</span>
                  /{currentSubscription.period}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Billed {currentSubscription.planType}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={handleManageBilling}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Manage Billing
              </Button>
              <Button 
                variant="ghost" 
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleCancelSubscription}
              >
                Cancel Subscription
              </Button>
            </div>
          </div>

          {/* Billing cycle info */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border border-border p-4">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Current period</p>
                <p className="text-sm font-medium">{currentSubscription.currentPeriodStart}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border p-4">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Renews on</p>
                <p className="text-sm font-medium">{currentSubscription.currentPeriodEnd}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border p-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Days remaining</p>
                <p className="text-sm font-medium">{currentSubscription.daysRemaining} days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Card */}
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>Your current resource usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(usageData).map(([key, data]) => {
              const percentage = getUsagePercentage(data.used, data.limit)
              const isNearLimit = typeof data.limit === "number" && percentage >= 80
              const IconComponent = key === "admins" ? Users : key === "departments" ? Building2 : Users

              return (
                <div key={key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{data.label}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className={cn(
                        "text-2xl font-bold",
                        isNearLimit ? "text-destructive" : "text-foreground"
                      )}>
                        {data.used}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / {data.limit}
                      </span>
                    </div>
                    {typeof data.limit === "number" && (
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all",
                            isNearLimit ? "bg-destructive" : "bg-primary"
                          )}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    )}
                  </div>
                  {isNearLimit && (
                    <p className="flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      Approaching limit
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Options */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Available Plans</h3>
          
          {/* Billing toggle */}
          <div className="flex items-center gap-3">
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
                Save 18%
              </span>
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative transition-all",
                isCurrentPlan(plan.id)
                  ? "border-accent bg-accent/5"
                  : plan.popular
                  ? "border-primary shadow-lg"
                  : "hover:border-primary/50"
              )}
            >
              {plan.popular && !isCurrentPlan(plan.id) && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
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

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="mt-1">{plan.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  {isYearly && 'monthlyEquivalent' in plan && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      ${plan.monthlyEquivalent.toFixed(2)}/month billed annually
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {isCurrentPlan(plan.id) ? (
                  <Button className="w-full" variant="secondary" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    {plan.price > currentSubscription.price ? "Upgrade" : "Switch"} to {plan.name}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Feature comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Comparison</CardTitle>
          <CardDescription>See what each plan includes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Feature</th>
                  <th className="text-center py-3 px-4 font-medium">Essentials</th>
                  <th className="text-center py-3 px-4 font-medium text-primary">Campus</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 text-sm">Number of admins</td>
                  <td className="py-3 px-4 text-center text-sm text-muted-foreground">1</td>
                  <td className="py-3 px-4 text-center text-sm font-medium text-primary">Unlimited</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 text-sm">Departments support</td>
                  <td className="py-3 px-4 text-center text-sm text-muted-foreground">1</td>
                  <td className="py-3 px-4 text-center text-sm font-medium text-primary">Unlimited</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 text-sm">Timetable generation</td>
                  <td className="py-3 px-4 text-center text-sm text-muted-foreground">Basic</td>
                  <td className="py-3 px-4 text-center text-sm font-medium text-primary">Advanced AI</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 text-sm">CSV upload</td>
                  <td className="py-3 px-4 text-center"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 text-sm">Real-time notifications</td>
                  <td className="py-3 px-4 text-center"><X className="h-5 w-5 text-muted-foreground/40 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 text-sm">API access</td>
                  <td className="py-3 px-4 text-center"><X className="h-5 w-5 text-muted-foreground/40 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">Priority support</td>
                  <td className="py-3 px-4 text-center"><X className="h-5 w-5 text-muted-foreground/40 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Contact sales */}
      <Card className="bg-gradient-to-r from-primary/5 via-transparent to-accent/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-lg mb-1">Need a custom solution?</h4>
              <p className="text-sm text-muted-foreground">
                Contact our sales team for enterprise pricing and custom features.
              </p>
            </div>
            <Button variant="outline" className="border-primary/50 hover:bg-primary/5">
              Contact Sales
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

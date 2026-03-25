import { LandingHeader } from "@/components/landing/header"
import { PricingSection } from "@/components/landing/pricing-section"
import { LandingFooter } from "@/components/landing/footer"

export const metadata = {
  title: "Pricing - Nexorg",
  description: "Simple, transparent pricing for educational institutions of all sizes.",
}

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <PricingSection />
      </main>
      <LandingFooter />
    </div>
  )
}

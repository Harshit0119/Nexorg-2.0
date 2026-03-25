import { LandingHeader } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { LandingFooter } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <BenefitsSection />
        <PricingSection />
        <TestimonialsSection />
      </main>
      <LandingFooter />
    </div>
  )
}

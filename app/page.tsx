import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { DemoPreview } from "@/components/demo-preview"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <DemoPreview />
        <Features />
        <HowItWorks />
        <Pricing />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

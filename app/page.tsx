import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { RentToOwnHero } from "@/components/RentToOwnHero"
import { HowItWorks } from "@/components/HowItWorks"
import { CTASection } from "@/components/CTASection"
import { FAQSection } from "@/components/FAQSection"
import { Footer } from "@/components/Footer"

export default function Page() {
  return (
    <>
      <PortfolioNavbar />
      <RentToOwnHero />
      <HowItWorks />
      <CTASection />
      <FAQSection />
      <Footer />
    </>
  )
}

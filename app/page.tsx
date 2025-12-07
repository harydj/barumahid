import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { BankingScaleHero } from "@/components/BankingScaleHero"
import { ProductTeaserCard } from "@/components/ProductTeaserCard"
import { IntegrationCarousel } from "@/components/IntegrationCarousel"
import { PricingSection } from "@/components/PricingSection"
import { FAQSection } from "@/components/FAQSection"
import { Footer } from "@/components/Footer"

export default function Page() {
  return (
    <>
      <PortfolioNavbar />
      <BankingScaleHero />
      <ProductTeaserCard />
      <IntegrationCarousel />
      <PricingSection />
      <FAQSection />
      <Footer />
    </>
  )
}

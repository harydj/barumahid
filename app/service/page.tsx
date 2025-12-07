import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { Footer } from "@/components/Footer"
import { ServiceHero } from "@/components/ServiceHero"
import { ServiceShowcase } from "@/components/ServiceShowcase"
import { ServiceProcess } from "@/components/ServiceProcess"
import { ServiceComparison } from "@/components/ServiceComparison"

export default function ServicePage() {
  return (
    <>
      <PortfolioNavbar />
      <ServiceHero />
      <ServiceShowcase />
      <ServiceProcess />
      <ServiceComparison />
      <Footer />
    </>
  )
}

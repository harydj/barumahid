import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { Footer } from "@/components/Footer"
import { ContactHero } from "@/components/ContactHero"
import { ContactForm } from "@/components/ContactForm"

export default function ContactPage() {
  return (
    <>
      <PortfolioNavbar />
      <ContactHero />
      <ContactForm />
      <Footer />
    </>
  )
}

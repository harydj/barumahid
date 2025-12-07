import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { Footer } from "@/components/Footer"
import { ArticleHero } from "@/components/ArticleHero"
import { ArticleGrid } from "@/components/ArticleGrid"

export default function ArticlePage() {
  return (
    <>
      <PortfolioNavbar />
      <ArticleHero />
      <ArticleGrid />
      <Footer />
    </>
  )
}

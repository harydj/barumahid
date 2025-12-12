export interface PortfolioImage {
  url: string
  alt?: string
}

export interface Portfolio {
  id: string
  category: "mitrabarumahid-construction" | "mitrabarumahid-projectlink" | "kosannesia"
  images: PortfolioImage[]
}

export const portfolios: Portfolio[] = [
  {
    id: "construction-1",
    category: "mitrabarumahid-construction",
    images: [
      { url: "/images/portofolio/mitrabarumahid-construction/Picture4.jpg", alt: "Construction 4" },
      { url: "/images/portofolio/mitrabarumahid-construction/Picture5.jpg", alt: "Construction 5" },
      { url: "/images/portofolio/mitrabarumahid-construction/Picture6.jpg", alt: "Construction 6" },
      { url: "/images/portofolio/mitrabarumahid-construction/Picture7.jpg", alt: "Construction 7" },
      { url: "/images/portofolio/mitrabarumahid-construction/Picture8.jpg", alt: "Construction 8" },
      { url: "/images/portofolio/mitrabarumahid-construction/Picture9.jpg", alt: "Construction 9" },
      { url: "/images/portofolio/mitrabarumahid-construction/Picture10.jpg", alt: "Construction 10" },
      { url: "/images/portofolio/mitrabarumahid-construction/Picture11.jpg", alt: "Construction 11" },
      { url: "/images/portofolio/mitrabarumahid-construction/Picture12.jpg", alt: "Construction 12" },
    ],
  },
  {
    id: "projectlink-1",
    category: "mitrabarumahid-projectlink",
    images: [
      { url: "/images/portofolio/mitrabarumahid-projectlink/Picture1.jpg", alt: "Project Link 1" },
      { url: "/images/portofolio/mitrabarumahid-projectlink/Picture2.jpg", alt: "Project Link 2" },
    ],
  },
]

// Helper function untuk get portfolios by category
export function getPortfoliosByCategory(category: string): Portfolio[] {
  if (category === "all") {
    return portfolios
  }
  return portfolios.filter((p) => p.category === category)
}

// Helper function untuk get all images by category
export function getImagesByCategory(category: string): PortfolioImage[] {
  const filteredPortfolios = getPortfoliosByCategory(category)
  return filteredPortfolios.flatMap((p) => p.images)
}


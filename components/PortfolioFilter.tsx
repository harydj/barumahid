"use client"

interface PortfolioFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const categories = [
  { value: "all", label: "Semua" },
  { value: "mitrabarumahid-construction", label: "mitrabarumahID Construction" },
  { value: "mitrabarumahid-projectlink", label: "mitrabarumahID Project Link" },
  { value: "kosannesia", label: "Kosannesia" },
]

export const PortfolioFilter = ({ selectedCategory, onCategoryChange }: PortfolioFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category.value
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary"
          }`}
          style={{ fontFamily: "Figtree" }}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}


"use client"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

type PlanLevel = "starter" | "pro" | "enterprise"

interface PricingFeature {
  name: string
  included: PlanLevel | "all"
}

interface PricingPlan {
  name: string
  level: PlanLevel
  price: {
    monthly: number
    yearly: number
  }
  popular?: boolean
}

const features: PricingFeature[] = [
  { name: "Real-time conversation analysis", included: "starter" },
  { name: "Up to 10,000 messages/month", included: "starter" },
  { name: "Basic sentiment detection", included: "starter" },
  { name: "Email support", included: "starter" },
  { name: "Advanced emotional intelligence", included: "pro" },
  { name: "Up to 100,000 messages/month", included: "pro" },
  { name: "Multi-language support (50+ languages)", included: "pro" },
  { name: "Priority support", included: "pro" },
  { name: "Custom AI model training", included: "enterprise" },
  { name: "Unlimited messages", included: "enterprise" },
  { name: "Dedicated account manager", included: "enterprise" },
  { name: "24/7 phone support", included: "enterprise" },
  { name: "API access", included: "all" },
  { name: "Team collaboration tools", included: "all" },
]

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: { monthly: 29, yearly: 290 },
    level: "starter",
  },
  {
    name: "Pro",
    price: { monthly: 99, yearly: 990 },
    level: "pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 299, yearly: 2990 },
    level: "enterprise",
  },
]

function shouldShowCheck(included: PricingFeature["included"], level: PlanLevel): boolean {
  if (included === "all") return true
  if (included === "enterprise" && level === "enterprise") return true
  if (included === "pro" && (level === "pro" || level === "enterprise")) return true
  if (included === "starter") return true
  return false
}

export function PricingSection() {
  const packages = [
    {
      name: "Basic Package",
      desc: "Untuk proyek skala kecil hingga menengah",
      features: ["Architectural Drawings", "Basic Structural Design", "Cost Estimation", "Project Documentation"],
      popular: false,
      delay: 0,
    },
    {
      name: "Professional Package",
      desc: "Paket lengkap untuk proyek commercial",
      features: [
        "Complete Drawings (MEP)",
        "Advanced Structural Analysis",
        "3D Modeling",
        "Seismic Analysis",
        "Detailed Cost Breakdown",
        "Site Consultation",
      ],
      popular: true,
      delay: 0.1,
    },
    {
      name: "Enterprise Package",
      desc: "Solusi komprehensif untuk proyek besar",
      features: [
        "Full CAD & BIM Services",
        "Complete Engineering Analysis",
        "VR Walkthrough",
        "Video Animation",
        "Dedicated Account Manager",
        "Real-time Collaboration",
      ],
      popular: false,
      delay: 0.2,
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-figtree text-5xl font-bold leading-tight mb-4">Paket Layanan Kami</h2>
          <p className="font-figtree text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan proyek konstruksi Anda
          </p>
        </motion.div>

        {/* Billing Toggle */}
        {/* Removed billing toggle as it's not relevant to the new package structure */}

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: pkg.delay }}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                pkg.popular
                  ? "border-2 border-primary bg-white transform md:scale-105"
                  : "border border-gray-200 bg-white"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Paling Populer
                </div>
              )}
              <h3 className="font-figtree text-2xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-muted-foreground text-sm mb-6">{pkg.desc}</p>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  pkg.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-primary text-primary hover:bg-primary/5"
                }`}
              >
                Lihat Detail
              </button>
            </motion.div>
          ))}
        </div>

        {/* Features Table */}
        {/* Removed features table as it's not relevant to the new package structure */}

        {/* CTA Button */}
        {/* Removed CTA button as it's not relevant to the new package structure */}
      </div>
    </section>
  )
}

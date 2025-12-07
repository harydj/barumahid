"use client"
import { Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"

type FooterLink = {
  label: string
  href: string
}

type FooterSection = {
  title: string
  links: FooterLink[]
}

const defaultSections: FooterSection[] = [
  {
    title: "Services",
    links: [
      { label: "Construction Drawing", href: "#services" },
      { label: "Structural Design", href: "#services" },
      { label: "3D Modeling", href: "#services" },
      { label: "Cost Estimation", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Articles", href: "#article" },
      { label: "Contact", href: "#contact" },
      { label: "Careers", href: "#careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Documentation", href: "#docs" },
      { label: "FAQ", href: "#faq" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Terms", href: "#terms" },
    ],
  },
]

export const Footer = ({
  companyName = "barumahID",
  tagline = "Platform Digitalisasi Inovatif Konstruksi",
  sections = defaultSections,
  socialLinks = {
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: undefined,
    email: "hello@barumahid.com",
  },
}: {
  companyName?: string
  tagline?: string
  sections?: FooterSection[]
  socialLinks?: any
}) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-foreground text-background border-t border-border">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="col-span-2"
          >
            <div className="mb-6">
              <h3
                className="text-2xl font-bold text-background mb-2"
                style={{ fontFamily: "Figtree", fontWeight: "700" }}
              >
                {companyName}
              </h3>
              <p className="text-sm leading-5 text-background/70 max-w-xs" style={{ fontFamily: "Figtree" }}>
                {tagline}
              </p>
            </div>

            <div className="space-y-3 mb-6 text-sm text-background/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+62-XXX-XXXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${socialLinks?.email}`} className="hover:text-background transition-colors">
                  {socialLinks?.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks?.twitter && (
                <a
                  href={socialLinks.twitter}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors duration-150"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors duration-150"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socialLinks?.email && (
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors duration-150"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>

          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="col-span-1"
            >
              <h4
                className="text-sm font-semibold text-background mb-4 uppercase tracking-wide"
                style={{ fontFamily: "Figtree" }}
              >
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors duration-150"
                      style={{ fontFamily: "Figtree" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t border-background/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/70" style={{ fontFamily: "Figtree" }}>
              © {currentYear} {companyName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#privacy"
                className="text-sm text-background/70 hover:text-background transition-colors duration-150"
                style={{ fontFamily: "Figtree" }}
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-sm text-background/70 hover:text-background transition-colors duration-150"
                style={{ fontFamily: "Figtree" }}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

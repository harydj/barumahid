"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"

type FAQItem = {
  id: string
  question: string
  answer: string
  category?: string | null
  order: number
}

export const FAQSection = ({
  title = "Pertanyaan yang Sering Diajukan",
}: { title?: string }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const res = await fetch('/api/content/faq')
        const data = await res.json()
        if (Array.isArray(data)) {
          setFaqs(data)
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFAQs()
  }, [])

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2
              className="text-5xl font-bold text-foreground tracking-tight sticky top-24"
              style={{
                fontFamily: "Figtree",
                fontWeight: "700",
              }}
            >
              {title}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-0">
              {isLoading ? (
                <div className="text-center text-gray-500 py-8">Loading FAQs...</div>
              ) : faqs.length > 0 ? (
                faqs.map((faq, index) => (
                  <div key={faq.id} className="border-b border-border last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between py-6 text-left group hover:opacity-70 transition-opacity duration-150"
                    aria-expanded={openIndex === index}
                  >
                    <span
                      className="text-lg leading-7 text-foreground pr-8 font-medium"
                      style={{
                        fontFamily: "Figtree",
                      }}
                    >
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{
                        rotate: openIndex === index ? 45 : 0,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="flex-shrink-0"
                    >
                      <Plus className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-12">
                          <p
                            className="text-lg leading-6 text-foreground/70"
                            style={{
                              fontFamily: "Figtree",
                            }}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
              ) : (
                <div className="text-center text-gray-500 py-8">No FAQs available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

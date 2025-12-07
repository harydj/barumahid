"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

type StatItem = {
  value: string
  description: string
  delay: number
}

const stats: StatItem[] = [
  {
    value: "6+",
    description: "Tahun\nberoperasi",
    delay: 0,
  },
  {
    value: "500+",
    description: "Proyek\nselesai",
    delay: 0.2,
  },
  {
    value: "50+",
    description: "Tim\nprofesional",
    delay: 0.4,
  },
  {
    value: "9",
    description: "Keunggulan\nutama",
    delay: 0.6,
  },
]

// Seeded random number generator untuk konsistensi SSR/CSR
class SeededRandom {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }
}

const generateDataPoints = (): any[] => {
  const points: any[] = []
  const baseLeft = 1
  const spacing = 32
  // Gunakan seed tetap untuk konsistensi antara server dan client
  const rng = new SeededRandom(12345)
  
  for (let i = 0; i < 50; i++) {
    const direction = i % 2 === 0 ? "down" : "up"
    const height = Math.floor(rng.next() * 120) + 88
    const top = direction === "down" ? rng.next() * 150 + 250 : rng.next() * 100 - 80
    points.push({
      id: i,
      left: baseLeft + i * spacing,
      top,
      height,
      direction,
      delay: i * 0.035,
    })
  }
  return points
}

export const BankingScaleHero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [dataPoints] = useState<any[]>(generateDataPoints())
  const [typingComplete, setTypingComplete] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => setTypingComplete(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-8 py-24 pt-32">
        <div className="grid grid-cols-12 gap-5 gap-y-16">
          <div className="col-span-12 md:col-span-6 relative z-10">
            <div
              className="relative h-6 inline-flex items-center font-mono uppercase text-xs text-primary mb-12 px-2"
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', ui-monospace, monospace",
              }}
            >
              <div className="flex items-center gap-0.5 overflow-hidden">
                <motion.span
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "auto",
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="block whitespace-nowrap overflow-hidden text-primary relative z-10"
                >
                  Professional Construction Solutions
                </motion.span>
                <motion.span
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: typingComplete ? [1, 0, 1, 0] : 0,
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="block w-1.5 h-3 bg-primary ml-0.5 relative z-10 rounded-sm"
                />
              </div>
            </div>

            <h2
              className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground mb-6"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              Your Project,{" "}
              <span
                className="text-primary"
                style={{
                  fontWeight: "700",
                }}
              >
                Made Easy
              </span>
            </h2>

            <p
              className="text-lg leading-7 text-foreground/70 mt-0 mb-8"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
                fontWeight: "400",
              }}
            >
              Digitalisasi konstruksi inovatif yang menyediakan layanan complete construction solutions. Dari
              construction drawing, structural design, hingga 3D modeling dengan teknologi LBAG (Lean, BIM, AI, Green
              Construction).
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary text-primary-foreground px-7 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg text-center flex items-center justify-center gap-2 group">
                <span>Konsultasi Sekarang</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
              </button>
              <button className="border-2 border-primary text-primary px-7 py-3.5 rounded-lg font-semibold hover:bg-primary/5 transition-all duration-200">
                Lihat Layanan
              </button>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="relative w-full h-[416px] -ml-[200px]">
              <div className="absolute top-0 left-[302px] w-[680px] h-[416px] pointer-events-none">
                <div className="relative w-full h-full">
                  {dataPoints.map((point) => (
                    <motion.div
                      key={point.id}
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={
                        isVisible
                          ? {
                              opacity: [0, 1, 1],
                              height: [0, point.height, point.height],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        delay: point.delay,
                        ease: [0.5, 0, 0.01, 1],
                      }}
                      className="absolute w-1.5 rounded-[3px]"
                      style={{
                        left: `${point.left}px`,
                        top: `${point.top}px`,
                        background:
                          point.direction === "down"
                            ? "linear-gradient(rgb(91, 140, 165) 0%, rgb(91, 140, 165) 10%, rgba(73, 120, 160, 0.1) 40%, rgba(73, 120, 160, 0) 75%)"
                            : "linear-gradient(to top, rgb(91, 140, 165) 0%, rgb(91, 140, 165) 10%, rgba(73, 120, 160, 0.1) 40%, rgba(73, 120, 160, 0) 75%)",
                        backgroundColor: "rgba(73, 120, 160, 0.01)",
                      }}
                    >
                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={
                          isVisible
                            ? {
                                opacity: [0, 1],
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.3,
                          delay: point.delay + 1.7,
                        }}
                        className="absolute -left-[1px] w-2 h-2 bg-primary rounded-full"
                        style={{
                          top: point.direction === "down" ? "0px" : `${point.height - 8}px`,
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12">
            <div className="overflow-visible pb-5">
              <div className="grid grid-cols-12 gap-5 relative z-10">
                {stats.map((stat, index) => (
                  <div key={index} className="col-span-6 md:col-span-3">
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                        filter: "blur(4px)",
                      }}
                      animate={
                        isVisible
                          ? {
                              opacity: [0, 1, 1],
                              y: [20, 0, 0],
                              filter: ["blur(4px)", "blur(0px)", "blur(0px)"],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        delay: stat.delay,
                        ease: [0.1, 0, 0.1, 1],
                      }}
                      className="flex flex-col gap-2"
                    >
                      <span className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-primary">
                        {stat.value}
                      </span>
                      <p className="text-sm leading-5 text-foreground/60 m-0 whitespace-pre-line font-medium">
                        {stat.description}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

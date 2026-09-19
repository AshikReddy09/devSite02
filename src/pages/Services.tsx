import { useState, useEffect, useRef } from "react"

type Page = "home" | "about" | "services" | "industries" | "contact"

interface ServicesProps {
  onNavigate: (page: Page) => void
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Scroll reveal                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.08 },
    )

    obs.observe(el)

    return () => obs.disconnect()
  }, [])

  return { ref, visible }
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Data                                                                        */
/* ─────────────────────────────────────────────────────────────────────────── */

const serviceCategories = [
  {
    id: "consulting",
    number: "01",
    icon: "◈",
    title: "Piping Engineering",
    shortTitle: "Piping",
    tagline: "Practical engineering for complex projects.",
    image: "photo-1454165804606-c3d57bc86b40",
    color: "#8CBF3F",
    challenge:
      "Complex EPC and industrial projects require coordinated, practical engineering from concept through execution.",
    outcome:
      "Accurate engineering deliverables, coordinated design decisions, and dependable support aligned with project requirements.",
    capabilities: [
      "Piping layout and 3D modelling",
      "Piping support arrangement drawings",
      "Support detailing and validation",
      "Isometric preparation",
      "SP PID preparation",
      "3D laser scan model conversion and clash studies",
    ],
  },
  {
    id: "engineering",
    number: "02",
    icon: "⬡",
    title: "Piping Stress Analysis",
    shortTitle: "Stress",
    tagline: "Deep technical expertise, independent advice.",
    image: "photo-1581094271901-8022df4466f9",
    color: "#5E9BB2",
    challenge:
      "Piping systems must remain safe and reliable under operating, occasional, thermal, and dynamic loading conditions.",
    outcome:
      "Technically robust piping systems with verified flexibility, support adequacy, and compliance with project requirements.",
    capabilities: [
      "Piping stress analysis for storage tanks and pipelines",
      "Flexibility and support assessment",
      "Buried piping systems",
      "Surge and slug analysis",
      "FRP and GRE systems",
      "Expansion joint assessment",
    ],
  },
  {
    id: "ppm",
    number: "03",
    icon: "⬢",
    title: "Structural Analysis & FEA",
    shortTitle: "Structural",
    tagline: "Delivering complex projects with precision.",
    image: "photo-1504307651254-35680f356dfd",
    color: "#6FA8BC",
    challenge:
      "Structural and finite element analysis help confirm that engineering designs remain safe, stable, and fit for service.",
    outcome:
      "Validated structural solutions supported by disciplined modelling, analysis, and technical reporting.",
    capabilities: [
      "SACS and STAAD Pro analysis",
      "Finite element analysis",
      "Structural assessment",
      "Blast, onsite, and transportation conditions",
      "Support and steel design review",
      "Technical documentation",
    ],
  },
  {
    id: "transition",
    number: "04",
    icon: "◇",
    title: "Specialized Engineering Studies",
    shortTitle: "Specialized",
    tagline: "Focused analysis for demanding requirements.",
    image: "photo-1509391366360-2e959784a276",
    color: "#8CBF3F",
    challenge:
      "Specialized engineering questions require focused studies, the right tools, and clear interpretation of results.",
    outcome:
      "Clear technical insight that helps project teams resolve risk, improve design decisions, and move execution forward.",
    capabilities: [
      "USFOS studies",
      "CFD studies",
      "3D scan model conversion",
      "Clash detection",
      "Engineering calculations",
      "Technical support and manpower supply",
    ],
  },
  {
    id: "digital",
    number: "05",
    icon: "◉",
    title: "Technical Engineering Support",
    shortTitle: "Support",
    tagline: "Dependable support for project execution.",
    image: "photo-1518770660439-4636190af475",
    color: "#B3D979",
    challenge:
      "Project teams need dependable engineering resources who understand deliverables, coordination, and execution pressure.",
    outcome:
      "Flexible engineering support that strengthens delivery quality, coordination, and project responsiveness.",
    capabilities: [
      "Multidisciplinary engineering support",
      "Project-based engineering resources",
      "Technical documentation",
      "Design coordination",
      "Engineering review",
      "Manpower supply",
    ],
  },
]

const process = [
  {
    step: "01",
    title: "Understand",
    desc: "Deep immersion in your challenge, context, and constraints.",
  },
  {
    step: "02",
    title: "Strategize",
    desc: "Develop options, evaluate trade-offs, and align on the path forward.",
  },
  {
    step: "03",
    title: "Engineer",
    desc: "Apply technical rigor and sector expertise to design the solution.",
  },
  {
    step: "04",
    title: "Deliver",
    desc: "Execute with discipline, transparency, and clear accountability.",
  },
  {
    step: "05",
    title: "Optimize",
    desc: "Measure outcomes, learn, and continuously improve.",
  },
]

/* ─────────────────────────────────────────────────────────────────────────── */
/* Component                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function Services({ onNavigate }: ServicesProps) {
  const [activeService, setActiveService] = useState<string | null>(null)

  const handleNav = (page: Page) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToService = (id: string) => {
    setActiveService(id)

    document.getElementById(`service-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        background: "#071E29",
        color: "#F2F2F2",
        overflow: "hidden",
      }}
    >
      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* HERO                                                                  */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="service-hero relative min-h-[640px] flex items-center overflow-hidden engineering-grid"
        style={{
          background:
            "radial-gradient(circle at 78% 35%, rgba(140,191,63,0.10), transparent 30%), linear-gradient(135deg, #061A24 0%, #084259 58%, #062B39 100%)",
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=2000&h=1200&fit=crop&auto=format)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
            mixBlendMode: "screen",
          }}
        />

        {/* Dark gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #061A24 0%, rgba(6,26,36,0.96) 38%, rgba(8,66,89,0.72) 72%, rgba(8,66,89,0.45) 100%)",
          }}
        />

        {/* Technical grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(140,191,63,0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(140,191,63,0.055) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.25))",
          }}
        />

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            top: "34%",
            background:
              "linear-gradient(90deg, transparent, rgba(140,191,63,0.6), transparent)",
            boxShadow: "0 0 20px rgba(140,191,63,0.25)",
            animation: "serviceScan 7s ease-in-out infinite",
          }}
        />

        {/* Decorative engineering rings */}
        <div
          className="absolute right-[-120px] top-[80px] w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            border: "1px solid rgba(140,191,63,0.14)",
            boxShadow:
              "0 0 0 55px rgba(140,191,63,0.025), 0 0 0 110px rgba(140,191,63,0.018)",
          }}
        />

        <div
          className="absolute right-[110px] top-[295px] w-3 h-3 rounded-full"
          style={{
            background: "#8CBF3F",
            boxShadow: "0 0 25px rgba(140,191,63,0.8)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
            <Reveal>
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-7">
                  <span
                    style={{
                      width: 42,
                      height: 1,
                      background: "#8CBF3F",
                      display: "inline-block",
                    }}
                  />

                  <span
                    className="text-xs font-semibold tracking-[0.25em] uppercase"
                    style={{ color: "#8CBF3F" }}
                  >
                    Engineering Services
                  </span>
                </div>

                <h1
                  className="mb-8"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.65rem, 12vw, 6.5rem)",
                    lineHeight: 0.98,
                    letterSpacing: "-0.035em",
                    color: "#F2F2F2",
                  }}
                >
                  Engineering
                  <br />
                  <span style={{ color: "#8CBF3F" }}>that moves</span>
                  <br />
                  projects forward.
                </h1>

                <p
                  className="text-base lg:text-lg leading-relaxed max-w-2xl"
                  style={{ color: "rgba(242,242,242,0.72)" }}
                >
                  Five focused engineering practices supporting complex
                  industrial projects — from piping and structural analysis to
                  specialized studies and technical execution support.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10">
                  <button
                    onClick={() => scrollToService("consulting")}
                    className="w-full sm:w-auto px-7 py-3.5 font-semibold text-sm transition-all duration-300"
                    style={{
                      background: "#8CBF3F",
                      color: "#071E29",
                      boxShadow: "0 12px 30px rgba(140,191,63,0.15)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)"
                      e.currentTarget.style.boxShadow =
                        "0 16px 35px rgba(140,191,63,0.25)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow =
                        "0 12px 30px rgba(140,191,63,0.15)"
                    }}
                  >
                    Explore Services ↓
                  </button>

                  <button
                    onClick={() => handleNav("contact")}
                    className="w-full sm:w-auto px-7 py-3.5 font-semibold text-sm transition-all duration-300"
                    style={{
                      border: "1px solid rgba(242,242,242,0.2)",
                      color: "#F2F2F2",
                      background: "rgba(255,255,255,0.025)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(140,191,63,0.55)"
                      e.currentTarget.style.color = "#8CBF3F"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(242,242,242,0.2)"
                      e.currentTarget.style.color = "#F2F2F2"
                    }}
                  >
                    Discuss a Project →
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Hero technical panel */}
            <Reveal delay={180}>
              <div
                className="relative hidden lg:block"
                style={{
                  minHeight: 430,
                }}
              >
                <div
                  className="absolute inset-8"
                  style={{
                    border: "1px solid rgba(140,191,63,0.18)",
                    background: "rgba(3,24,33,0.38)",
                    backdropFilter: "blur(8px)",
                  }}
                />

                <div
                  className="absolute top-20 right-20 px-4 py-2 text-[10px] tracking-[0.2em] uppercase"
                  style={{
                    background: "#8CBF3F",
                    color: "#071E29",
                    fontWeight: 700,
                  }}
                >
                  Technical Capability Matrix
                </div>

                <div className="absolute inset-16 flex flex-col justify-center pt-10">
                  <div
                    className="text-[10px] tracking-[0.25em] uppercase mb-8"
                    style={{ color: "rgba(242,242,242,0.45)" }}
                  >
                    MC / RAM ENGINEERING
                  </div>

                  {serviceCategories.map((service, index) => (
                    <button
                      key={service.id}
                      onClick={() => scrollToService(service.id)}
                      className="group flex items-center gap-4 py-3 text-left transition-all duration-300"
                      style={{
                        borderBottom:
                          index === serviceCategories.length - 1
                            ? "none"
                            : "1px solid rgba(242,242,242,0.07)",
                      }}
                    >
                      <span
                        className="text-xs font-mono"
                        style={{
                          color:
                            activeService === service.id
                              ? "#8CBF3F"
                              : "rgba(242,242,242,0.3)",
                        }}
                      >
                        {service.number}
                      </span>

                      <span
                        className="text-sm font-medium transition-colors duration-300"
                        style={{
                          color:
                            activeService === service.id
                              ? "#F2F2F2"
                              : "rgba(242,242,242,0.65)",
                        }}
                      >
                        {service.title}
                      </span>

                      <span
                        className="ml-auto transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: "#8CBF3F" }}
                      >
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom metadata */}
        <div
          className="service-hero-meta absolute bottom-0 left-0 right-0 z-10"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(3,24,33,0.35)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                ["05", "Core Practices"],
                ["06+", "Technical Capabilities"],
                ["3D", "Digital Engineering"],
                ["24h", "Response Commitment"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className="py-5 px-5"
                  style={{
                    borderLeft:
                      index === 0 ? "none" : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="font-mono text-lg font-semibold"
                    style={{ color: "#8CBF3F" }}
                  >
                    {value}
                  </div>
                  <div
                    className="text-[10px] tracking-[0.16em] uppercase mt-1"
                    style={{ color: "rgba(242,242,242,0.45)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* SERVICE NAVIGATION                                                     */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="sticky top-0 z-30 py-2.5 sm:py-3"
        style={{
          background: "rgba(5,29,40,0.94)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-0.5">
            {serviceCategories.map((service) => {
              const active = activeService === service.id

              return (
                <button
                  key={service.id}
                  onClick={() => scrollToService(service.id)}
                  className="flex-shrink-0 snap-start px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap"
                  style={{
                    border: `1px solid ${
                      active ? service.color : "rgba(255,255,255,0.09)"
                    }`,
                    color: active ? service.color : "rgba(242,242,242,0.58)",
                    background: active ? `${service.color}10` : "transparent",
                  }}
                >
                  <span
                    className="font-mono mr-2"
                    style={{
                      opacity: active ? 1 : 0.45,
                    }}
                  >
                    {service.number}
                  </span>
                  {service.shortTitle}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* INTRO                                                                  */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="py-24 lg:py-32"
        style={{
          background: "linear-gradient(180deg, #071E29 0%, #082936 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-24 items-start">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    style={{
                      width: 32,
                      height: 1,
                      background: "#8CBF3F",
                    }}
                  />
                  <span
                    className="text-xs tracking-[0.22em] uppercase font-semibold"
                    style={{ color: "#8CBF3F" }}
                  >
                    What We Do
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2rem, 4vw, 3.6rem)",
                    lineHeight: 1.05,
                    color: "#F2F2F2",
                  }}
                >
                  Technical depth.
                  <br />
                  <span style={{ color: "#8CBF3F" }}>Practical delivery.</span>
                </h2>
              </div>

              <div>
                <p
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: "rgba(242,242,242,0.72)" }}
                >
                  Our services are structured around the technical realities of
                  industrial and engineering projects. Each practice is designed
                  to connect analysis, design, coordination, and execution.
                </p>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(242,242,242,0.45)" }}
                >
                  Rather than treating engineering disciplines in isolation, we
                  focus on how individual technical decisions affect the wider
                  project — helping teams identify constraints early, resolve
                  complex engineering questions, and deliver with greater
                  confidence.
                </p>

                <div
                  className="mt-10 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(140,191,63,0.5), transparent)",
                  }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* SERVICE SECTIONS                                                       */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      {serviceCategories.map((service, index) => (
        <section
          key={service.id}
          id={`service-${service.id}`}
          className="relative scroll-mt-28 lg:scroll-mt-20"
          style={{
            background: index % 2 === 0 ? "#071E29" : "#082936",
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 hidden lg:block"
            style={{
              width: "3px",
              background: `linear-gradient(to bottom, transparent, ${service.color}, transparent)`,
              opacity: 0.6,
            }}
          />

          <div className="max-w-7xl mx-auto">
            <div
              className="grid min-w-0 grid-cols-1 lg:grid-cols-2 lg:min-h-[680px]"
              style={{
                minHeight: undefined,
              }}
            >
              {/* Image */}
              <div
                className={`relative min-h-[280px] sm:min-h-[320px] lg:min-h-0 overflow-hidden${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <img
                  src={`https://images.unsplash.com/${service.image}?w=1100&h=900&fit=crop&auto=format`}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] hover:scale-105"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      index % 2 === 0
                        ? "linear-gradient(90deg, rgba(7,30,41,0.08), rgba(7,30,41,0.88))"
                        : "linear-gradient(270deg, rgba(7,30,41,0.08), rgba(7,30,41,0.88))",
                  }}
                />

                {/* Image technical frame */}
                <div
                  className="absolute inset-8 lg:inset-12"
                  style={{
                    border: `1px solid ${service.color}45`,
                  }}
                />

                {/* Number */}
                <div
                  className="absolute top-12 left-12 lg:top-16 lg:left-16 font-mono text-7xl lg:text-8xl font-light"
                  style={{
                    color: "rgba(242,242,242,0.13)",
                    lineHeight: 1,
                  }}
                >
                  {service.number}
                </div>

                {/* Label */}
                <div
                  className="absolute bottom-12 left-12 lg:bottom-16 lg:left-16 px-4 py-2"
                  style={{
                    background: service.color,
                    color: "#071E29",
                  }}
                >
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase">
                    {service.shortTitle}
                  </span>
                </div>

                {/* Corner markers */}
                <span
                  className="absolute top-8 left-8 w-5 h-5"
                  style={{
                    borderTop: `1px solid ${service.color}`,
                    borderLeft: `1px solid ${service.color}`,
                  }}
                />

                <span
                  className="absolute bottom-8 right-8 w-5 h-5"
                  style={{
                    borderBottom: `1px solid ${service.color}`,
                    borderRight: `1px solid ${service.color}`,
                  }}
                />
              </div>

              {/* Content */}
              <Reveal
                delay={120}
                className={`flex flex-col justify-center px-5 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16 xl:px-20 ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div>
                  {/* Eyebrow */}
                  <div className="flex items-center gap-4 mb-7">
                    <span
                      className="font-mono text-xs"
                      style={{ color: service.color }}
                    >
                      {service.number}
                    </span>

                    <span
                      style={{
                        width: 40,
                        height: 1,
                        background: `${service.color}70`,
                      }}
                    />

                    <span
                      className="text-[10px] font-semibold tracking-[0.22em] uppercase"
                      style={{ color: "rgba(242,242,242,0.4)" }}
                    >
                      Engineering Practice
                    </span>
                  </div>

                  <div
                    className="w-12 h-12 flex items-center justify-center mb-7 text-xl"
                    style={{
                      color: service.color,
                      border: `1px solid ${service.color}45`,
                      background: `${service.color}08`,
                    }}
                  >
                    {service.icon}
                  </div>

                  <h2
                    className="mb-4"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(2rem, 4vw, 3.25rem)",
                      lineHeight: 1.05,
                      color: "#F2F2F2",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {service.title}
                  </h2>

                  <p
                    className="text-base mb-10"
                    style={{
                      color: service.color,
                      maxWidth: 480,
                    }}
                  >
                    {service.tagline}
                  </p>

                  {/* Challenge / Outcome */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: service.color }}
                        />
                        <span
                          className="text-[10px] tracking-[0.18em] uppercase font-bold"
                          style={{ color: "rgba(242,242,242,0.42)" }}
                        >
                          Challenge
                        </span>
                      </div>

                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(242,242,242,0.64)" }}
                      >
                        {service.challenge}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: service.color }}
                        />
                        <span
                          className="text-[10px] tracking-[0.18em] uppercase font-bold"
                          style={{ color: "rgba(242,242,242,0.42)" }}
                        >
                          Outcome
                        </span>
                      </div>

                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(242,242,242,0.64)" }}
                      >
                        {service.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="h-px mb-8"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(242,242,242,0.12), transparent)",
                    }}
                  />

                  {/* Capabilities */}
                  <div>
                    <div
                      className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
                      style={{ color: "rgba(242,242,242,0.4)" }}
                    >
                      Key Capabilities
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {service.capabilities.map((capability) => (
                        <div
                          key={capability}
                          className="px-3 py-2 text-xs transition-all duration-200"
                          style={{
                            border: "1px solid rgba(242,242,242,0.09)",
                            background: "rgba(255,255,255,0.025)",
                            color: "rgba(242,242,242,0.68)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = `${service.color}60`
                            e.currentTarget.style.color = "#F2F2F2"
                            e.currentTarget.style.background = `${service.color}09`
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor =
                              "rgba(242,242,242,0.09)"
                            e.currentTarget.style.color =
                              "rgba(242,242,242,0.68)"
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.025)"
                          }}
                        >
                          {capability}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleNav("contact")}
                    className="mt-10 self-start inline-flex items-center gap-3 text-sm font-semibold transition-all duration-300"
                    style={{
                      color: service.color,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.gap = "18px"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.gap = "12px"
                    }}
                  >
                    Discuss this capability
                    <span>→</span>
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* PROCESS                                                                */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="relative py-20 sm:py-24 lg:py-36 engineering-grid overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at center, rgba(140,191,63,0.07), transparent 35%), #061A24",
        }}
      >
        {/* Background rings */}
        <div
          className="absolute left-1/2 top-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(140,191,63,0.06)",
            boxShadow:
              "0 0 0 80px rgba(140,191,63,0.02), 0 0 0 160px rgba(140,191,63,0.012)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl mb-12 sm:mb-16 lg:mb-20">
              <div className="flex items-center gap-3 mb-5">
                <span
                  style={{
                    width: 34,
                    height: 1,
                    background: "#8CBF3F",
                  }}
                />

                <span
                  className="text-xs font-semibold tracking-[0.22em] uppercase"
                  style={{ color: "#8CBF3F" }}
                >
                  How We Work
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                  lineHeight: 1,
                  color: "#F2F2F2",
                }}
              >
                From challenge
                <br />
                <span style={{ color: "#8CBF3F" }}>to engineered outcome.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative">
              {/* Connector */}
              <div
                className="absolute top-9 left-[8%] right-[8%] hidden lg:block h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(140,191,63,0.35), transparent)",
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
                {process.map((item, index) => (
                  <div key={item.step} className="relative group">
                    <div className="flex lg:block items-start gap-5">
                      <div
                        className="relative flex-shrink-0 w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105"
                        style={{
                          background: "#061A24",
                          border: `1px solid ${
                            index === 2 ? "#8CBF3F" : "rgba(140,191,63,0.35)"
                          }`,
                          boxShadow:
                            index === 2
                              ? "0 0 35px rgba(140,191,63,0.13)"
                              : "none",
                        }}
                      >
                        <span
                          className="font-mono text-[10px] mb-1"
                          style={{ color: "#8CBF3F" }}
                        >
                          {item.step}
                        </span>

                        <span
                          className="text-[11px] font-bold"
                          style={{ color: "#F2F2F2" }}
                        >
                          {item.title}
                        </span>
                      </div>

                      <div className="lg:mt-7">
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "rgba(242,242,242,0.48)" }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* CAPABILITY MATRIX                                                      */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="py-20 sm:py-24 lg:py-32"
        style={{
          background: "#082936",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    style={{
                      width: 32,
                      height: 1,
                      background: "#8CBF3F",
                    }}
                  />

                  <span
                    className="text-xs tracking-[0.22em] uppercase font-semibold"
                    style={{ color: "#8CBF3F" }}
                  >
                    Integrated Capability
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
                    lineHeight: 1.05,
                    color: "#F2F2F2",
                  }}
                >
                  One engineering
                  <br />
                  <span style={{ color: "#8CBF3F" }}>partner. Multiple</span>
                  <br />
                  disciplines.
                </h2>

                <p
                  className="mt-7 text-sm leading-relaxed max-w-md"
                  style={{ color: "rgba(242,242,242,0.5)" }}
                >
                  Our practices can operate independently or as part of a
                  coordinated engineering scope, depending on project needs.
                </p>
              </div>

              <div>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.09)",
                    borderLeft: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  {serviceCategories.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => scrollToService(service.id)}
                      className="group text-left p-5 sm:p-6 lg:p-8 transition-all duration-300"
                      style={{
                        borderRight: "1px solid rgba(255,255,255,0.09)",
                        borderBottom: "1px solid rgba(255,255,255,0.09)",
                        background: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${service.color}08`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent"
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className="font-mono text-xs"
                          style={{ color: service.color }}
                        >
                          {service.number}
                        </span>

                        <span
                          className="transition-transform duration-300 group-hover:translate-x-1"
                          style={{ color: service.color }}
                        >
                          →
                        </span>
                      </div>

                      <h3
                        className="mt-8 mb-3 text-base font-semibold"
                        style={{ color: "#F2F2F2" }}
                      >
                        {service.title}
                      </h3>

                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "rgba(242,242,242,0.42)" }}
                      >
                        {service.capabilities.length} core capabilities
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* CTA                                                                    */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="relative py-20 sm:py-24 lg:py-36 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #061A24 0%, #084259 50%, #061A24 100%)",
        }}
      >
        {/* Glow */}
        <div
          className="absolute left-1/2 top-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(140,191,63,0.10), transparent 65%)",
          }}
        />

        {/* Rings */}
        <div
          className="absolute left-1/2 top-1/2 w-[280px] h-[280px] rounded-full pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(140,191,63,0.13)",
          }}
        />

        <div
          className="absolute left-1/2 top-1/2 w-[430px] h-[430px] rounded-full pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(140,191,63,0.07)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <div className="flex justify-center items-center gap-3 mb-6">
              <span
                style={{
                  width: 32,
                  height: 1,
                  background: "#8CBF3F",
                }}
              />

              <span
                className="text-xs font-semibold tracking-[0.25em] uppercase"
                style={{ color: "#8CBF3F" }}
              >
                Start a Project
              </span>

              <span
                style={{
                  width: 32,
                  height: 1,
                  background: "#8CBF3F",
                }}
              />
            </div>

            <h2
              className="mb-7"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: 1,
                color: "#F2F2F2",
              }}
            >
              Have a complex
              <br />
              <span style={{ color: "#8CBF3F" }}>engineering challenge?</span>
            </h2>

            <p
              className="mx-auto mb-10 max-w-xl text-sm lg:text-base leading-relaxed"
              style={{ color: "rgba(242,242,242,0.58)" }}
            >
              Tell us about the project, the technical challenge, or the
              engineering support you need. We can explore the right scope
              together.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={() => handleNav("contact")}
                className="w-full sm:w-auto px-8 py-4 font-semibold text-sm transition-all duration-300"
                style={{
                  background: "#8CBF3F",
                  color: "#071E29",
                  boxShadow: "0 15px 40px rgba(140,191,63,0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                Start a Conversation →
              </button>

              <button
                onClick={() => handleNav("industries")}
                className="w-full sm:w-auto px-8 py-4 font-semibold text-sm transition-all duration-300"
                style={{
                  border: "1px solid rgba(242,242,242,0.16)",
                  color: "#F2F2F2",
                  background: "rgba(255,255,255,0.02)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(140,191,63,0.45)"
                  e.currentTarget.style.color = "#8CBF3F"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(242,242,242,0.16)"
                  e.currentTarget.style.color = "#F2F2F2"
                }}
              >
                Explore Industries
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* Local animation styles                                                 */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <style>{`
        @keyframes serviceScan {
          0% {
            transform: translateY(-180px);
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          50% {
            opacity: 0.7;
          }

          85% {
            opacity: 1;
          }

          100% {
            transform: translateY(420px);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .service-hero-meta {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
        }

        .service-hero .absolute {
          position: absolute;
        }

        @media (max-width: 639px) {
          .service-hero {
            min-height: 0;
            display: block;
          }

          .service-hero .service-hero-meta {
            position: relative;
            right: auto;
            bottom: auto;
            left: auto;
            width: 100%;
            margin-top: 0;
          }

          .service-hero .service-hero-meta > div {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }

          .service-hero .service-hero-meta .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .service-hero .service-hero-meta .grid > div {
            min-width: 0;
            padding: 1rem 0.75rem;
          }

          .service-hero .service-hero-meta .grid > div:nth-child(3) {
            border-left: 0;
            border-top: 1px solid rgba(255,255,255,0.07);
          }

          .service-hero .service-hero-meta .grid > div:nth-child(4) {
            border-top: 1px solid rgba(255,255,255,0.07);
          }
        }
      `}</style>
    </div>
  )
}

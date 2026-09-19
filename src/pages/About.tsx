import { useState, useEffect, useRef } from "react"

type Page = "home" | "about" | "services" | "industries" | "contact"

interface AboutProps {
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

const values = [
  {
    number: "01",
    icon: "◈",
    title: "Excellence",
    desc: "Rigorous, disciplined thinking applied to every problem. We hold ourselves to high technical and professional standards.",
  },
  {
    number: "02",
    icon: "◇",
    title: "Integrity",
    desc: "Independent advice, delivered honestly. We focus on clear engineering judgement and dependable outcomes.",
  },
  {
    number: "03",
    icon: "⬡",
    title: "Innovation",
    desc: "We challenge convention and apply fresh thinking, digital tools, and practical engineering methods to find better solutions.",
  },
  {
    number: "04",
    icon: "⬢",
    title: "Collaboration",
    desc: "The strongest outcomes emerge from genuine partnership with clients, built on trust, communication, and shared commitment.",
  },
  {
    number: "05",
    icon: "◉",
    title: "Sustainability",
    desc: "Our engineering thinking considers environmental impact, energy transition, efficiency, and long-term resilience.",
  },
  {
    number: "06",
    icon: "△",
    title: "Impact",
    desc: "We measure our contribution through project outcomes, engineering quality, business value, and lasting client relationships.",
  },
]

const timeline = [
  {
    year: "2010",
    label: "Foundation",
    desc: "Established to provide reliable engineering solutions for evolving EPC and industrial project requirements.",
  },
  {
    year: "2014",
    label: "Global Expansion",
    desc: "Opened offices in Houston and Dubai and began work across the Middle East, US Gulf Coast, and West Africa.",
  },
  {
    year: "2017",
    label: "Digital Practice",
    desc: "Launched a dedicated Digital & Data practice to integrate analytics and digital tools into project delivery.",
  },
  {
    year: "2020",
    label: "Engineering Expansion",
    desc: "Expanded engineering capabilities across piping, stress, structural analysis, FEA, and 3D modelling.",
  },
  {
    year: "2023",
    label: "Sector Expansion",
    desc: "Strengthened project experience across Oil & Gas, Petrochemical, LNG, Power, Water, Utilities, and Offshore sectors.",
  },
  {
    year: "2026",
    label: "Today",
    desc: "McRam continues to build technical capability and dependable project partnerships.",
  },
]

const leadership = [
  {
    name: "Dr. Alastair Crane",
    title: "Chief Executive Officer",
    bg: "photo-1472099645785-5658abf4ff4e",
    bio: "Former EVP Engineering at a major international operator. 28 years across offshore, LNG, and subsurface projects.",
  },
  {
    name: "Maryam Al-Rashidi",
    title: "Managing Director, Strategy",
    bg: "photo-1438761681033-6461ffad8d80",
    bio: "Engineering and project delivery specialist focused on practical solutions for complex requirements.",
  },
  {
    name: "James Okafor",
    title: "Head of Engineering",
    bg: "photo-1507003211169-0a1dd7228f2d",
    bio: "Structural and process engineering leader with extensive EPC and FEED experience in offshore and LNG.",
  },
  {
    name: "Clara Meinhof",
    title: "Head of Energy Transition",
    bg: "photo-1494790108377-be9c29b29330",
    bio: "Technical specialist supporting engineering quality, coordination, and dependable execution.",
  },
]

const capabilities = [
  "Piping Engineering",
  "Piping Stress Analysis",
  "Structural Analysis",
  "Finite Element Analysis",
  "3D Modelling",
  "Specialized Engineering Studies",
  "Technical Engineering Support",
  "Engineering Documentation",
]

/* ─────────────────────────────────────────────────────────────────────────── */
/* Component                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function About({ onNavigate }: AboutProps) {
  const [activeValue, setActiveValue] = useState<string | null>(null)

  const handleNav = (page: Page) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
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
        className="relative overflow-hidden engineering-grid"
        style={{
          minHeight: "620px",
          background:
            "radial-gradient(circle at 78% 35%, rgba(140,191,63,0.09), transparent 30%), linear-gradient(135deg, #061A24 0%, #084259 60%, #062B39 100%)",
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=2000&h=1200&fit=crop&auto=format)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.16,
            mixBlendMode: "screen",
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #061A24 0%, rgba(6,26,36,0.94) 40%, rgba(8,66,89,0.72) 100%)",
          }}
        />

        {/* Engineering grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(140,191,63,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(140,191,63,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            top: "32%",
            background:
              "linear-gradient(90deg, transparent, rgba(140,191,63,0.55), transparent)",
            boxShadow: "0 0 20px rgba(140,191,63,0.2)",
            animation: "aboutScan 8s ease-in-out infinite",
          }}
        />

        {/* Decorative ring */}
        <div
          className="absolute right-[-150px] top-[70px] w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{
            border: "1px solid rgba(140,191,63,0.12)",
            boxShadow:
              "0 0 0 65px rgba(140,191,63,0.02), 0 0 0 130px rgba(140,191,63,0.015)",
          }}
        />

       <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 pt-16 pb-20 lg:pt-20 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal>
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-7">
                  <span
                    style={{
                      width: 42,
                      height: 1,
                      background: "#8CBF3F",
                    }}
                  />

                  <span
                    className="text-xs font-semibold tracking-[0.25em] uppercase"
                    style={{ color: "#8CBF3F" }}
                  >
                    About McRam
                  </span>
                </div>

                <h1
                  className="mb-8"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(3rem, 6.5vw, 6rem)",
                    lineHeight: 0.98,
                    letterSpacing: "-0.035em",
                    color: "#F2F2F2",
                  }}
                >
                  Engineering
                  <br />
                  <span style={{ color: "#8CBF3F" }}>
                    built around
                  </span>
                  <br />
                  what matters.
                </h1>

                <p
                  className="text-base lg:text-lg leading-relaxed max-w-2xl"
                  style={{ color: "rgba(242,242,242,0.7)" }}
                >
                  McRam Engineering Solutions delivers integrated,
                  reliable, and value-driven engineering solutions across the
                  EPC and industrial sectors.
                </p>

                <div className="flex flex-wrap gap-4 mt-10">
                  <button
                    onClick={() => handleNav("services")}
                    className="px-7 py-3.5 font-semibold text-sm transition-all duration-300"
                    style={{
                      background: "#8CBF3F",
                      color: "#071E29",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                    }}
                  >
                    Explore Our Services →
                  </button>

                  <button
                    onClick={() => handleNav("contact")}
                    className="px-7 py-3.5 font-semibold text-sm transition-all duration-300"
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
                    Talk to McRam
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Hero information panel */}
            <Reveal delay={160}>
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
                    background: "rgba(3,24,33,0.4)",
                    backdropFilter: "blur(8px)",
                  }}
                />

                <div
                  className="absolute top-5 right-30 px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-bold"
                  style={{
                    background: "#8CBF3F",
                    color: "#071E29",
                  }}
                >
                  Engineering Profile
                </div>

                <div className="absolute inset-16 flex flex-col justify-center">
                  <div
                    className="text-[10px] tracking-[0.25em] uppercase mb-8"
                    style={{ color: "rgba(242,242,242,0.4)" }}
                  >
                    MCRAM ENGINEERING SOLUTIONS
                  </div>

                  <div className="space-y-0">
                    {[
                      ["01", "Technical Excellence"],
                      ["02", "Practical Engineering"],
                      ["03", "Project Partnership"],
                      ["04", "Long-Term Value"],
                    ].map(([number, label], index) => (
                      <div
                        key={number}
                        className="flex items-center gap-5 py-5"
                        style={{
                          borderBottom:
                            index === 3
                              ? "none"
                              : "1px solid rgba(242,242,242,0.07)",
                        }}
                      >
                        <span
                          className="font-mono text-xs"
                          style={{ color: "#8CBF3F" }}
                        >
                          {number}
                        </span>

                        <span
                          className="text-sm"
                          style={{ color: "rgba(242,242,242,0.7)" }}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom stats */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(3,24,33,0.38)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                ["15+", "Years of Expertise"],
                ["07", "Engineering Disciplines"],
                ["08", "Core Capabilities"],
                ["24h", "Response Commitment"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className="py-5 px-5"
                  style={{
                    borderLeft:
                      index === 0
                        ? "none"
                        : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="font-mono text-lg font-semibold"
                    style={{ color: "#8CBF3F" }}
                  >
                    {value}
                  </div>

                  <div
                    className="text-[10px] tracking-[0.15em] uppercase mt-1"
                    style={{ color: "rgba(242,242,242,0.42)" }}
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
      {/* COMPANY OVERVIEW                                                       */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="py-24 lg:py-32"
        style={{ background: "#071E29" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal>
              <div className="relative">
                <div
                  className="absolute -top-5 -left-5 w-20 h-20"
                  style={{
                    borderTop: "1px solid #8CBF3F",
                    borderLeft: "1px solid #8CBF3F",
                  }}
                />

                <img
                  src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1000&h=750&fit=crop&auto=format"
                  alt="McRam engineering team working together"
                  className="w-full object-cover"
                  style={{
                    height: "520px",
                    filter: "saturate(0.8)",
                  }}
                />

                <div
                  className="absolute bottom-7 right-7 p-6"
                  style={{
                    background: "rgba(6,26,36,0.94)",
                    border: "1px solid rgba(140,191,63,0.35)",
                    minWidth: "180px",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="font-mono text-4xl font-bold mb-1"
                    style={{ color: "#8CBF3F" }}
                  >
                    15+
                  </div>

                  <div
                    className="text-[10px] tracking-[0.12em] uppercase"
                    style={{ color: "rgba(242,242,242,0.58)" }}
                  >
                    Years of combined
                    <br />
                    engineering expertise
                  </div>
                </div>

                <div
                  className="absolute top-7 left-7 px-3 py-2"
                  style={{
                    background: "#8CBF3F",
                    color: "#071E29",
                  }}
                >
                  <span className="text-[10px] font-bold tracking-[0.16em] uppercase">
                    Our Story
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    style={{
                      width: 35,
                      height: 1,
                      background: "#8CBF3F",
                    }}
                  />

                  <span
                    className="text-xs font-semibold tracking-[0.22em] uppercase"
                    style={{ color: "#8CBF3F" }}
                  >
                    Built by Practitioners
                  </span>
                </div>

                <h2
                  className="mb-8"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                    lineHeight: 1.05,
                    color: "#F2F2F2",
                    letterSpacing: "-0.025em",
                  }}
                >
                  Engineering expertise
                  <br />
                  <span style={{ color: "#8CBF3F" }}>
                    with a practical mindset.
                  </span>
                </h2>

                <div
                  className="space-y-5 text-sm lg:text-base leading-relaxed"
                  style={{ color: "rgba(242,242,242,0.62)" }}
                >
                  <p>
                    McRam was established with the objective of providing
                    reliable engineering solutions for evolving EPC and
                    industrial project requirements.
                  </p>

                  <p>
                    Our focus has always been on strong engineering
                    capabilities, technical expertise, and practical delivery.
                  </p>

                  <p>
                    Our capabilities span piping engineering, piping stress
                    analysis, structural analysis, FEA, 3D modelling,
                    specialized engineering studies, and technical engineering
                    support.
                  </p>

                  <p>
                    Today, McRam supports projects across Oil & Gas,
                    Petrochemical, LNG, Power, Water, Utilities, and Offshore
                    sectors.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-10">
                  {[
                    ["01", "Technical Depth"],
                    ["02", "Practical Delivery"],
                    ["03", "Project Focus"],
                    ["04", "Long-Term Partnership"],
                  ].map(([number, label]) => (
                    <div
                      key={number}
                      className="flex items-center gap-3"
                    >
                      <span
                        className="font-mono text-xs"
                        style={{ color: "#8CBF3F" }}
                      >
                        {number}
                      </span>

                      <span
                        className="text-xs font-medium"
                        style={{ color: "rgba(242,242,242,0.7)" }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* MISSION / VISION                                                       */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="relative py-20 lg:py-24 engineering-grid overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(140,191,63,0.055), transparent 38%), #082936",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 w-[650px] h-[650px] rounded-full pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(140,191,63,0.05)",
            boxShadow:
              "0 0 0 90px rgba(140,191,63,0.012), 0 0 0 180px rgba(140,191,63,0.008)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex justify-center items-center gap-3 mb-5">
                <span
                  style={{
                    width: 32,
                    height: 1,
                    background: "#8CBF3F",
                  }}
                />

                <span
                  className="text-xs font-semibold tracking-[0.22em] uppercase"
                  style={{ color: "#8CBF3F" }}
                >
                  Purpose & Direction
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
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.3rem, 4vw, 3.6rem)",
                  lineHeight: 1.05,
                  color: "#F2F2F2",
                }}
              >
                What drives the work
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px">
            <Reveal>
              <div
                className="h-full p-10 lg:p-16 relative"
                style={{
                  background: "rgba(7,30,41,0.72)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="absolute top-0 left-0 w-16 h-px"
                  style={{ background: "#8CBF3F" }}
                />

                <div
                  className="font-mono text-xs tracking-[0.2em] uppercase mb-8"
                  style={{ color: "#8CBF3F" }}
                >
                  Mission
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.45rem, 2.4vw, 2rem)",
                    lineHeight: 1.45,
                    color: "#F2F2F2",
                  }}
                >
                  To deliver high-quality, reliable, and value-driven
                  engineering solutions through technical excellence,
                  innovation, and a strong commitment to quality, safety, and
                  customer satisfaction.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div
                className="h-full p-10 lg:p-16 relative"
                style={{
                  background: "rgba(7,30,41,0.72)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="absolute top-0 left-0 w-16 h-px"
                  style={{ background: "#8CBF3F" }}
                />

                <div
                  className="font-mono text-xs tracking-[0.2em] uppercase mb-8"
                  style={{ color: "#8CBF3F" }}
                >
                  Vision
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.45rem, 2.4vw, 2rem)",
                    lineHeight: 1.45,
                    color: "#F2F2F2",
                  }}
                >
                  To be a trusted and recognized engineering partner,
                  delivering innovative and sustainable solutions while
                  continuously advancing our technical capabilities and
                  creating long-term value for our clients.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* VALUES                                                                 */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="py-28 lg:py-36"
        style={{ background: "#071E29" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-[0.65fr_1.35fr] gap-16 mb-16 items-end">
              <div>
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
                    Our Values
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                    lineHeight: 1,
                    color: "#F2F2F2",
                  }}
                >
                  What we
                  <br />
                  <span style={{ color: "#8CBF3F" }}>
                    stand for.
                  </span>
                </h2>
              </div>

              <p
                className="max-w-xl text-sm lg:text-base leading-relaxed"
                style={{ color: "rgba(242,242,242,0.48)" }}
              >
                Our values shape how we approach engineering, communicate with
                clients, solve difficult technical problems, and deliver work
                that stands up to scrutiny.
              </p>
            </div>
          </Reveal>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{
              background: "rgba(255,255,255,0.07)",
            }}
          >
            {values.map((value, index) => {
              const active = activeValue === value.number

              return (
                <Reveal key={value.number} delay={index * 50}>
                  <button
                    className="text-left w-full h-full p-8 lg:p-10 group transition-all duration-300"
                    style={{
                      background: active
                        ? "rgba(140,191,63,0.045)"
                        : "#071E29",
                    }}
                    onClick={() =>
                      setActiveValue(active ? null : value.number)
                    }
                  >
                    <div className="flex items-start justify-between mb-8">
                      <span
                        className="w-12 h-12 flex items-center justify-center text-xl"
                        style={{
                          color: "#8CBF3F",
                          border: `1px solid ${
                            active
                              ? "rgba(140,191,63,0.7)"
                              : "rgba(140,191,63,0.25)"
                          }`,
                          background: active
                            ? "rgba(140,191,63,0.08)"
                            : "transparent",
                        }}
                      >
                        {value.icon}
                      </span>

                      <span
                        className="font-mono text-xs"
                        style={{
                          color: active
                            ? "#8CBF3F"
                            : "rgba(242,242,242,0.2)",
                        }}
                      >
                        {value.number}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-semibold mb-4"
                      style={{ color: "#F2F2F2" }}
                    >
                      {value.title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(242,242,242,0.5)" }}
                    >
                      {value.desc}
                    </p>

                    <div
                      className="mt-7 h-px transition-all duration-300"
                      style={{
                        width: active ? "100%" : "30%",
                        background: active
                          ? "#8CBF3F"
                          : "rgba(140,191,63,0.25)",
                      }}
                    />
                  </button>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* ENGINEERING CAPABILITIES                                               */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="py-24 lg:py-32 engineering-grid"
        style={{ background: "#082936" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-16 items-center">
            <Reveal>
              <div>
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
                    Technical Capability
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.3rem, 4vw, 3.6rem)",
                    lineHeight: 1.05,
                    color: "#F2F2F2",
                  }}
                >
                  Built around
                  <br />
                  <span style={{ color: "#8CBF3F" }}>
                    engineering depth.
                  </span>
                </h2>

                <p
                  className="mt-7 max-w-md text-sm leading-relaxed"
                  style={{ color: "rgba(242,242,242,0.5)" }}
                >
                  Our technical capability spans the disciplines required to
                  support complex engineering scopes from modelling and
                  analysis through to project execution.
                </p>

                <button
                  onClick={() => handleNav("services")}
                  className="mt-9 inline-flex items-center gap-3 text-sm font-semibold transition-all duration-300"
                  style={{ color: "#8CBF3F" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = "18px"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = "12px"
                  }}
                >
                  Explore our services
                  <span>→</span>
                </button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div
                className="grid grid-cols-1 sm:grid-cols-2"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  borderLeft: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {capabilities.map((capability, index) => (
                  <div
                    key={capability}
                    className="group p-6 lg:p-8 transition-all duration-300"
                    style={{
                      borderRight: "1px solid rgba(255,255,255,0.08)",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(140,191,63,0.045)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent"
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className="font-mono text-xs"
                        style={{ color: "#8CBF3F" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: "rgba(140,191,63,0.6)" }}
                      >
                        →
                      </span>
                    </div>

                    <div
                      className="mt-8 text-sm font-semibold"
                      style={{ color: "#F2F2F2" }}
                    >
                      {capability}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* JOURNEY                                                                */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="py-28 lg:py-36"
        style={{ background: "#071E29" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mb-20">
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
                  Our Journey
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.3rem, 4.5vw, 4rem)",
                  lineHeight: 1,
                  color: "#F2F2F2",
                }}
              >
                Experience that
                <br />
                <span style={{ color: "#8CBF3F" }}>
                  keeps evolving.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-[15px] top-0 bottom-0 hidden md:block"
              style={{
                width: 1,
                background:
                  "linear-gradient(to bottom, transparent, rgba(140,191,63,0.45), transparent)",
              }}
            />

            <div className="space-y-12 md:space-y-0">
              {timeline.map((item, index) => (
                <Reveal key={item.year} delay={index * 60}>
                  <div className="relative grid grid-cols-1 md:grid-cols-[110px_1fr] gap-6 md:gap-10 md:pb-14">
                    {/* Timeline marker */}
                    <div className="relative">
                      <div
                        className="hidden md:flex absolute left-[7px] top-1 w-[17px] h-[17px] rounded-full items-center justify-center"
                        style={{
                          background: "#071E29",
                          border: "1px solid #8CBF3F",
                        }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "#8CBF3F" }}
                        />
                      </div>

                      <div
                        className="font-mono text-lg font-semibold md:pl-10"
                        style={{ color: "#8CBF3F" }}
                      >
                        {item.year}
                      </div>
                    </div>

                    <div
                      className="p-7 lg:p-9"
                      style={{
                        background: "#082936",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div>
                          <h3
                            className="text-xl font-semibold mb-3"
                            style={{ color: "#F2F2F2" }}
                          >
                            {item.label}
                          </h3>

                          <p
                            className="text-sm leading-relaxed max-w-2xl"
                            style={{ color: "rgba(242,242,242,0.5)" }}
                          >
                            {item.desc}
                          </p>
                        </div>

                        <div
                          className="font-mono text-xs"
                          style={{ color: "rgba(140,191,63,0.5)" }}
                        >
                          MCRAM / {item.year}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* LEADERSHIP                                                             */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="py-28 lg:py-36 engineering-grid"
        style={{ background: "#082936" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-12 items-end mb-16">
              <div>
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
                    Leadership
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.3rem, 4vw, 3.6rem)",
                    lineHeight: 1,
                    color: "#F2F2F2",
                  }}
                >
                  People behind
                  <br />
                  <span style={{ color: "#8CBF3F" }}>
                    the engineering.
                  </span>
                </h2>
              </div>

              <p
                className="max-w-xl text-sm leading-relaxed"
                style={{ color: "rgba(242,242,242,0.48)" }}
              >
                McRam's leadership combines engineering experience, project
                delivery knowledge, and a practical understanding of the
                requirements faced by industrial project teams.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {leadership.map((person, index) => (
              <Reveal key={person.name} delay={index * 70}>
                <div
                  className="group"
                  style={{
                    background: "#071E29",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ height: "320px" }}
                  >
                    <img
                      src={`https://images.unsplash.com/${person.bg}?w=600&h=700&fit=crop&auto=format&face`}
                      alt={person.name}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      style={{
                        filter: "saturate(0.75)",
                        transition:
                          "transform 0.6s ease, filter 0.6s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.04)"
                        e.currentTarget.style.filter = "saturate(1)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                        e.currentTarget.style.filter = "saturate(0.75)"
                      }}
                    />

                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(7,30,41,0.98) 0%, rgba(7,30,41,0.05) 65%)",
                      }}
                    />

                    <div
                      className="absolute top-5 left-5 px-2.5 py-1"
                      style={{
                        background: "rgba(7,30,41,0.8)",
                        border: "1px solid rgba(140,191,63,0.25)",
                      }}
                    >
                      <span
                        className="font-mono text-[9px]"
                        style={{ color: "#8CBF3F" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3
                      className="font-semibold mb-1"
                      style={{ color: "#F2F2F2" }}
                    >
                      {person.name}
                    </h3>

                    <div
                      className="text-xs font-medium mb-5"
                      style={{ color: "#8CBF3F" }}
                    >
                      {person.title}
                    </div>

                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "rgba(242,242,242,0.46)" }}
                    >
                      {person.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* GLOBAL CAPABILITY                                                      */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="py-28 lg:py-36"
        style={{ background: "#071E29" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
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
                    Global Capability
                  </span>
                </div>

                <h2
                  className="mb-7"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.3rem, 4vw, 3.6rem)",
                    lineHeight: 1.05,
                    color: "#F2F2F2",
                  }}
                >
                  Global reach.
                  <br />
                  <span style={{ color: "#8CBF3F" }}>
                    Engineering depth.
                  </span>
                </h2>

                <p
                  className="text-sm lg:text-base leading-relaxed max-w-xl"
                  style={{ color: "rgba(242,242,242,0.54)" }}
                >
                  Our projects span multiple international locations across
                  engineering-intensive industries. We deploy practical
                  expertise and maintain active partnerships with regional
                  specialists.
                </p>

                <div className="grid grid-cols-3 gap-5 mt-10">
                  {[
                    ["3", "Office Locations"],
                    ["25+", "Markets Active"],
                    ["6", "Continents"],
                  ].map(([value, label]) => (
                    <div key={label}>
                      <div
                        className="font-mono text-3xl font-bold"
                        style={{ color: "#8CBF3F" }}
                      >
                        {value}
                      </div>

                      <div
                        className="text-[10px] uppercase tracking-[0.1em] mt-1"
                        style={{ color: "rgba(242,242,242,0.42)" }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div
                className="relative p-8 lg:p-10"
                style={{
                  border: "1px solid rgba(140,191,63,0.18)",
                  background: "rgba(140,191,63,0.025)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1000&h=650&fit=crop&auto=format"
                  alt="Global engineering operations"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: 0.11,
                    filter: "grayscale(1)",
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="font-mono text-[10px] tracking-[0.22em] uppercase mb-7"
                    style={{ color: "#8CBF3F" }}
                  >
                    OFFICE LOCATIONS
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        city: "London",
                        country: "United Kingdom",
                        coords: "51.5°N / 0.1°W",
                      },
                      {
                        city: "Houston",
                        country: "United States",
                        coords: "29.7°N / 95.3°W",
                      },
                      {
                        city: "Dubai",
                        country: "United Arab Emirates",
                        coords: "25.2°N / 55.2°E",
                      },
                    ].map((location) => (
                      <div
                        key={location.city}
                        className="flex items-center justify-between gap-5 p-5"
                        style={{
                          background: "rgba(7,30,41,0.88)",
                          border: "1px solid rgba(140,191,63,0.14)",
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              background: "#8CBF3F",
                              boxShadow:
                                "0 0 12px rgba(140,191,63,0.65)",
                            }}
                          />

                          <div>
                            <div
                              className="font-semibold text-sm"
                              style={{ color: "#F2F2F2" }}
                            >
                              {location.city}
                            </div>

                            <div
                              className="text-xs mt-1"
                              style={{
                                color: "rgba(242,242,242,0.42)",
                              }}
                            >
                              {location.country}
                            </div>
                          </div>
                        </div>

                        <div
                          className="text-[10px] font-mono"
                          style={{ color: "#8CBF3F" }}
                        >
                          {location.coords}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* STATEMENT                                                              */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="relative py-28 lg:py-36 overflow-hidden engineering-grid"
        style={{
          background:
            "radial-gradient(circle at center, rgba(140,191,63,0.08), transparent 42%), #082936",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(140,191,63,0.08)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <div className="flex justify-center items-center gap-3 mb-7">
              <span
                style={{
                  width: 35,
                  height: 1,
                  background: "#8CBF3F",
                }}
              />

              <span
                className="text-xs font-semibold tracking-[0.22em] uppercase"
                style={{ color: "#8CBF3F" }}
              >
                Engineering Philosophy
              </span>

              <span
                style={{
                  width: 35,
                  height: 1,
                  background: "#8CBF3F",
                }}
              />
            </div>

            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                lineHeight: 1.3,
                color: "#F2F2F2",
              }}
            >
              Engineering excellence is built on
              <span style={{ color: "#8CBF3F" }}>
                {" "}
                technical expertise,
              </span>{" "}
              practical solutions, and dependable delivery.
            </p>

            <div
              className="mt-8 text-xs tracking-[0.18em] uppercase"
              style={{ color: "rgba(242,242,242,0.38)" }}
            >
              McRam Engineering Solutions
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* CAREERS / CTA                                                          */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <section
        className="relative py-28 lg:py-36 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #061A24 0%, #084259 55%, #061A24 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 75% 50%, rgba(140,191,63,0.09), transparent 35%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    style={{
                      width: 35,
                      height: 1,
                      background: "#8CBF3F",
                    }}
                  />

                  <span
                    className="text-xs font-semibold tracking-[0.22em] uppercase"
                    style={{ color: "#8CBF3F" }}
                  >
                    Work With McRam
                  </span>
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
                  Let's engineer
                  <br />
                  <span style={{ color: "#8CBF3F" }}>
                    what's next.
                  </span>
                </h2>

                <p
                  className="max-w-xl text-sm lg:text-base leading-relaxed mb-10"
                  style={{ color: "rgba(242,242,242,0.55)" }}
                >
                  Whether you have a complex engineering challenge, a project
                  requiring specialist capability, or need dependable technical
                  support, we'd like to understand what you're working on.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleNav("contact")}
                    className="px-8 py-4 font-semibold text-sm transition-all duration-300"
                    style={{
                      background: "#8CBF3F",
                      color: "#071E29",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                    }}
                  >
                    Start a Conversation →
                  </button>

                  <button
                    onClick={() => handleNav("services")}
                    className="px-8 py-4 font-semibold text-sm transition-all duration-300"
                    style={{
                      border: "1px solid rgba(242,242,242,0.16)",
                      color: "#F2F2F2",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(140,191,63,0.45)"
                      e.currentTarget.style.color = "#8CBF3F"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(242,242,242,0.16)"
                      e.currentTarget.style.color = "#F2F2F2"
                    }}
                  >
                    View Services
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div
                className="relative hidden lg:block"
                style={{ height: 360 }}
              >
                <div
                  className="absolute inset-8"
                  style={{
                    border: "1px solid rgba(140,191,63,0.18)",
                  }}
                />

                <div
                  className="absolute inset-16"
                  style={{
                    border: "1px solid rgba(140,191,63,0.08)",
                  }}
                />

                <div
                  className="absolute left-1/2 top-1/2 w-28 h-28 rounded-full flex items-center justify-center"
                  style={{
                    transform: "translate(-50%, -50%)",
                    border: "1px solid rgba(140,191,63,0.45)",
                    boxShadow:
                      "0 0 50px rgba(140,191,63,0.08)",
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: "#8CBF3F",
                      boxShadow:
                        "0 0 20px rgba(140,191,63,0.8)",
                    }}
                  />
                </div>

                <div
                  className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.18em]"
                  style={{ color: "rgba(140,191,63,0.45)" }}
                >
                  MCRAM / ENGINEERING
                </div>

                <div
                  className="absolute bottom-4 right-4 font-mono text-[9px] tracking-[0.18em]"
                  style={{ color: "rgba(140,191,63,0.45)" }}
                >
                  SYSTEM / ACTIVE
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* Animation styles                                                       */}
      {/* ───────────────────────────────────────────────────────────────────── */}

      <style>{`
        @keyframes aboutScan {
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
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  )
}
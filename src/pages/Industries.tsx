import { useEffect, useMemo, useRef, useState } from "react"

type Page = "home" | "about" | "services" | "industries" | "contact"

type Filter = "all" | "energy" | "infrastructure" | "engineering" | "sustainability" | "digital"

interface IndustriesProps {
  onNavigate: (page: Page) => void
}

/* =========================================================
   DATA
========================================================= */

const industries = [
  {
    title: "Oil & Gas",
    challenge:
      "Navigating commodity volatility and the energy transition while optimizing existing portfolio performance.",
    expertise:
      "Upstream and midstream advisory, production optimization, asset lifecycle management.",
    outcome:
      "Improved production efficiency, reduced operating costs, credible transition strategies.",
    image: "photo-1621905252507-b35492cc74b4",
    color: "#8CBF3F",
    number: "01",
  },
  {
    title: "LNG",
    challenge:
      "Developing complex LNG infrastructure with precision engineering, commercial rigor, and regulatory navigation.",
    expertise:
      "LNG project FEED, technical due diligence, contracting strategy, project controls.",
    outcome:
      "Bankable projects delivered on schedule with independent technical validation.",
    image: "photo-1558618666-fcd25c85cd64",
    color: "#54C6C2",
    number: "02",
  },
  {
    title: "Renewable Energy",
    challenge:
      "Scaling renewable capacity while managing technology risk, supply chain complexity, and merchant market exposure.",
    expertise:
      "Wind, solar, and hybrid project advisory; grid integration; financing support.",
    outcome:
      "Investable, technically robust renewable projects with clear business cases.",
    image: "photo-1509391366360-2e959784a276",
    color: "#8CBF3F",
    number: "03",
  },
  {
    title: "Offshore Energy",
    challenge:
      "Managing capital-intensive offshore assets safely, efficiently, and with declining carbon intensity.",
    expertise:
      "Platform engineering, subsea systems, offshore project management, emissions reduction.",
    outcome:
      "Safer, more efficient offshore operations with demonstrable ESG improvement.",
    image: "photo-1534351590666-13e3e96b5017",
    color: "#54C6C2",
    number: "04",
  },
  {
    title: "Hydrogen & Clean Fuels",
    challenge:
      "Evaluating and developing hydrogen projects in a rapidly evolving technology and policy environment.",
    expertise:
      "Green hydrogen feasibility, electrolyzer technology assessment, project development advisory.",
    outcome:
      "Clear investment decisions on hydrogen with rigorous technical and commercial analysis.",
    image: "photo-1473341304170-971dccb5ac1e",
    color: "#8CBF3F",
    number: "05",
  },
  {
    title: "Carbon Capture",
    challenge:
      "Developing CCUS projects with evolving technology, complex regulatory frameworks, and long-horizon economics.",
    expertise:
      "CCUS feasibility, storage assessment, commercial structuring, project management.",
    outcome:
      "Well-structured CCUS programs with credible pathways to first carbon.",
    image: "photo-1559302504-64aae6ca6890",
    color: "#54C6C2",
    number: "06",
  },
  {
    title: "Power & Utilities",
    challenge:
      "Transitioning power asset portfolios from conventional generation to flexible, low-carbon systems.",
    expertise:
      "Grid advisory, generation portfolio strategy, flexibility optimization, digital operations.",
    outcome:
      "Resilient, lower-carbon power businesses positioned for the energy transition.",
    image: "photo-1473341304170-971dccb5ac1e",
    color: "#B3D979",
    number: "07",
  },
  {
    title: "Infrastructure",
    challenge:
      "Delivering major infrastructure programs on time and within budget in complex operating environments.",
    expertise:
      "Owner's team advisory, program governance, project controls, risk management.",
    outcome:
      "Major infrastructure delivered with strong cost and schedule performance.",
    image: "photo-1486325212027-8081e485255e",
    color: "#8CBF3F",
    number: "08",
  },
  {
    title: "Industrial & Manufacturing",
    challenge:
      "Improving productivity, reducing energy intensity, and managing decarbonization in asset-heavy operations.",
    expertise:
      "Operational excellence, energy efficiency, digital twin implementation, net-zero planning.",
    outcome:
      "More efficient operations, reduced costs, and measurable emissions reduction.",
    image: "photo-1565793298595-6a879b1d9492",
    color: "#54C6C2",
    number: "09",
  },
  {
    title: "Marine & Offshore",
    challenge:
      "Managing complex marine and offshore projects with demanding safety, environmental, and regulatory requirements.",
    expertise:
      "Marine engineering, offshore project management, SIMOPS, HSE advisory.",
    outcome:
      "Safe, compliant offshore operations with strong technical delivery assurance.",
    image: "photo-1578662996442-48f60103fc96",
    color: "#8CBF3F",
    number: "10",
  },
]

const projects = [
  {
    id: 1,
    title: "North Sea Energy Optimization Program",
    location: "North Sea, UK / Norway",
    industry: "Offshore Energy",
    tag: "energy" as Filter,
    challenge:
      "Improve project efficiency and reduce operational emissions across a multi-asset offshore portfolio.",
    solution:
      "Integrated technical consulting, project controls, digital monitoring, and performance optimization.",
    metrics: [
      { val: "18%", label: "Efficiency Improvement" },
      { val: "12%", label: "Emissions Reduction" },
      { val: "$140M", label: "Cost Savings" },
    ],
    image: "photo-1578662996442-48f60103fc96",
    color: "#8CBF3F",
  },
  {
    id: 2,
    title: "Green Hydrogen Feasibility Study",
    location: "Western Europe",
    industry: "Hydrogen",
    tag: "sustainability" as Filter,
    challenge:
      "Evaluate the technical and commercial viability of a 200MW green hydrogen production facility.",
    solution:
      "End-to-end feasibility assessment covering electrolyzer technology, grid integration, offtake structures, and project economics.",
    metrics: [
      { val: "200MW", label: "Capacity Assessed" },
      { val: "3", label: "Technology Pathways" },
      { val: "92%", label: "CAPEX Confidence" },
    ],
    image: "photo-1509391366360-2e959784a276",
    color: "#8CBF3F",
  },
  {
    id: 3,
    title: "LNG Terminal FEED Management",
    location: "East Africa",
    industry: "LNG",
    tag: "engineering" as Filter,
    challenge:
      "Provide independent engineering management and technical assurance for a brownfield LNG terminal expansion.",
    solution:
      "Owner's engineer services covering FEED management, contractor oversight, schedule recovery, and technical due diligence.",
    metrics: [
      { val: "2.5Mtpa", label: "Capacity Increase" },
      { val: "6 months", label: "Schedule Recovery" },
      { val: "$85M", label: "Value Protected" },
    ],
    image: "photo-1558618666-fcd25c85cd64",
    color: "#54C6C2",
  },
  {
    id: 4,
    title: "Digital Transformation — Offshore Operator",
    location: "Gulf of Mexico",
    industry: "Digital",
    tag: "digital" as Filter,
    challenge:
      "Deploy a unified digital platform connecting offshore asset data to shore-based decision support systems.",
    solution:
      "Digital architecture design, data integration, real-time monitoring dashboards, and predictive maintenance AI models.",
    metrics: [
      { val: "60%", label: "Data Visibility Improvement" },
      { val: "$22M", label: "Maintenance Savings" },
      { val: "3x", label: "Decision Speed" },
    ],
    image: "photo-1518770660439-4636190af475",
    color: "#B3D979",
  },
  {
    id: 5,
    title: "Industrial Net-Zero Roadmap",
    location: "Northern Europe",
    industry: "Industrial",
    tag: "sustainability" as Filter,
    challenge:
      "Develop a credible, investor-ready net-zero roadmap for a large industrial manufacturing group.",
    solution:
      "Emissions baseline, technology assessment, abatement cost curves, policy scenario analysis, and phased decarbonization strategy.",
    metrics: [
      { val: "40%", label: "Emissions Target by 2030" },
      { val: "100%", label: "Net-Zero by 2045" },
      { val: "A-", label: "CDP Rating Achieved" },
    ],
    image: "photo-1565793298595-6a879b1d9492",
    color: "#8CBF3F",
  },
  {
    id: 6,
    title: "Infrastructure Program Controls",
    location: "Middle East",
    industry: "Infrastructure",
    tag: "infrastructure" as Filter,
    challenge:
      "Implement robust project controls across a $3.2B infrastructure program with multiple contractors and work fronts.",
    solution:
      "Integrated program controls framework, cost management systems, schedule governance, and risk monitoring.",
    metrics: [
      { val: "$3.2B", label: "Program Value" },
      { val: "94%", label: "Schedule Performance Index" },
      { val: "2.1%", label: "Cost Variance" },
    ],
    image: "photo-1486325212027-8081e485255e",
    color: "#8CBF3F",
  },
]

const filters: { id: Filter label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "energy", label: "Energy" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "engineering", label: "Engineering" },
  { id: "sustainability", label: "Sustainability" },
  { id: "digital", label: "Digital" },
]

/* =========================================================
   HOOKS
========================================================= */

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

/* =========================================================
   REVEAL
========================================================= */

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
        transform: visible ? "translate3d(0, 0, 0)" : "translate3d(0, 30px, 0)",
        transition: `opacity 800ms cubic-bezier(.2,.7,.2,1) ${delay}ms,
          transform 800ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* =========================================================
   ICONS
========================================================= */

function ArrowUpRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

/* =========================================================
   PAGE
========================================================= */

export default function Industries({ onNavigate }: IndustriesProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all")
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 })

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects

    return projects.filter((project) => project.tag === activeFilter)
  }, [activeFilter])

  const handleNav = (page: Page) => {
    onNavigate(page)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleHeroMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()

    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    setHeroMouse({
      x: x * 12,
      y: y * 12,
    })
  }

  return (
    <div
      className="industries-page"
      style={{
        fontFamily: "var(--font-sans)",
        background: "#071F2A",
        color: "#F5F7F4",
        overflow: "hidden",
      }}
    >
      {/* =====================================================
          GLOBAL PAGE STYLES
      ===================================================== */}

      <style>{`
        .industries-page {
          --navy: #071F2A;
          --navy-2: #0A2B38;
          --navy-3: #0E3745;
          --lime: #8CBF3F;
          --lime-light: #B3D979;
          --teal: #54C6C2;
          --white: #F5F7F4;
          --muted: #AFC0C2;
          --line: rgba(255,255,255,.10);
        }

        .industries-page * {
          box-sizing: border-box;
        }

        .engineering-grid {
          position: relative;
          isolation: isolate;
        }

        .engineering-grid::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .22;
          background-image:
            linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(to bottom, black, transparent 90%);
          z-index: -1;
        }

        .engineering-grid::after {
          content: "";
          position: absolute;
          width: 520px;
          height: 520px;
          right: -240px;
          top: -250px;
          border-radius: 50%;
          background: rgba(84,198,194,.08);
          filter: blur(40px);
          z-index: -1;
          animation: ambientFloat 10s ease-in-out infinite;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(1px);
          animation: ambientFloat 8s ease-in-out infinite;
        }

        .hero-orb-one {
          width: 420px;
          height: 420px;
          right: -160px;
          top: 60px;
          background: radial-gradient(
            circle,
            rgba(140,191,63,.20) 0%,
            rgba(140,191,63,.03) 55%,
            transparent 72%
          );
        }

        .hero-orb-two {
          width: 280px;
          height: 280px;
          right: 28%;
          bottom: -140px;
          background: radial-gradient(
            circle,
            rgba(84,198,194,.16) 0%,
            transparent 70%
          );
          animation-delay: -3s;
        }

        .hero-scanline {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          top: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(140,191,63,.65),
            transparent
          );
          animation: scan 7s linear infinite;
          opacity: .65;
        }

        .section-kicker {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--lime);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
        }

        .section-kicker-line {
          display: block;
          width: 34px;
          height: 1px;
          background: currentColor;
        }

        .hero-title {
          letter-spacing: -.045em;
          text-wrap: balance;
        }

        .hero-description {
          color: #C5D1D1 !important;
        }

        .hero-disciplines {
          display: flex;
          flex-wrap: wrap;
          gap: 14px 28px;
        }

        .hero-discipline {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 8px;
          color: #C9D9C9;
          font-family: var(--font-serif);
          font-size: clamp(1.05rem, 2vw, 1.35rem);
          letter-spacing: -.015em;
          animation: disciplineIn 700ms both;
        }

        .hero-discipline::after {
          content: "";
          position: absolute;
          left: 20px;
          right: 0;
          bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(140,191,63,.8), transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 400ms ease;
        }

        .hero-discipline:hover::after {
          transform: scaleX(1);
        }

        .hero-discipline-dot {
          width: 7px;
          height: 7px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: var(--lime);
          box-shadow: 0 0 14px rgba(140,191,63,.7);
          animation: disciplinePulse 2.8s ease-in-out infinite;
        }

        .hero-discipline:nth-child(2) {
          animation-delay: 100ms;
        }

        .hero-discipline:nth-child(3) {
          animation-delay: 200ms;
        }

        .hero-discipline:nth-child(4) {
          animation-delay: 300ms;
        }

        .industry-card {
          position: relative;
          min-height: 390px;
          overflow: hidden;
          background: #0A2B38;
          border: 1px solid rgba(255,255,255,.08);
          transition:
            transform 500ms cubic-bezier(.2,.8,.2,1),
            border-color 400ms ease,
            box-shadow 500ms ease;
        }

        .industry-card:hover {
          transform: translateY(-8px);
          border-color: rgba(140,191,63,.42);
          box-shadow: 0 25px 70px rgba(0,0,0,.25);
        }

        .industry-card-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: .52;
          filter: saturate(.72);
          transform: scale(1.04);
          transition:
            transform 900ms cubic-bezier(.2,.8,.2,1),
            opacity 600ms ease,
            filter 600ms ease;
        }

        .industry-card:hover .industry-card-image {
          transform: scale(1.10);
          opacity: .62;
          filter: saturate(1);
        }

        .industry-card-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(7,31,42,.20) 0%,
              rgba(7,31,42,.62) 45%,
              rgba(7,31,42,.98) 100%
            );
        }

        .industry-card-number {
          position: absolute;
          top: 24px;
          right: 26px;
          color: rgba(255,255,255,.22);
          font-family: var(--font-serif);
          font-size: 52px;
          line-height: 1;
          transition: color 400ms ease;
        }

        .industry-card:hover .industry-card-number {
          color: rgba(140,191,63,.55);
        }

        .industry-card-content {
          position: relative;
          z-index: 2;
          height: 100%;
          padding: 34px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .industry-accent {
          width: 38px;
          height: 3px;
          margin-bottom: 18px;
          transition: width 450ms ease;
        }

        .industry-card:hover .industry-accent {
          width: 70px;
        }

        .industry-label {
          color: #D9E5E5;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }

        .industry-copy {
          color: #B9C9CA;
        }

        .project-card {
          position: relative;
          overflow: hidden;
          height: 100%;
          background: #0A2B38;
          border: 1px solid rgba(255,255,255,.09);
          transition:
            transform 450ms cubic-bezier(.2,.8,.2,1),
            border-color 350ms ease,
            box-shadow 450ms ease;
        }

        .project-card:hover {
          transform: translateY(-7px);
          border-color: rgba(84,198,194,.35);
          box-shadow: 0 25px 60px rgba(0,0,0,.22);
        }

        .project-image {
          transition: transform 900ms cubic-bezier(.2,.8,.2,1);
        }

        .project-card:hover .project-image {
          transform: scale(1.08);
        }

        .filter-button {
          border-radius: 999px;
          cursor: pointer;
          transition:
            background 250ms ease,
            color 250ms ease,
            border-color 250ms ease,
            transform 250ms ease;
        }

        .filter-button:hover {
          transform: translateY(-2px);
        }

        .metric-number {
          letter-spacing: -.04em;
        }

        .impact-card {
          position: relative;
          overflow: hidden;
          min-height: 260px;
          background: #0A2B38;
          border: 1px solid rgba(255,255,255,.08);
          transition:
            transform 400ms ease,
            border-color 400ms ease;
        }

        .impact-card::after {
          content: "";
          position: absolute;
          width: 160px;
          height: 160px;
          right: -80px;
          bottom: -80px;
          border-radius: 50%;
          background: rgba(140,191,63,.08);
          transition: transform 500ms ease;
        }

        .impact-card:hover {
          transform: translateY(-6px);
          border-color: rgba(140,191,63,.35);
        }

        .impact-card:hover::after {
          transform: scale(1.8);
        }

        .impact-icon {
          font-size: 26px;
          filter: grayscale(.15);
        }

        .feature-card {
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(255,255,255,.09);
          transition:
            background 300ms ease,
            transform 350ms ease,
            border-color 300ms ease;
        }

        .feature-card:hover {
          background: rgba(255,255,255,.05);
          transform: translateY(-5px);
          border-color: rgba(84,198,194,.28);
        }

        .cta-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 80% 20%,
              rgba(140,191,63,.16),
              transparent 30%
            ),
            linear-gradient(135deg, #0B3543 0%, #071F2A 70%);
        }

        .cta-ring {
          position: absolute;
          width: 520px;
          height: 520px;
          border: 1px solid rgba(140,191,63,.12);
          border-radius: 50%;
          right: -180px;
          top: -200px;
          animation: slowSpin 25s linear infinite;
        }

        .cta-ring::before,
        .cta-ring::after {
          content: "";
          position: absolute;
          inset: 45px;
          border: 1px solid rgba(84,198,194,.10);
          border-radius: 50%;
        }

        .cta-ring::after {
          inset: 110px;
        }

        .cta-button {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border: 0;
          transition:
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .cta-button::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255,255,255,.28) 50%,
            transparent 80%
          );
          transform: translateX(-120%);
          transition: transform 650ms ease;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(140,191,63,.22);
        }

        .cta-button:hover::before {
          transform: translateX(120%);
        }

        @keyframes ambientFloat {
          0%, 100% {
            transform: translate3d(0,0,0) scale(1);
          }
          50% {
            transform: translate3d(0,-18px,0) scale(1.03);
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: .7;
          }
          90% {
            opacity: .7;
          }
          100% {
            transform: translateY(700px);
            opacity: 0;
          }
        }

        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }

          @keyframes disciplineIn {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes disciplinePulse {
            0%, 100% {
              opacity: .55;
              transform: scale(.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.15);
            }
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .industry-card {
            min-height: 360px;
          }

          .industry-card-content {
            padding: 26px;
          }

          .hero-orb-one {
            right: -250px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="relative min-h-[720px] flex items-center engineering-grid"
        onMouseMove={handleHeroMove}
        onMouseLeave={() => setHeroMouse({ x: 0, y: 0 })}
        style={{
          background:
            "linear-gradient(135deg, #061B25 0%, #0A2B38 52%, #0D3B47 100%)",
        }}
      >
        <div className="hero-scanline" />

        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        {/* Hero image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translate3d(${heroMouse.x * -0.25}px, ${
              heroMouse.y * -0.25
            }px, 0) scale(1.05)`,
            transition: "transform 900ms cubic-bezier(.2,.8,.2,1)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2000&h=1100&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
            style={{
              opacity: 0.18,
              filter: "saturate(.65)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(6,27,37,.98) 0%, rgba(6,27,37,.88) 46%, rgba(6,27,37,.42) 100%)",
            }}
          />
        </div>

        {/* Decorative engineering lines */}
        <div
          className="absolute right-[10%] top-[18%] hidden lg:block"
          style={{
            width: 260,
            height: 260,
            border: "1px solid rgba(140,191,63,.18)",
            transform: `translate3d(${heroMouse.x * 0.45}px, ${
              heroMouse.y * 0.45
            }px, 0) rotate(45deg)`,
            transition: "transform 700ms ease",
          }}
        >
          <div
            className="absolute inset-[28px]"
            style={{
              border: "1px solid rgba(84,198,194,.14)",
            }}
          />

          <div
            className="absolute"
            style={{
              width: 7,
              height: 7,
              background: "#8CBF3F",
              borderRadius: "50%",
              top: -3,
              right: 40,
              boxShadow: "0 0 22px rgba(140,191,63,.75)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 pt-28 pb-24">
          <div className="max-w-4xl">
            <Reveal>
              <div className="section-kicker mb-7">
                <span className="section-kicker-line" />
                <span>Innovation & Projects</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1
                className="hero-title mb-8"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(3rem, 7vw, 6.5rem)",
                  lineHeight: 0.98,
                  color: "#F5F7F4",
                  maxWidth: 900,
                }}
              >
                Engineering ideas into{" "}
                <span style={{ color: "#8CBF3F" }}>real outcomes.</span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p
                className="hero-description text-lg md:text-xl leading-relaxed"
                style={{
                  maxWidth: 690,
                  color: "#C5D1D1",
                }}
              >
                Our work spans oil and gas, LNG, renewables, hydrogen,
                infrastructure, and industrial operations with practical
                engineering capabilities and dependable project delivery.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="hero-disciplines mt-10">
                {[
                  "Engineering",
                  "Energy Transition",
                  "Digital",
                  "Infrastructure",
                ].map((item, index) => (
                  <div key={item} className="hero-discipline">
                    <span
                      className="hero-discipline-dot"
                      style={{
                        background: index % 2 === 0 ? "#8CBF3F" : "#54C6C2",
                        boxShadow:
                          index % 2 === 0
                            ? "0 0 14px rgba(140,191,63,.7)"
                            : "0 0 14px rgba(84,198,194,.7)",
                      }}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Hero bottom indicator */}
          <Reveal delay={400}>
            <div className="flex items-center gap-4 mt-20">
              <div
                style={{
                  width: 52,
                  height: 1,
                  background: "#8CBF3F",
                }}
              />

              <span
                className="text-xs tracking-[.18em] uppercase"
                style={{ color: "#8FA5A7" }}
              >
                Explore our capabilities
              </span>

              <ChevronDown />
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          INDUSTRIES
      ===================================================== */}

      <section
        className="py-28 md:py-36"
        style={{
          background: "linear-gradient(180deg, #071F2A 0%, #092631 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mb-14 md:mb-20 max-w-3xl">
              <div className="section-kicker mb-5">
                <span className="section-kicker-line" />
                <span>Sectors</span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.3rem, 5vw, 4rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-.035em",
                  color: "#F5F7F4",
                }}
              >
                Sector knowledge backed by{" "}
                <span style={{ color: "#8CBF3F" }}>
                  engineering experience.
                </span>
              </h2>

              <p
                className="mt-6 text-base md:text-lg leading-relaxed"
                style={{
                  color: "#AFC0C2",
                  maxWidth: 650,
                }}
              >
                From conventional energy assets to emerging technologies, we
                combine technical depth with commercial understanding to help
                complex projects move forward.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {industries.map((industry, index) => (
              <Reveal key={industry.title} delay={(index % 2) * 90}>
                <article className="industry-card rounded-[2px]">
                  <img
                    src={`https://images.unsplash.com/${industry.image}?w=1000&h=750&fit=crop&auto=format`}
                    alt={industry.title}
                    className="industry-card-image"
                    loading="lazy"
                  />

                  <div className="industry-card-overlay" />

                  <div className="industry-card-number">{industry.number}</div>

                  <div className="industry-card-content">
                    <div
                      className="industry-accent"
                      style={{ background: industry.color }}
                    />

                    <h3
                      className="text-2xl md:text-3xl font-semibold mb-6"
                      style={{
                        color: "#FFFFFF",
                        letterSpacing: "-.025em",
                      }}
                    >
                      {industry.title}
                    </h3>

                    <div className="space-y-5">
                      <div>
                        <div className="industry-label">Challenge</div>
                        <p className="industry-copy text-sm leading-relaxed">
                          {industry.challenge}
                        </p>
                      </div>

                      <div>
                        <div className="industry-label">Our Expertise</div>
                        <p className="industry-copy text-sm leading-relaxed">
                          {industry.expertise}
                        </p>
                      </div>

                      <div
                        className="pt-4"
                        style={{
                          borderTop: "1px solid rgba(255,255,255,.10)",
                        }}
                      >
                        <div
                          className="industry-label"
                          style={{ color: industry.color }}
                        >
                          Outcome
                        </div>

                        <p
                          className="text-sm leading-relaxed font-medium"
                          style={{ color: "#DCE7D2" }}
                        >
                          {industry.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section
        className="py-28 md:py-36 engineering-grid"
        style={{
          background: "#0A2B38",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
              <div className="max-w-3xl">
                <div className="section-kicker mb-5">
                  <span className="section-kicker-line" />
                  <span>Project Showcase</span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.3rem, 5vw, 4rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-.035em",
                    color: "#F5F7F4",
                  }}
                >
                  Selected projects.
                </h2>

                <p
                  className="mt-5 text-base leading-relaxed"
                  style={{
                    color: "#AFC0C2",
                    maxWidth: 620,
                  }}
                >
                  Examples of how technical advisory, project controls, digital
                  transformation, and sustainability expertise come together to
                  solve complex challenges.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Filters */}
          <Reveal delay={80}>
            <div className="flex flex-wrap gap-2 mb-12">
              {filters.map(({ id, label }) => {
                const active = activeFilter === id

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setActiveFilter(id)
                      setExpandedProject(null)
                    }}
                    className="filter-button px-5 py-2.5 text-xs font-semibold"
                    style={{
                      background: active ? "#8CBF3F" : "rgba(255,255,255,.025)",
                      color: active ? "#071F2A" : "#B9C9CA",
                      border: active
                        ? "1px solid #8CBF3F"
                        : "1px solid rgba(255,255,255,.10)",
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const expanded = expandedProject === project.id

              return (
                <Reveal key={project.id} delay={(index % 3) * 80}>
                  <article
                    className="project-card rounded-[2px] cursor-pointer"
                    onClick={() =>
                      setExpandedProject(expanded ? null : project.id)
                    }
                  >
                    {/* Image */}
                    <div
                      className="relative overflow-hidden"
                      style={{
                        height: 245,
                        background: "#071F2A",
                      }}
                    >
                      <img
                        src={`https://images.unsplash.com/${project.image}?w=900&h=600&fit=crop&auto=format`}
                        alt={project.title}
                        loading="lazy"
                        className="project-image absolute inset-0 w-full h-full object-cover"
                        style={{
                          opacity: 0.72,
                          filter: "saturate(.8)",
                        }}
                      />

                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(7,31,42,.05) 0%, rgba(7,31,42,.18) 40%, rgba(7,31,42,.98) 100%)",
                        }}
                      />

                      <div
                        className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase"
                        style={{
                          background: project.color,
                          color: "#071F2A",
                        }}
                      >
                        {project.industry}
                      </div>

                      <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                        <div className="text-xs" style={{ color: "#B3D979" }}>
                          {project.location}
                        </div>

                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center"
                          style={{
                            background: "rgba(7,31,42,.70)",
                            border: "1px solid rgba(255,255,255,.15)",
                            color: "#FFFFFF",
                          }}
                        >
                          {expanded ? (
                            <span style={{ fontSize: 18 }}>−</span>
                          ) : (
                            <PlusIcon />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-7">
                      <h3
                        className="font-semibold text-lg leading-snug mb-6"
                        style={{
                          color: "#F5F7F4",
                          letterSpacing: "-.015em",
                        }}
                      >
                        {project.title}
                      </h3>

                      {/* Metrics */}
                      <div
                        className="grid grid-cols-3 gap-2 py-5"
                        style={{
                          borderTop: "1px solid rgba(255,255,255,.08)",
                          borderBottom: "1px solid rgba(255,255,255,.08)",
                        }}
                      >
                        {project.metrics.map(({ val, label }) => (
                          <div key={label} className="text-center">
                            <div
                              className="metric-number font-bold text-xl mb-1"
                              style={{
                                fontFamily: "var(--font-serif)",
                                color: project.color,
                              }}
                            >
                              {val}
                            </div>

                            <div
                              className="text-[10px] leading-tight"
                              style={{
                                color: "#91A7A9",
                              }}
                            >
                              {label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Expandable */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateRows: expanded ? "1fr" : "0fr",
                          transition:
                            "grid-template-rows 450ms cubic-bezier(.2,.8,.2,1)",
                        }}
                      >
                        <div style={{ overflow: "hidden" }}>
                          <div className="pt-6 space-y-5">
                            <div>
                              <div
                                className="text-[10px] font-bold tracking-[.18em] uppercase mb-2"
                                style={{ color: project.color }}
                              >
                                Challenge
                              </div>

                              <p
                                className="text-sm leading-relaxed"
                                style={{ color: "#B9C9CA" }}
                              >
                                {project.challenge}
                              </p>
                            </div>

                            <div>
                              <div
                                className="text-[10px] font-bold tracking-[.18em] uppercase mb-2"
                                style={{ color: project.color }}
                              >
                                Our Solution
                              </div>

                              <p
                                className="text-sm leading-relaxed"
                                style={{ color: "#B9C9CA" }}
                              >
                                {project.solution}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex items-center justify-between mt-6 pt-2"
                        style={{
                          color: project.color,
                        }}
                      >
                        <span className="text-xs font-semibold">
                          {expanded ? "Show Less" : "View Details"}
                        </span>

                        <span
                          style={{
                            transform: expanded
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 250ms ease",
                          }}
                        >
                          <ChevronDown />
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          IMPACT
      ===================================================== */}

      <section
        className="py-28 md:py-36 relative overflow-hidden"
        style={{
          background: "#071F2A",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, rgba(84,198,194,.09), transparent 42%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
              <div className="section-kicker justify-center mb-5">
                <span className="section-kicker-line" />
                <span>Sustainability Impact</span>
                <span className="section-kicker-line" />
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.3rem, 5vw, 4rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-.035em",
                  color: "#F5F7F4",
                }}
              >
                Engineering experience across{" "}
                <span style={{ color: "#8CBF3F" }}>
                  diverse projects and industries.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                val: "40%",
                label:
                  "Average carbon reduction achieved for clients on net-zero programs",
                icon: "↗",
                color: "#8CBF3F",
              },
              {
                val: "18GW",
                label:
                  "Renewable energy capacity projects advised across wind, solar, and hydro",
                icon: "⚡",
                color: "#54C6C2",
              },
              {
                val: "60+",
                label:
                  "Decarbonization mandates completed for energy and industrial clients",
                icon: "♻",
                color: "#B3D979",
              },
              {
                val: "$4.2B",
                label:
                  "Clean energy capital projects supported through development and FEED",
                icon: "◆",
                color: "#8CBF3F",
              },
            ].map(({ val, label, icon, color }, index) => (
              <Reveal key={val} delay={index * 80}>
                <div className="impact-card p-8 md:p-9">
                  <div
                    className="impact-icon mb-8"
                    style={{
                      color,
                    }}
                  >
                    {icon}
                  </div>

                  <div
                    className="metric-number text-5xl md:text-6xl font-bold mb-5"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color,
                    }}
                  >
                    {val}
                  </div>

                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "#AFC0C2",
                      maxWidth: 230,
                    }}
                  >
                    {label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Feature cards */}
          <Reveal delay={100}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Decarbonization",
                  desc: "We build scientifically grounded, commercially viable pathways to net-zero for energy-intensive organizations.",
                  color: "#8CBF3F",
                },
                {
                  title: "McRam Engineering Solutions",
                  desc: "We combine multidisciplinary engineering expertise, practical project experience, and advanced tools to support successful project outcomes.",
                  color: "#54C6C2",
                },
                {
                  title: "Operational Efficiency",
                  desc: "Reducing energy intensity and waste is both a sustainability imperative and a direct source of commercial value.",
                  color: "#B3D979",
                },
              ].map(({ title, desc, color }) => (
                <div key={title} className="feature-card p-8 md:p-9">
                  <div
                    className="w-9 h-1 mb-7"
                    style={{
                      background: color,
                    }}
                  />

                  <h3
                    className="font-semibold text-lg mb-4"
                    style={{
                      color: "#F5F7F4",
                    }}
                  >
                    {title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "#AFC0C2",
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="cta-section py-28 md:py-36">
        <div className="cta-ring" />

        <div
          className="absolute left-[12%] bottom-[10%] w-24 h-24 rounded-full"
          style={{
            border: "1px solid rgba(84,198,194,.15)",
            animation: "ambientFloat 7s ease-in-out infinite",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <div className="section-kicker justify-center mb-6">
              <span className="section-kicker-line" />
              <span>Start a Conversation</span>
              <span className="section-kicker-line" />
            </div>

            <h2
              className="mb-7"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1,
                letterSpacing: "-.045em",
                color: "#F5F7F4",
              }}
            >
              Have a complex project{" "}
              <span style={{ color: "#8CBF3F" }}>challenge?</span>
            </h2>

            <p
              className="mb-10 mx-auto text-base md:text-lg leading-relaxed"
              style={{
                color: "#B8C9CA",
                maxWidth: 580,
              }}
            >
              Tell us about your industry context and objectives. We'll show you
              how McRam can support your project with measurable engineering
              value.
            </p>

            <button
              type="button"
              onClick={() => handleNav("contact")}
              className="cta-button px-9 py-4 font-semibold text-sm tracking-wide rounded-full"
              style={{
                background: "#8CBF3F",
                color: "#071F2A",
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Start a Conversation
                <ArrowUpRight />
              </span>
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

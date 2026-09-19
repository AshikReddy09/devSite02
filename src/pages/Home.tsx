import { useEffect, useRef, useState } from "react"

type Page = "home" | "about" | "services" | "industries" | "contact"

interface HomeProps {
  onNavigate: (page: Page) => void
}

const partnerLogos = [
  "Oil & Gas",
  "Petrochemical",
  "Power",
  "Water",
  "Utilities",
  "Offshore",
]

const stats = [
  { value: "14", label: "Core engineering capabilities" },
  { value: "7", label: "Industries and sectors served" },
  { value: "6", label: "International project locations" },
]

const valueCards = [
  {
    title: "Technical Excellence",
    description:
      "We apply sound engineering principles, technical expertise, and continuous learning to deliver high-quality solutions.",
  },
  {
    title: "Integrity & Ethics",
    description:
      "We work with honesty, transparency, and professional responsibility in every engagement.",
  },
  {
    title: "Quality & Reliability",
    description:
      "We deliver accurate, dependable, and consistently high-quality engineering solutions.",
  },
  {
    title: "Client Commitment",
    description:
      "We understand project requirements and focus on practical solutions that support successful outcomes.",
  },
]

const teamMembers = [
  {
    name: "Alex Morgan",
    title: "Managing Director",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Priya Shah",
    title: "Senior Engineering Specialist",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Daniel Brooks",
    title: "Client Strategy Lead",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
  },
]

const articles = [
  {
    category: "Technical Learning",
    date: "May 20, 2026",
    title:
      "Building dependable piping systems through disciplined stress analysis.",
    description:
      "The engineering checks that support safe, reliable, and efficient project execution.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Engineering Technologies",
    date: "Apr 01, 2026",
    title: "Using 3D modelling to improve coordination and reduce project risk.",
    description:
      "How coordinated digital models help teams identify clashes and make better design decisions.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Project Experience",
    date: "Mar 14, 2026",
    title: "Practical engineering support for complex EPC projects.",
    description:
      "A look at the capabilities and delivery discipline behind successful project outcomes.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
]

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
      },
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function RevealSection({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`${className} reveal-section ${
        visible ? "is-visible" : ""
      }`}
    >
      {children}
    </div>
  )
}

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const target = Number(value)

    if (Number.isNaN(target)) {
      setDisplay(value)
      return
    }

    let frame = 0
    const duration = 1100
    const start = performance.now()

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setDisplay(String(Math.round(target * eased)))

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [value])

  return <span ref={ref}>{display}</span>
}

export default function Home({ onNavigate }: HomeProps) {
  const handleNav = (page: Page) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="home-page">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="hero-shell">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />

        {/* Engineering motion graphics */}
        <div className="hero-grid-motion" aria-hidden="true" />

        <div className="hero-glow hero-glow--one" aria-hidden="true" />
        <div className="hero-glow hero-glow--two" aria-hidden="true" />

        <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit--two" aria-hidden="true" />

        <div className="hero-blueprint hero-blueprint--one" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="hero-blueprint hero-blueprint--two" aria-hidden="true">
          <span />
          <span />
        </div>

        <div className="hero-measure hero-measure--vertical" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow eyebrow--light hero-eyebrow">
              McRam Engineering Solutions
            </p>

            <h1 className="hero-title">
              Engineering Excellence.
              <span>Built on Expertise.</span>
            </h1>

            <p className="hero-text">
              Integrated engineering solutions for complex EPC and industrial
              projects. We combine technical expertise, advanced engineering
              tools, and practical project experience to deliver with
              precision, efficiency, and confidence.
            </p>

            <button
              className="primary-button hero-button"
              type="button"
              onClick={() => handleNav("industries")}
            >
              <span>Explore Our Capabilities</span>
              <span className="button-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Technical status line */}
        <div className="hero-status" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="partners-wrap">
          <div className="container partners">
            <span className="partners-label">Our Partners:</span>

            <div className="partner-logos" aria-label="Brand partners">
              {partnerLogos.map((logo, index) => (
                <span
                  key={logo}
                  style={{
                    animationDelay: `${index * 0.12}s`,
                  }}
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="section-surface intro-section">
        <div className="container intro-grid">
          <RevealSection className="intro-heading-wrap">
            <p className="eyebrow eyebrow--dark">About McRam</p>

            <h2>
              Engineering Expertise.
              <br />
              Practical Solutions.
            </h2>

            <div className="section-accent-line" aria-hidden="true">
              <span />
            </div>
          </RevealSection>

          <RevealSection className="intro-copy-wrap">
            <p>
              McRam Engineering Solutions is an engineering consultancy
              delivering integrated, reliable, and value-driven engineering
              solutions across the EPC sector.
            </p>

            <p>
              Our multidisciplinary capabilities span piping engineering,
              piping stress analysis, structural analysis, FEA, 3D modelling,
              specialized studies, and technical engineering support.
            </p>

            <div className="stats-grid">
              {stats.map(({ value, label }, index) => (
                <div
                  key={label}
                  className="stat-item stat-item--animated"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  <div className="stat-value">
                    <AnimatedNumber value={value} />
                    <span className="stat-plus">+</span>
                  </div>

                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* =========================================================
          FEATURE IMAGE
      ========================================================= */}
      <section className="feature-photo-section">
        <div className="container">
          <RevealSection className="feature-photo-frame">
            <div className="image-corner image-corner--tl" />
            <div className="image-corner image-corner--br" />

            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80"
              alt="Hands clasped together over a blue-toned editorial background"
            />

            <div className="feature-photo-overlay" aria-hidden="true">
              <span>ENGINEERING / DELIVERY / PERFORMANCE</span>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}
      <section className="section-surface values-section">
        <div className="container">
          <RevealSection>
            <p className="eyebrow eyebrow--dark">
              Our foundation commitment
            </p>

            <h2 className="section-heading">
              Technical excellence, quality, reliability, and disciplined
              execution.
            </h2>

            <p className="section-copy">
              We understand project challenges and apply engineering expertise
              to deliver practical, technically robust solutions aligned with
              project requirements and industry practices.
            </p>
          </RevealSection>

          <div className="value-grid">
            {valueCards.map(({ title, description }, index) => (
              <RevealSection
                key={title}
                className="value-card motion-card"
              >
                <div className="value-card__line" aria-hidden="true" />

                <div className="value-card__number">
                  0{index + 1}
                </div>

                <p className="value-card__title">{title}</p>

                <p className="value-card__description">
                  {description}
                </p>

                <div className="card-arrow" aria-hidden="true">
                  →
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          LEADERSHIP
      ========================================================= */}
      <section className="leadership-section">
        <div className="leadership-grid-lines" aria-hidden="true" />
        <div className="leadership-orbit" aria-hidden="true" />

        <div className="container leadership-panel">
          <RevealSection className="leadership-copy">
            <p className="eyebrow eyebrow--light">Leadership</p>

            <h2>
              Guided by Engineering.
              <span>Driven by Growth.</span>
            </h2>

            <p>
              McRam brings together experienced professionals and practical
              project knowledge to support clients through complex engineering
              requirements with quality and reliability.
            </p>

            <button
              type="button"
              className="text-link"
              onClick={() => handleNav("about")}
            >
              Learn More
              <span aria-hidden="true">→</span>
            </button>
          </RevealSection>

          <RevealSection className="leadership-media">
            <div className="leadership-media__frame">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="Premium office building exterior with blue-toned architectural styling"
              />

              <div className="media-tech-label" aria-hidden="true">
                <span>01</span>
                <span>STRUCTURAL / EPC</span>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* =========================================================
          TEAM
      ========================================================= */}
      <section className="section-surface team-section">
        <div className="container">
          <RevealSection className="team-header">
            <p className="eyebrow eyebrow--dark">
              Our engineering team
            </p>

            <h2>Technical expertise behind every deliverable.</h2>

            <p>
              Experienced engineering professionals who understand project
              requirements, technical challenges, and dependable delivery.
            </p>
          </RevealSection>

          <div className="team-grid">
            {teamMembers.map(({ name, title, image }, index) => (
              <RevealSection
                key={name}
                className="team-card motion-card"
              >
                <div className="team-image-wrap">
                  <img src={image} alt={name} />

                  <div className="team-index">
                    0{index + 1}
                  </div>
                </div>

                <div className="team-card__body">
                  <h3>{name}</h3>
                  <p>{title}</p>

                  <div className="team-card__line" aria-hidden="true" />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          NEWS
      ========================================================= */}
      <section className="news-section">
        <div className="news-grid-lines" aria-hidden="true" />

        <div className="container">
          <RevealSection className="news-header">
            <p className="eyebrow eyebrow--dark">Insights</p>

            <h2>
              Engineering insights and project learnings.
            </h2>
          </RevealSection>

          <div className="news-grid">
            {articles.map(
              ({ category, date, title, description, image }, index) => (
                <RevealSection
                  key={title}
                  className="article-card motion-card"
                >
                  <div className="article-image-wrap">
                    <img src={image} alt={title} />

                    <span className="article-index">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="article-card__body">
                    <div className="article-meta">
                      <span>{category}</span>
                      <span>{date}</span>
                    </div>

                    <h3>{title}</h3>

                    <p>{description}</p>

                    <button
                      type="button"
                      className="article-link"
                      onClick={() => handleNav("about")}
                    >
                      Read more
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </RevealSection>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="cta-section">
        <div className="cta-grid" aria-hidden="true" />
        <div className="cta-ring cta-ring--one" aria-hidden="true" />
        <div className="cta-ring cta-ring--two" aria-hidden="true" />

        <div className="container cta-panel">
          <div>
            <p className="eyebrow eyebrow--light">
              Let’s build the future together
            </p>

            <h2>Ready to discuss your project?</h2>
          </div>

          <button
            type="button"
            className="primary-button primary-button--inverse"
            onClick={() => handleNav("contact")}
          >
            Contact McRam
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* =========================================================
          PAGE MOTION STYLES
      ========================================================= */}
      <style>{`
        /* -------------------------------------------------------
           Base reveal
        ------------------------------------------------------- */

        .reveal-section {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.8s ease,
            transform 0.8s cubic-bezier(.2,.7,.2,1);
        }

        .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* -------------------------------------------------------
           HERO
        ------------------------------------------------------- */

        .hero-shell {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-height: 760px;
        }

        .hero-image,
        .hero-overlay,
        .hero-grid-motion {
          position: absolute;
          inset: 0;
        }

        .hero-image {
          transform: scale(1.04);
          animation: heroImageDrift 16s ease-in-out infinite alternate;
        }

        .hero-grid-motion {
          opacity: 0.18;
          background-image:
            linear-gradient(
              rgba(140,191,63,0.12) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(140,191,63,0.12) 1px,
              transparent 1px
            );
          background-size: 72px 72px;
          mask-image: linear-gradient(
            to bottom,
            rgba(0,0,0,1),
            rgba(0,0,0,.25)
          );
          animation: gridDrift 18s linear infinite;
          pointer-events: none;
        }

        .hero-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(2px);
          mix-blend-mode: screen;
        }

        .hero-glow--one {
          width: 520px;
          height: 520px;
          right: -150px;
          top: 80px;
          background:
            radial-gradient(
              circle,
              rgba(140,191,63,.20) 0%,
              rgba(140,191,63,.07) 32%,
              transparent 70%
            );
          animation: glowFloat 8s ease-in-out infinite alternate;
        }

        .hero-glow--two {
          width: 360px;
          height: 360px;
          left: -180px;
          bottom: 60px;
          background:
            radial-gradient(
              circle,
              rgba(40,150,170,.18),
              transparent 68%
            );
          animation: glowFloatReverse 10s ease-in-out infinite alternate;
        }

        .hero-orbit {
          position: absolute;
          border: 1px solid rgba(140,191,63,.25);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-orbit--one {
          width: 500px;
          height: 500px;
          right: -180px;
          top: 70px;
          animation: orbitSpin 28s linear infinite;
        }

        .hero-orbit--two {
          width: 720px;
          height: 720px;
          right: -290px;
          top: -40px;
          border-color: rgba(140,191,63,.10);
          animation: orbitSpinReverse 42s linear infinite;
        }

        .hero-blueprint {
          position: absolute;
          pointer-events: none;
          opacity: .42;
        }

        .hero-blueprint span {
          display: block;
          height: 1px;
          margin-bottom: 10px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(140,191,63,.8),
            transparent
          );
        }

        .hero-blueprint--one {
          width: 260px;
          right: 16%;
          top: 30%;
          transform: rotate(-18deg);
          animation: blueprintFloat 7s ease-in-out infinite alternate;
        }

        .hero-blueprint--two {
          width: 190px;
          left: 8%;
          bottom: 28%;
          transform: rotate(14deg);
          animation: blueprintFloatReverse 9s ease-in-out infinite alternate;
        }

        .hero-measure {
          position: absolute;
          width: 1px;
          background:
            repeating-linear-gradient(
              to bottom,
              rgba(140,191,63,.65) 0 4px,
              transparent 4px 11px
            );
          opacity: .55;
        }

        .hero-measure--vertical {
          right: 11%;
          top: 22%;
          height: 260px;
          animation: measurePulse 4s ease-in-out infinite;
        }

        .hero-measure span {
          position: absolute;
          left: -4px;
          width: 9px;
          height: 1px;
          background: rgba(140,191,63,.8);
        }

        .hero-measure span:nth-child(1) {
          top: 0;
        }

        .hero-measure span:nth-child(2) {
          top: 50%;
        }

        .hero-measure span:nth-child(3) {
          bottom: 0;
        }

        .hero-inner {
          position: relative;
          z-index: 5;
        }

        .hero-copy {
          max-width: 820px;
          padding-top: 150px;
          padding-bottom: 170px;
        }

        .hero-eyebrow {
          animation: heroReveal .9s .15s both;
        }

        .hero-title {
          animation: heroReveal 1s .28s both;
        }

        .hero-text {
          animation: heroReveal 1s .42s both;
        }

        .hero-button {
          animation: heroReveal 1s .58s both;
        }

        .button-arrow {
          display: inline-block;
          transition: transform .3s ease;
        }

        .primary-button:hover .button-arrow {
          transform: translateX(6px);
        }

        .hero-status {
          position: absolute;
          z-index: 6;
          left: 0;
          right: 0;
          bottom: 92px;
          height: 1px;
          display: flex;
          gap: 8px;
          padding: 0 7%;
          opacity: .65;
        }

        .hero-status span {
          height: 1px;
          flex: 1;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(140,191,63,.65),
              transparent
            );
          transform-origin: left;
          animation: statusSweep 4s ease-in-out infinite;
        }

        .hero-status span:nth-child(2) {
          animation-delay: .6s;
        }

        .hero-status span:nth-child(3) {
          animation-delay: 1.2s;
        }

        .hero-status span:nth-child(4) {
          animation-delay: 1.8s;
        }

        .partners-wrap {
          position: absolute;
          z-index: 10;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(3,22,30,.78);
          backdrop-filter: blur(14px);
          border-top: 1px solid rgba(255,255,255,.08);
        }

        .partners {
          min-height: 92px;
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .partners-label {
          color: rgba(255,255,255,.55);
          white-space: nowrap;
          font-size: .78rem;
          text-transform: uppercase;
          letter-spacing: .16em;
        }

        .partner-logos {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 24px;
        }

        .partner-logos span {
          color: rgba(255,255,255,.68);
          font-size: .82rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          transition:
            color .3s ease,
            transform .3s ease;
          animation: partnerAppear .8s both;
        }

        .partner-logos span:hover {
          color: #8CBF3F;
          transform: translateY(-2px);
        }

        /* -------------------------------------------------------
           INTRO
        ------------------------------------------------------- */

        .section-accent-line {
          width: 100px;
          height: 2px;
          margin-top: 28px;
          overflow: hidden;
          background: rgba(8,66,89,.12);
        }

        .section-accent-line span {
          display: block;
          width: 40%;
          height: 100%;
          background: #8CBF3F;
          animation: accentSweep 3s ease-in-out infinite;
        }

        .stats-grid {
          position: relative;
        }

        .stat-item--animated {
          animation: statRise .7s both;
        }

        .stat-plus {
          color: #8CBF3F;
          margin-left: 2px;
        }

        /* -------------------------------------------------------
           FEATURE IMAGE
        ------------------------------------------------------- */

        .feature-photo-frame {
          position: relative;
          overflow: hidden;
        }

        .feature-photo-frame img {
          transition:
            transform 1.2s cubic-bezier(.2,.7,.2,1),
            filter .8s ease;
        }

        .feature-photo-frame:hover img {
          transform: scale(1.045);
          filter: saturate(1.08);
        }

        .feature-photo-overlay {
          position: absolute;
          left: 0;
          bottom: 0;
          padding: 18px 24px;
          background: rgba(3,25,34,.82);
          color: rgba(255,255,255,.75);
          font-size: .7rem;
          letter-spacing: .16em;
        }

        .image-corner {
          position: absolute;
          z-index: 3;
          width: 38px;
          height: 38px;
          pointer-events: none;
        }

        .image-corner--tl {
          top: 18px;
          left: 18px;
          border-top: 1px solid #8CBF3F;
          border-left: 1px solid #8CBF3F;
        }

        .image-corner--br {
          right: 18px;
          bottom: 18px;
          border-right: 1px solid #8CBF3F;
          border-bottom: 1px solid #8CBF3F;
        }

        /* -------------------------------------------------------
           CARDS
        ------------------------------------------------------- */

        .motion-card {
          position: relative;
          transition:
            transform .45s cubic-bezier(.2,.7,.2,1),
            box-shadow .45s ease;
        }

        .motion-card:hover {
          transform: translateY(-8px);
        }

        .value-card {
          overflow: hidden;
        }

        .value-card__number {
          position: absolute;
          top: 18px;
          right: 22px;
          font-size: .68rem;
          letter-spacing: .14em;
          color: rgba(8,66,89,.35);
        }

        .value-card__line {
          transform-origin: left;
          transition: transform .5s ease;
        }

        .motion-card:hover .value-card__line {
          transform: scaleX(1.8);
        }

        .card-arrow {
          margin-top: 24px;
          color: #8CBF3F;
          opacity: 0;
          transform: translateX(-8px);
          transition:
            opacity .3s ease,
            transform .3s ease;
        }

        .motion-card:hover .card-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* -------------------------------------------------------
           LEADERSHIP
        ------------------------------------------------------- */

        .leadership-section {
          position: relative;
          overflow: hidden;
        }

        .leadership-grid-lines {
          position: absolute;
          inset: 0;
          opacity: .08;
          background-image:
            linear-gradient(
              rgba(255,255,255,.3) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.3) 1px,
              transparent 1px
            );
          background-size: 90px 90px;
          animation: gridDrift 24s linear infinite;
        }

        .leadership-orbit {
          position: absolute;
          width: 620px;
          height: 620px;
          right: -250px;
          top: -180px;
          border: 1px solid rgba(140,191,63,.12);
          border-radius: 50%;
          animation: orbitSpinReverse 34s linear infinite;
        }

        .leadership-media__frame {
          position: relative;
          overflow: hidden;
        }

        .leadership-media img {
          transition:
            transform 1s cubic-bezier(.2,.7,.2,1);
        }

        .leadership-media:hover img {
          transform: scale(1.035);
        }

        .media-tech-label {
          position: absolute;
          left: 20px;
          bottom: 20px;
          display: flex;
          gap: 16px;
          align-items: center;
          padding: 9px 13px;
          background: rgba(3,22,30,.82);
          backdrop-filter: blur(10px);
          color: rgba(255,255,255,.72);
          font-size: .65rem;
          letter-spacing: .14em;
        }

        .media-tech-label span:first-child {
          color: #8CBF3F;
        }

        /* -------------------------------------------------------
           TEAM
        ------------------------------------------------------- */

        .team-image-wrap {
          position: relative;
          overflow: hidden;
        }

        .team-image-wrap img {
          transition:
            transform .8s cubic-bezier(.2,.7,.2,1),
            filter .5s ease;
        }

        .team-card:hover .team-image-wrap img {
          transform: scale(1.045);
          filter: saturate(1.08);
        }

        .team-index {
          position: absolute;
          right: 16px;
          top: 16px;
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          background: rgba(3,25,34,.82);
          color: #8CBF3F;
          font-size: .68rem;
          letter-spacing: .08em;
        }

        .team-card__line {
          width: 42px;
          height: 2px;
          margin-top: 14px;
          background: #8CBF3F;
          transition: width .4s ease;
        }

        .team-card:hover .team-card__line {
          width: 76px;
        }

        /* -------------------------------------------------------
           NEWS
        ------------------------------------------------------- */

        .news-section {
          position: relative;
          overflow: hidden;
        }

        .news-grid-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .035;
          background-image:
            linear-gradient(
              rgba(8,66,89,.7) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(8,66,89,.7) 1px,
              transparent 1px
            );
          background-size: 70px 70px;
        }

        .article-image-wrap {
          position: relative;
          overflow: hidden;
        }

        .article-image-wrap img {
          transition:
            transform .8s cubic-bezier(.2,.7,.2,1);
        }

        .article-card:hover .article-image-wrap img {
          transform: scale(1.05);
        }

        .article-index {
          position: absolute;
          left: 14px;
          top: 14px;
          padding: 7px 9px;
          background: rgba(3,25,34,.8);
          color: #8CBF3F;
          font-size: .68rem;
        }

        .article-link {
          transition:
            color .3s ease,
            transform .3s ease;
        }

        .article-link:hover {
          color: #8CBF3F;
          transform: translateX(4px);
        }

        /* -------------------------------------------------------
           CTA
        ------------------------------------------------------- */

        .cta-section {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .cta-grid {
          position: absolute;
          inset: 0;
          opacity: .11;
          background-image:
            linear-gradient(
              rgba(140,191,63,.3) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(140,191,63,.3) 1px,
              transparent 1px
            );
          background-size: 65px 65px;
          animation: gridDrift 20s linear infinite;
        }

        .cta-ring {
          position: absolute;
          border: 1px solid rgba(140,191,63,.15);
          border-radius: 50%;
          pointer-events: none;
        }

        .cta-ring--one {
          width: 500px;
          height: 500px;
          right: -170px;
          top: -180px;
          animation: orbitSpin 30s linear infinite;
        }

        .cta-ring--two {
          width: 760px;
          height: 760px;
          right: -300px;
          top: -300px;
          border-color: rgba(255,255,255,.07);
          animation: orbitSpinReverse 40s linear infinite;
        }

        .cta-panel {
          position: relative;
          z-index: 2;
        }

        /* -------------------------------------------------------
           KEYFRAMES
        ------------------------------------------------------- */

        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroImageDrift {
          from {
            transform: scale(1.04) translate3d(0,0,0);
          }
          to {
            transform: scale(1.09) translate3d(-12px,-8px,0);
          }
        }

        @keyframes gridDrift {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 72px 72px;
          }
        }

        @keyframes glowFloat {
          from {
            transform: translate3d(0,0,0) scale(1);
          }
          to {
            transform: translate3d(-30px,24px,0) scale(1.08);
          }
        }

        @keyframes glowFloatReverse {
          from {
            transform: translate3d(0,0,0) scale(1);
          }
          to {
            transform: translate3d(35px,-20px,0) scale(1.1);
          }
        }

        @keyframes orbitSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbitSpinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes blueprintFloat {
          from {
            transform: translate3d(0,0,0) rotate(-18deg);
          }
          to {
            transform: translate3d(20px,-12px,0) rotate(-15deg);
          }
        }

        @keyframes blueprintFloatReverse {
          from {
            transform: translate3d(0,0,0) rotate(14deg);
          }
          to {
            transform: translate3d(-18px,10px,0) rotate(11deg);
          }
        }

        @keyframes measurePulse {
          0%, 100% {
            opacity: .25;
          }
          50% {
            opacity: .7;
          }
        }

        @keyframes statusSweep {
          0%, 100% {
            transform: scaleX(.25);
            opacity: .2;
          }
          50% {
            transform: scaleX(1);
            opacity: .9;
          }
        }

        @keyframes partnerAppear {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes accentSweep {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(250%);
          }
        }

        @keyframes statRise {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* -------------------------------------------------------
           RESPONSIVE
        ------------------------------------------------------- */

        @media (max-width: 900px) {
          .hero-shell {
            min-height: 700px;
          }

          .hero-copy {
            padding-top: 120px;
            padding-bottom: 170px;
          }

          .hero-orbit--one {
            right: -300px;
          }

          .hero-orbit--two {
            right: -420px;
          }

          .partners {
            overflow-x: auto;
            min-height: 78px;
            gap: 24px;
          }

          .partner-logos {
            min-width: 650px;
          }

          .hero-blueprint--one,
          .hero-measure {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .hero-shell {
            min-height: 680px;
          }

          .hero-copy {
            padding-top: 100px;
            padding-bottom: 150px;
          }

          .hero-grid-motion {
            background-size: 46px 46px;
          }

          .hero-orbit--one {
            width: 360px;
            height: 360px;
            right: -220px;
            top: 120px;
          }

          .hero-orbit--two {
            width: 520px;
            height: 520px;
            right: -300px;
            top: 40px;
          }

          .hero-glow--one {
            width: 350px;
            height: 350px;
            right: -160px;
          }

          .hero-status {
            bottom: 80px;
            padding: 0 24px;
          }

          .partners-label {
            display: none;
          }

          .partner-logos {
            min-width: 560px;
          }

          .partner-logos span {
            font-size: .68rem;
          }

          .feature-photo-overlay {
            font-size: .58rem;
            padding: 12px 15px;
          }
        }

        /* -------------------------------------------------------
           ACCESSIBILITY
        ------------------------------------------------------- */

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }

          .reveal-section {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}
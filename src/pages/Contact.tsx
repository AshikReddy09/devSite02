import { useState, useEffect, useRef } from "react"

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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
}: {
  children: React.ReactNode
  className?: string
}) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  )
}

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#F2F2F2",
  padding: "12px 16px",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s ease",
  fontFamily: "var(--font-sans)",
}

const labelBase: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  marginBottom: "8px",
  color: "#8CBF3F",
}

const offices = [
  {
    city: "Chennai",
    address: "Tamil Nadu\nIndia",
    phone: "044 45030319",
    email: "dmin@mcramengg.com",
    coords: "13.0827° N, 80.2707° E",
  },
]

const enquiryTypes = [
  {
    label: "General Enquiry",
    icon: "◈",
    desc: "Questions about McRam, our capabilities, or our approach.",
  },
  {
    label: "Project Enquiry",
    icon: "⬡",
    desc: "Discuss a specific project challenge or engagement.",
  },
  {
    label: "Partnership",
    icon: "◇",
    desc: "Explore strategic partnership or teaming opportunities.",
  },
]

const industries = [
  "Oil & Gas",
  "LNG",
  "Petrochemicals & Chemicals",
  "Power",
  "Water",
  "Utilities",
  "Offshore",
  "Greenfield / Brownfield Projects",
  "Other",
]

const services = [
  "Piping Engineering",
  "Piping Stress Analysis",
  "Structural Analysis & FEA",
  "3D Modelling & Engineering Studies",
  "Technical Engineering Support",
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    industry: "",
    service: "",
    description: "",
    enquiryType: "",
  })
  const [newsletter, setNewsletter] = useState("")
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const focusStyle = (field: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === field ? "#8CBF3F" : "rgba(255,255,255,0.1)",
  })

  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative pt-40 pb-20 engineering-grid"
        style={{
          background: "linear-gradient(160deg, #084259 0%, #084259 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1800&h=900&fit=crop&auto=format)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,66,89,0.92) 0%, rgba(8,66,89,0.68) 55%, rgba(8,66,89,0.42) 100%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="teal-line" />
              <span
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: "#8CBF3F" }}
              >
                Contact
              </span>
            </div>
            <h1
              className="mb-8 leading-tight"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                color: "#F2F2F2",
              }}
            >
              Let's solve your
              <br />
              <em style={{ color: "#8CBF3F", fontStyle: "italic" }}>
                next challenge.
              </em>
            </h1>
            <p
              style={{
                color: "#F2F2F2",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                maxWidth: "560px",
              }}
            >
              Tell us about your challenge, project, or opportunity. Our experts
              are ready to explore how we can help — and we respond to every
              genuine enquiry within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ENQUIRY TYPE ─────────────────────────────────────────── */}
      <section
        className="py-12"
        style={{
          background: "#084259",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {enquiryTypes.map(({ label, icon, desc }) => (
              <button
                key={label}
                onClick={() => handleChange("enquiryType", label)}
                className="p-5 text-left transition-all duration-200"
                style={{
                  border: `1px solid ${
                    form.enquiryType === label
                      ? "#8CBF3F"
                      : "rgba(255,255,255,0.08)"
                  }`,
                  background:
                    form.enquiryType === label
                      ? "rgba(140,191,63,0.08)"
                      : "transparent",
                }}
              >
                <div
                  className="text-xl mb-3"
                  style={{
                    color: form.enquiryType === label ? "#8CBF3F" : "#084259",
                  }}
                >
                  {icon}
                </div>
                <div
                  className="font-semibold text-sm mb-1"
                  style={{
                    color: form.enquiryType === label ? "#F2F2F2" : "#B3D979",
                  }}
                >
                  {label}
                </div>
                <div className="text-xs" style={{ color: "#F2F2F2" }}>
                  {desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#084259" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="flex items-center gap-3 mb-8">
                  <span className="teal-line" />
                  <span
                    className="text-xs font-medium tracking-widest uppercase"
                    style={{ color: "#8CBF3F" }}
                  >
                    Get in Touch
                  </span>
                </div>

                {submitted ? (
                  <div
                    className="p-12 text-center"
                    style={{
                      border: "1px solid rgba(140,191,63,0.3)",
                      background: "rgba(140,191,63,0.06)",
                    }}
                  >
                    <div className="text-4xl mb-4">◈</div>
                    <h3
                      className="mb-4"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "2rem",
                        color: "#F2F2F2",
                      }}
                    >
                      Message received.
                    </h3>
                    <p className="mb-6" style={{ color: "#F2F2F2" }}>
                      Thank you for reaching out. A McRam engineering expert will be in
                      touch within 24 hours to discuss your enquiry.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-sm font-semibold"
                      style={{ color: "#8CBF3F" }}
                    >
                      Send another message →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label style={labelBase}>Full Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          placeholder="Dr. Sarah Mitchell"
                          style={focusStyle("name")}
                        />
                      </div>
                      <div>
                        <label style={labelBase}>
                          Company / Organisation *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.company}
                          onChange={(e) =>
                            handleChange("company", e.target.value)
                          }
                          onFocus={() => setFocused("company")}
                          onBlur={() => setFocused(null)}
                          placeholder="Global Energy Corp"
                          style={focusStyle("company")}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label style={labelBase}>Email Address *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          placeholder="s.mitchell@company.com"
                          style={focusStyle("email")}
                        />
                      </div>
                      <div>
                        <label style={labelBase}>Phone Number</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          onFocus={() => setFocused("phone")}
                          onBlur={() => setFocused(null)}
                          placeholder="+44 20 7000 0000"
                          style={focusStyle("phone")}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label style={labelBase}>Country</label>
                        <input
                          type="text"
                          value={form.country}
                          onChange={(e) =>
                            handleChange("country", e.target.value)
                          }
                          onFocus={() => setFocused("country")}
                          onBlur={() => setFocused(null)}
                          placeholder="United Kingdom"
                          style={focusStyle("country")}
                        />
                      </div>
                      <div>
                        <label style={labelBase}>Industry Sector</label>
                        <select
                          value={form.industry}
                          onChange={(e) =>
                            handleChange("industry", e.target.value)
                          }
                          onFocus={() => setFocused("industry")}
                          onBlur={() => setFocused(null)}
                          style={{
                            ...focusStyle("industry"),
                            appearance: "none",
                          }}
                        >
                          <option value="" style={{ background: "#084259" }}>
                            Select industry...
                          </option>
                          {industries.map((i) => (
                            <option
                              key={i}
                              value={i}
                              style={{ background: "#084259" }}
                            >
                              {i}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={labelBase}>Service Required</label>
                      <select
                        value={form.service}
                        onChange={(e) =>
                          handleChange("service", e.target.value)
                        }
                        onFocus={() => setFocused("service")}
                        onBlur={() => setFocused(null)}
                        style={{ ...focusStyle("service"), appearance: "none" }}
                      >
                        <option value="" style={{ background: "#084259" }}>
                          Select a service...
                        </option>
                        {services.map((s) => (
                          <option
                            key={s}
                            value={s}
                            style={{ background: "#084259" }}
                          >
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={labelBase}>Project Description *</label>
                      <textarea
                        required
                        rows={6}
                        value={form.description}
                        onChange={(e) =>
                          handleChange("description", e.target.value)
                        }
                        onFocus={() => setFocused("description")}
                        onBlur={() => setFocused(null)}
                        placeholder="Please describe your project, challenge, or opportunity. Include any relevant details about scale, timeline, and what you're hoping to achieve..."
                        style={{
                          ...focusStyle("description"),
                          resize: "vertical",
                          minHeight: "140px",
                        }}
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        required
                        id="consent"
                        style={{ marginTop: "3px", accentColor: "#8CBF3F" }}
                      />
                      <label
                        htmlFor="consent"
                        className="text-xs leading-relaxed"
                        style={{ color: "#F2F2F2" }}
                      >
                        I agree to McRam Engineering Solutions processing my personal data
                        in accordance with our Privacy Policy, and confirm I am
                        authorised to make this enquiry.
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 font-semibold text-sm tracking-wide transition-all duration-200"
                      style={{
                        background: "#8CBF3F",
                        color: "#F2F2F2",
                        letterSpacing: "0.04em",
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background =
                          "#084259"
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background =
                          "#8CBF3F"
                      }}
                    >
                      Start a Conversation →
                    </button>
                  </form>
                )}
              </Reveal>
            </div>

            {/* Sidebar */}
            <div>
              <Reveal>
                <div className="sticky top-24 space-y-8">
                  {/* Direct contact */}
                  <div
                    className="p-6"
                    style={{
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "#084259",
                    }}
                  >
                    <div
                      className="text-xs font-semibold tracking-widest uppercase mb-4"
                      style={{ color: "#8CBF3F" }}
                    >
                      Direct Contact
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div
                          className="text-xs mb-1"
                          style={{ color: "#F2F2F2" }}
                        >
                          General enquiries
                        </div>
                        <div
                          className="text-sm font-medium"
                          style={{ color: "#B3D979" }}
                        >
                          dmin@mcramengg.com
                        </div>
                      </div>
                      <div>
                        <div
                          className="text-xs mb-1"
                          style={{ color: "#F2F2F2" }}
                        >
                          Business development
                        </div>
                        <div
                          className="text-sm font-medium"
                          style={{ color: "#B3D979" }}
                        >
                          raja@mcramengg.com
                        </div>
                      </div>
                      <div>
                        <div
                          className="text-xs mb-1"
                          style={{ color: "#F2F2F2" }}
                        >
                          Partnerships
                        </div>
                        <div
                          className="text-sm font-medium"
                          style={{ color: "#B3D979" }}
                        >
                          raja@mcramengg.com
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Response time */}
                  <div
                    className="p-6"
                    style={{
                      background: "rgba(140,191,63,0.07)",
                      border: "1px solid rgba(140,191,63,0.25)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: "#8CBF3F",
                          boxShadow: "0 0 8px #8CBF3F",
                        }}
                      />
                      <div
                        className="text-xs font-semibold"
                        style={{ color: "#8CBF3F" }}
                      >
                        Response Commitment
                      </div>
                    </div>
                    <p className="text-sm" style={{ color: "#B3D979" }}>
                      We respond to all genuine project and business enquiries
                      within{" "}
                      <strong style={{ color: "#F2F2F2" }}>24 hours</strong>,
                      typically sooner.
                    </p>
                  </div>

                  {/* Newsletter */}
                  <div
                    className="p-6"
                    style={{
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "#084259",
                    }}
                  >
                    <div
                      className="text-xs font-semibold tracking-widest uppercase mb-2"
                      style={{ color: "#F2F2F2" }}
                    >
                      Insights & Newsletter
                    </div>
                    <p className="text-xs mb-4" style={{ color: "#F2F2F2" }}>
                      Receive McRam engineering updates, technical learnings,
                      and project insights — direct to your inbox.
                    </p>
                    {newsletterSubmitted ? (
                      <div
                        className="text-xs font-medium"
                        style={{ color: "#8CBF3F" }}
                      >
                        ✓ You're subscribed. Welcome aboard.
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={newsletter}
                          onChange={(e) => setNewsletter(e.target.value)}
                          placeholder="your@email.com"
                          style={{ ...inputBase, flex: 1, padding: "8px 12px" }}
                        />
                        <button
                          onClick={() => {
                            if (newsletter) setNewsletterSubmitted(true)
                          }}
                          className="px-4 py-2 text-xs font-semibold shrink-0"
                          style={{ background: "#8CBF3F", color: "#084259" }}
                        >
                          Subscribe
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OFFICES ──────────────────────────────────────────────── */}
      <section
        className="py-28 engineering-grid"
        style={{ background: "#084259" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <span className="teal-line" />
                <span
                  className="text-xs font-medium tracking-widest uppercase"
                  style={{ color: "#8CBF3F" }}
                >
                  Global Offices
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#F2F2F2",
                }}
              >
                Where to find us
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map(({ city, address, phone, email, coords }) => (
              <Reveal key={city}>
                <div
                  className="hover-card p-8"
                  style={{
                    background: "#084259",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-6"
                    style={{
                      background: "rgba(140,191,63,0.12)",
                      color: "#8CBF3F",
                    }}
                  >
                    {city}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div
                        className="text-xs font-semibold tracking-wide uppercase mb-2"
                        style={{ color: "#F2F2F2" }}
                      >
                        Address
                      </div>
                      <p
                        className="text-sm whitespace-pre-line"
                        style={{ color: "#B3D979" }}
                      >
                        {address}
                      </p>
                    </div>
                    <div>
                      <div
                        className="text-xs font-semibold tracking-wide uppercase mb-2"
                        style={{ color: "#F2F2F2" }}
                      >
                        Contact
                      </div>
                      <div className="text-sm" style={{ color: "#B3D979" }}>
                        {phone}
                      </div>
                      <div className="text-sm" style={{ color: "#8CBF3F" }}>
                        {email}
                      </div>
                    </div>
                    <div
                      className="pt-4 flex items-center justify-between"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <span
                        className="text-xs font-mono"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "#F2F2F2",
                        }}
                      >
                        {coords}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAP / VISUAL ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ height: "400px", background: "#084259" }}
      >
        <img
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1800&h=600&fit=crop&auto=format"
          alt="Global operations map"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.3 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(140,191,63,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="teal-line" />
              <span
                className="text-xs font-mono tracking-widest uppercase"
                style={{ fontFamily: "var(--font-mono)", color: "#8CBF3F" }}
              >
                Global Operations
              </span>
              <span className="teal-line" />
            </div>
            <div className="flex gap-16 justify-center">
              {[
                { city: "London", lat: "51.5°N", lng: "0.1°W" },
                { city: "Houston", lat: "29.7°N", lng: "95.3°W" },
                { city: "Dubai", lat: "25.2°N", lng: "55.2°E" },
              ].map(({ city, lat, lng }) => (
                <div key={city} className="text-center">
                  <div
                    className="w-2 h-2 rounded-full mx-auto mb-3"
                    style={{
                      background: "#8CBF3F",
                      boxShadow: "0 0 16px rgba(140,191,63,0.6)",
                    }}
                  />
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "#F2F2F2" }}
                  >
                    {city}
                  </div>
                  <div
                    className="text-xs font-mono"
                    style={{ fontFamily: "var(--font-mono)", color: "#F2F2F2" }}
                  >
                    {lat} · {lng}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

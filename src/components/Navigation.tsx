import { useState, useEffect } from "react"
import BrandLogo from "./BrandLogo"

type Page = "home" | "about" | "services" | "industries" | "contact"

interface NavProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems: { label: string; page: Page }[] = [
  { label: "About Us", page: "about" },
  { label: "Services", page: "services" },
  { label: "Innovation & Projects", page: "industries" },
  { label: "Contact", page: "contact" },
]

export default function Navigation({ currentPage, onNavigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [currentPage])

  const handleNav = (page: Page) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header
      className="nav-shell"
      style={{
        background: "#F2F2F2",
        borderBottom: "1px solid rgba(8, 66, 89, 0.12)",
      }}
    >
      <nav className="container nav-bar">
        <button
          type="button"
          onClick={() => handleNav("home")}
          className="brand-button"
          aria-label="Go to homepage"
        >
          <BrandLogo />
        </button>

        <div className="desktop-nav" aria-label="Main navigation">
          {navItems.map(({ label, page }) => (
            <button
              key={`${page}-${label}`}
              type="button"
              onClick={() => handleNav(page)}
              className={`nav-link ${currentPage === page ? "is-active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map(({ label, page }) => (
            <button
              key={`${page}-${label}-mobile`}
              type="button"
              onClick={() => handleNav(page)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

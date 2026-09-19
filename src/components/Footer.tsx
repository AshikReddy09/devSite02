import BrandLogo from "./BrandLogo"

type Page = "home" | "about" | "services" | "industries" | "contact"

interface FooterProps {
  onNavigate: (page: Page) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: Page) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <button
            type="button"
            onClick={() => handleNav("home")}
            className="brand-button brand-button--footer"
            aria-label="Go to homepage"
          >
            <BrandLogo />
          </button>
          <p>
            Integrated engineering solutions for complex EPC and industrial
            projects, delivered with technical excellence and dependable
            execution.
          </p>
          <div className="social-links">
            <span>LinkedIn</span>
            <span>Instagram</span>
            <span>Insights</span>
          </div>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <button type="button" onClick={() => handleNav("about")}>
            About Us
          </button>
          <button type="button" onClick={() => handleNav("services")}>
            Services
          </button>
          <button type="button" onClick={() => handleNav("industries")}>
            Projects & Experience
          </button>
        </div>

        <div className="footer-column">
          <h4>Services</h4>
          <button type="button" onClick={() => handleNav("services")}>
            Piping Engineering
          </button>
          <button type="button" onClick={() => handleNav("services")}>
            Piping Stress Analysis
          </button>
          <button type="button" onClick={() => handleNav("services")}>
            Structural Analysis & FEA
          </button>
          <button type="button" onClick={() => handleNav("services")}>
            3D Modelling & Engineering Studies
          </button>
        </div>

        <div className="footer-column footer-column--contact">
          <h4>Contact</h4>
          <span>Chennai, Tamil Nadu, India</span>
          <a href="tel:+914445030319">044 45030319</a>
          <a href="mailto:dmin@mcramengg.com">dmin@mcramengg.com</a>
          <a href="mailto:raja@mcramengg.com">raja@mcramengg.com</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 McRam Engineering Solutions</span>
        <div>
          <button type="button">Privacy Policy</button>
          <button type="button">Terms</button>
          <button type="button">Cookie Settings</button>
        </div>
      </div>
    </footer>
  )
}

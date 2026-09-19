import { useState, useEffect } from "react"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Industries from "./pages/Industries"
import Contact from "./pages/Contact"
import LoadingScreen from "./components/LoadingScreen"

type Page = "home" | "about" | "services" | "industries" | "contact"

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1100)
    return () => window.clearTimeout(timer)
  }, [])

  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <div className={`min-h-full flex flex-col ${isLoading ? "is-loading" : ""}`} style={{ background: "#084259" }}>
      {isLoading && <LoadingScreen />}
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === "home" && <Home onNavigate={handleNavigate} />}
        {currentPage === "about" && <About onNavigate={handleNavigate} />}
        {currentPage === "services" && <Services onNavigate={handleNavigate} />}
        {currentPage === "industries" && (
          <Industries onNavigate={handleNavigate} />
        )}
        {currentPage === "contact" && <Contact />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  )
}

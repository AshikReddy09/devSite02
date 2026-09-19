import { useState } from "react"

export default function BrandLogo() {
  const [hasLogo, setHasLogo] = useState(true)
  const logoSrc = `${import.meta.env.BASE_URL}logo.png`

  return hasLogo ? (
    <img
      src={logoSrc}
      alt="McRam Engineering Solutions logo"
      className="brand-logo"
      onError={() => setHasLogo(false)}
    />
  ) : (
    <span className="logo-placeholder" aria-label="Logo placeholder">
      <strong>YOUR LOGO</strong>
      <small>Add public/logo.png</small>
    </span>
  )
}

import { useState } from "react"

export default function BrandLogo() {
  const [hasLogo, setHasLogo] = useState(true)

  return hasLogo ? (
    <img
      src="/logo.png"
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

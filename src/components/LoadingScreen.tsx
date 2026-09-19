import BrandLogo from "./BrandLogo"

export default function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-label="Loading McRam Engineering Solutions">
      <div className="loading-orbit">
        <span />
        <span />
        <BrandLogo />
      </div>
      <p>Engineering excellence in motion</p>
    </div>
  )
}

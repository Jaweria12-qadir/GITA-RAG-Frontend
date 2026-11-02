import { useEffect, useState } from 'react'
import LanguageSelector from './LanguageSelector'
import { getCopy } from '../services/uiCopy'

const MOBILE_NAV_QUERY = '(max-width: 760px)'

function Navbar({ isLoading, language, onLanguageChange, onNavigate, page }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const copy = getCopy(language)

  useEffect(() => {
    const media = window.matchMedia(MOBILE_NAV_QUERY)
    const handleChange = (event) => {
      if (!event.matches) setMenuOpen(false)
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  const go = (nextPage) => {
    onNavigate(nextPage)
    closeMenu()
  }

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Primary navigation">
        <button className="brand" onClick={() => go('home')} type="button">
          <span aria-hidden="true" className="brand-mark">ॐ</span>
          <span className="brand-copy">
            <span className="brand-name">{copy.brand}</span>
            <span className="brand-tagline">{copy.brandTagline}</span>
          </span>
        </button>
        <button
          aria-controls="site-navigation"
          aria-expanded={menuOpen}
          className="menu-toggle"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          <span className="sr-only">{copy.navToggle}</span>
          <span aria-hidden="true">☰</span>
        </button>
        <div className={`nav-panel${menuOpen ? ' is-open' : ''}`} id="site-navigation">
          <button className={page === 'home' ? 'is-active' : undefined} onClick={() => go('home')} type="button">
            {copy.navHome}
          </button>
          <button className={page === 'about' ? 'is-active' : undefined} onClick={() => go('about')} type="button">
            {copy.navAbout}
          </button>
          <LanguageSelector disabled={isLoading} language={language} onChange={onLanguageChange} />
        </div>
      </nav>
    </header>
  )
}

export default Navbar

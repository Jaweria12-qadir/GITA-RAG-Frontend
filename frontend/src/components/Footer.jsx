import LanguageSelector from './LanguageSelector'
import { getCopy } from '../services/uiCopy'

function Footer({ isLoading, language, onLanguageChange, onNavigate }) {
  const copy = getCopy(language)

  return (
    <footer className="site-footer">
      <div className="footer-brand-block">
        <p className="footer-brand">
          <span aria-hidden="true">ॐ</span> {copy.brand}
        </p>
        <p>{copy.footerTagline}</p>
      </div>
      <div className="footer-links">
        <button onClick={() => onNavigate('home')} type="button">{copy.navHome}</button>
        <span aria-hidden="true">·</span>
        <button onClick={() => onNavigate('about')} type="button">{copy.navAbout}</button>
        <span aria-hidden="true">·</span>
        <LanguageSelector disabled={isLoading} language={language} onChange={onLanguageChange} />
      </div>
    </footer>
  )
}

export default Footer

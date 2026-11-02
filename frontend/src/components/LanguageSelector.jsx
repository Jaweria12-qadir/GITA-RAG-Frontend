import { getCopy } from '../services/uiCopy'

function LanguageSelector({ disabled, language, onChange }) {
  const copy = getCopy(language)

  return (
    <label className="language-select">
      <span className="sr-only">{copy.languageLabel}</span>
      <select aria-label={copy.languageLabel} disabled={disabled} onChange={(event) => onChange(event.target.value)} value={language}>
        <option value="en">English</option>
        <option value="ur">اردو</option>
      </select>
    </label>
  )
}

export default LanguageSelector

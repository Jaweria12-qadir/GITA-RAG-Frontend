import { getCopy } from '../services/uiCopy'

const icons = {
  ask: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h10a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H10l-4 3v-3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  retrieve: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  generate: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5 13.7 9H19l-4.2 3.2L16.4 18 12 14.8 7.6 18l1.6-5.8L5 9h5.3z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  sources: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 5.5h9.5A2.5 2.5 0 0 1 19 8v11.5H8.5A2.5 2.5 0 0 1 6 17V6.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 17a2.5 2.5 0 0 1 2.5-2.5H19" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
}

const iconKeys = ['ask', 'retrieve', 'generate', 'sources']

function HowItWorks({ language }) {
  const copy = getCopy(language)

  return (
    <section className="how-it-works" id="how-it-works" aria-labelledby="how-it-works-title">
      <div className="section-heading">
        <p className="eyebrow dotted">{copy.howEyebrow}</p>
        <h2 id="how-it-works-title">{copy.howTitle}</h2>
      </div>
      <ol className="steps">
        {copy.howSteps.map(([number, title, description], index) => (
          <li key={number}>
            {index > 0 && <span aria-hidden="true" className="step-connector">→</span>}
            <span className="step-badge">{icons[iconKeys[index]]}</span>
            <h3>{number}. {title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default HowItWorks

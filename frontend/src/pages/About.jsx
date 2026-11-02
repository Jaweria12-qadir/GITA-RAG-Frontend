import { getCopy } from '../services/uiCopy'

const architectureIcons = ['💬', '🔍', '✦', '▣', '📄']

const stackColors = {
  React: '#61dafb',
  JavaScript: '#f7df1e',
  'HTML / CSS': '#e34f26',
  'Node.js': '#3c873a',
  'MongoDB Atlas': '#13aa52',
  'BGE-M3': '#4b7bec',
  'BM25 + RRF': '#3867d6',
  'BGE Reranker': '#8854d0',
  'Gemini / LLM': '#4285f4',
  RAGAS: '#2d98da',
}

function About({ language }) {
  const copy = getCopy(language)

  return (
    <section className="about-page section" id="about">
      <h1>{copy.aboutTitle}</h1>
      <p className="about-intro">{copy.aboutIntro}</p>
      <p className="ornament" aria-hidden="true">── ✦ ──</p>

      <h2>{copy.aboutArchitectureTitle}</h2>
      <ol className="architecture">
        {copy.aboutArchitecture.map((step, index) => (
          <li key={step}>
            <span aria-hidden="true" className="architecture-icon">{architectureIcons[index]}</span>
            <span>{step}</span>
            {index < copy.aboutArchitecture.length - 1 && <span aria-hidden="true" className="architecture-arrow">→</span>}
          </li>
        ))}
      </ol>

      <div className="about-columns">
        <div>
          <h2>{copy.aboutStackTitle}</h2>
          <ul className="tech-stack">
            {copy.aboutStack.map((item) => (
              <li key={item}>
                <span aria-hidden="true" className="stack-dot" style={{ background: stackColors[item] || '#b1843c' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{copy.aboutFeaturesTitle}</h2>
          <ul className="feature-list">
            {copy.aboutFeatures.map((item) => (
              <li key={item}><span aria-hidden="true">✓</span> {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <blockquote className="about-quote">
        “{copy.aboutQuote}”
      </blockquote>
    </section>
  )
}

export default About

import { getCopy } from '../services/uiCopy'

function LoadingState({ language }) {
  const copy = getCopy(language)

  return (
    <section className="loading-state manuscript-card" aria-live="polite" role="status">
      <span aria-hidden="true" className="spinner-ornament">✦</span>
      <span aria-hidden="true" className="spinner" />
      <div>
        <h2>{copy.loadingTitle}</h2>
        <p>{copy.loadingBody}</p>
      </div>
    </section>
  )
}

export default LoadingState

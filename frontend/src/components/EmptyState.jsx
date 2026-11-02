import { getCopy } from '../services/uiCopy'

function EmptyState({ language, onRetry }) {
  const copy = getCopy(language)

  return (
    <section className="empty-state manuscript-card" role="status">
      <p className="eyebrow">{copy.emptySourcesEyebrow}</p>
      <h2>{copy.emptySourcesTitle}</h2>
      <p>{copy.emptySourcesBody}</p>
      {onRetry && (
        <button className="secondary-button error-retry" onClick={onRetry} type="button">
          {copy.askAnother}
        </button>
      )}
    </section>
  )
}

export default EmptyState

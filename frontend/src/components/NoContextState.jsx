import { getCopy } from '../services/uiCopy'

function NoContextState({ language, onAskAnother }) {
  const copy = getCopy(language)

  return (
    <section className="empty-state manuscript-card" role="status" aria-live="polite">
      <p className="eyebrow">{copy.noContextEyebrow}</p>
      <h2>{copy.noContextTitle}</h2>
      <p>{copy.noContextBody}</p>
      {onAskAnother && (
        <button className="secondary-button error-retry" onClick={onAskAnother} type="button">
          {copy.askAnother}
        </button>
      )}
    </section>
  )
}

export default NoContextState

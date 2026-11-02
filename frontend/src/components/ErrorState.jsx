import { getCopy } from '../services/uiCopy'

function ErrorState({ language, message, onRetry }) {
  const copy = getCopy(language)

  return (
    <section className="error-state manuscript-card" role="alert">
      <p className="eyebrow">{copy.errorEyebrow}</p>
      <h2>{copy.errorTitle}</h2>
      <p>{message || copy.errorBody}</p>
      {onRetry && (
        <button className="secondary-button error-retry" onClick={onRetry} type="button">
          {copy.retry}
        </button>
      )}
    </section>
  )
}

export default ErrorState

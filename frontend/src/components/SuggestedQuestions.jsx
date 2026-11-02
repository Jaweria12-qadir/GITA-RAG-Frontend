import { getCopy } from '../services/uiCopy'

function SuggestedQuestions({ language, onSelect }) {
  const copy = getCopy(language)

  return (
    <section className="suggestions" aria-labelledby="suggestions-title">
      <h2 className="sr-only" id="suggestions-title">{copy.suggestionsTitle}</h2>
      <div className="question-list">
        <p className="eyebrow">{copy.suggestionsEyebrow}:</p>
        {copy.suggestedQuestions.slice(0, 3).map((item) => (
          <button className="suggestion" key={item.query} onClick={() => onSelect(item.query)} type="button">
            {item.label}
          </button>
        ))}
      </div>
    </section>
  )
}

export default SuggestedQuestions

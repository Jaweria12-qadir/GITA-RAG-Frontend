import { getCopy } from '../services/uiCopy'

function Searchbar({
  isLoading = false,
  language = 'en',
  notice,
  onQuestionChange,
  onSubmit,
  placeholder,
  question,
}) {
  const copy = getCopy(language)
  const resolvedPlaceholder = placeholder ?? copy.searchPlaceholder

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(question)
  }

  return (
    <form className="search-form" noValidate onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="gita-question">{copy.searchLabel}</label>
      <div className="search-field">
        <span aria-hidden="true" className="search-icon">🔍</span>
        <input
          disabled={isLoading}
          id="gita-question"
          name="question"
          onChange={(event) => onQuestionChange(event.target.value)}
          placeholder={resolvedPlaceholder}
          type="text"
          value={question}
        />
        <button disabled={isLoading} type="submit">
          {isLoading ? copy.searchingButton : <>{copy.askButton} <span aria-hidden="true">→</span></>}
        </button>
      </div>
      {notice && <p className="form-notice" role="alert">{notice}</p>}
    </form>
  )
}

export default Searchbar

import AnswerCard from '../components/AnswerCard'
import NoContextState from '../components/NoContextState'
import ErrorState from '../components/ErrorState'
import Searchbar from '../components/Searchbar'
import HowItWorks from '../components/HowItWorks'
import LoadingState from '../components/LoadingState'
import SourceCard from '../components/SourceCard'
import { getCopy } from '../services/uiCopy'
import heroArt from '../assets/krishna-arjuna.jpg'

function Home({
  children,
  errorMessage,
  language,
  notice,
  onExplore,
  onQuestionChange,
  onRetry,
  onSubmit,
  onViewVerse,
  question,
  response,
  status,
  submittedQuestion,
}) {
  const isAnswerFlow = status === 'loading' || status === 'success' || status === 'error'
  const copy = getCopy(language)
  const responseCopy = response ? getCopy(response.language) : copy
  const sources = response?.sources ?? []

  if (isAnswerFlow) {
    return (
      <section className="answer-section section answer-sheet" id="top">
        <button className="text-button back-link" onClick={onExplore} type="button">
          ← {copy.backToExplore}
        </button>
        <p className="eyebrow">{copy.yourQuestion}</p>
      <h1 className="question-title">
  {language === 'ur'
    ? copy.questionTranslations?.[submittedQuestion] ?? submittedQuestion
    : submittedQuestion}
</h1>
        <p className="ornament left" aria-hidden="true">────────────────</p>

        {status === 'loading' && <LoadingState language={language} />}

        {status === 'error' && (
          <ErrorState language={language} message={errorMessage} onRetry={onRetry} />
        )}

        {status === 'success' && response && (
          <div className={`answer-content${response.language === 'ur' ? ' urdu is-rtl' : ''}`}>
            <AnswerCard answer={response.answer} language={response.language} />

            {response.isNoContext ? (
              <NoContextState language={language} onAskAnother={onExplore} />
            ) : (
              <section
                className={`sources-section${response.language === 'ur' ? ' is-rtl' : ''}`}
                aria-labelledby="sources-title"
                dir={response.language === 'ur' ? 'rtl' : 'ltr'}
              >
                <p className="eyebrow">{responseCopy.sourcesEyebrow}</p>
                <h2 id="sources-title">{responseCopy.sourcesTitle}</h2>
                <div className="source-list">
                  {sources.map((source) => (
                    <SourceCard
                      key={source.verse_id || source.text_content}
                      language={response.language}
                      source={source}
                      onViewDetails={onViewVerse}
                    />
                  ))}
                </div>
              </section>
            )}

            <button className="ask-another" onClick={onExplore} type="button">
              {copy.askAnother}
            </button>
          </div>
        )}
      </section>
    )
  }

  return (
    <>
      <section className="hero-section" id="top">
        <div className="hero-main">
          <p className="sanskrit-banner" lang="sa">{copy.heroSanskrit}</p>
          <div className="hero-copy">
            <h1>{copy.brand}</h1>
            <p className="hero-title">{copy.heroTitle}</p>
            <p className="hero-description">{copy.heroDescription}</p>
          </div>
          <Searchbar
            language={language}
            notice={notice}
            onQuestionChange={onQuestionChange}
            onSubmit={onSubmit}
            question={question}
          />
          {children}
        </div>
        <div className="hero-art">
          <img alt={copy.heroArtAlt} src={heroArt} style={{width:'100%',height:'auto',}}/>
          <blockquote className="hero-quote">
            <p>“{copy.heroQuote}”</p>
            <cite>— {copy.heroQuoteSource}</cite>
          </blockquote>
        </div>
      </section>
      <HowItWorks language={language} />
    </>
  )
}

export default Home

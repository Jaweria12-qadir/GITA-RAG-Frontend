import { useEffect, useRef, useState } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SuggestedQuestions from './components/SuggestedQuestions'
import VerseModal from './components/VerseModal'
import About from './pages/About'
import Home from './pages/Home'
import { askQuestion } from './services/api'
import { getCopy } from './services/uiCopy'
import './App.css'

function App() {
  const [page, setPage] = useState('home')
  const [language, setLanguage] = useState('en')
  const [question, setQuestion] = useState('')
  const [submittedQuestion, setSubmittedQuestion] = useState('')
  const [notice, setNotice] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [response, setResponse] = useState(null)
  const [status, setStatus] = useState('idle')
  const [selectedVerse, setSelectedVerse] = useState(null)
  const requestIdRef = useRef(0)
  const copy = getCopy(language)
  const isRtl = language === 'ur'

  useEffect(() => {
    document.documentElement.lang = language === 'ur' ? 'ur' : 'en'
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    document.title = copy.brand
  }, [copy.brand, isRtl, language])

  const runAsk = async (nextQuestion, nextLanguage) => {
    const requestId = ++requestIdRef.current
    setPage('home')
    setStatus('loading')
    setErrorMessage('')
    setResponse(null)
    setSelectedVerse(null)

    try {
      const apiResponse = await askQuestion(nextQuestion, nextLanguage)
      if (requestId !== requestIdRef.current) return
      setResponse(apiResponse)
      setStatus('success')
    } catch {
      if (requestId !== requestIdRef.current) return
      setResponse(null)
      // Backend details can contain implementation errors; ErrorState supplies localized friendly copy.
      setErrorMessage('')
      setStatus('error')
    }
  }

  const handleQuestionSubmit = async (value) => {
    const trimmedQuestion = value.trim()
    if (!trimmedQuestion) {
      setNotice(copy.emptyQuestion)
      return
    }

    if (status === 'loading') return

    setQuestion(trimmedQuestion)
    setSubmittedQuestion(trimmedQuestion)
    setNotice('')
    setQuestion('')
    await runAsk(trimmedQuestion, language)
  }

  const handleLanguageChange = async (nextLanguage) => {
    setLanguage(nextLanguage)
    setNotice('')

    if ((status !== 'success' && status !== 'error') || !submittedQuestion || page !== 'home') return
    await runAsk(submittedQuestion, nextLanguage)
  }

  const handleRetry = () => {
    if (!submittedQuestion || status === 'loading') return
    runAsk(submittedQuestion, language)
  }

  const handleExplore = () => {
    requestIdRef.current += 1
    setStatus('idle')
    setResponse(null)
    setErrorMessage('')
    setSelectedVerse(null)
    setNotice('')
    setPage('home')
  }

  const handleNavigate = (nextPage) => {
    setPage(nextPage)
    if (nextPage === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className={`app-shell${isRtl ? ' is-rtl' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar
        isLoading={status === 'loading'}
        language={language}
        page={page}
        onLanguageChange={handleLanguageChange}
        onNavigate={handleNavigate}
      />
      <main>
        {page === 'about' ? (
          <About language={language} />
        ) : (
          <Home
            errorMessage={errorMessage}
            language={language}
            notice={notice}
            question={question}
            response={response}
            status={status}
            submittedQuestion={submittedQuestion}
            onExplore={handleExplore}
            onRetry={handleRetry}
            onViewVerse={setSelectedVerse}
            onQuestionChange={(value) => {
              setQuestion(value)
              if (notice) setNotice('')
            }}
            onSubmit={handleQuestionSubmit}
          >
            <SuggestedQuestions language={language} onSelect={handleQuestionSubmit} />
          </Home>
        )}
      </main>
      <Footer isLoading={status === 'loading'} language={language} onLanguageChange={handleLanguageChange} onNavigate={handleNavigate} />
      <VerseModal language={response?.language ?? language} verse={selectedVerse} onClose={() => setSelectedVerse(null)} />
    </div>
  )
}

export default App

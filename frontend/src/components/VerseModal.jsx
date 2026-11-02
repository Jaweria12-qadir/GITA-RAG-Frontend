import { useEffect, useRef } from 'react'
import { getCopy } from '../services/uiCopy'

function VerseModal({ language, onClose, verse }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!verse) return undefined

    const previouslyFocused = document.activeElement
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = [...document.querySelectorAll('.verse-modal button:not(:disabled), .verse-modal [href], .verse-modal [tabindex]:not([tabindex="-1"])')]
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [onClose, verse])

  if (!verse) return null

  const isUrdu = language === 'ur'
  const copy = getCopy(language)
  const translation = verse.translation || verse.text_content
  const original = verse.sanskrit || verse.original
  const transliteration = verse.transliteration
  const purport = verse.purport || verse.explanation

  const blocks = [
    original && [copy.originalVerse, original],
    transliteration && [copy.transliteration, transliteration],
    translation && [copy.verseTextHeading, translation],
    purport && [copy.purport, purport],
  ].filter(Boolean)

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()} role="presentation">
      <section
        aria-labelledby="verse-modal-title"
        aria-modal="true"
        className={`verse-modal${isUrdu ? ' is-rtl' : ''}`}
        dir={isUrdu ? 'rtl' : 'ltr'}
        role="dialog"
      >
        <button aria-label={copy.modalCloseAria} className="modal-close" onClick={onClose} ref={closeButtonRef} type="button">
          ×
        </button>
        <p className="modal-kicker"><span aria-hidden="true">—</span> {copy.modalEyebrow} <span aria-hidden="true">—</span></p>
        <h2 id="verse-modal-title">{copy.chapterVerse(verse.chapter_no, verse.verse_id)}</h2>
        {verse.chapter_name && <p className="modal-chapter">{verse.chapter_name}</p>}
        <p className="modal-speaker">
          <span aria-hidden="true">✦ </span>
          {copy.speaker} <strong>{verse.speaker}</strong>
        </p>

        {blocks.map(([title, text]) => (
          <div className="verse-block" key={title}>
            <h3><span aria-hidden="true">✦ </span>{title}</h3>
            <p>{text}</p>
          </div>
        ))}

        <button className="modal-close-btn" onClick={onClose} type="button">
          {copy.close}
        </button>
      </section>
    </div>
  )
}

export default VerseModal

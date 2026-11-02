import { getCopy } from '../services/uiCopy'

function SourceCard({ language, onViewDetails, source }) {
  const isUrdu = language === 'ur'
  const copy = getCopy(language)

  return (
    <article className={`source-card manuscript-card${isUrdu ? ' is-rtl' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
      <div className="source-card-header">
        <p className="source-reference">{copy.chapterVerse(source.chapter_no, source.verse_id)}</p>
        {source.speaker && <p className="source-speaker">{copy.speaker} {source.speaker}</p>}
      </div>
      <p className="source-text">“{source.text_content}”</p>
      <button className="text-button source-open" onClick={() => onViewDetails(source)} type="button">
        {copy.viewVerse} <span aria-hidden="true">›</span>
      </button>
    </article>
  )
}

export default SourceCard

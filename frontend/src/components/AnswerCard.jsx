import { getCopy } from '../services/uiCopy'

function AnswerCard({ answer, language }) {
  const isUrdu = language === 'ur'
  const copy = getCopy(language)

  return (
    <section className={`answer-card manuscript-card${isUrdu ? ' is-rtl' : ''}`} aria-labelledby="answer-title" dir={isUrdu ? 'rtl' : 'ltr'}>
      <p className="eyebrow"><span aria-hidden="true">✦ </span>{copy.answerEyebrow}</p>
      <h2 className="sr-only" id="answer-title">{copy.answerTitle}</h2>
      {answer.split('\n').map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  )
}

export default AnswerCard

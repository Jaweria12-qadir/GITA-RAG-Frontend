import { getMockResponse } from './mockData.js'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const ASK_PATH = import.meta.env.VITE_API_ASK_PATH || '/ask'
const USE_MOCK =
  String(import.meta.env.VITE_USE_MOCK || '').toLowerCase() === 'true' || !API_BASE_URL

export class ApiError extends Error {
  constructor(message, { status, details } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

export function isUsingMockApi() {
  return USE_MOCK
}

function normalizeSource(source = {}) {
  return {
    verse_id: String(source.verse_id ?? source.verseId ?? source.id ?? ''),
    chapter_no: Number(source.chapter_no ?? source.chapterNo ?? source.chapter ?? 0),
    chapter_name: String(source.chapter_name ?? source.chapterName ?? ''),
    speaker: String(source.speaker ?? ''),
    text_content: String(source.text_content ?? source.textContent ?? source.text ?? ''),
    sanskrit: source.sanskrit ?? source.original ?? '',
    transliteration: source.transliteration ?? '',
    translation: source.translation ?? '',
    purport: source.purport ?? source.explanation ?? '',
  }
}

function normalizeResponse(payload, question, language) {
  if (!payload || typeof payload !== 'object') {
    throw new ApiError('The server returned an empty response.')
  }

  const answer = payload.answer ?? payload.response ?? payload.generated_answer
  const sources = payload.sources ?? payload.contexts ?? payload.verses ?? []

  if (!Array.isArray(sources)) {
    throw new ApiError('The server response did not include a sources list.')
  }

  const normalizedSources = sources.map(normalizeSource).filter((source) => source.verse_id || source.text_content)
  const isNoContext =
    payload.no_context === true ||
    payload.noContext === true ||
    payload.status === 'no_context' ||
    payload.has_context === false ||
    normalizedSources.length === 0

  if (!isNoContext && (typeof answer !== 'string' || !answer.trim())) {
    throw new ApiError('The server response did not include an answer.')
  }

  return {
    question: String(payload.question ?? payload.query ?? question),
    answer: typeof answer === 'string' ? answer.trim() : '',
    language: payload.language === 'ur' || language === 'ur' ? 'ur' : 'en',
    isNoContext,
    sources: isNoContext ? [] : normalizedSources,
  }
}

async function askBackend(question, language) {
  const endpoint = `${API_BASE_URL}${ASK_PATH.startsWith('/') ? ASK_PATH : `/${ASK_PATH}`}`

  let response
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, language }),
    })
  } catch {
    throw new ApiError('Unable to reach the GITA RAG server. Check that the backend is running.')
  }

  let payload = null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    try {
      payload = await response.json()
    } catch {
      payload = null
    }
  }

  if (!response.ok) {
    const detail =
      (payload && (payload.detail || payload.message || payload.error)) ||
      `Request failed with status ${response.status}.`
    throw new ApiError(typeof detail === 'string' ? detail : 'The server could not process this question.', {
      status: response.status,
      details: payload,
    })
  }

  return normalizeResponse(payload, question, language)
}

function askMock(question, language) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(normalizeResponse(getMockResponse(question, language), question, language)), 800)
  })
}

export function askQuestion(question, language) {
  if (USE_MOCK) {
    return askMock(question, language)
  }

  return askBackend(question, language)
}

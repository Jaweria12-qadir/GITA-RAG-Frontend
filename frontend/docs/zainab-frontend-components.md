# Supporting frontend components

These components are the supporting UI layer for GITA RAG. They contain no request logic; the page/service layer owns requests and state transitions.

## LanguageSelector

Use `language` (`"en"` or `"ur"`) and `onChange(nextLanguage)`. Set `disabled` while a request is loading. `App.jsx` applies the matching document `lang` and `dir` values.

## LoadingState

Use `language`. It presents an accessible, localized progress message while the parent is awaiting a request.

## ErrorState

Use `language` and `onRetry`. The component intentionally shows only the localized friendly error copy, never technical backend details. The parent owns retry behavior.

## NoContextState

Use `language` and `onAskAnother`. It is for a successful request that does not have enough relevant verses, not network or server failures.

## API boundary

`services/api.js` accepts the agreed response shape (`question`, `answer`, `language`, `sources`) and also recognizes `no_context`, `noContext`, `status: "no_context"`, or `has_context: false`. A response with no sources is treated as no-context so an unsupported answer is never displayed as grounded.

For local mock verification, submit `__no_context__` while mock mode is enabled. This shows the no-context state without changing Bhagavad Gita data.

## Verification checklist

Test the flows in both English and Urdu: idle, loading, answer with sources, error/retry, and no-context/ask-another. Check Tab, Shift+Tab, Enter, Space, and Escape; the verse dialog receives focus, traps Tab, closes on Escape, and restores focus. Check 1440px, 1366px, 768px, 390px, and 360px widths with long English and Urdu text.

import { useCallback, useEffect, useState } from 'react'
import type { CSSProperties, MouseEvent, PointerEvent } from 'react'
import { play, preloadAll, unlockAudio, usePlayback } from './audio'
import type { Playback } from './audio'
import { useOfflineStatus } from './offline'
import { PAGES } from './sounds'
import type { Sound } from './sounds'
import './App.css'

const ICON_URL = `${import.meta.env.BASE_URL}favicon.svg`
const PAGE_KEY = 'rocky-soundboard:page'

function readSavedPage(): number {
  try {
    const saved = Number(localStorage.getItem(PAGE_KEY))
    return Number.isInteger(saved) && saved >= 0 && saved < PAGES.length ? saved : 0
  } catch {
    return 0
  }
}

function usePage(): [number, (page: number) => void] {
  const [page, setPageState] = useState(readSavedPage)
  const setPage = useCallback((next: number) => {
    const clamped = Math.min(Math.max(next, 0), PAGES.length - 1)
    setPageState(clamped)
    try {
      localStorage.setItem(PAGE_KEY, String(clamped))
    } catch {
      // Storage can be unavailable (private mode, blocked site data); the page just won't persist.
    }
  }, [])
  return [page, setPage]
}

function OfflineBadge() {
  const status = useOfflineStatus()
  if (status === 'unsupported') return null
  const ready = status === 'ready'
  const text = ready ? 'Works offline' : 'Saving for offline…'
  return (
    <div className="offline-badge" data-ready={ready || undefined} role="status" title={text}>
      <span className="offline-badge__icon" aria-hidden="true" />
      <span className="offline-badge__text">{text}</span>
    </div>
  )
}

function Pager({ page, onChange }: { page: number; onChange: (page: number) => void }) {
  return (
    <nav className="pager" aria-label="Pages">
      {PAGES.map((_, index) => (
        <button
          key={index}
          type="button"
          className="pager__button"
          aria-current={index === page ? 'page' : undefined}
          aria-label={`Page ${index + 1}`}
          onClick={() => onChange(index)}
        >
          {index + 1}
        </button>
      ))}
    </nav>
  )
}

/** Grid size along the long and short screen axes; short pages get bigger buttons. */
function boardStyle(count: number): CSSProperties {
  const long = count > 12 ? 5 : 4
  return { '--long': long, '--short': Math.ceil(count / long) } as CSSProperties
}

function Pad({ sound, playback }: { sound: Sound; playback: Playback | null }) {
  const playing = playback?.id === sound.id
  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    // Trigger on press rather than release so taps feel instant. Ignore secondary mouse buttons.
    if (event.pointerType === 'mouse' && event.button !== 0) return
    play(sound.id)
  }
  // Keyboard activation (Enter or Space) arrives as a click with no pointer press before it.
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) play(sound.id)
  }

  return (
    <button
      type="button"
      className={`pad pad--${sound.tone}`}
      data-playing={playing || undefined}
      aria-label={sound.label}
      onPointerDown={onPointerDown}
      onClick={onClick}
    >
      <span className="pad__emoji" aria-hidden="true">
        {sound.emoji}
      </span>
      <span className="pad__label">{sound.label}</span>
      {playing && playback.duration > 0 && (
        <span
          key={playback.token}
          className="pad__progress"
          style={{ animationDuration: `${playback.duration}s` }}
        />
      )}
    </button>
  )
}

function App() {
  const playback = usePlayback()
  const [page, setPage] = usePage()

  useEffect(() => {
    preloadAll()
    // iOS only unlocks audio inside certain gestures, so try on all of them.
    const events = ['pointerdown', 'touchend', 'click', 'keydown'] as const
    events.forEach((name) => document.addEventListener(name, unlockAudio, { passive: true }))
    return () => events.forEach((name) => document.removeEventListener(name, unlockAudio))
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === 'ArrowLeft') setPage(page - 1)
      else if (event.key === 'ArrowRight') setPage(page + 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [page, setPage])

  return (
    <div className="app">
      <header className="masthead">
        <img className="masthead__logo" src={ICON_URL} alt="" />
        <h1 className="masthead__title">
          Rocky <span>soundboard</span>
        </h1>
        {PAGES.length > 1 && <Pager page={page} onChange={setPage} />}
        <OfflineBadge />
      </header>
      <main className="pages" onContextMenu={(event) => event.preventDefault()}>
        <div className="pages__track" style={{ '--page': page } as CSSProperties}>
          {PAGES.map((sounds, index) => (
            <section
              key={index}
              className="board"
              style={boardStyle(sounds.length)}
              aria-label={`Page ${index + 1}`}
              // Off-screen pages must not be tappable or reachable by keyboard.
              inert={index !== page}
            >
              {sounds.map((sound) => (
                <Pad key={sound.id} sound={sound} playback={playback} />
              ))}
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App

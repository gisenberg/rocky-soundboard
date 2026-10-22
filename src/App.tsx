import { useEffect } from 'react'
import type { MouseEvent, PointerEvent } from 'react'
import { play, preloadAll, unlockAudio, usePlayback } from './audio'
import { useOfflineStatus } from './offline'
import { SOUNDS } from './sounds'
import type { Sound } from './sounds'
import './App.css'

const ICON_URL = `${import.meta.env.BASE_URL}favicon.svg`

function OfflineBadge() {
  const status = useOfflineStatus()
  if (status === 'unsupported') return null
  const ready = status === 'ready'
  return (
    <div className="offline-badge" data-ready={ready || undefined} role="status">
      <span className="offline-badge__icon" aria-hidden="true" />
      {ready ? 'Works offline' : 'Saving for offline…'}
    </div>
  )
}

function Pad({ sound, playing, duration, token }: { sound: Sound; playing: boolean; duration: number; token: number }) {
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
      className={`pad pad--${sound.mood}`}
      data-playing={playing || undefined}
      aria-label={sound.label}
      onPointerDown={onPointerDown}
      onClick={onClick}
    >
      <span className="pad__emoji" aria-hidden="true">
        {sound.emoji}
      </span>
      <span className="pad__label">{sound.label}</span>
      {playing && duration > 0 && (
        <span key={token} className="pad__progress" style={{ animationDuration: `${duration}s` }} />
      )}
    </button>
  )
}

function App() {
  const playback = usePlayback()

  useEffect(() => {
    preloadAll()
    // iOS only unlocks audio inside certain gestures, so try on all of them.
    const events = ['pointerdown', 'touchend', 'click', 'keydown'] as const
    events.forEach((name) => document.addEventListener(name, unlockAudio, { passive: true }))
    return () => events.forEach((name) => document.removeEventListener(name, unlockAudio))
  }, [])

  return (
    <div className="app">
      <header className="masthead">
        <img className="masthead__logo" src={ICON_URL} alt="" />
        <h1 className="masthead__title">
          Rocky <span>soundboard</span>
        </h1>
        <OfflineBadge />
      </header>
      <main className="board" onContextMenu={(event) => event.preventDefault()}>
        {SOUNDS.map((sound) => {
          const playing = playback?.id === sound.id
          return (
            <Pad
              key={sound.id}
              sound={sound}
              playing={playing}
              duration={playing ? playback.duration : 0}
              token={playing ? playback.token : 0}
            />
          )
        })}
      </main>
    </div>
  )
}

export default App

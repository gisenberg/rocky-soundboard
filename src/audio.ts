import { useSyncExternalStore } from 'react'
import { SOUNDS, soundUrl } from './sounds'

export interface Playback {
  id: string
  duration: number
  // Increments on every play so a restart of the same sound re-keys its progress animation.
  token: number
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
  interface Navigator {
    // Safari 16.4+: lets Web Audio play even when the iOS ring/silent switch is on silent.
    audioSession?: { type: string }
  }
}

const AudioContextClass = window.AudioContext ?? window.webkitAudioContext
const ctx: AudioContext | null = AudioContextClass ? new AudioContextClass({ latencyHint: 'interactive' }) : null

if (navigator.audioSession) {
  navigator.audioSession.type = 'playback'
}

const buffers = new Map<string, Promise<AudioBuffer | null>>()
let token = 0
let playback: Playback | null = null
let stopCurrent: (() => void) | null = null
const listeners = new Set<() => void>()

function setPlayback(next: Playback | null) {
  playback = next
  listeners.forEach((listener) => listener())
}

function loadBuffer(id: string): Promise<AudioBuffer | null> {
  let pending = buffers.get(id)
  if (!pending) {
    pending = fetch(soundUrl(id))
      .then((response) => {
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
        return response.arrayBuffer()
      })
      .then((data) => ctx!.decodeAudioData(data))
      .catch((error: unknown) => {
        console.warn(`Could not decode ${id}, falling back to <audio>`, error)
        // Forget the failure so a later attempt (e.g. once back online) can retry.
        buffers.delete(id)
        return null
      })
    buffers.set(id, pending)
  }
  return pending
}

/** Fetch and decode every clip up front so the first tap on each button is instant. */
export function preloadAll() {
  if (!ctx) return
  SOUNDS.forEach((sound) => void loadBuffer(sound.id))
}

/**
 * Some browsers only allow an AudioContext to start inside a user gesture. Call this from every
 * gesture; it is a no-op once the context is running.
 */
export function unlockAudio() {
  if (ctx && ctx.state !== 'running') void ctx.resume().catch(() => {})
}

function playBuffer(id: string, buffer: AudioBuffer, myToken: number) {
  const source = ctx!.createBufferSource()
  source.buffer = buffer
  source.connect(ctx!.destination)
  source.onended = () => {
    if (token === myToken) {
      stopCurrent = null
      setPlayback(null)
    }
  }
  source.start()
  stopCurrent = () => {
    source.onended = null
    source.stop()
    source.disconnect()
  }
  setPlayback({ id, duration: buffer.duration, token: myToken })
}

function playElement(id: string, myToken: number) {
  const audio = new Audio(soundUrl(id))
  const finish = () => {
    if (token === myToken) {
      stopCurrent = null
      setPlayback(null)
    }
  }
  audio.onended = finish
  audio.onerror = finish
  audio.onloadedmetadata = () => {
    if (token === myToken) setPlayback({ id, duration: audio.duration, token: myToken })
  }
  stopCurrent = () => {
    audio.onended = null
    audio.onerror = null
    audio.pause()
  }
  audio.play().catch(finish)
}

/** Play a sound, cutting off whatever is currently playing. Re-tapping a sound restarts it. */
export function play(id: string) {
  unlockAudio()
  stopCurrent?.()
  stopCurrent = null
  const myToken = ++token

  if (!ctx) {
    playElement(id, myToken)
    return
  }

  // Show the button as active immediately, even if the buffer is still decoding.
  setPlayback({ id, duration: 0, token: myToken })
  void loadBuffer(id).then((buffer) => {
    if (token !== myToken) return
    if (buffer) playBuffer(id, buffer, myToken)
    else playElement(id, myToken)
  })
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function usePlayback(): Playback | null {
  return useSyncExternalStore(subscribe, () => playback)
}

import { useSyncExternalStore } from 'react'
import { registerSW } from 'virtual:pwa-register'
import { SOUNDS, soundUrl } from './sounds'

export type OfflineStatus = 'unsupported' | 'preparing' | 'ready'

const supported = !import.meta.env.DEV && 'serviceWorker' in navigator && 'caches' in window
let status: OfflineStatus = supported ? 'preparing' : 'unsupported'
const listeners = new Set<() => void>()

function setStatus(next: OfflineStatus) {
  if (next === status) return
  status = next
  listeners.forEach((listener) => listener())
}

// Every clip must be in the service worker's cache before the board can be trusted offline.
async function allSoundsCached(): Promise<boolean> {
  const results = await Promise.all(
    SOUNDS.map((sound) =>
      // Precache entries carry a revision query string, so ignore the search part.
      caches.match(new URL(soundUrl(sound.id), location.href).href, { ignoreSearch: true }),
    ),
  )
  return results.every(Boolean)
}

async function check() {
  const ready = navigator.serviceWorker.controller !== null && (await allSoundsCached())
  setStatus(ready ? 'ready' : 'preparing')
}

/** Register the service worker that precaches the app shell and every clip. Call once. */
export function startOfflineSupport() {
  if (!supported) return

  registerSW({
    immediate: true,
    onOfflineReady: () => void check(),
    onRegisteredSW: (_url, registration) => {
      // Pick up new deployments when a long-lived tab or home screen app is reopened.
      document.addEventListener('visibilitychange', () => {
        if (registration && document.visibilityState === 'visible' && navigator.onLine) {
          void registration.update()
        }
      })
      void check()
    },
  })
  navigator.serviceWorker.addEventListener('controllerchange', () => void check())
  void check()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useOfflineStatus(): OfflineStatus {
  return useSyncExternalStore(subscribe, () => status)
}

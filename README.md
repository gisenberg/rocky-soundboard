# Rocky Soundboard

A touch-friendly soundboard of Rocky lines from *Project Hail Mary* (2026), hosted on GitHub Pages.

Live at https://gisenberg.github.io/rocky-soundboard/

## Offline use

The first visit installs a service worker that precaches the page, fonts, icons and every clip.
Once the header badge reads **Works offline**, the device can be disconnected and the board keeps working, including after a reload.
On iPad or iPhone, use Share → Add to Home Screen to launch it full screen like an app.

## Development

```sh
npm install
npm run dev      # dev server (service worker disabled)
npm run build    # type-check and build to dist/
npm run preview  # serve the production build, service worker included
```

Pushing to `main` deploys via `.github/workflows/deploy-pages.yml`.

## Adding or changing sounds

1. Put a loudness-normalized MP3 in `public/audio/` (clips here are normalized to -16 LUFS with a -1.5 dBTP ceiling).
2. Add an entry to `src/sounds.ts`; its `id` is the file name without `.mp3`.

The grid is 5x4 in landscape and 4x5 in portrait, so keep the list at 20 or adjust `.board` in `src/App.css`.

Icons are generated from `public/favicon.svg` with `npm run generate-pwa-assets`.

## Credits

Audio clips are short excerpts from *Project Hail Mary* (Amazon MGM Studios), cut from fan uploads on myinstants.com and from official clips and trailers.
All rights belong to their owners; this is a non-commercial fan project.

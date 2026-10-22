# Rocky Soundboard

A touch-friendly soundboard of Rocky lines from *Project Hail Mary* (2026), hosted on GitHub Pages.
The first two pages are translated lines; the third is Rocky's untranslated Eridian chords.

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
2. Add an entry to a page in `src/sounds.ts`; its `id` is the file name without `.mp3`.

A page of up to 12 clips is a 4x3 grid in landscape and 3x4 in portrait.
A fuller page is 5x4 in landscape and 4x5 in portrait, so keep pages at 20 clips or fewer.
Add another array to `PAGES` for another page; the pager in the header appears automatically.

Every clip should be Rocky himself, not Grace repeating or correcting him, so check the speaker before adding one.
Cut clips from official clips or movie-scene uploads, not fan compilations, which often add their own background music.

Icons are generated from `public/favicon.svg` with `npm run generate-pwa-assets`.

## Credits

Audio clips are short excerpts from *Project Hail Mary* (Amazon MGM Studios), cut from official clips, trailers and movie-scene uploads, plus two fan uploads on myinstants.com.
The isolated Eridian words come from a breakdown of Rocky's voice by the film's sound designer.
All rights belong to their owners; this is a non-commercial fan project.

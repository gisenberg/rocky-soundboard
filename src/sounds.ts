export type Tone = 'amber' | 'teal' | 'rose' | 'violet' | 'pumpkin' | 'candy' | 'slime'

export interface Sound {
  id: string
  label: string
  emoji: string
  tone: Tone
}

export interface Page {
  sounds: readonly Sound[]
  /** Restyles the whole app while the page is showing. */
  theme?: 'halloween'
  /** Shown on the pager button in place of the page number. */
  icon?: string
  /** Replaces "soundboard" in the header while the page is showing. */
  subtitle?: string
}

// Order matters: each page's grid fills row by row, one tone per row in landscape. Pages of 12 or
// fewer clips get a 4x3 grid and fuller pages a 5x4 one, so keep pages at 20 or fewer. Every clip on
// the first three pages is Rocky (verified against reference samples of Rocky's and Grace's voices)
// and is cut from an official clip or movie-scene upload.
const PAGE_1: readonly Sound[] = [
  { id: 'amaze', label: 'Amaze, amaze, amaze!', emoji: '✨', tone: 'amber' },
  { id: 'fist-my-bump', label: 'Fist my bump!', emoji: '👊', tone: 'amber' },
  { id: 'words-of-encouragement', label: 'Words of great encouragement', emoji: '📣', tone: 'amber' },
  { id: 'we-can-go-home', label: 'We can go home, statement', emoji: '🏠', tone: 'amber' },
  { id: 'i-am-rocky', label: 'I am Rocky', emoji: '🪨', tone: 'amber' },

  { id: 'hi-grace', label: 'Hi, Grace', emoji: '👋', tone: 'teal' },
  { id: 'hello-grace-friend', label: 'Hello, Grace friend', emoji: '🤝', tone: 'teal' },
  { id: 'who-is-grace-talking-to', label: 'Who is Grace talking to? Question.', emoji: '❓', tone: 'teal' },
  { id: 'can-hear', label: 'Can hear. Who are you talking to?', emoji: '👂', tone: 'teal' },
  { id: 'grace-say-you-can-hear-this', label: 'Yes. Grace say you can hear this.', emoji: '🔊', tone: 'teal' },

  { id: 'dirty-dirty-dirty', label: 'Dirty, dirty, dirty, dirty, dirty', emoji: '🧼', tone: 'rose' },
  { id: 'room-boring', label: 'This room boring', emoji: '🥱', tone: 'rose' },
  { id: 'room-garbage', label: 'This room for garbage?', emoji: '🗑️', tone: 'rose' },
  { id: 'grace-look-disgust', label: 'Grace look disgust when eat', emoji: '🤢', tone: 'rose' },
  { id: 'put-this-down-here', label: 'Put this down here, question.', emoji: '📦', tone: 'rose' },

  { id: 'big-science', label: 'Grace and Rocky, big science', emoji: '🔬', tone: 'violet' },
  { id: 'so-rocky-no-dying', label: 'So Rocky no dying. Grace atmosphere. I come up.', emoji: '🫧', tone: 'violet' },
  { id: 'save-stars', label: 'If Grace, Rocky save stars', emoji: '⭐', tone: 'violet' },
  { id: 'it-is-time-go', label: 'It is time go', emoji: '🚀', tone: 'violet' },
  { id: 'not-let-grace-die', label: 'I will not let Grace die', emoji: '💛', tone: 'violet' },
]

const PAGE_2: readonly Sound[] = [
  { id: 'grace-go-home', label: 'Grace go home', emoji: '🏡', tone: 'teal' },
  { id: 'i-can-give', label: 'I can give', emoji: '🎁', tone: 'teal' },
  { id: 'rocky-fix', label: 'Rocky fix', emoji: '🔧', tone: 'teal' },
  { id: 'risk-self', label: 'To risk self. To help another.', emoji: '🫂', tone: 'teal' },
  { id: 'i-like', label: 'I like', emoji: '👍', tone: 'teal' },

  { id: 'how-much-astrophage', label: 'How much astrophage you need, question?', emoji: '⛽', tone: 'amber' },
  { id: 'so-what-we-do-now', label: 'So what we do now, question?', emoji: '🤔', tone: 'amber' },
  { id: 'what-happens-grace', label: 'So what happens, Grace? Question.', emoji: '🔮', tone: 'amber' },
  { id: 'tell-them-yourself', label: 'Why not you tell them yourself when you return home? Question.', emoji: '📡', tone: 'amber' },
  { id: 'need-word', label: 'Need word', emoji: '💬', tone: 'amber' },

  { id: 'crew-die', label: 'Rocky watch crew die', emoji: '🥀', tone: 'rose' },
  { id: 'could-not-fix', label: 'Could not fix', emoji: '💔', tone: 'rose' },
  { id: 'grace-will-die', label: 'Grace say Grace will die', emoji: '😢', tone: 'rose' },
  { id: 'so-grace-die', label: 'So Grace die? Question?', emoji: '😟', tone: 'rose' },
  { id: 'no-grace-go-home', label: 'No. Grace say Grace, go home.', emoji: '✋', tone: 'rose' },

  { id: 'six-years-slower', label: 'I go home six years slower', emoji: '🐢', tone: 'violet' },
  { id: 'breeder-tank', label: 'Rocky breeder tank design', emoji: '🧪', tone: 'violet' },
  { id: 'human-technology', label: 'Rocky want see human technology', emoji: '🛰️', tone: 'violet' },
  { id: 'make-peace', label: 'What mean, make peace?', emoji: '🕊️', tone: 'violet' },
  { id: 'made-peace', label: 'I thought you made peace, question?', emoji: '🤨', tone: 'violet' },
]

// Rocky's own Eridian chords, untranslated. The words come from the film's sound designer playing
// them in isolation, Adrian from the Petrova Line scene, and the rest from the first contact scene.
const PAGE_3: readonly Sound[] = [
  { id: 'eridian-rocky', label: 'Rocky (full name)', emoji: '🪨', tone: 'amber' },
  { id: 'eridian-grace', label: 'Grace', emoji: '🧑‍🚀', tone: 'amber' },
  { id: 'eridian-adrian', label: 'Adrian', emoji: '💞', tone: 'amber' },
  { id: 'eridian-question', label: 'Question', emoji: '❓', tone: 'amber' },

  { id: 'eridian-amaze', label: 'Amaze, amaze, amaze', emoji: '🐋', tone: 'teal' },
  { id: 'eridian-oxygen', label: 'Oxygen', emoji: '🫧', tone: 'teal' },
  { id: 'eridian-save-stars', label: 'Grace, Rocky, save stars', emoji: '⭐', tone: 'teal' },
  { id: 'eridian-goodbye', label: 'Goodbye (limb rub)', emoji: '👋', tone: 'teal' },

  { id: 'first-contact', label: 'First contact', emoji: '🛸', tone: 'violet' },
  { id: 'rocky-answers', label: 'Rocky answers', emoji: '💬', tone: 'violet' },
  { id: 'rocky-hums', label: 'Rocky hums', emoji: '🎵', tone: 'violet' },
  { id: 'rocky-insists', label: 'Rocky insists', emoji: '☝️', tone: 'violet' },
]

// New Halloween lines, not from the film: a voice-cloning model speaks them in Rocky's voice, using
// a reference made from the translated clips above.
const PAGE_HALLOWEEN: readonly Sound[] = [
  { id: 'halloween-trick-or-treat', label: 'Trick or treat, question?', emoji: '🎃', tone: 'pumpkin' },
  { id: 'halloween-happy-halloween', label: 'Happy Halloween, Grace!', emoji: '🧡', tone: 'pumpkin' },
  { id: 'halloween-give-candy', label: 'Give candy, or Rocky do trick. Statement.', emoji: '🪄', tone: 'pumpkin' },
  { id: 'halloween-rocky-is-ghost', label: 'Rocky is ghost. Boo. Statement.', emoji: '👻', tone: 'pumpkin' },
  { id: 'halloween-spooky', label: 'Spooky, spooky, spooky!', emoji: '🕸️', tone: 'pumpkin' },

  { id: 'halloween-amaze-candy', label: 'Amaze, amaze, amaze! So much candy!', emoji: '🍬', tone: 'candy' },
  { id: 'halloween-fist-my-bump-candy', label: 'Fist my bump! Much candy!', emoji: '👊', tone: 'candy' },
  { id: 'halloween-candy-corn', label: 'Candy corn is garbage. Statement.', emoji: '🌽', tone: 'candy' },
  { id: 'halloween-toothbrush', label: 'This house give toothbrush. Bad house.', emoji: '🪥', tone: 'candy' },
  { id: 'halloween-eat-all-candy', label: 'Rocky eat all candy. Rocky sorry. Not sorry.', emoji: '🍫', tone: 'candy' },

  { id: 'halloween-carve-face', label: 'Why humans carve face in food, question?', emoji: '🔪', tone: 'slime' },
  { id: 'halloween-pumpkin-lamp', label: 'Pumpkin is food? Or is lamp? Question.', emoji: '🏮', tone: 'slime' },
  { id: 'halloween-pumpkin-dirty', label: 'Dirty, dirty, dirty! Pumpkin inside very dirty!', emoji: '🧼', tone: 'slime' },
  { id: 'halloween-every-door', label: 'Children ask for food at every door. Very strange tradition.', emoji: '🚪', tone: 'slime' },
  { id: 'halloween-costume', label: 'Grace wear costume. Grace look like Rocky! Amaze!', emoji: '🎭', tone: 'slime' },

  { id: 'halloween-no-eyes', label: 'Rocky not scared. Rocky has no eyes.', emoji: '😎', tone: 'violet' },
  { id: 'halloween-bat', label: 'Rocky like bat. Bat see with sound, like Rocky.', emoji: '🦇', tone: 'violet' },
  { id: 'halloween-skeleton', label: 'Skeleton on outside. Like Rocky. Good design.', emoji: '💀', tone: 'violet' },
  { id: 'halloween-grace-scared', label: 'Grace scared, question? Rocky protect Grace.', emoji: '🛡️', tone: 'violet' },
  { id: 'halloween-monster-under-bed', label: 'Monster under bed, question? Rocky check. No monster. Only sock.', emoji: '🧦', tone: 'violet' },
]

export const PAGES: readonly Page[] = [
  { sounds: PAGE_1 },
  { sounds: PAGE_2 },
  { sounds: PAGE_3 },
  { sounds: PAGE_HALLOWEEN, theme: 'halloween', icon: '🎃', subtitle: 'Halloween · AI voice' },
]

export const SOUNDS: readonly Sound[] = PAGES.flatMap((page) => page.sounds)

export function soundUrl(id: string): string {
  return `${import.meta.env.BASE_URL}audio/${id}.mp3`
}

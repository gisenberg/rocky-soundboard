export type Tone = 'amber' | 'teal' | 'rose' | 'violet'

export interface Sound {
  id: string
  label: string
  emoji: string
  tone: Tone
}

// Order matters: each page's grid fills row by row, one tone per row in landscape. Keep pages at
// 20 or fewer clips to fit the 5x4 grid. Every clip is Rocky speaking (verified against reference
// samples of Rocky's and Grace's voices) and is cut from an official clip or movie-scene upload.
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

export const PAGES: readonly (readonly Sound[])[] = [PAGE_1, PAGE_2]

export const SOUNDS: readonly Sound[] = PAGES.flat()

export function soundUrl(id: string): string {
  return `${import.meta.env.BASE_URL}audio/${id}.mp3`
}

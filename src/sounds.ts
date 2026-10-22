export type Mood = 'joy' | 'friend' | 'grumpy' | 'mission'

export interface Sound {
  id: string
  label: string
  emoji: string
  mood: Mood
}

// Order matters: the grid fills row by row, grouped by mood.
export const SOUNDS: readonly Sound[] = [
  { id: 'amaze', label: 'Amaze, amaze, amaze!', emoji: '✨', mood: 'joy' },
  { id: 'words-of-encouragement', label: 'Words of great encouragement', emoji: '📣', mood: 'joy' },
  { id: 'circle-planet', label: 'Medium Rough Texture Circle Planet', emoji: '🪐', mood: 'joy' },
  { id: 'we-can-go-home', label: 'We can go home, statement', emoji: '🏠', mood: 'joy' },
  { id: 'rocky-sings', label: 'Rocky sings', emoji: '🎶', mood: 'joy' },

  { id: 'hi-grace', label: 'Hi, Grace', emoji: '👋', mood: 'friend' },
  { id: 'hello-grace-friend', label: 'Hello, Grace friend', emoji: '🤝', mood: 'friend' },
  { id: 'i-am-rocky', label: 'I am Rocky', emoji: '🪨', mood: 'friend' },
  { id: 'who-is-grace-talking-to', label: 'Who is Grace talking to? Question.', emoji: '❓', mood: 'friend' },
  { id: 'can-hear', label: 'Can hear. Who are you talking to?', emoji: '👂', mood: 'friend' },

  { id: 'apology', label: 'Apology, apology, apology', emoji: '🙇', mood: 'grumpy' },
  { id: 'dirty-dirty-dirty', label: 'Dirty, dirty, dirty', emoji: '🧼', mood: 'grumpy' },
  { id: 'room-boring', label: 'This room boring', emoji: '🥱', mood: 'grumpy' },
  { id: 'room-garbage', label: 'This room for garbage?', emoji: '🗑️', mood: 'grumpy' },
  { id: 'grace-look-disgust', label: 'Grace look disgust when eat', emoji: '🤢', mood: 'grumpy' },

  { id: 'big-science', label: 'Grace and Rocky, big science', emoji: '🔬', mood: 'mission' },
  { id: 'save-stars', label: 'If Grace, Rocky save stars', emoji: '⭐', mood: 'mission' },
  { id: 'we-die', label: 'Ship not at precise angle and speed, we die', emoji: '☄️', mood: 'mission' },
  { id: 'it-is-time-go', label: 'It is time go', emoji: '🚀', mood: 'mission' },
  { id: 'not-let-grace-die', label: 'I will not let Grace die', emoji: '💛', mood: 'mission' },
]

export function soundUrl(id: string): string {
  return `${import.meta.env.BASE_URL}audio/${id}.mp3`
}

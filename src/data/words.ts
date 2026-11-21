export interface WordEntry {
  word: string
  /** Sylaby, w kolejności — muszą się złączyć z powrotem w `word`. */
  syllables: string[]
  emoji: string
}

// Poziom 3: tylko proste, dwusylabowe słowa typu spółgłoska+samogłoska
// (CV-CV) — bez grup spółgłoskowych, żeby dziecko po poziomie 2 (głoska →
// sylaba) mogło je od razu składać. Lista jest też źródłem sylab do
// poziomu 2 (wyprowadzone z tych słów, nie odwrotnie).
export const WORDS: WordEntry[] = [
  { word: 'mama', syllables: ['ma', 'ma'], emoji: '👩' },
  { word: 'tata', syllables: ['ta', 'ta'], emoji: '👨' },
  { word: 'sowa', syllables: ['so', 'wa'], emoji: '🦉' },
  { word: 'koza', syllables: ['ko', 'za'], emoji: '🐐' },
  { word: 'lody', syllables: ['lo', 'dy'], emoji: '🍦' },
  { word: 'buty', syllables: ['bu', 'ty'], emoji: '👞' },
  { word: 'ryba', syllables: ['ry', 'ba'], emoji: '🐟' },
  { word: 'kura', syllables: ['ku', 'ra'], emoji: '🐔' },
  { word: 'noga', syllables: ['no', 'ga'], emoji: '🦵' },
]

/** Zbiór unikalnych sylab użytych w WORDS — ćwiczone na poziomie 2. */
export const SYLLABLES: string[] = Array.from(new Set(WORDS.flatMap((w) => w.syllables))).sort()

/** Spółgłoski i samogłoski potrzebne do złożenia sylab z SYLLABLES na
 * poziomie 2 ("głoska + głoska = sylaba"). */
export const SYLLABLE_PARTS: { consonant: string; vowel: string; syllable: string }[] = SYLLABLES.map(
  (syllable) => ({
    consonant: syllable[0],
    vowel: syllable[1],
    syllable,
  })
)

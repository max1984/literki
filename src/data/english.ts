export interface EnglishWordEntry {
  word: string
  emoji: string
}

// Poziom 4: podstawowe słownictwo angielskie. W przeciwieństwie do poziomów
// 1-3 NIE uczymy tu czytania po angielsku metodą głoska→sylaba→wyraz —
// angielska ortografia nie jest fonetycznie regularna (np. "a" brzmi
// zupełnie inaczej w "cat" i w "ball"), więc ta metoda by się nie przełożyła.
// Zamiast tego: dziecko słyszy słowo (TTS en-GB) i kojarzy je z obrazkiem —
// to naturalny pierwszy kontakt ze słownictwem obcego języka (rozumienie ze
// słuchu), a nie nauka pisowni.
export const ENGLISH_WORDS: EnglishWordEntry[] = [
  { word: 'cat', emoji: '🐱' },
  { word: 'dog', emoji: '🐶' },
  { word: 'sun', emoji: '☀️' },
  { word: 'moon', emoji: '🌙' },
  { word: 'apple', emoji: '🍎' },
  { word: 'ball', emoji: '⚽' },
  { word: 'house', emoji: '🏠' },
  { word: 'tree', emoji: '🌳' },
  { word: 'fish', emoji: '🐟' },
  { word: 'bird', emoji: '🐦' },
  { word: 'car', emoji: '🚗' },
  { word: 'book', emoji: '📖' },
  { word: 'hat', emoji: '🎩' },
  { word: 'milk', emoji: '🥛' },
  { word: 'egg', emoji: '🥚' },
  { word: 'star', emoji: '⭐' },
  { word: 'bear', emoji: '🐻' },
  { word: 'duck', emoji: '🦆' },
  { word: 'flower', emoji: '🌸' },
  { word: 'banana', emoji: '🍌' },
]

/** Błędne odpowiedzi dla pytania "usłysz słowo po angielsku, wybierz obrazek". */
export function pickWordDistractors(
  correctWord: string,
  count: number,
  rng: () => number = Math.random
): EnglishWordEntry[] {
  const available = ENGLISH_WORDS.filter((w) => w.word !== correctWord)
  const picked: EnglishWordEntry[] = []
  while (picked.length < count && available.length > 0) {
    const idx = Math.floor(rng() * available.length)
    picked.push(available.splice(idx, 1)[0])
  }
  return picked
}

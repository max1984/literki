export interface LetterEntry {
  /** Mała litera — to, czego uczymy. */
  char: string
  /** Wielka litera, do pokazania obok małej. */
  upper: string
  /** Przykładowe słowo zawierające literę — czytane jako "X jak słowo". */
  exampleWord: string
  /** Indeks litery w exampleWord (do podświetlenia) — ą/ę/ń/y nigdy nie
   * zaczynają polskiego słowa, więc ich przykład ma literę w środku. */
  highlightIndex: number
  emoji: string
}

// Pełny polski alfabet — 32 litery (bez dwuznaków sz/cz/rz/ch/dz, które są
// jednostkami głoskowymi, nie osobnymi literami alfabetu).
export const ALPHABET: LetterEntry[] = [
  { char: 'a', upper: 'A', exampleWord: 'auto', highlightIndex: 0, emoji: '🚗' },
  { char: 'ą', upper: 'Ą', exampleWord: 'wąż', highlightIndex: 1, emoji: '🐍' },
  { char: 'b', upper: 'B', exampleWord: 'balon', highlightIndex: 0, emoji: '🎈' },
  { char: 'c', upper: 'C', exampleWord: 'cytryna', highlightIndex: 0, emoji: '🍋' },
  { char: 'ć', upper: 'Ć', exampleWord: 'ćma', highlightIndex: 0, emoji: '🦋' },
  { char: 'd', upper: 'D', exampleWord: 'domek', highlightIndex: 0, emoji: '🏠' },
  { char: 'e', upper: 'E', exampleWord: 'emu', highlightIndex: 0, emoji: '🦤' },
  { char: 'ę', upper: 'Ę', exampleWord: 'ręka', highlightIndex: 1, emoji: '🖐️' },
  { char: 'f', upper: 'F', exampleWord: 'flaga', highlightIndex: 0, emoji: '🚩' },
  { char: 'g', upper: 'G', exampleWord: 'gwiazda', highlightIndex: 0, emoji: '⭐' },
  { char: 'h', upper: 'H', exampleWord: 'helikopter', highlightIndex: 0, emoji: '🚁' },
  { char: 'i', upper: 'I', exampleWord: 'indyk', highlightIndex: 0, emoji: '🦃' },
  { char: 'j', upper: 'J', exampleWord: 'jabłko', highlightIndex: 0, emoji: '🍎' },
  { char: 'k', upper: 'K', exampleWord: 'kot', highlightIndex: 0, emoji: '🐱' },
  { char: 'l', upper: 'L', exampleWord: 'lody', highlightIndex: 0, emoji: '🍦' },
  { char: 'ł', upper: 'Ł', exampleWord: 'łyżka', highlightIndex: 0, emoji: '🥄' },
  { char: 'm', upper: 'M', exampleWord: 'miś', highlightIndex: 0, emoji: '🧸' },
  { char: 'n', upper: 'N', exampleWord: 'nos', highlightIndex: 0, emoji: '👃' },
  { char: 'ń', upper: 'Ń', exampleWord: 'koń', highlightIndex: 2, emoji: '🐎' },
  { char: 'o', upper: 'O', exampleWord: 'osa', highlightIndex: 0, emoji: '🐝' },
  { char: 'ó', upper: 'Ó', exampleWord: 'ósemka', highlightIndex: 0, emoji: '8️⃣' },
  { char: 'p', upper: 'P', exampleWord: 'piłka', highlightIndex: 0, emoji: '⚽' },
  { char: 'r', upper: 'R', exampleWord: 'rower', highlightIndex: 0, emoji: '🚲' },
  { char: 's', upper: 'S', exampleWord: 'słoń', highlightIndex: 0, emoji: '🐘' },
  { char: 'ś', upper: 'Ś', exampleWord: 'śnieg', highlightIndex: 0, emoji: '❄️' },
  { char: 't', upper: 'T', exampleWord: 'tygrys', highlightIndex: 0, emoji: '🐯' },
  { char: 'u', upper: 'U', exampleWord: 'ucho', highlightIndex: 0, emoji: '👂' },
  { char: 'w', upper: 'W', exampleWord: 'woda', highlightIndex: 0, emoji: '💧' },
  { char: 'y', upper: 'Y', exampleWord: 'ryba', highlightIndex: 1, emoji: '🐟' },
  { char: 'z', upper: 'Z', exampleWord: 'zebra', highlightIndex: 0, emoji: '🦓' },
  { char: 'ź', upper: 'Ź', exampleWord: 'źrebak', highlightIndex: 0, emoji: '🐴' },
  { char: 'ż', upper: 'Ż', exampleWord: 'żaba', highlightIndex: 0, emoji: '🐸' },
]

// Litery, które brzmią identycznie po polsku — nigdy nie pokazuj ich razem
// jako "usłysz głoskę, wybierz literę" (dziecko nie ma szans zgadnąć która).
export const HOMOPHONE_GROUPS: string[][] = [['u', 'ó']]

export function homophoneGroupOf(char: string): string[] {
  return HOMOPHONE_GROUPS.find((group) => group.includes(char)) ?? [char]
}

import { ALPHABET, homophoneGroupOf } from './alphabet'

/**
 * Błędne odpowiedzi dla pytania "usłysz głoskę, wybierz literę".
 * Nigdy nie zawierają poprawnej litery ani żadnej z jej grupy homofonów
 * (np. przy poprawnym "u" nigdy nie zaproponuje "ó" — brzmią identycznie,
 * dziecko nie miałoby szans zgadnąć która).
 */
export function pickDistractors(
  correctChar: string,
  count: number,
  rng: () => number = Math.random
): string[] {
  const excluded = new Set(homophoneGroupOf(correctChar))
  const available = ALPHABET.map((l) => l.char).filter((c) => !excluded.has(c))
  const picked: string[] = []
  while (picked.length < count && available.length > 0) {
    const idx = Math.floor(rng() * available.length)
    picked.push(available.splice(idx, 1)[0])
  }
  return picked
}

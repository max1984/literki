import { describe, it, expect } from 'vitest'
import { ENGLISH_WORDS, pickWordDistractors } from './english'

describe('ENGLISH_WORDS', () => {
  it('nie ma duplikatów słów', () => {
    const words = ENGLISH_WORDS.map((w) => w.word)
    expect(new Set(words).size).toBe(words.length)
  })

  it('nie ma duplikatów emoji (każdy obrazek jednoznacznie wskazuje jedno słowo)', () => {
    const emoji = ENGLISH_WORDS.map((w) => w.emoji)
    expect(new Set(emoji).size).toBe(emoji.length)
  })

  it('każde słowo i emoji jest niepuste', () => {
    for (const { word, emoji } of ENGLISH_WORDS) {
      expect(word.length).toBeGreaterThan(0)
      expect(emoji.length).toBeGreaterThan(0)
    }
  })
})

describe('pickWordDistractors', () => {
  it('zwraca żądaną liczbę unikalnych słów, nigdy poprawnej odpowiedzi', () => {
    const picked = pickWordDistractors('cat', 3)
    expect(picked.length).toBe(3)
    expect(new Set(picked.map((w) => w.word)).size).toBe(3)
    expect(picked.map((w) => w.word)).not.toContain('cat')
  })

  it('z deterministycznym rng zawsze daje ten sam wynik (powtarzalność w testach)', () => {
    const rng = () => 0
    expect(pickWordDistractors('dog', 3, rng)).toEqual(pickWordDistractors('dog', 3, rng))
  })
})

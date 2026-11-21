import { describe, it, expect } from 'vitest'
import { WORDS, SYLLABLES, SYLLABLE_PARTS } from './words'
import { ALPHABET } from './alphabet'

describe('WORDS', () => {
  it('sylaby każdego słowa łączą się z powrotem w to słowo', () => {
    for (const { word, syllables } of WORDS) {
      expect(syllables.join(''), word).toBe(word)
    }
  })

  it('każde słowo ma dokładnie 2 sylaby typu CV (spółgłoska+samogłoska)', () => {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'y'])
    for (const { word, syllables } of WORDS) {
      expect(syllables.length, word).toBe(2)
      for (const syl of syllables) {
        expect(syl.length, `${syl} w ${word}`).toBe(2)
        expect(vowels.has(syl[1]), `${syl} w ${word} — druga litera powinna być samogłoską`).toBe(true)
      }
    }
  })

  it('każdy znak użyty w słowach jest literą polskiego alfabetu', () => {
    const alphabetChars = new Set(ALPHABET.map((l) => l.char))
    for (const { word } of WORDS) {
      for (const char of word) {
        expect(alphabetChars.has(char), `"${char}" z "${word}"`).toBe(true)
      }
    }
  })

  it('nie ma duplikatów słów', () => {
    const words = WORDS.map((w) => w.word)
    expect(new Set(words).size).toBe(words.length)
  })
})

describe('SYLLABLES / SYLLABLE_PARTS', () => {
  it('SYLLABLES to zbiór unikalnych sylab rzeczywiście użytych w WORDS', () => {
    const fromWords = new Set(WORDS.flatMap((w) => w.syllables))
    expect(new Set(SYLLABLES)).toEqual(fromWords)
  })

  it('każda SYLLABLE_PARTS się składa (consonant+vowel) z powrotem w syllable', () => {
    for (const { consonant, vowel, syllable } of SYLLABLE_PARTS) {
      expect(consonant + vowel).toBe(syllable)
    }
  })
})

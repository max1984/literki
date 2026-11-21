import { describe, it, expect } from 'vitest'
import { ALPHABET, homophoneGroupOf, HOMOPHONE_GROUPS } from './alphabet'

describe('ALPHABET', () => {
  it('ma dokładnie 32 litery, bez duplikatów', () => {
    const chars = ALPHABET.map((l) => l.char)
    expect(chars.length).toBe(32)
    expect(new Set(chars).size).toBe(32)
  })

  it('highlightIndex zawsze wskazuje właściwą literę w exampleWord', () => {
    for (const { char, exampleWord, highlightIndex } of ALPHABET) {
      expect(exampleWord[highlightIndex], `${char} w "${exampleWord}"`).toBe(char)
    }
  })

  it('ą, ę, ń, y nigdy nie zaczynają swojego przykładowego słowa (nie zaczynają polskich słów)', () => {
    for (const char of ['ą', 'ę', 'ń', 'y']) {
      const entry = ALPHABET.find((l) => l.char === char)!
      expect(entry.highlightIndex, `${char} w "${entry.exampleWord}"`).toBeGreaterThan(0)
    }
  })

  it('każda litera ma niepustą wielką wersję i emoji', () => {
    for (const l of ALPHABET) {
      expect(l.upper.length).toBeGreaterThan(0)
      expect(l.emoji.length).toBeGreaterThan(0)
    }
  })
})

describe('homophoneGroupOf', () => {
  it('u i ó są w tej samej grupie (brzmią identycznie po polsku)', () => {
    expect(homophoneGroupOf('u')).toContain('ó')
    expect(homophoneGroupOf('ó')).toContain('u')
  })

  it('litera bez grupy homofonów wraca sama jako grupa jednoelementowa', () => {
    expect(homophoneGroupOf('k')).toEqual(['k'])
  })

  it('każda grupa homofonów składa się z liter faktycznie obecnych w alfabecie', () => {
    const chars = new Set(ALPHABET.map((l) => l.char))
    for (const group of HOMOPHONE_GROUPS) {
      for (const char of group) expect(chars.has(char)).toBe(true)
    }
  })
})

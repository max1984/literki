import { describe, it, expect } from 'vitest'
import { pickDistractors } from './quiz'
import { ALPHABET } from './alphabet'

describe('pickDistractors', () => {
  it('zwraca żądaną liczbę unikalnych liter, nigdy poprawnej odpowiedzi', () => {
    const picked = pickDistractors('k', 3)
    expect(picked.length).toBe(3)
    expect(new Set(picked).size).toBe(3)
    expect(picked).not.toContain('k')
  })

  it('nigdy nie proponuje "ó" jako dystraktora dla "u", i odwrotnie', () => {
    for (let i = 0; i < 20; i++) {
      expect(pickDistractors('u', 5)).not.toContain('ó')
      expect(pickDistractors('ó', 5)).not.toContain('u')
    }
  })

  it('każdy zwrócony znak jest realną literą alfabetu', () => {
    const chars = new Set(ALPHABET.map((l) => l.char))
    for (const c of pickDistractors('a', 10)) {
      expect(chars.has(c)).toBe(true)
    }
  })

  it('z deterministycznym rng zawsze daje ten sam wynik (powtarzalność w testach)', () => {
    const rng = () => 0
    expect(pickDistractors('a', 3, rng)).toEqual(pickDistractors('a', 3, rng))
  })
})

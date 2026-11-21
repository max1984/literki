import { create } from 'zustand'
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware'

interface ProgressState {
  learnedLetters: string[]
  learnedSyllables: string[]
  learnedWords: string[]
  markLetter: (char: string) => void
  markSyllable: (syllable: string) => void
  markWord: (word: string) => void
}

function addUnique(list: string[], value: string): string[] {
  return list.includes(value) ? list : [...list, value]
}

// Prywatne okno przeglądania / zablokowane cookies potrafią wywalić
// localStorage.setItem — wtedy trzymamy postęp tylko w pamięci na czas
// sesji, zamiast wywalać całą apkę białym ekranem.
function safeStorage(): StateStorage {
  try {
    const probeKey = '__literki_probe__'
    window.localStorage.setItem(probeKey, '1')
    window.localStorage.removeItem(probeKey)
    return window.localStorage
  } catch {
    const memory = new Map<string, string>()
    return {
      getItem: (key) => memory.get(key) ?? null,
      setItem: (key, value) => memory.set(key, value),
      removeItem: (key) => memory.delete(key),
    }
  }
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      learnedLetters: [],
      learnedSyllables: [],
      learnedWords: [],
      markLetter: (char) => set((s) => ({ learnedLetters: addUnique(s.learnedLetters, char) })),
      markSyllable: (syllable) => set((s) => ({ learnedSyllables: addUnique(s.learnedSyllables, syllable) })),
      markWord: (word) => set((s) => ({ learnedWords: addUnique(s.learnedWords, word) })),
    }),
    {
      name: 'literki-progress',
      storage: createJSONStorage(safeStorage),
    }
  )
)

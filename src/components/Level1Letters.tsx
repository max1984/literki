import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ALPHABET, letterPhrase, type LetterEntry } from '../data/alphabet'
import { pickDistractors } from '../data/quiz'
import { useSpeech } from '../audio/useSpeech'
import { useProgress } from '../store/progress'
import { Mascot, type MascotMood } from './Mascot'

function randomLetter(): LetterEntry {
  return ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function buildOptions(entry: LetterEntry): string[] {
  // Jeśli litera nie jest pierwsza w słowie-przykładzie (np. "y" w "ryba"),
  // obrazek sam w sobie podpowiada pierwszą literę słowa — trzeba ją
  // wykluczyć z dystraktorów, żeby obrazek nie naprowadzał na złą odpowiedź.
  const extraExcluded = entry.highlightIndex !== 0 ? [entry.exampleWord[0]] : []
  return shuffle([entry.char, ...pickDistractors(entry.char, 3, Math.random, extraExcluded)])
}

/** Poziom 1: usłysz nazwę litery ("b jak balon"), wybierz ją z czterech. */
export function Level1Letters({ onBack }: { onBack: () => void }) {
  const { speak } = useSpeech()
  const markLetter = useProgress((s) => s.markLetter)
  const [current, setCurrent] = useState<LetterEntry>(randomLetter)
  const [options, setOptions] = useState<string[]>(() => buildOptions(current))
  const [solved, setSolved] = useState(false)
  const [wrongTap, setWrongTap] = useState<string | null>(null)
  const [mood, setMood] = useState<MascotMood>('idle')

  const nextQuestion = useCallback(() => {
    const entry = randomLetter()
    setCurrent(entry)
    setOptions(buildOptions(entry))
    setSolved(false)
    setWrongTap(null)
    setMood('idle')
  }, [])

  const playQuestion = () => {
    speak(`letter-${current.char}`, letterPhrase(current, current.ttsName ?? current.char))
  }

  const handleAnswer = (char: string) => {
    if (solved) return
    if (char === current.char) {
      setSolved(true)
      setMood('excited')
      markLetter(current.char)
      speak(`letter-${current.char}`, letterPhrase(current, current.ttsName ?? current.char))
      setTimeout(nextQuestion, 1600)
    } else {
      setWrongTap(char)
      setTimeout(() => setWrongTap(null), 500)
    }
  }

  return (
    <div className="min-h-full flex flex-col px-4 py-6">
      <div className="flex items-center justify-between w-full max-w-xl mx-auto">
        <button type="button" onClick={onBack} className="text-lg font-bold text-berry">
          ← Wróć
        </button>
        <Mascot mood={mood} size={70} />
      </div>

      <div className="m-auto flex flex-col items-center gap-6">
        <p className="text-2xl font-bold text-center text-gray-700">
          Która to litera? <span className="text-4xl">{current.emoji}</span>
        </p>

        <button
          type="button"
          onClick={playQuestion}
          className="rounded-full bg-sky text-white text-xl font-bold px-8 py-4 shadow-lg active:scale-95 transition-transform"
        >
          🔊 Posłuchaj
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-xl">
          <AnimatePresence>
            {options.map((char) => (
              <motion.button
                key={`${current.char}-${char}`}
                type="button"
                onClick={() => handleAnswer(char)}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="tile rounded-3xl shadow-lg text-5xl font-bold text-white py-6"
                style={{
                  backgroundColor:
                    solved && char === current.char
                      ? 'var(--color-leaf)'
                      : wrongTap === char
                        ? 'var(--color-berry)'
                        : 'var(--color-sky)',
                }}
              >
                {char}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {solved && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-2xl font-bold text-leaf"
            >
              Super! {letterPhrase(current, current.char)} {current.emoji}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

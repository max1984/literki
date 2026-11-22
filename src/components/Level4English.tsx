import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ENGLISH_WORDS, pickWordDistractors, type EnglishWordEntry } from '../data/english'
import { useSpeech } from '../audio/useSpeech'
import { useProgress } from '../store/progress'
import { Mascot, type MascotMood } from './Mascot'

function randomWord(): EnglishWordEntry {
  return ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)]
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function buildOptions(entry: EnglishWordEntry): EnglishWordEntry[] {
  return shuffle([entry, ...pickWordDistractors(entry.word, 3)])
}

/**
 * Poziom 4: podstawowe słówka angielskie. Dziecko SŁYSZY słowo (TTS en-GB) —
 * nie widzi go na ekranie, żeby nie podpowiadać obrazka pisownią — i wybiera
 * pasujący obrazek z czterech. To rozumienie ze słuchu, nie czytanie po
 * angielsku (nieregularna pisownia angielska nie pasuje do metody
 * głoska→sylaba→wyraz z poziomów 1-3).
 */
export function Level4English({ onBack }: { onBack: () => void }) {
  const { speak } = useSpeech()
  const markEnglishWord = useProgress((s) => s.markEnglishWord)
  const [current, setCurrent] = useState<EnglishWordEntry>(randomWord)
  const [options, setOptions] = useState<EnglishWordEntry[]>(() => buildOptions(current))
  const [solved, setSolved] = useState(false)
  const [wrongTap, setWrongTap] = useState<string | null>(null)
  const [mood, setMood] = useState<MascotMood>('idle')

  const nextQuestion = useCallback(() => {
    const entry = randomWord()
    setCurrent(entry)
    setOptions(buildOptions(entry))
    setSolved(false)
    setWrongTap(null)
    setMood('idle')
  }, [])

  const playQuestion = () => {
    speak(`en-word-${current.word}`, current.word, 'en-GB')
  }

  const handleAnswer = (word: string) => {
    if (solved) return
    if (word === current.word) {
      setSolved(true)
      setMood('excited')
      markEnglishWord(current.word)
      speak(`en-word-${current.word}`, current.word, 'en-GB')
      setTimeout(nextQuestion, 1600)
    } else {
      setWrongTap(word)
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
        <p className="text-2xl font-bold text-center text-gray-700">Posłuchaj i wybierz obrazek</p>

        <button
          type="button"
          onClick={playQuestion}
          className="rounded-full bg-sky text-white text-xl font-bold px-8 py-4 shadow-lg active:scale-95 transition-transform"
        >
          🔊 Posłuchaj
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-xl">
          <AnimatePresence>
            {options.map((entry) => (
              <motion.button
                key={`${current.word}-${entry.word}`}
                type="button"
                onClick={() => handleAnswer(entry.word)}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="tile rounded-3xl shadow-lg text-5xl font-bold text-white py-6"
                style={{
                  backgroundColor:
                    solved && entry.word === current.word
                      ? 'var(--color-leaf)'
                      : wrongTap === entry.word
                        ? 'var(--color-berry)'
                        : 'var(--color-sky)',
                }}
              >
                {entry.emoji}
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
              Super! {current.word} {current.emoji}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SYLLABLE_PARTS } from '../data/words'
import { useSpeech } from '../audio/useSpeech'
import { useProgress } from '../store/progress'
import { Mascot, type MascotMood } from './Mascot'

function randomIndex() {
  return Math.floor(Math.random() * SYLLABLE_PARTS.length)
}

/**
 * Poziom 2: złóż głoski w sylabę. Dziecko tapie spółgłoskę i samogłoskę
 * (same tapnięcia są ciche — syntezator wypowiedziałby nazwę spółgłoski,
 * nie głoskę), a dopiero złożona sylaba jest wypowiadana na głos.
 */
export function Level2Syllables({ onBack }: { onBack: () => void }) {
  const { speak } = useSpeech()
  const markSyllable = useProgress((s) => s.markSyllable)
  const [index, setIndex] = useState(randomIndex)
  const [selected, setSelected] = useState<[boolean, boolean]>([false, false])
  const [combined, setCombined] = useState(false)
  const [mood, setMood] = useState<MascotMood>('idle')
  const current = SYLLABLE_PARTS[index]

  const nextSyllable = useCallback(() => {
    setIndex(randomIndex())
    setSelected([false, false])
    setCombined(false)
    setMood('idle')
  }, [])

  const selectPart = (slot: 0 | 1) => {
    if (combined) return
    setSelected((prev) => {
      const copy: [boolean, boolean] = [...prev]
      copy[slot] = true
      return copy
    })
  }

  const canCombine = selected[0] && selected[1] && !combined

  const combine = () => {
    setCombined(true)
    setMood('excited')
    markSyllable(current.syllable)
    speak(`syllable-${current.syllable}`, current.syllable)
    setTimeout(nextSyllable, 1700)
  }

  return (
    <div className="flex flex-col h-full px-4 py-6">
      <div className="flex items-center justify-between w-full max-w-xl mx-auto">
        <button type="button" onClick={onBack} className="text-lg font-bold text-berry">
          ← Wróć
        </button>
        <Mascot mood={mood} size={70} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <p className="text-2xl font-bold text-center text-gray-700">Złóż głoski w sylabę</p>

        <div className="flex items-center gap-4">
          <motion.button
            type="button"
            onClick={() => selectPart(0)}
            whileTap={{ scale: 0.9 }}
            className="tile rounded-3xl shadow-lg text-6xl font-bold text-white py-8 px-10"
            style={{ backgroundColor: selected[0] ? 'var(--color-leaf)' : 'var(--color-sky)' }}
          >
            {current.consonant}
          </motion.button>
          <span className="text-5xl font-bold text-gray-400">+</span>
          <motion.button
            type="button"
            onClick={() => selectPart(1)}
            whileTap={{ scale: 0.9 }}
            className="tile rounded-3xl shadow-lg text-6xl font-bold text-white py-8 px-10"
            style={{ backgroundColor: selected[1] ? 'var(--color-leaf)' : 'var(--color-sun)' }}
          >
            {current.vowel}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {!combined ? (
            <motion.button
              key="combine"
              type="button"
              disabled={!canCombine}
              onClick={combine}
              initial={{ opacity: 0 }}
              animate={{ opacity: canCombine ? 1 : 0.4 }}
              className="rounded-full bg-berry text-white text-xl font-bold px-8 py-4 shadow-lg active:scale-95 transition-transform disabled:cursor-not-allowed"
            >
              Złóż sylabę →
            </motion.button>
          ) : (
            <motion.p
              key="result"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-5xl font-bold text-leaf"
            >
              {current.syllable} 🎉
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

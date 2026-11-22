import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WORDS, type WordEntry } from '../data/words'
import { useSpeech } from '../audio/useSpeech'
import { useProgress } from '../store/progress'
import { Mascot, type MascotMood } from './Mascot'

function randomWord(): WordEntry {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

function tilesFor(word: WordEntry): string[] {
  return Math.random() < 0.5 ? word.syllables : [...word.syllables].reverse()
}

/** Poziom 3: tapnij sylaby w dobrej kolejności, żeby złożyć cały wyraz. */
export function Level3Words({ onBack }: { onBack: () => void }) {
  const { speak } = useSpeech()
  const markWord = useProgress((s) => s.markWord)
  const [current, setCurrent] = useState<WordEntry>(randomWord)
  const [tiles, setTiles] = useState<string[]>(() => tilesFor(current))
  const [order, setOrder] = useState<number[]>([])
  const [done, setDone] = useState(false)
  const [shakeTile, setShakeTile] = useState<number | null>(null)
  const [mood, setMood] = useState<MascotMood>('idle')

  const nextWord = useCallback(() => {
    const word = randomWord()
    setCurrent(word)
    setTiles(tilesFor(word))
    setOrder([])
    setDone(false)
    setMood('idle')
  }, [])

  const tapTile = (tileIndex: number) => {
    if (done || order.includes(tileIndex)) return
    const expected = current.syllables[order.length]
    if (tiles[tileIndex] === expected) {
      const newOrder = [...order, tileIndex]
      setOrder(newOrder)
      if (newOrder.length === current.syllables.length) {
        setDone(true)
        setMood('excited')
        markWord(current.word)
        speak(`word-${current.word}`, current.word)
        setTimeout(nextWord, 1900)
      }
    } else {
      setShakeTile(tileIndex)
      setTimeout(() => setShakeTile(null), 400)
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

      <div className="m-auto flex flex-col items-center gap-8">
        <p className="text-2xl font-bold text-center text-gray-700">
          Złóż wyraz <span className="text-4xl">{current.emoji}</span>
        </p>

        <div className="flex items-center gap-4 min-h-[3rem]">
          {order.map((tileIndex) => (
            <span key={tileIndex} className="text-4xl font-bold text-berry">
              {tiles[tileIndex]}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {tiles.map((syllable, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => tapTile(i)}
              disabled={order.includes(i) || done}
              whileTap={{ scale: 0.9 }}
              animate={shakeTile === i ? { x: [0, -8, 8, -8, 0] } : { x: 0 }}
              className="tile rounded-3xl shadow-lg text-5xl font-bold text-white py-6 px-8"
              style={{
                backgroundColor: order.includes(i) ? 'var(--color-owl)' : 'var(--color-sky)',
                opacity: order.includes(i) ? 0.35 : 1,
              }}
            >
              {syllable}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {done && (
            <motion.p
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-4xl font-bold text-leaf"
            >
              {current.word} {current.emoji}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

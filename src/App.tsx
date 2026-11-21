import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StartScreen } from './components/StartScreen'
import { LevelMenu, type Level } from './components/LevelMenu'
import { Level1Letters } from './components/Level1Letters'
import { Level2Syllables } from './components/Level2Syllables'
import { Level3Words } from './components/Level3Words'

type Screen = 'start' | 'menu' | `level${Level}`

function App() {
  const [screen, setScreen] = useState<Screen>('start')

  return (
    <div className="h-screen w-screen overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="h-full"
        >
          {screen === 'start' && <StartScreen onStart={() => setScreen('menu')} />}
          {screen === 'menu' && <LevelMenu onSelect={(level) => setScreen(`level${level}`)} />}
          {screen === 'level1' && <Level1Letters onBack={() => setScreen('menu')} />}
          {screen === 'level2' && <Level2Syllables onBack={() => setScreen('menu')} />}
          {screen === 'level3' && <Level3Words onBack={() => setScreen('menu')} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App

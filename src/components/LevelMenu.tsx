import { Mascot } from './Mascot'

export type Level = 1 | 2 | 3 | 4

const LEVELS: { id: Level; label: string; emoji: string; color: string }[] = [
  { id: 1, label: 'Litery', emoji: '🔤', color: 'var(--color-sky)' },
  { id: 2, label: 'Głoski i sylaby', emoji: '🧩', color: 'var(--color-sun)' },
  { id: 3, label: 'Sylaby i wyrazy', emoji: '📖', color: 'var(--color-leaf)' },
  { id: 4, label: 'Angielski', emoji: '🇬🇧', color: 'var(--color-berry)' },
]

export function LevelMenu({ onSelect }: { onSelect: (level: Level) => void }) {
  return (
    <div className="min-h-full flex flex-col items-center px-4 py-8">
      <div className="m-auto flex flex-col items-center gap-8">
        <Mascot mood="idle" size={100} />
        <h2 className="text-3xl font-bold text-berry text-center">Wybierz poziom</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => onSelect(l.id)}
              className="tile rounded-3xl shadow-xl flex flex-col items-center justify-center gap-2 p-6 text-white font-bold text-xl active:scale-95 transition-transform"
              style={{ backgroundColor: l.color, minHeight: 140 }}
            >
              <span className="text-5xl">{l.emoji}</span>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

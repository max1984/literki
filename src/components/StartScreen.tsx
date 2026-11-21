import { Mascot } from './Mascot'

/** Ekran startowy — Safari na iOS blokuje audio/mowę poza gestem
 * użytkownika, więc apka NIC nie mówi, dopóki dziecko nie tapnie tutaj. */
export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-4 text-center bg-gradient-to-b from-sky/40 to-white">
      <Mascot mood="happy" size={160} />
      <h1 className="text-5xl font-bold text-berry">Literki</h1>
      <p className="text-xl text-gray-700 max-w-md">
        Ucz się liter, głosek i słów razem z sówką!
      </p>
      <button
        type="button"
        onClick={onStart}
        className="rounded-full bg-leaf text-white text-3xl font-bold px-12 py-6 shadow-xl active:scale-95 transition-transform"
      >
        Zacznij! 🎉
      </button>
    </div>
  )
}

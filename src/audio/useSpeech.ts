import { useCallback, useEffect, useRef, useState } from 'react'

// Nagrania (jeśli kiedyś się pojawią) — zob. src/assets/audio/README.md.
// import.meta.glob buduje mapę w czasie builda, więc działa też z `base`
// ustawionym na GitHub Pages bez żadnej dodatkowej logiki ścieżek.
const audioFiles = import.meta.glob('../assets/audio/**/*.mp3', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const AUDIO_MANIFEST: Record<string, string> = Object.fromEntries(
  Object.entries(audioFiles).map(([path, url]) => [
    path.split('/').pop()!.replace(/\.mp3$/, ''),
    url,
  ])
)

function pickVoiceForLang(voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice | undefined {
  const base = lang.split('-')[0].toLowerCase()
  return voices.find((v) => v.lang === lang) ?? voices.find((v) => v.lang.toLowerCase().startsWith(base))
}

/**
 * Mówi `key` (np. "letter-b", "syllable-ma", "word-mama", "en-word-cat").
 * Jeśli istnieje nagranie w AUDIO_MANIFEST, gra je; inaczej wypowiada
 * `fallbackText` przez Web Speech API w języku `lang` (domyślnie polski).
 * `fallbackText` MUSI być tym, co naprawdę ma zabrzmieć — dla głoski to
 * otwarta sylaba ("ba"), nie sama spółgłoska: syntezator wypowiedziałby
 * nazwę litery ("be"), nie głoskę. Litery jako takie mówimy tylko w
 * kontekście "b jak balon" (ucz nazwy litery, nie głoski).
 *
 * Trzeba wywołać `speak` z wnętrza handlera kliknięcia/tapnięcia — Safari na
 * iOS blokuje audio/speech poza gestem użytkownika (dlatego nie ma tu
 * żadnego autoodtwarzania przy montowaniu komponentu).
 */
export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const update = () => setVoices(window.speechSynthesis.getVoices())
    update()
    window.speechSynthesis.addEventListener('voiceschanged', update)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', update)
  }, [])

  const speak = useCallback(
    (key: string, fallbackText: string, lang: string = 'pl-PL') => {
      const recorded = AUDIO_MANIFEST[key]
      if (recorded) {
        audioRef.current?.pause()
        const audio = new Audio(recorded)
        audioRef.current = audio
        void audio.play()
        return
      }
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(fallbackText.toLowerCase())
      utterance.lang = lang
      utterance.rate = 0.8
      const voice = pickVoiceForLang(voices, lang)
      if (voice) utterance.voice = voice
      window.speechSynthesis.speak(utterance)
    },
    [voices]
  )

  return { speak }
}

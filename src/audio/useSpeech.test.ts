import { describe, it, expect } from 'vitest'
import { pickVoiceForLang } from './useSpeech'

function voice(lang: string, localService: boolean, name = lang): SpeechSynthesisVoice {
  return { lang, localService, name, default: false, voiceURI: name } as SpeechSynthesisVoice
}

describe('pickVoiceForLang', () => {
  it('wybiera głos z dokładnym dopasowaniem języka', () => {
    const voices = [voice('pl-PL', true), voice('en-GB', true), voice('en-US', true)]
    expect(pickVoiceForLang(voices, 'en-GB')?.lang).toBe('en-GB')
  })

  it('bez dokładnego dopasowania wraca do głosu z tym samym językiem bazowym', () => {
    const voices = [voice('pl-PL', true), voice('en-US', true)]
    expect(pickVoiceForLang(voices, 'en-GB')?.lang).toBe('en-US')
  })

  it('woli głos lokalny od sieciowego, nawet gdy sieciowy jest pierwszy na liście', () => {
    const network = voice('en-GB', false, 'network-en-GB')
    const local = voice('en-GB', true, 'local-en-GB')
    expect(pickVoiceForLang([network, local], 'en-GB')?.name).toBe('local-en-GB')
  })

  it('bez żadnego głosu lokalnego zwraca sieciowy, zamiast nic nie wybrać', () => {
    const network = voice('en-GB', false, 'network-en-GB')
    expect(pickVoiceForLang([network], 'en-GB')?.name).toBe('network-en-GB')
  })

  it('bez żadnego dopasowania zwraca undefined (silnik sam dobierze głos z .lang)', () => {
    const voices = [voice('pl-PL', true)]
    expect(pickVoiceForLang(voices, 'en-GB')).toBeUndefined()
  })
})

# Literki

Interaktywna apka dla dzieci (4-7 lat) do nauki liter i podstaw czytania — metodą głoska → sylaba → wyraz.

**Live:** https://max1984.github.io/literki/

## Poziomy

- **Litery** — usłysz nazwę litery ("b jak balon"), wybierz ją spośród czterech
- **Głoski i sylaby** — złóż spółgłoskę i samogłoskę w sylabę (np. m + a = ma)
- **Sylaby i wyrazy** — tapnij sylaby we właściwej kolejności, żeby złożyć cały wyraz
- **Angielski** — posłuchaj podstawowego słówka po angielsku i wybierz pasujący obrazek (słownictwo, nie czytanie)

Przewodnikiem jest sówka-maskotka; mowę zapewnia Web Speech API (`pl-PL`/`en-GB`) z miejscem na prawdziwe nagrania — zob. `src/assets/audio/README.md`.

## Development

Requires Node 22+.

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # Vitest: testy warstwy danych (alfabet, słowa PL/EN, dystraktory quizu)
npm run build    # production build → dist/
```

Pushing to `main` runs tests, builds and deploys to GitHub Pages (`.github/workflows/deploy.yml`).

## Project layout

```
src/
  data/        # alfabet, słowa/sylaby PL, słówka angielskie, logika dystraktorów quizu (+ testy)
  audio/       # useSpeech — hybryda: nagrania (jeśli są) + Web Speech API fallback (pl-PL/en-GB)
  store/       # postęp dziecka (Zustand + localStorage, bezpieczny fallback)
  components/  # ekrany (Start, LevelMenu, Level1-4) + maskotka
```

# Nagrania audio (opcjonalne)

Ten katalog jest pusty na start — cała apka działa przez Web Speech API
(głos systemowy przeglądarki). Jakość głosu różni się między
urządzeniami, więc jeśli kiedyś nagracie/wygenerujecie prawdziwe polskie
nagrania, wystarczy wrzucić plik `.mp3` tutaj — `useSpeech` go automatycznie
wykryje i zacznie odtwarzać ZAMIAST syntezatora, bez żadnej zmiany w kodzie.

Konwencja nazw plików (nazwa pliku = klucz, rozszerzenie `.mp3`):

- `letter-<litera>.mp3` — np. `letter-b.mp3` → wypowiedziane "b jak balon"
- `syllable-<sylaba>.mp3` — np. `syllable-ma.mp3` → wypowiedziana sylaba "ma"
- `word-<słowo>.mp3` — np. `word-mama.mp3` → wypowiedziane słowo "mama"
- `en-word-<word>.mp3` — np. `en-word-cat.mp3` → wypowiedziane po angielsku słowo "cat" (poziom 4)

Ważne: to mają być prawdziwe, poprawnie wypowiedziane głoski/sylaby/słowa
(np. dla `syllable-ma` nagranie mówi "ma", nie literuje "em-a") — na tym
polega różnica między tym a literą wypowiedzianą przez syntezator.

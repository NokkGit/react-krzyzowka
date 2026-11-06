# Krzyżówka kodera — React

Interaktywna krzyżówka o podstawowych pojęciach z programowania. Projekt spełnia wymagania zadania: zawiera 10 haseł, pola z pojedynczą literą, podświetlanie aktywnego hasła i pola, sprawdzanie odpowiedzi, wyświetlanie rozwiązania, reset oraz testy jednostkowe.

## Uruchomienie

```bash
npm install
npm run dev
```

Pozostałe komendy:

```bash
npm run build
npm test
```

## Zasady działania

- Kliknięcie definicji podświetla wszystkie pola danego hasła na żółto.
- Po wpisaniu litery kursor przechodzi do następnego pola w kierunku wybranego hasła.
- Aktywne pole, w którym znajduje się kursor, jest żółte.
- `Sprawdź` oznacza poprawne pola na zielono, a błędne na czerwono.
- `Pokaż rozwiązanie` uzupełnia całą krzyżówkę.
- `Wyczyść` resetuje wszystkie pola i oznaczenia.

## Struktura

- `src/crossword.js` — dane haseł i logika krzyżówki.
- `src/main.jsx` — komponenty React i interakcje.
- `src/styles.css` — responsywny wygląd aplikacji.
- `tests/crossword.test.js` — pięć testów jednostkowych Vitest.
- `docs/instrukcja.md` — dokumentacja użytkownika.

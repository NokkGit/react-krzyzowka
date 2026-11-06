# Instrukcja użytkownika

## Cel aplikacji

Krzyżówka sprawdza znajomość pojęć związanych z programowaniem i ekosystemem React.

## Interfejs

Plansza po lewej stronie zawiera pola do wpisywania pojedynczych liter. Lista definicji znajduje się po prawej stronie i jest podzielona na hasła poziome oraz pionowe.

Kliknięcie definicji podświetla pola należące do hasła. Po wpisaniu jednej litery kursor automatycznie przechodzi do kolejnego pola w kierunku wybranego hasła.

## Przyciski

- **Sprawdź** — poprawne pola są zielone, a błędne czerwone.
- **Pokaż rozwiązanie** — uzupełnia wszystkie pola poprawnymi literami.
- **Wyczyść** — usuwa wpisane litery oraz wyniki sprawdzania.

Licznik postępu pokazuje liczbę uzupełnionych pól. Po wpisaniu całej poprawnej krzyżówki pojawia się komunikat gratulacyjny.

## Technologie

Aplikacja korzysta z React, Vite i Vitest. Dane haseł oraz funkcje sprawdzające są oddzielone od widoku, co ułatwia testowanie i dalszą rozbudowę.

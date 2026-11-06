export const entries = [
  { id: 1, direction: 'across', answer: 'JAVASCRIPT', clue: 'Język używany do tworzenia interaktywnych stron', row: 6, col: 8 },
  { id: 2, direction: 'across', answer: 'KOMPILATOR', clue: 'Program tłumaczący kod na język komputera', row: 4, col: 0 },
  { id: 3, direction: 'down', answer: 'FUNKCJA', clue: 'Fragment programu wykonujący określone zadanie', row: 0, col: 11 },
  { id: 4, direction: 'down', answer: 'SERWER', clue: 'Komputer udostępniający dane innym komputerom', row: 6, col: 12 },
  { id: 5, direction: 'down', answer: 'PĘTLA', clue: 'Instrukcja wykonująca kod wiele razy', row: 4, col: 17 },
  { id: 6, direction: 'down', answer: 'REACT', clue: 'Biblioteka JavaScript do tworzenia interfejsów', row: 4, col: 9 },
  { id: 7, direction: 'down', answer: 'BŁĄD', clue: 'Pomyłka w programie', row: 8, col: 18 },
  { id: 8, direction: 'across', answer: 'ZMIENNA', clue: 'Nazwa przechowująca jakąś wartość', row: 10, col: 9 },
  { id: 9, direction: 'across', answer: 'TABLICA', clue: 'Zbiór kilku wartości w jednej strukturze', row: 8, col: 16 },
  { id: 10, direction: 'down', answer: 'GIT', clue: 'Program do zapisywania wersji kodu', row: 5, col: 15 }
];

export function cellsFor(entriesList = entries) {
  const cells = new Map();
  entriesList.forEach((entry) => {
    [...entry.answer].forEach((letter, index) => {
      const row = entry.row + (entry.direction === 'down' ? index : 0);
      const col = entry.col + (entry.direction === 'across' ? index : 0);
      const key = `${row}-${col}`;
      if (!cells.has(key)) cells.set(key, { row, col, letter, numbers: [] });
      const cell = cells.get(key);
      if (!cell.numbers.includes(entry.id)) cell.numbers.push(entry.id);
    });
  });
  return cells;
}

export function solutionFor(entriesList = entries) {
  return [...cellsFor(entriesList).entries()].reduce((result, [key, cell]) => ({ ...result, [key]: cell.letter }), {});
}

export function isEntryCorrect(entry, values) {
  return [...entry.answer].every((letter, index) => {
    const row = entry.row + (entry.direction === 'down' ? index : 0);
    const col = entry.col + (entry.direction === 'across' ? index : 0);
    return (values[`${row}-${col}`] || '') === letter;
  });
}

export function clueCells(entry) {
  return [...entry.answer].map((_, index) => `${entry.row + (entry.direction === 'down' ? index : 0)}-${entry.col + (entry.direction === 'across' ? index : 0)}`);
}

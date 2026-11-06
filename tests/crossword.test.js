import { describe, expect, it } from 'vitest';
import { entries, cellsFor, isEntryCorrect, solutionFor } from '../src/crossword';

describe('krzyżówka', () => {
  it('zawiera co najmniej osiem haseł', () => expect(entries.length).toBeGreaterThanOrEqual(8));
  it('tworzy komórki z numerami haseł', () => expect([...cellsFor().values()].some((cell) => cell.numbers.length > 1)).toBe(true));
  it('ma poprawne hasło JAVASCRIPT i każde hasło ma skrzyżowanie', () => {
    expect(entries.find((entry) => entry.id === 1).answer).toHaveLength(10);
    entries.forEach((entry) => {
      expect([...cellsFor().values()].some((cell) => cell.numbers.includes(entry.id) && cell.numbers.length > 1)).toBe(true);
    });
  });
  it('nie łączy dwóch haseł w jedną linię', () => {
    const coordinates = (entry) => clueCellsForTest(entry);
    entries.forEach((first, firstIndex) => entries.slice(firstIndex + 1).forEach((second) => {
      const shared = coordinates(first).filter((cell) => coordinates(second).includes(cell));
      if (shared.length) expect(first.direction).not.toBe(second.direction);
    }));
  });
  it('ma pięć pól przeznaczonych na hasło główne', () => {
    const solution = solutionFor();
    const passwordCells = ['6-14', '5-9', '8-22', '4-11', '4-7'];
    expect(passwordCells.map((key) => solution[key]).join('')).toBe('REACT');
    expect(passwordCells.map((key) => cellsFor().get(key).numbers[0])).toEqual([1, 6, 9, 3, 2]);
  });
  it('buduje rozwiązanie dla wszystkich komórek', () => expect(Object.keys(solutionFor()).length).toBeGreaterThan(0));
  it('rozpoznaje poprawnie wpisane hasło', () => {
    const entry = entries[0]; const values = {}; [...entry.answer].forEach((letter, index) => { values[`${entry.row}-${entry.col + index}`] = letter; });
    expect(isEntryCorrect(entry, values)).toBe(true);
  });
  it('odrzuca niepełne hasło', () => expect(isEntryCorrect(entries[0], {})).toBe(false));
});

function clueCellsForTest(entry) {
  return [...entry.answer].map((_, index) => `${entry.row + (entry.direction === 'down' ? index : 0)}-${entry.col + (entry.direction === 'across' ? index : 0)}`);
}

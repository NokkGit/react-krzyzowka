import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { cellsFor, clueCells, entries, isEntryCorrect, solutionFor } from './crossword';
import './styles.css';

const gridRows = 12;
const gridCols = 23;
// Jedna wyróżniona kratka z każdego z pięciu różnych haseł tworzy REACT.
const passwordCells = ['6-14', '5-9', '8-22', '4-11', '4-7'];

function App() {
  const cells = useMemo(() => cellsFor(), []);
  const solution = useMemo(() => solutionFor(), []);
  const [values, setValues] = useState({});
  const [checked, setChecked] = useState({});
  const [activeEntry, setActiveEntry] = useState(null);
  const [activeCell, setActiveCell] = useState(null);
  const inputRefs = useRef({});
  const filled = Object.values(values).filter(Boolean).length;
  const passwordValue = passwordCells.map((key) => values[key] || '');

  const focusEntry = (entry) => {
    setActiveEntry(entry.id);
    setActiveCell(clueCells(entry)[0]);
    window.setTimeout(() => inputRefs.current[clueCells(entry)[0]]?.focus(), 0);
  };

  const handleChange = (key, raw) => {
    const letter = raw.toLocaleUpperCase('pl-PL').replace(/[^A-ZĄĆĘŁŃÓŚŹŻ]/g, '').slice(-1);
    setValues((current) => ({ ...current, [key]: letter }));
    setChecked((current) => ({ ...current, [key]: undefined }));
    const selectedEntry = entries.find((entry) => entry.id === activeEntry && clueCells(entry).includes(key))
      || entries.find((entry) => clueCells(entry).includes(key));
    const cellsInDirection = selectedEntry ? clueCells(selectedEntry) : [];
    const currentIndex = cellsInDirection.indexOf(key);
    const nextKey = currentIndex >= 0 ? cellsInDirection[currentIndex + 1] : undefined;
    setActiveEntry(selectedEntry?.id || null);
    setActiveCell(nextKey || key);
    if (letter && nextKey) window.setTimeout(() => inputRefs.current[nextKey]?.focus(), 0);
  };

  const checkAnswers = () => {
    const next = {};
    Object.entries(solution).forEach(([key, letter]) => { next[key] = values[key] === letter; });
    setChecked(next);
  };

  const showSolution = () => {
    setValues(solution);
    setChecked(Object.fromEntries(Object.keys(solution).map((key) => [key, true])));
  };

  const clearAll = () => { setValues({}); setChecked({}); setActiveCell(null); setActiveEntry(null); };
  const completed = Object.keys(solution).length > 0 && Object.keys(solution).every((key) => values[key] === solution[key]);

  return (
    <main className="app-shell">
      <header className="hero">
        <div className="eyebrow">PROJEKT W REACT</div>
        <h1>Krzyżówka - podstawy programowania</h1>
        <p>Prosta krzyżówka z pojęciami, które poznaje początkujący programista.</p>
        <div className="progress-wrap" aria-label={`Postęp: ${filled} z ${Object.keys(solution).length} pól`}>
          <div className="progress-label"><span>Postęp</span><strong>{filled}/{Object.keys(solution).length}</strong></div>
          <div className="progress-track"><div className="progress-bar" style={{ width: `${(filled / Object.keys(solution).length) * 100}%` }} /></div>
        </div>
      </header>

      <section className="game-card">
        <div className="board-side">
          <div className="section-title"><span>01</span><h2>Krzyżówka</h2></div>
          <div className="board" style={{ '--grid-cols': gridCols }}>
            {Array.from({ length: gridRows * gridCols }, (_, index) => {
              const row = Math.floor(index / gridCols); const col = index % gridCols; const key = `${row}-${col}`; const cell = cells.get(key);
              if (!cell) return <div className="empty-cell" key={key} />;
              const isActive = activeCell === key || (activeEntry && clueCells(entries.find((entry) => entry.id === activeEntry)).includes(key));
              const isPasswordCell = passwordCells.includes(key);
              const status = checked[key] === true ? 'correct' : checked[key] === false ? 'wrong' : '';
              return <label className={`cell ${isActive ? 'active' : ''} ${isPasswordCell ? 'password-cell' : ''} ${status}`} key={key}>
                {cell.numbers[0] && <span className="cell-number">{cell.numbers[0]}</span>}
                <input ref={(element) => { inputRefs.current[key] = element; }} aria-label={`Pole ${row + 1}, ${col + 1}`} maxLength="1" value={values[key] || ''} onFocus={() => setActiveCell(key)} onChange={(event) => handleChange(key, event.target.value)} />
              </label>;
            })}
          </div>
          <div className="actions">
            <button className="primary" onClick={checkAnswers}>Sprawdź</button>
            <button onClick={showSolution}>Pokaż rozwiązanie</button>
            <button onClick={clearAll}>Wyczyść</button>
          </div>
          <div className="password-box">
            <div className="password-title"><strong>Hasło główne</strong><span>Wyróżnione pola</span></div>
            <div className="password-slots" aria-label="Hasło główne uzupełniane z wyróżnionych pól">
              {passwordValue.map((letter, index) => <span className={letter ? 'password-slot filled' : 'password-slot'} key={`${index}-${letter}`}>{letter || '·'}</span>)}
            </div>
          </div>
          {completed && <div className="success" role="status">Świetnie! Krzyżówka rozwiązana.</div>}
        </div>

        <aside className="clues">
          <div className="section-title"><span>02</span><h2>Hasła</h2></div>
          <p className="clue-help">Kliknij definicję, aby podświetlić odpowiednie pola.</p>
          <div className="clue-columns">
            <div><h3>Poziomo</h3>{entries.filter((entry) => entry.direction === 'across').map((entry) => <Clue key={entry.id} entry={entry} active={activeEntry === entry.id} onClick={() => focusEntry(entry)} />)}</div>
            <div><h3>Pionowo</h3>{entries.filter((entry) => entry.direction === 'down').map((entry) => <Clue key={entry.id} entry={entry} active={activeEntry === entry.id} onClick={() => focusEntry(entry)} />)}</div>
          </div>
        </aside>
      </section>

      <footer><span>Projekt wykonany w React</span><span>Powodzenia!</span></footer>
    </main>
  );
}

function Clue({ entry, active, onClick }) {
  const correct = isEntryCorrect(entry, {});
  return <button className={`clue ${active ? 'selected' : ''} ${correct ? 'solved' : ''}`} onClick={onClick}><span className="clue-number">{entry.id}</span><span>{entry.clue} <em>({entry.answer.length})</em></span></button>;
}

createRoot(document.getElementById('root')).render(<App />);

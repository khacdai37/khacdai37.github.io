import { useMemo, useState } from 'react';
import { loadMembers } from './lib/loadMembers';
import { DEFAULT_FOCUS_ID } from './config';
import { FamilyTree } from './components/FamilyTree';
import { PersonDetail } from './components/PersonDetail';

export default function App() {
  const byId = useMemo(() => loadMembers(), []);
  const firstId = useMemo(
    () => (byId.has(DEFAULT_FOCUS_ID) ? DEFAULT_FOCUS_ID : [...byId.keys()][0]),
    [byId],
  );

  const [focusId, setFocusId] = useState(firstId);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const selected = selectedId ? byId.get(selectedId) ?? null : null;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return [...byId.values()]
      .filter((m) => m.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, byId]);

  const goTo = (id: string) => {
    setFocusId(id);
    setSelectedId(id);
    setQuery('');
  };

  return (
    <div className="app">
      <header className="app__bar">
        <h1 className="app__title">Gia phả</h1>
        <div className="app__search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên…"
            aria-label="Tìm thành viên"
          />
          {results.length > 0 && (
            <ul className="app__results">
              {results.map((m) => (
                <li key={m.id}>
                  <button onClick={() => goTo(m.id)}>{m.name}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <main className="app__main">
        <FamilyTree
          focusId={focusId}
          byId={byId}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        {selected && (
          <PersonDetail
            member={selected}
            byId={byId}
            focusId={focusId}
            onClose={() => setSelectedId(null)}
            onSelect={setSelectedId}
            onSetFocus={goTo}
          />
        )}
      </main>
    </div>
  );
}

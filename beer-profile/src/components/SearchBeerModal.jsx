import { useState, useEffect, useRef } from "react";

export default function SearchBeerModal({ beers = [], onSelect, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const q = query.trim();
  const filtered = q
    ? beers.filter(
        (b) =>
          b.name.includes(q) ||
          (b.type ?? "").includes(q) ||
          b.category.includes(q) ||
          (b.tags ?? []).some((t) => t.includes(q)) ||
          (b.brewery ?? "").includes(q)
      )
    : beers;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>

        {/* 핸들 */}
        <div className="search-modal-handle" />

        {/* 검색창 */}
        <div className="search-modal-header">
          <span className="search-modal-title">어떤 맥주 찾으세요?</span>
          <div className="search-modal-bar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="10.5" cy="10.5" r="6.5"/>
              <line x1="15.5" y1="15.5" x2="21" y2="21"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="search-modal-input"
              placeholder="맥주 이름, 스타일, 카테고리 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="search-modal-clear" onClick={() => setQuery("")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* 결과 목록 */}
        <div className="search-modal-list">
          {filtered.length === 0 ? (
            <div className="search-modal-empty">
              <p className="empty-icon">🍺</p>
              <p className="empty-msg">검색 결과가 없어요</p>
            </div>
          ) : (
            filtered.map((beer) => (
              <button
                key={beer.id}
                className="search-modal-item"
                onClick={() => onSelect(beer)}
              >
                <div className="search-modal-item-img" style={{ background: beer.srmColor + "22" }}>
                  <span>🍺</span>
                  <div className="search-modal-item-srm" style={{ background: beer.srmColor }} />
                </div>
                <div className="search-modal-item-info">
                  <div className="search-modal-item-row">
                    <span className="search-modal-item-category">{beer.category}</span>
                    <span className="search-modal-item-abv">{beer.abv}</span>
                  </div>
                  <p className="search-modal-item-name">{beer.name}</p>
                  <p className="search-modal-item-type">{beer.type}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0C4CC" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            ))
          )}
          <div style={{ height: 32 }} />
        </div>
      </div>
    </div>
  );
}

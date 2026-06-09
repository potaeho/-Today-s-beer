import { useState } from "react";
import BeerCard from "../components/BeerCard";
import { BEER_LIST, CATEGORIES } from "../data/beerData";

export default function HomePage({ onSelectBeer }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");

  const allCategories = ["전체", ...CATEGORIES];

  const filtered = BEER_LIST.filter((b) => {
    const matchQuery =
      !query ||
      b.name.includes(query) ||
      b.type.includes(query) ||
      b.tags.some((t) => t.includes(query));
    const matchCategory =
      activeCategory === "전체" || b.category === activeCategory;
    return matchQuery && matchCategory;
  });

  const grouped = CATEGORIES.reduce((acc, cat) => {
    const beers = filtered.filter((b) => b.category === cat);
    if (beers.length > 0) acc.push({ category: cat, beers });
    return acc;
  }, []);

  const featured = BEER_LIST[0];

  return (
    <div className="home-page">

      {/* ── 고정 헤더 ── */}
      <div className="home-sticky-header">
        {/* 앱바 */}
        <div className="appbar">
          <span className="appbar-logo">오늘의 맥주</span>
          <button className="appbar-icon">⚙︎</button>
        </div>

        {/* 검색 */}
        <div className="home-search-wrap">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="맥주 이름 또는 스타일 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery("")}>✕</button>
            )}
          </div>
        </div>

        {/* 카테고리 필터 탭 */}
        <div className="category-tabs-wrap">
          <div className="category-tabs">
            {allCategories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
          </div>
        </div>
      </div>{/* ── /고정 헤더 ── */}

      {/* 스크롤 콘텐츠 */}
      <div className="home-scroll-body">

      {/* 오늘의 픽 — 검색/필터 없을 때만 */}
      {!query && activeCategory === "전체" && (
        <div className="home-section">
          <div className="home-section-header">
            <p className="home-section-eyebrow">Today's Pick</p>
            <h2 className="home-section-title">오늘 마시기 딱 좋은 맥주</h2>
          </div>
          <div className="today-card" onClick={() => onSelectBeer(featured)}>
            <div className="today-card-left">
              <div className="today-card-img" style={{ background: featured.srmColor + "20" }}>
                <span>🍺</span>
              </div>
            </div>
            <div className="today-card-right">
              <p className="today-card-type">{featured.type}</p>
              <h3 className="today-card-name">{featured.name}</h3>
              <p className="today-card-abv">ABV {featured.abv}</p>
              <div className="today-card-tags">
                {featured.tags.map((t) => (
                  <span key={t} className="today-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="today-card-profile">
              {Object.entries(featured.profile).map(([k, v]) => (
                <div key={k} className="today-profile-row">
                  <span className="today-profile-key">{k[0]}</span>
                  <div className="today-profile-bar-track">
                    <div className="today-profile-bar-fill" style={{ width: `${(v / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 검색 결과 */}
      {query && (
        <div className="home-section">
          <p className="search-result-label">"{query}" 검색 결과 {filtered.length}건</p>
          <div className="beer-list">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <p className="empty-icon">🍺</p>
                <p className="empty-msg">검색 결과가 없습니다</p>
              </div>
            ) : (
              filtered.map((beer) => (
                <BeerCard key={beer.id} beer={beer} onClick={onSelectBeer} />
              ))
            )}
          </div>
        </div>
      )}

      {/* 카테고리별 그룹 목록 */}
      {!query && (
        grouped.length === 0 ? (
          <div className="home-section">
            <div className="empty-state">
              <p className="empty-icon">🍺</p>
              <p className="empty-msg">해당 카테고리의 맥주가 없습니다</p>
            </div>
          </div>
        ) : (
          grouped.map(({ category, beers }) => (
            <div key={category} className="home-section">
              <div className="home-section-header">
                <p className="home-section-eyebrow">{category}</p>
                <span className="category-count">{beers.length}종</span>
              </div>
              <div className="beer-list">
                {beers.map((beer) => (
                  <BeerCard key={beer.id} beer={beer} onClick={onSelectBeer} />
                ))}
              </div>
            </div>
          ))
        )
      )}

      <div style={{ height: 48 }} />
      </div>{/* ── /home-scroll-body ── */}
    </div>
  );
}

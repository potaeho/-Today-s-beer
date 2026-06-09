import { useState } from "react";
import BeerCard from "../components/BeerCard";
import BeerRecommendSlider from "../components/BeerRecommendSlider";
import { BEER_LIST, CATEGORIES } from "../data/beerData";

const CATEGORY_DESC = {
  전체: "지금 가장 인기 있는 맥주",
  라거: "깔끔하고 청량한 라거",
  에일: "풍부한 홉 향의 에일",
  IPA: "홉 향 가득한 IPA",
  사워: "새콤달콤한 사워 에일",
  스타우트: "깊고 진한 다크 맥주",
};

export default function ExplorePage({ onSelectBeer }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");

  const allCategories = ["전체", ...CATEGORIES];

  const filtered = BEER_LIST.filter((b) => {
    const matchQuery =
      !query ||
      b.name.includes(query) ||
      b.type.includes(query) ||
      b.tags.some((t) => t.includes(query));
    const matchCat = activeCategory === "전체" || b.category === activeCategory;
    return matchQuery && matchCat;
  });

  const grouped = CATEGORIES.reduce((acc, cat) => {
    const beers = filtered.filter((b) => b.category === cat);
    if (beers.length > 0) acc.push({ category: cat, beers });
    return acc;
  }, []);

  // 추천: 선택된 카테고리 기준 상위 3종
  const recommended = activeCategory === "전체"
    ? BEER_LIST.slice(0, 3)
    : BEER_LIST.filter((b) => b.category === activeCategory).slice(0, 3);

  return (
    <div className="home-page">
      <div className="home-sticky-header">
        <div className="appbar">
          <span className="appbar-logo">맥주 탐색</span>
        </div>
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
            {query && <button className="search-clear" onClick={() => setQuery("")}>✕</button>}
          </div>
        </div>
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
      </div>

      <div className="home-scroll-body">

        {/* 추천 슬라이더 — 검색 중엔 숨김 */}
        {!query && (
          <div className="home-section">
            <div className="section-row-header">
              <h2 className="home-section-title">
                이런 맥주 어때요? <span className="home-section-eyebrow-inline">Pick</span>
              </h2>
            </div>
            <BeerRecommendSlider beers={recommended} onSelect={onSelectBeer} />
          </div>
        )}

        {/* 전체 목록 */}
        {query ? (
          <div className="home-section">
            <p className="search-result-label">"{query}" 검색 결과 {filtered.length}건</p>
            <div className="beer-list">
              {filtered.length === 0
                ? <div className="empty-state"><p className="empty-icon">🍺</p><p className="empty-msg">검색 결과가 없습니다</p></div>
                : filtered.map((beer) => <BeerCard key={beer.id} beer={beer} onClick={onSelectBeer} />)
              }
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
                {beers.map((beer) => <BeerCard key={beer.id} beer={beer} onClick={onSelectBeer} />)}
              </div>
            </div>
          ))
        )}
        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}

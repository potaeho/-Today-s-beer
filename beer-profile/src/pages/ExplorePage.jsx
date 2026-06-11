import { useState, useMemo } from "react";
import BeerCard from "../components/BeerCard";
import BeerRecommendSlider from "../components/BeerRecommendSlider";
import { CATEGORIES } from "../data/beerData";
import {
  getPersonalizedRecommendations,
  getMyRatedCount,
} from "../utils/recommend";

const PERSONALIZED_THRESHOLD = 5;

export default function ExplorePage({ beers = [], onSelectBeer, userName = "사용자" }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");

  const allCategories = ["전체", ...CATEGORIES];

  const ratedCount = getMyRatedCount();
  const isPersonalized = ratedCount >= PERSONALIZED_THRESHOLD;

  const q = query.trim();
  const filtered = beers.filter((b) => {
    const matchQuery =
      !q ||
      b.name.includes(q) ||
      (b.type ?? "").includes(q) ||
      (b.tags ?? []).some((t) => t.includes(q)) ||
      (b.brewery ?? "").includes(q);
    const matchCat = activeCategory === "전체" || b.category === activeCategory;
    return matchQuery && matchCat;
  });

  const grouped = CATEGORIES.reduce((acc, cat) => {
    const catBeers = filtered.filter((b) => b.category === cat);
    if (catBeers.length > 0) acc.push({ category: cat, beers: catBeers });
    return acc;
  }, []);

  // ── 추천 아이템 계산 ──────────────────────────────
  const recommendItems = useMemo(() => {
    if (isPersonalized) {
      const recs = getPersonalizedRecommendations(beers, 6);
      if (activeCategory === "전체") return recs.slice(0, 3);
      const catRecs = recs.filter((r) => r.beer.category === activeCategory);
      return catRecs.length > 0 ? catRecs.slice(0, 3) : recs.slice(0, 3);
    } else {
      const pool =
        activeCategory === "전체"
          ? beers.slice(0, 3)
          : beers.filter((b) => b.category === activeCategory).slice(0, 3);
      return pool.map((beer) => ({ beer, reason: null }));
    }
  }, [beers, isPersonalized, activeCategory]);

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
            {query && (
              <button className="search-clear" onClick={() => setQuery("")}>
                ✕
              </button>
            )}
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
              {isPersonalized ? (
                <div className="rec-header-personalized">
                  <h2 className="home-section-title">
                    <span className="rec-username">{userName}</span>님을 위한 추천
                  </h2>
                  <span className="rec-badge rec-badge--personal">AI 맞춤</span>
                </div>
              ) : (
                <div className="rec-header-md">
                  <h2 className="home-section-title">
                    이런 맥주 어때요?&nbsp;
                    <span className="home-section-eyebrow-inline">Pick</span>
                  </h2>
                  <span className="rec-badge rec-badge--md">MD 추천</span>
                </div>
              )}
            </div>
            {!isPersonalized && (
              <p className="rec-hint">
                리뷰 {ratedCount}/{PERSONALIZED_THRESHOLD}개 · {PERSONALIZED_THRESHOLD - ratedCount}개 더 남기면 맞춤 추천으로 전환돼요 ✨
              </p>
            )}
            <BeerRecommendSlider items={recommendItems} onSelect={onSelectBeer} />
          </div>
        )}

        {/* 전체 목록 */}
        {query ? (
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
        )}
        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}

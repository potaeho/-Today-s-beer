import { useState, useEffect } from "react";

export default function BeerRecommendSlider({ items = [], onSelect }) {
  const [current, setCurrent] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => { setCurrent(0); }, [items]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [items]);

  if (!items.length) return null;

  const featured = items[current];
  const others = items.filter((_, i) => i !== current).slice(0, 2);

  const maxScore = Math.max(...items.map((i) => i.score || 0), 1);
  const getPct = (score) => Math.min(99, Math.round(72 + ((score || 0) / maxScore) * 25));

  return (
    <div className="rec-wrap">
      {/* 메인 추천 카드 */}
      <div
        className="rec-featured"
        style={{ background: featured.beer.srmColor + "18", borderColor: featured.beer.srmColor + "44" }}
        onClick={() => onSelect(featured.beer)}
      >
        {featured.reason && (
          <p className="rec-featured-reason">✨ {featured.reason}</p>
        )}
        <div className="rec-featured-body">
          <div className="rec-featured-img" style={{ background: featured.beer.srmColor + "33" }}>
            {featured.beer.image ? (
              <img src={featured.beer.image} alt={featured.beer.name} onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
            ) : null}
            <span style={{ display: featured.beer.image ? "none" : "flex" }}>🍺</span>
          </div>
          <div className="rec-featured-info">
            <p className="rec-featured-category">{featured.beer.category}</p>
            <p className="rec-featured-name">{featured.beer.name}</p>
            <p className="rec-featured-abv">ABV {featured.beer.abv}</p>
            <div className="rec-featured-bottom">
              <div className="rec-featured-tags">
                {(featured.beer.tags ?? []).slice(0, 2).map((t) => (
                  <span key={t} className="rec-featured-tag">{t}</span>
                ))}
              </div>
              {items.length > 1 && (
                <span className="rec-featured-pager">{current + 1} / {items.length}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 추천 목록 */}
      {(showAll ? items.filter((_, i) => i !== current) : others).map(({ beer, score }) => (
        <div key={beer.id} className="rec-list-row" onClick={() => onSelect(beer)}>
          <div className="rec-list-img" style={{ background: beer.srmColor + "22" }}>
            {beer.image ? (
              <img src={beer.image} alt={beer.name} onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
            ) : null}
            <span style={{ display: beer.image ? "none" : "flex" }}>🍺</span>
          </div>
          <div className="rec-list-info">
            <p className="rec-list-name">{beer.name}</p>
            <p className="rec-list-sub">{beer.category} · ABV {beer.abv}</p>
          </div>
          <span className="rec-list-pct">{getPct(score)}% 일치</span>
        </div>
      ))}

      {/* 더 보기 */}
      {!showAll && items.length > 3 && (
        <button className="rec-more-btn" onClick={() => setShowAll(true)}>
          취향 맞는 맥주 {items.length - 3}개 더 →
        </button>
      )}
    </div>
  );
}

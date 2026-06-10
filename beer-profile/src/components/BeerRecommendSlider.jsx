import { useState, useEffect } from "react";

/**
 * items: Array<{ beer, reason? }>
 *   - beer: BEER_LIST 아이템
 *   - reason: 추천 이유 문자열 (없으면 숨김)
 */
export default function BeerRecommendSlider({ items = [], onSelect }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [items]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [items]);

  if (!items.length) return null;

  const { beer, reason } = items[current];

  return (
    <div
      className="beer-rec-slider"
      style={{ background: beer.srmColor + "22", borderColor: beer.srmColor + "55" }}
      onClick={() => onSelect(beer)}
    >
      <div className="beer-rec-slider-img" style={{ background: beer.srmColor + "33" }}>
        <span>🍺</span>
        <div className="beer-rec-srm-dot" style={{ background: beer.srmColor }} />
      </div>
      <div className="beer-rec-slider-body">
        {reason && (
          <p className="beer-rec-reason">✨ {reason}</p>
        )}
        <p className="beer-rec-slider-category">{beer.category}</p>
        <p className="beer-rec-slider-name">{beer.name}</p>
        <p className="beer-rec-slider-abv">ABV {beer.abv}</p>
        <div className="beer-rec-slider-tags">
          {beer.tags.map((t) => (
            <span key={t} className="beer-rec-slider-tag">{t}</span>
          ))}
        </div>
      </div>
      <div className="beer-rec-slider-indicator">
        <span>{current + 1} / {items.length}</span>
      </div>
    </div>
  );
}

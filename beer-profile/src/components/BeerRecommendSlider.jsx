import { useState, useEffect } from "react";

export default function BeerRecommendSlider({ beers, onSelect }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [beers]);

  useEffect(() => {
    if (beers.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % beers.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [beers]);

  if (!beers.length) return null;
  const beer = beers[current];

  return (
    <div
      className="beer-rec-slider"
      style={{ background: beer.srmColor + "22", borderColor: beer.srmColor + "55" }}
      onClick={() => onSelect(beer)}
    >
      <div className="beer-rec-slider-img" style={{ background: beer.srmColor + "33" }}>
        <span>🍺</span>
        <div className="beer-rec-srm-dot" style={{ background: beer.srmColor }}/>
      </div>
      <div className="beer-rec-slider-body">
        <p className="beer-rec-slider-category">{beer.category}</p>
        <p className="beer-rec-slider-name">{beer.name}</p>
        <p className="beer-rec-slider-abv">ABV {beer.abv}</p>
        <div className="beer-rec-slider-tags">
          {beer.tags.map((t) => <span key={t} className="beer-rec-slider-tag">{t}</span>)}
        </div>
      </div>
      <div className="beer-rec-slider-indicator">
        <span>{current + 1} / {beers.length}</span>
      </div>
    </div>
  );
}

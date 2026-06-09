import { useState, useEffect } from "react";
import { NEWS_LIST } from "../data/newsData";

export default function NewsSlider({ onSelectNews, onShowAll }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % NEWS_LIST.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const news = NEWS_LIST[current];

  return (
    <div
      className="news-slider"
      style={{ background: news.color }}
      onClick={() => onSelectNews(news)}
    >
      <div className="news-slider-content">
        <span className="news-slider-emoji">{news.emoji}</span>
        <span className="news-slider-category">{news.category}</span>
        <p className="news-slider-title">{news.title}</p>
        <p className="news-slider-date">{news.date}</p>
      </div>

      {/* 우측 하단 인디케이터 */}
      <div
        className="news-slider-indicator"
        onClick={(e) => { e.stopPropagation(); onShowAll(); }}
      >
        <span className="news-slider-count">
          {current + 1} / {NEWS_LIST.length}
        </span>
        <span className="news-slider-divider">|</span>
        <span className="news-slider-all">전체보기</span>
      </div>
    </div>
  );
}

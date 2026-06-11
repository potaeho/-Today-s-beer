import { useState } from "react";

export default function NewsDetailPage({ news, onBack }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="news-detail-page">
      {/* 상단 헤더 — 풀블리드 이미지 or 컬러 배경 */}
      <div
        className="news-detail-header"
        style={{ background: news.color }}
      >
        {news.image && !imgErr && (
          <img
            src={news.image}
            alt={news.title}
            className="news-detail-hero-img"
            onError={() => setImgErr(true)}
          />
        )}
        <div className="news-detail-header-overlay" />

        <button className="back-btn news-detail-back" onClick={onBack}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          홈
        </button>

        <div className="news-detail-hero">
          {(imgErr || !news.image) && (
            <span className="news-detail-emoji">{news.emoji}</span>
          )}
          <span className="news-detail-category">{news.category}</span>
          <h1 className="news-detail-title">{news.title}</h1>
          <p className="news-detail-date">{news.date}</p>
        </div>
      </div>

      {/* 본문 */}
      <div className="news-detail-body">
        {news.content.split("\n\n").map((para, i) => (
          para.startsWith("**") ? (
            <p key={i} className="news-detail-heading">
              {para.replace(/\*\*/g, "")}
            </p>
          ) : (
            <p key={i} className="news-detail-para">{para}</p>
          )
        ))}
      </div>
    </div>
  );
}

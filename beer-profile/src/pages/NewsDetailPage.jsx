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
        {news.content.split("\n\n").map((para, i) => {
          if (para.startsWith("**") && para.endsWith("**")) {
            return (
              <p key={i} className="news-detail-heading">
                {para.replace(/\*\*/g, "")}
              </p>
            );
          }
          // 리스트 블록 (- **항목** — 설명)
          if (para.includes("\n- ") || para.startsWith("- ")) {
            const lines = para.split("\n");
            return (
              <ul key={i} className="news-detail-list">
                {lines.map((line, j) => {
                  if (!line.startsWith("- ")) return null;
                  const text = line.slice(2);
                  const parts = text.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <li key={j} className="news-detail-list-item">
                      {parts.map((part, k) =>
                        part.startsWith("**") ? (
                          <strong key={k}>{part.replace(/\*\*/g, "")}</strong>
                        ) : part
                      )}
                    </li>
                  );
                })}
              </ul>
            );
          }
          // 인라인 볼드 처리 (**텍스트**)
          const parts = para.split(/(\*\*[^*]+\*\*)/g);
          const hasInlineBold = parts.some(p => p.startsWith("**"));
          if (hasInlineBold) {
            return (
              <p key={i} className="news-detail-para">
                {parts.map((part, k) =>
                  part.startsWith("**") ? (
                    <strong key={k}>{part.replace(/\*\*/g, "")}</strong>
                  ) : part
                )}
              </p>
            );
          }
          return <p key={i} className="news-detail-para">{para}</p>;
        })}

        {/* 출처 */}
        {news.sources && news.sources.length > 0 && (
          <div className="news-detail-sources">
            <p className="news-detail-sources-title">출처</p>
            <ul className="news-detail-sources-list">
              {news.sources.map((src, i) => (
                <li key={i}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-detail-source-link"
                  >
                    {src.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

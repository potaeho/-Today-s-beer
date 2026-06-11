export default function NewsDetailPage({ news, onBack }) {
  return (
    <div className="news-detail-page">
      {/* 상단 헤더 */}
      <div className="news-detail-header" style={{ background: news.color }}>
        <button className="back-btn" onClick={onBack}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          홈
        </button>
        <div className="news-detail-hero">
          <span className="news-detail-emoji">{news.emoji}</span>
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

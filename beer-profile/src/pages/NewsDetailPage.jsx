export default function NewsDetailPage({ news, onBack }) {
  return (
    <div className="news-detail-page">
      {/* 상단 헤더 */}
      <div className="news-detail-header" style={{ background: news.color }}>
        <button className="back-btn" onClick={onBack}>← 뒤로</button>
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

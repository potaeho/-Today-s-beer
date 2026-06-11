import { NEWS_LIST } from "../data/newsData";

export default function NewsListPage({ onSelectNews, onBack }) {
  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        홈
      </button>
      <h2 className="news-list-title">새 소식</h2>
      <div className="news-list-items">
        {NEWS_LIST.map((news) => (
          <div
            key={news.id}
            className="news-list-item"
            onClick={() => onSelectNews(news)}
          >
            <div className="news-list-item-icon" style={{ background: news.color }}>
              <span>{news.emoji}</span>
            </div>
            <div className="news-list-item-body">
              <span className="news-list-item-category">{news.category}</span>
              <p className="news-list-item-title">{news.title}</p>
              <p className="news-list-item-date">{news.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

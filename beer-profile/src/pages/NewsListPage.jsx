import { NEWS_LIST } from "../data/newsData";

export default function NewsListPage({ onSelectNews, onBack }) {
  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>← 뒤로</button>
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

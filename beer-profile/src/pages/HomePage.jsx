import { useState } from "react";
import LevelCard from "../components/LevelCard";
import LevelJourneyModal from "../components/LevelJourneyModal";
import NewsSlider from "../components/NewsSlider";
import NewsDetailPage from "./NewsDetailPage";
import NewsListPage from "./NewsListPage";
import { getPersonalizedRecommendations, getMyRatedCount } from "../utils/recommend";

export default function HomePage({ onSelectBeer, onGoExplore }) {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showNewsList, setShowNewsList] = useState(false);
  const [showJourney, setShowJourney] = useState(false);

  const ratedCount = getMyRatedCount();
  const recommended = getPersonalizedRecommendations(6);

  if (selectedNews) {
    return <NewsDetailPage news={selectedNews} onBack={() => setSelectedNews(null)} />;
  }

  if (showNewsList) {
    return (
      <NewsListPage
        onSelectNews={(news) => { setShowNewsList(false); setSelectedNews(news); }}
        onBack={() => setShowNewsList(false)}
      />
    );
  }

  return (
    <div className="home-page">

      {/* 고정 헤더 */}
      <div className="home-sticky-header">
        <div className="appbar">
          <span className="appbar-logo">오늘의 맥주</span>
          <div className="appbar-actions">
            <button className="appbar-icon" onClick={() => setShowSearch((v) => !v)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="10.5" cy="10.5" r="6.5"/>
                <line x1="15.5" y1="15.5" x2="21" y2="21"/>
              </svg>
            </button>
            <button className="appbar-icon" onClick={() => alert("알림 기능 준비 중입니다 🔔")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <button className="appbar-icon" onClick={() => alert("바코드 스캔 기능 준비 중입니다 📷")}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9V5a2 2 0 0 1 2-2h4"/>
                <path d="M15 3h4a2 2 0 0 1 2 2v4"/>
                <path d="M21 15v4a2 2 0 0 1-2 2h-4"/>
                <path d="M9 21H5a2 2 0 0 1-2-2v-4"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* 검색창 — 돋보기 클릭 시 토글 */}
        {showSearch && (
          <div className="home-search-wrap">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="맥주 이름 또는 스타일 검색"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
              {query && <button className="search-clear" onClick={() => setQuery("")}>✕</button>}
            </div>
          </div>
        )}
      </div>

      <div className="home-scroll-body">

        {/* 게이미피케이션 레벨 카드 */}
        <div className="home-section">
          <LevelCard ratedCount={ratedCount} onClick={() => setShowJourney(true)} />
        </div>

        {/* 레벨 여정 모달 */}
        {showJourney && (
          <LevelJourneyModal ratedCount={ratedCount} onClose={() => setShowJourney(false)} />
        )}

        {/* 새 소식 슬라이더 */}
        <div className="home-section">
          <div className="section-row-header">
            <h2 className="home-section-title">새 소식 <span className="home-section-eyebrow-inline">Latest</span></h2>
          </div>
          <NewsSlider
            onSelectNews={setSelectedNews}
            onShowAll={() => setShowNewsList(true)}
          />
        </div>

        {/* 추천 맥주 */}
        <div className="home-section">
          <div className="section-row-header">
            <h2 className="home-section-title">추천 맥주 <span className="home-section-eyebrow-inline">For You</span></h2>
            <button className="section-more-btn" onClick={onGoExplore}>더 알아보기 →</button>
          </div>
          <div className="horizontal-scroll">
            {recommended.map(({ beer, reason }) => (
              <div key={beer.id} className="rec-card" onClick={() => onSelectBeer(beer)}>
                <div className="rec-card-img" style={{ background: beer.srmColor + "22" }}>
                  <span>🍺</span>
                  <div className="rec-card-srm" style={{ background: beer.srmColor }}/>
                </div>
                <p className="rec-card-category">{beer.category}</p>
                <p className="rec-card-name">{beer.name}</p>
                <p className="rec-card-abv">{beer.abv}</p>
                {reason && <p className="rec-card-reason">{reason}</p>}
                <div className="rec-card-tags">
                  {beer.tags.map((t) => <span key={t} className="rec-card-tag">{t}</span>)}
                </div>
                <button className="rec-card-btn">마셔보기</button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}

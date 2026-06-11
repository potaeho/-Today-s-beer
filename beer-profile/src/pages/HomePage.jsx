import { useState } from "react";
import LevelCard from "../components/LevelCard";
import LevelJourneyModal from "../components/LevelJourneyModal";
import NewsSlider from "../components/NewsSlider";
import NewsDetailPage from "./NewsDetailPage";
import NewsListPage from "./NewsListPage";
import { getPersonalizedRecommendations, getTrendingBeers, getMyRatedCount } from "../utils/recommend";
import { useNotification } from "../contexts/NotificationContext";

export default function HomePage({ beers = [], onSelectBeer, onGoExplore }) {
  const { openCenter, addToast } = useNotification();
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showNewsList, setShowNewsList] = useState(false);
  const [showJourney, setShowJourney] = useState(false);

  const ratedCount = getMyRatedCount();
  const trending = getTrendingBeers(beers, 6);
  const recommended = getPersonalizedRecommendations(beers, 3);

  const TREND_ICON = { hot: "🔥", new: "🆕", seasonal: "☀️", issue: "📈" };

  const q = query.trim();
  const searchResults = q
    ? beers.filter(
        (b) =>
          b.name.includes(q) ||
          (b.type ?? "").includes(q) ||
          (b.brewery ?? "").includes(q) ||
          (b.tags ?? []).some((t) => t.includes(q))
      )
    : [];

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
            <button className="appbar-icon" aria-label="알림" onClick={openCenter}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <button className="appbar-icon" aria-label="바코드 스캔" onClick={() => addToast({ message: "바코드 스캔 기능을 준비 중입니다 📷", type: "info" })}>
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
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="10.5" cy="10.5" r="6.5"/>
                <line x1="15.5" y1="15.5" x2="21" y2="21"/>
              </svg>
              <input
                type="text"
                placeholder="맥주 이름, 스타일, 브루어리 검색"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
              {query && (
                <button className="search-clear" aria-label="검색어 지우기" onClick={() => setQuery("")}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 검색 결과 */}
      {showSearch && q && (
        <div className="home-search-results">
          {searchResults.length === 0 ? (
            <div className="home-search-empty">
              <p className="home-search-empty-text">"{q}"에 대한 결과가 없습니다</p>
            </div>
          ) : (
            <ul className="home-search-list">
              {searchResults.map((beer) => (
                <li key={beer.id}>
                  <button
                    className="home-search-item"
                    onClick={() => { onSelectBeer(beer); setQuery(""); setShowSearch(false); }}
                  >
                    <div className="home-search-item-img" style={{ background: beer.srmColor + "22" }}>
                      {beer.image ? (
                        <img src={beer.image} alt={beer.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 8 }} />
                      ) : (
                        <span style={{ fontSize: 20 }}>🍺</span>
                      )}
                      <div className="home-search-item-srm" style={{ background: beer.srmColor }} />
                    </div>
                    <div className="home-search-item-info">
                      <div className="home-search-item-row">
                        <span className="home-search-item-category">{beer.category}</span>
                        <span className="home-search-item-abv">{beer.abv}</span>
                      </div>
                      <p className="home-search-item-name">{beer.name}</p>
                      <p className="home-search-item-type">{beer.type}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)", flexShrink: 0 }}>
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="home-scroll-body" style={{ display: showSearch && q ? "none" : undefined }}>

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

        {/* 추천 맥주 — 트렌딩 */}
        <div className="home-section">
          <div className="section-row-header">
            <h2 className="home-section-title">추천 맥주 <span className="home-section-eyebrow-inline">For You</span></h2>
            <button className="section-more-btn" onClick={onGoExplore}>더 알아보기 →</button>
          </div>
          <div className="horizontal-scroll">
            {trending.map(({ beer, trendType, trendLabel, reason }) => (
              <div key={beer.id} className="rec-card" onClick={() => onSelectBeer(beer)}>
                <div className="rec-card-img" style={{ background: beer.srmColor + "22" }}>
                  <span>🍺</span>
                  <div className="rec-card-srm" style={{ background: beer.srmColor }}/>
                  {trendLabel && (
                    <span className={`trend-badge trend-badge--${trendType}`}>
                      {TREND_ICON[trendType]} {trendLabel}
                    </span>
                  )}
                </div>
                {reason && <p className="rec-card-trend-reason">{reason}</p>}
                <p className="rec-card-category">{beer.category}</p>
                <p className="rec-card-name">{beer.name}</p>
                <p className="rec-card-abv">{beer.abv}</p>
                <div className="rec-card-tags">
                  {beer.tags.map((t) => <span key={t} className="rec-card-tag">{t}</span>)}
                </div>
                <button className="rec-card-btn">마셔보기</button>
              </div>
            ))}
          </div>
        </div>

        {/* AI 맞춤 추천 */}
        {recommended.length > 0 && (
          <div className="home-section">
            <div className="section-row-header">
              <h2 className="home-section-title">
                홈덕후 님을 위한 추천
                <span className="ai-badge">AI 맞춤</span>
              </h2>
            </div>
            <div className="horizontal-scroll ai-rec-scroll">
              {recommended.map(({ beer, reason }, idx) => (
                <div key={beer.id} className="ai-rec-card" onClick={() => onSelectBeer(beer)}>
                  <div className="ai-rec-reason">
                    <span className="ai-rec-sparkle">✨</span>
                    {reason}
                  </div>
                  <div className="ai-rec-body">
                    <div className="ai-rec-img" style={{ background: beer.srmColor + "22" }}>
                      <span>🍺</span>
                      <div className="ai-rec-srm" style={{ background: beer.srmColor }}/>
                    </div>
                    <div className="ai-rec-info">
                      <p className="ai-rec-category">{beer.category}</p>
                      <p className="ai-rec-name">{beer.name}</p>
                      <p className="ai-rec-abv">ABV {beer.abv}</p>
                      <div className="ai-rec-tags">
                        {beer.tags.map((t) => <span key={t} className="rec-card-tag">{t}</span>)}
                      </div>
                    </div>
                    <span className="ai-rec-page">{idx + 1} / {recommended.length}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}

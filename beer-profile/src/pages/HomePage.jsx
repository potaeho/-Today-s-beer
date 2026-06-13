import { useMemo, useState } from "react";
import LevelCard from "../components/LevelCard";
import LevelJourneyModal from "../components/LevelJourneyModal";
import NewsSlider from "../components/NewsSlider";
import NewsDetailPage from "./NewsDetailPage";
import NewsListPage from "./NewsListPage";
import LoginPage from "./LoginPage";
import { getPersonalizedRecommendations, getTrendingBeers } from "../utils/recommend";
import { filterBeers } from "../utils/search";
import { useNotification } from "../contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";
import { track } from "../utils/analytics";
import { useScreenTime } from "../hooks/useScreenTime";

export default function HomePage({ beers = [], onSelectBeer, ratedCount = 0, onGoExplore }) {
  const { openCenter, addToast } = useNotification();
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showNewsList, setShowNewsList] = useState(false);
  const [showJourney, setShowJourney] = useState(false);

  useScreenTime("home");

  const trending = useMemo(() => getTrendingBeers(beers, 6), [beers]);
  const recommended = useMemo(() => getPersonalizedRecommendations(beers, 3), [beers]);

  const TREND_ICON = { hot: "🔥", new: "🆕", seasonal: "☀️", issue: "📈" };

  const q = query.trim();
  const searchResults = useMemo(() => (q ? filterBeers(beers, q) : []), [beers, q]);

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
            {!user && (
              <button className="appbar-login-btn" onClick={() => setShowLogin(true)}>
                로그인
              </button>
            )}
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
          <LevelCard ratedCount={ratedCount} onClick={() => { track.tapLevelCard(); setShowJourney(true); }} />
        </div>

        {/* 레벨 여정 모달 */}
        {showJourney && (
          <LevelJourneyModal ratedCount={ratedCount} onClose={() => setShowJourney(false)} />
        )}

        {/* 추천 맥주 — AI 맞춤 + 트렌딩 통합 */}
        <div className="home-section">
          <div className="section-row-header">
            <h2 className="home-section-title">추천 맥주 <span className="home-section-eyebrow-inline">For You</span></h2>
          </div>
          <div className="horizontal-scroll">
            {(() => {
              const TREND_ORDER = ["new", "seasonal"];
              const aiIds = new Set(recommended.map(({ beer }) => beer.id));
              const sorted = [
                ...trending.filter(({ trendType }) => trendType === "new"),
                ...trending.filter(({ trendType }) => trendType === "seasonal"),
                ...recommended.map(({ beer, reason }) => ({ beer, trendType: "ai", trendLabel: "AI 맞춤", reason })),
                ...trending.filter(({ trendType, beer }) => !TREND_ORDER.includes(trendType) && !aiIds.has(beer.id)),
              ];
              return sorted.map(({ beer, trendType, trendLabel, reason }) => (
                <div
                  key={`${trendType}-${beer.id}`}
                  className="rec-card"
                  onClick={() => {
                    trendType === "ai" ? track.tapAiRecCard(beer) : track.tapRecommendedBeer(beer);
                    onSelectBeer(beer);
                  }}
                >
                  <div className="rec-card-img" style={{ background: beer.image ? "transparent" : beer.srmColor + "22" }}>
                    {beer.image
                      ? <img src={beer.image} alt={beer.name} loading="lazy" className="rec-card-img-photo" />
                      : <span>🍺</span>}
                    <div className="rec-card-srm" style={{ background: beer.srmColor }}/>
                    {trendLabel && (
                      <span className={`trend-badge trend-badge--${trendType}`}>
                        {trendType === "ai" ? "✨" : TREND_ICON[trendType]} {trendLabel}
                      </span>
                    )}
                  </div>
                  {reason && <p className="rec-card-trend-reason">{reason}</p>}
                  <p className="rec-card-category">{beer.category}</p>
                  <p className="rec-card-name">{beer.name}</p>
                  <p className="rec-card-abv">{beer.abv}</p>
                  <div className="rec-card-tags">
                    {(beer.tags ?? []).map((t) => <span key={t} className="rec-card-tag">{t}</span>)}
                  </div>
                  <button className="rec-card-btn" onClick={(e) => { e.stopPropagation(); track.tapDrinkBtn(beer); onSelectBeer(beer); }}>마셔보기</button>
                </div>
              ));
            })()}
          </div>
          {/* 탐색 CTA */}
          <button
            className="home-explore-cta"
            onClick={() => { track.tapMoreBtn(); onGoExplore(); }}
          >
            🍺 맥주 더 탐색하기
          </button>
        </div>

        {/* 새 소식 슬라이더 */}
        <div className="home-section">
          <div className="section-row-header">
            <h2 className="home-section-title">새 소식 <span className="home-section-eyebrow-inline">Latest</span></h2>
          </div>
          <NewsSlider
            onSelectNews={(news) => { track.tapNews(news.title); setSelectedNews(news); }}
            onShowAll={() => { track.tapNewsShowAll(); setShowNewsList(true); }}
          />
        </div>

        <div style={{ height: 100 }} />
      </div>

      {showLogin && <LoginPage onClose={() => setShowLogin(false)} />}
    </div>
  );
}

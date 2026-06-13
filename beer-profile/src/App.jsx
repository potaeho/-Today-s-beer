import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import { getMyRatedCount } from "./utils/recommend";
import { MY_USER } from "./data/reviewsData";
import InputPage from "./pages/InputPage";
import DetailPage from "./pages/DetailPage";
import ResultPage from "./pages/ResultPage";
import BeerDetailPage from "./pages/BeerDetailPage";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/ProfilePage";
import SearchBeerModal from "./components/SearchBeerModal";
import BeerActionSheet from "./components/BeerActionSheet";
import BottomTabBar from "./components/BottomTabBar";
import { BeerProvider, useBeers } from "./contexts/BeerContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import ToastContainer from "./components/ToastContainer";
import NotificationCenter from "./components/NotificationCenter";
import { track } from "./utils/analytics";
import { supabase } from "./lib/supabase";
import "./App.css";

function AppInner() {
  const { beers, loading } = useBeers();
  return <AppShell beers={beers} loadingBeers={loading} />;
}

export default function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <BeerProvider>
          <AppInner />
        </BeerProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

function AppShell({ beers, loadingBeers }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [screen, setScreen] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionBeer, setActionBeer] = useState(null);
  const [communityComposeBeer, setCommunityComposeBeer] = useState(null);
  const [selectedBeer, setSelectedBeer] = useState(null);
  const [profile, setProfile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [starRating, setStarRating] = useState(0);
  const [ratedCount, setRatedCount] = useState(() => getMyRatedCount());

  // 앱 최초 진입 + 초기 화면 기록
  useEffect(() => {
    track.appOpen();
    track.screenView("home");
  }, []);

  // 앱 이탈(탭 닫기/새로고침) — 마지막 화면 기록
  useEffect(() => {
    let fired = false;
    const handleExit = () => {
      if (fired) return;
      fired = true;
      track.exitApp(screen ?? activeTab);
    };
    const onVisibility = () => { if (document.visibilityState === "hidden") handleExit(); };
    window.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", handleExit);
    return () => {
      window.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", handleExit);
    };
  }, [screen, activeTab]);

  // 온보딩 팝업 노출 기록
  useEffect(() => {
  }, [showOnboarding]);

  // 로그인 시 DB reviews 카운트로 동기화
  useEffect(() => {
    if (!user || !supabase) return;
    supabase
      .from("reviews")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .then(({ count, error }) => {
        if (!error && typeof count === "number") setRatedCount(count);
      });
  }, [user]);

  // 카드 클릭 → 상세 페이지
  function handleSelectBeer(beer) {
    setSelectedBeer(beer);
    setScreen("beer-detail");
    track.beerDetailView(beer);
  }

  // 상세 페이지에서 "나도 평가하기" 클릭
  function handleStartRating() {
    setProfile({ ...selectedBeer.profile });
    setSelectedTags([]);
    setStarRating(0);
    setScreen("input");
    track.tapStartRating(selectedBeer);
    track.ratingStepEnter("input", selectedBeer);
  }

  function handleProfileChange(axis, value) {
    setProfile((prev) => ({ ...prev, [axis]: value }));
  }

  function handleTagToggle(id) {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function handleSave() {
    setRatedCount((c) => c + 1);
    setScreen("result");
    track.ratingStepEnter("result", selectedBeer);
    track.ratingComplete(selectedBeer, starRating, selectedTags);

    // DB reviews upsert — UUID 맥주 + 로그인 상태일 때만
    const isUUID = typeof selectedBeer?.id === "string" && /^[0-9a-f-]{36}$/.test(selectedBeer.id);
    if (user && supabase && isUUID && starRating >= 1) {
      supabase.from("reviews").upsert(
        { user_id: user.id, beer_id: selectedBeer.id, star: starRating, profile, hashtags: selectedTags },
        { onConflict: "user_id,beer_id" }
      ).then(({ error }) => {
        if (error) console.warn("[handleSave] reviews upsert:", error.message);
      });
    }
  }

  function handleHome() {
    setScreen(null);
    setActiveTab("home");
  }

  function handleTabChange(tab) {
    if (tab === "add") {
      setShowSearchModal(true);
      track.tapSearchIcon();
      return;
    }
    setScreen(null);
    setActiveTab(tab);
    track.tabChange(tab);
    track.screenView(tab);
  }

  function handleSearchSelect(beer) {
    setShowSearchModal(false);
    setActionBeer(beer);
    setShowActionSheet(true);
    track.searchSelect(beer);
    track.actionSheetOpen(beer);
  }

  function handleActionReview() {
    setShowActionSheet(false);
    setSelectedBeer(actionBeer);
    setProfile({ ...actionBeer.profile });
    setSelectedTags([]);
    setStarRating(0);
    setScreen("input");
    track.actionSheetChooseReview(actionBeer);
    track.ratingStepEnter("input", actionBeer);
  }

  function handleActionPost() {
    setShowActionSheet(false);
    setScreen(null);
    setActiveTab("community");
    setCommunityComposeBeer(actionBeer);
    track.actionSheetChoosePost(actionBeer);
  }

  const showFlow = screen !== null;

  // ── 맥주 DB 로딩 중 스피너 ───────────────────────────
  if (loadingBeers) {
    return (
      <div className="app-shell app-shell--loading">
        <div className="app-loading">
          <div className="app-loading-emoji">🍺</div>
          <p className="app-loading-text">맥주 데이터 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="app-content">
        {/* 맥주 상세 */}
        {screen === "beer-detail" && (
          <BeerDetailPage
            beer={selectedBeer}
            onBack={() => setScreen(null)}
            onRate={handleStartRating}
          />
        )}

        {/* 평가 플로우 */}
        {screen === "input" && (
          <InputPage
            beer={selectedBeer || { name: "새 맥주 평가", type: "-", abv: "-", image: null }}
            profile={profile}
            onProfileChange={handleProfileChange}
            onConfirm={() => setScreen("detail")}
            onBack={() => selectedBeer ? setScreen("beer-detail") : setScreen(null)}
            starRating={starRating}
            onStarChange={setStarRating}
          />
        )}
        {screen === "detail" && (
          <DetailPage
            beer={selectedBeer}
            profile={profile}
            selected={selectedTags}
            onToggle={handleTagToggle}
            onBack={() => setScreen("input")}
            onSave={handleSave}
            starRating={starRating}
          />
        )}
        {screen === "result" && (
          <ResultPage
            beer={selectedBeer}
            profile={profile}
            selected={selectedTags}
            starRating={starRating}
            onHome={handleHome}
          />
        )}

        {/* 탭 화면 */}
        {!showFlow && activeTab === "home" && (
          <HomePage
            beers={beers}
            onSelectBeer={handleSelectBeer}
            ratedCount={ratedCount}
            onGoExplore={() => setActiveTab("explore")}
          />
        )}
        {!showFlow && activeTab === "explore" && (
          <ExplorePage
            beers={beers}
            onSelectBeer={handleSelectBeer}
            userName={MY_USER}
          />
        )}
        {!showFlow && activeTab === "community" && (
          <CommunityPage
            beers={beers}
            composeBeer={communityComposeBeer}
            onComposeClear={() => setCommunityComposeBeer(null)}
          />
        )}
        {!showFlow && activeTab === "profile" && (
          <ProfilePage
            beers={beers}
            onSelectBeer={handleSelectBeer}
            ratedCount={ratedCount}
          />
        )}
      </div>

      {!showFlow && (
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {showSearchModal && (
        <SearchBeerModal
          beers={beers}
          onSelect={handleSearchSelect}
          onClose={() => setShowSearchModal(false)}
        />
      )}

      {showActionSheet && actionBeer && (
        <BeerActionSheet
          beer={actionBeer}
          onReview={handleActionReview}
          onPost={handleActionPost}
          onClose={() => setShowActionSheet(false)}
        />
      )}

      <NotificationCenter />
      <ToastContainer />

    </div>
  );
}

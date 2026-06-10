import { useState } from "react";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import InputPage from "./pages/InputPage";
import DetailPage from "./pages/DetailPage";
import ResultPage from "./pages/ResultPage";
import BeerDetailPage from "./pages/BeerDetailPage";
import BottomTabBar from "./components/BottomTabBar";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [screen, setScreen] = useState(null);
  const [selectedBeer, setSelectedBeer] = useState(null);
  const [profile, setProfile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [starRating, setStarRating] = useState(0);
  const [ratedCount, setRatedCount] = useState(3);

  // 카드 클릭 → 상세 페이지
  function handleSelectBeer(beer) {
    setSelectedBeer(beer);
    setScreen("beer-detail");
  }

  // 상세 페이지에서 "나도 평가하기" 클릭
  function handleStartRating() {
    setProfile({ ...selectedBeer.profile });
    setSelectedTags([]);
    setStarRating(0);
    setScreen("input");
  }

  function handleProfileChange(axis, value) {
    setProfile((prev) => ({ ...prev, [axis]: value }));
  }

  function handleTagToggle(id) {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function handleSave(rating) {
    setStarRating(rating);
    setRatedCount((c) => c + 1);
    setScreen("result");
  }

  function handleHome() {
    setScreen(null);
    setActiveTab("home");
  }

  function handleTabChange(tab) {
    if (tab === "add") {
      setSelectedBeer(null);
      setProfile({ 단맛: 2.5, 신맛: 2.5, 쓴맛: 2.5, 몰티함: 2.5, 부드러움: 2.5 });
      setSelectedTags([]);
      setStarRating(0);
      setScreen("input");
      return;
    }
    setScreen(null);
    setActiveTab(tab);
  }

  const showFlow = screen !== null;

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
          <HomePage onSelectBeer={handleSelectBeer} ratedCount={ratedCount} onGoExplore={() => setActiveTab("explore")} />
        )}
        {!showFlow && activeTab === "explore" && (
          <ExplorePage onSelectBeer={handleSelectBeer} />
        )}
        {!showFlow && activeTab === "alarm" && (
          <div className="placeholder-page">
            <p className="placeholder-icon">🔔</p>
            <p className="placeholder-text">알림</p>
            <p className="placeholder-sub">새로운 알림이 없습니다</p>
          </div>
        )}
        {!showFlow && activeTab === "profile" && (
          <div className="placeholder-page">
            <p className="placeholder-icon">👤</p>
            <p className="placeholder-text">프로필</p>
            <p className="placeholder-sub">준비 중입니다</p>
          </div>
        )}
      </div>

      {!showFlow && (
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}

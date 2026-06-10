import { useState } from "react";
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
import { track } from "./utils/analytics";
import "./App.css";

export default function App() {
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

  function handleSave(rating) {
    setStarRating(rating);
    setRatedCount((c) => c + 1);
    setScreen("result");
    track.ratingStepEnter("result", selectedBeer);
    track.ratingComplete(selectedBeer, rating, selectedTags);
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
          <ExplorePage onSelectBeer={handleSelectBeer} userName={MY_USER} />
        )}
        {!showFlow && activeTab === "community" && (
          <CommunityPage
            composeBeer={communityComposeBeer}
            onComposeClear={() => setCommunityComposeBeer(null)}
          />
        )}
        {!showFlow && activeTab === "profile" && (
          <ProfilePage onSelectBeer={handleSelectBeer} ratedCount={ratedCount} />
        )}
      </div>

      {!showFlow && (
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {showSearchModal && (
        <SearchBeerModal
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
    </div>
  );
}

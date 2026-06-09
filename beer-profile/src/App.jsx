import { useState } from "react";
import HomePage from "./pages/HomePage";
import InputPage from "./pages/InputPage";
import DetailPage from "./pages/DetailPage";
import ResultPage from "./pages/ResultPage";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedBeer, setSelectedBeer] = useState(null);
  const [profile, setProfile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [starRating, setStarRating] = useState(0);

  function handleSelectBeer(beer) {
    setSelectedBeer(beer);
    setProfile({ ...beer.profile });
    setSelectedTags([]);
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

  return (
    <div className="app-shell">
      {screen === "home" && (
        <HomePage onSelectBeer={handleSelectBeer} />
      )}
      {screen === "input" && (
        <InputPage
          beer={selectedBeer}
          profile={profile}
          onProfileChange={handleProfileChange}
          onConfirm={() => setScreen("detail")}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "detail" && (
        <DetailPage
          beer={selectedBeer}
          profile={profile}
          selected={selectedTags}
          onToggle={handleTagToggle}
          onBack={() => setScreen("input")}
          onSave={(rating) => { setStarRating(rating); setScreen("result"); }}
        />
      )}
      {screen === "result" && (
        <ResultPage
          beer={selectedBeer}
          profile={profile}
          selected={selectedTags}
          starRating={starRating}
          onHome={() => setScreen("home")}
        />
      )}
    </div>
  );
}

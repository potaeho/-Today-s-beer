import { useState } from "react";
import BeerHeader from "../components/BeerHeader";
import FlavorRadar from "../components/FlavorRadar";
import FlavorSliders from "../components/FlavorSliders";
import StarRating from "../components/StarRating";
import { PROFILE_AXES } from "../data/beerData";
import { track } from "../utils/analytics";
import { useScreenTime } from "../hooks/useScreenTime";

export default function InputPage({ beer, profile, onProfileChange, onConfirm, onBack, starRating, onStarChange }) {
  const axes = PROFILE_AXES[beer?.category] || PROFILE_AXES["에일"];
  const [slidersOpen, setSlidersOpen] = useState(false);
  useScreenTime("rating-input", { beer_id: beer?.id, beer_name: beer?.name });

  return (
    <div className="page">
      <button className="back-btn" onClick={() => { track.ratingAbandon("input", beer); onBack(); }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        맥주 정보
      </button>
      <BeerHeader beer={beer} />
      <StarRating value={starRating} onChange={onStarChange} />
      <FlavorRadar profile={profile} axes={axes} />
      <button
        className="sliders-toggle-btn"
        onClick={() => setSlidersOpen((o) => !o)}
      >
        <span>상세 맛 기록</span>
        <span className="sliders-toggle-right">
          <span className="sliders-optional-badge">선택</span>
          <span className="sliders-toggle-arrow">{slidersOpen ? "▲" : "▼"}</span>
        </span>
      </button>
      {slidersOpen && <FlavorSliders profile={profile} onChange={onProfileChange} axes={axes} />}
      <button
        className={`confirm-btn${starRating === 0 ? " confirm-btn--disabled" : ""}`}
        onClick={onConfirm}
        disabled={starRating === 0}
      >
        확인
      </button>
    </div>
  );
}

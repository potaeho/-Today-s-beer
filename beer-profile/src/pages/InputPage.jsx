import BeerHeader from "../components/BeerHeader";
import FlavorRadar from "../components/FlavorRadar";
import FlavorSliders from "../components/FlavorSliders";
import { PROFILE_AXES } from "../data/beerData";

export default function InputPage({ beer, profile, onProfileChange, onConfirm, onBack }) {
  const axes = PROFILE_AXES[beer?.category] || PROFILE_AXES["에일"];
  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        맥주 정보
      </button>
      <BeerHeader beer={beer} />
      <FlavorRadar profile={profile} axes={axes} />
      <FlavorSliders profile={profile} onChange={onProfileChange} axes={axes} />
      <button className="confirm-btn" onClick={onConfirm}>
        확인
      </button>
    </div>
  );
}

import BeerHeader from "../components/BeerHeader";
import FlavorRadar from "../components/FlavorRadar";
import FlavorSliders from "../components/FlavorSliders";
import { PROFILE_AXES } from "../data/beerData";

export default function InputPage({ beer, profile, onProfileChange, onConfirm, onBack }) {
  const axes = PROFILE_AXES[beer?.category] || PROFILE_AXES["에일"];
  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>← 목록으로</button>
      <BeerHeader beer={beer} />
      <FlavorRadar profile={profile} axes={axes} />
      <FlavorSliders profile={profile} onChange={onProfileChange} axes={axes} />
      <button className="confirm-btn" onClick={onConfirm}>
        확인
      </button>
    </div>
  );
}

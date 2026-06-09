import BeerHeader from "../components/BeerHeader";
import FlavorRadar from "../components/FlavorRadar";
import FlavorSliders from "../components/FlavorSliders";

export default function InputPage({ beer, profile, onProfileChange, onConfirm, onBack }) {
  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>← 목록으로</button>
      <BeerHeader beer={beer} />
      <FlavorRadar profile={profile} />
      <FlavorSliders profile={profile} onChange={onProfileChange} />
      <button className="confirm-btn" onClick={onConfirm}>
        확인
      </button>
    </div>
  );
}

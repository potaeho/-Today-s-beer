import BeerHeader from "../components/BeerHeader";
import FlavorRadar from "../components/FlavorRadar";
import HashtagSection from "../components/HashtagSection";
import { HASHTAG_MAP, PROFILE_AXES } from "../data/beerData";
import { track } from "../utils/analytics";
import { useScreenTime } from "../hooks/useScreenTime";

export default function DetailPage({ beer, profile, selected, onToggle, onBack, onSave }) {
  const axes = PROFILE_AXES[beer?.category] || PROFILE_AXES["에일"];
  useScreenTime("rating-detail", { beer_id: beer?.id, beer_name: beer?.name });

  const resolvedTags = selected.map((id) => HASHTAG_MAP[id]).filter(Boolean);

  return (
    <div className="page">
      <div className="detail-header">
        <button className="back-btn" onClick={() => { track.ratingAbandon("detail", beer); onBack(); }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          맛 입력
        </button>
        <BeerHeader beer={beer} />
        <FlavorRadar profile={profile} axes={axes} />
        <div className="divider" />
      </div>

      <HashtagSection selected={selected} onToggle={onToggle} />

      {/* 하단 완료 바 */}
      <div className="detail-bottom">
        {selected.length === 0 ? (
          <p className="detail-bottom-hint">맛 태그를 선택해보세요 (선택사항)</p>
        ) : (
          <div className="detail-selected-tags">
            {resolvedTags.map((tag) => (
              <span key={tag.id} className="detail-selected-chip" onClick={() => onToggle(tag.id)}>
                {tag.icon} {tag.label} ✕
              </span>
            ))}
          </div>
        )}
        <button className="detail-done-btn active" onClick={onSave}>
          완료
        </button>
      </div>

      <div style={{ height: 100 }} />
    </div>
  );
}

import { useState } from "react";
import BeerHeader from "../components/BeerHeader";
import FlavorRadar from "../components/FlavorRadar";
import HashtagSection from "../components/HashtagSection";
import ConfirmModal from "../components/ConfirmModal";
import StarRating from "../components/StarRating";
import { HASHTAG_MAP, PROFILE_AXES } from "../data/beerData";
import { track } from "../utils/analytics";
import { useScreenTime } from "../hooks/useScreenTime";

export default function DetailPage({ beer, profile, selected, onToggle, onBack, onSave }) {
  const axes = PROFILE_AXES[beer?.category] || PROFILE_AXES["에일"];
  const [showModal, setShowModal] = useState(false);
  useScreenTime("rating-detail", { beer_id: beer?.id, beer_name: beer?.name });
  const [starRating, setStarRating] = useState(0);

  const resolvedTags = selected.map((id) => HASHTAG_MAP[id]).filter(Boolean);

  function handleConfirm() {
    setShowModal(false);
    onSave(starRating);
  }

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

      {/* 별점 섹션 */}
      <StarRating value={starRating} onChange={setStarRating} />

      {/* 하단 완료 바 */}
      <div className="detail-bottom">
        {selected.length === 0 ? (
          <p className="detail-bottom-hint">맛 태그를 선택해보세요</p>
        ) : (
          <div className="detail-selected-tags">
            {resolvedTags.map((tag) => (
              <span key={tag.id} className="detail-selected-chip" onClick={() => onToggle(tag.id)}>
                {tag.icon} {tag.label} ✕
              </span>
            ))}
          </div>
        )}
        <button
          className={`detail-done-btn ${selected.length > 0 && starRating > 0 ? "active" : ""}`}
          onClick={() => setShowModal(true)}
          disabled={selected.length === 0 || starRating === 0}
        >
          완료
        </button>
      </div>

      {showModal && (
        <ConfirmModal
          beer={beer}
          profile={profile}
          selected={selected}
          starRating={starRating}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}

      <div style={{ height: 100 }} />
    </div>
  );
}

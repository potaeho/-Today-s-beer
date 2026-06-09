import { HASHTAG_MAP, AXES } from "../data/beerData";

export default function ConfirmModal({ beer, profile, selected, starRating, onConfirm, onCancel }) {
  const resolvedTags = selected.map((id) => HASHTAG_MAP[id]).filter(Boolean);

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle" />

        <p className="modal-eyebrow">맛 프로파일 저장</p>
        <h2 className="modal-title">{beer.name}</h2>
        <p className="modal-sub">{beer.type} · ABV {beer.abv}</p>

        {/* 수치 요약 */}
        <div className="modal-profile">
          {AXES.map((axis) => (
            <div key={axis} className="modal-profile-row">
              <span className="modal-profile-label">{axis}</span>
              <div className="modal-profile-track">
                <div className="modal-profile-fill" style={{ width: `${(profile[axis] / 5) * 100}%` }} />
              </div>
              <span className="modal-profile-value">{profile[axis].toFixed(1)}</span>
            </div>
          ))}
        </div>

        {/* 재구매 별점 */}
        {starRating > 0 && (
          <div className="modal-star-row">
            <span className="modal-star-label">재구매 의사</span>
            <div className="modal-stars">
              {[1,2,3,4,5].map((s) => (
                <span key={s} className={s <= starRating ? "modal-star filled" : "modal-star"}>★</span>
              ))}
            </div>
          </div>
        )}

        {/* 선택된 해시태그 */}
        {resolvedTags.length > 0 && (
          <>
            <p className="modal-tag-label">선택된 맛 태그</p>
            <div className="modal-tags">
              {resolvedTags.map((tag) => (
                <span key={tag.id} className="modal-tag">
                  {tag.icon} #{tag.label}
                </span>
              ))}
            </div>
          </>
        )}

        <div className="modal-actions">
          <button className="modal-btn-cancel" onClick={onCancel}>다시 수정</button>
          <button className="modal-btn-confirm" onClick={onConfirm}>저장하기</button>
        </div>
      </div>
    </div>
  );
}

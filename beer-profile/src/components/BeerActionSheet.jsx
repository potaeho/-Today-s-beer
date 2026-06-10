export default function BeerActionSheet({ beer, onReview, onPost, onClose }) {
  return (
    <div className="action-sheet-overlay" onClick={onClose}>
      <div className="action-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="action-sheet-handle" />

        {/* 선택된 맥주 */}
        <div className="action-sheet-beer">
          <div
            className="action-sheet-beer-img"
            style={{ background: beer.srmColor + "22" }}
          >
            <span>🍺</span>
            <div
              className="action-sheet-beer-srm"
              style={{ background: beer.srmColor }}
            />
          </div>
          <div className="action-sheet-beer-info">
            <span className="action-sheet-beer-category">{beer.category}</span>
            <p className="action-sheet-beer-name">{beer.name}</p>
            <p className="action-sheet-beer-abv">{beer.abv}</p>
          </div>
        </div>

        <p className="action-sheet-prompt">어떻게 하시겠어요?</p>

        <div className="action-sheet-options">
          <button className="action-sheet-option" onClick={onReview}>
            <div className="action-sheet-option-icon">⭐</div>
            <div className="action-sheet-option-body">
              <span className="action-sheet-option-title">리뷰 쓰기</span>
              <span className="action-sheet-option-desc">맛 프로필과 별점으로 평가해요</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0C4CC" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          <button className="action-sheet-option" onClick={onPost}>
            <div className="action-sheet-option-icon">💬</div>
            <div className="action-sheet-option-body">
              <span className="action-sheet-option-title">게시물 쓰기</span>
              <span className="action-sheet-option-desc">커뮤니티에 생각을 공유해요</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0C4CC" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

import FlavorRadar from "../components/FlavorRadar";
import { HASHTAG_MAP, AXES, PROFILE_AXES } from "../data/beerData";

const TAG_PREFIX = {
  단맛: "sweet_", 산미: "sour_", 홉향: "hop_", 몰트: "malt_",
  로스팅: "roast_", 발효: "ferment_", 질감: "tex_",
};

export default function ResultPage({ beer, profile, selected, starRating, onHome }) {
  const resolvedTags = selected.map((id) => HASHTAG_MAP[id]).filter(Boolean);
  const profileAxes = PROFILE_AXES[beer?.category] || PROFILE_AXES["에일"];

  const tagsByAxis = AXES.reduce((acc, axis) => {
    const prefix = TAG_PREFIX[axis];
    const axisTags = resolvedTags.filter((tag) => tag.id.startsWith(prefix));
    if (axisTags.length > 0) acc.push({ axis, tags: axisTags });
    return acc;
  }, []);

  return (
    <div className="page result-page">

      {/* 상단 네비 */}
      <div className="result-top-nav">
        <button className="back-btn" onClick={onHome}>← 홈으로</button>
        <div className="result-saved-badge">✓ 저장 완료</div>
      </div>

      {/* 맥주 정보 */}
      <div className="result-header">
        <div className="result-beer-info">
          <div className="result-img" style={{ background: beer.srmColor + "20" }}>
            <span>🍺</span>
          </div>
          <div>
            <p className="result-type">{beer.type}</p>
            <h2 className="result-name">{beer.name}</h2>
            <p className="result-abv">ABV {beer.abv}</p>
          </div>
        </div>
      </div>

      {/* 레이더 차트 */}
      <div className="result-section">
        <p className="result-section-label">맛 프로파일</p>
        <FlavorRadar profile={profile} axes={profileAxes} />
        <div className="result-axis-values">
          {profileAxes.map((axis) => (
            <div key={axis} className="result-axis-row">
              <span className="result-axis-name">{axis}</span>
              <div className="result-axis-track">
                <div className="result-axis-fill" style={{ width: `${((profile[axis] ?? 0) / 5) * 100}%` }} />
              </div>
              <span className="result-axis-value">{(profile[axis] ?? 0).toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 재구매 별점 */}
      {starRating > 0 && (
        <div className="result-section">
          <p className="result-section-label">재구매 의사</p>
          <div className="result-star-row">
            {[1,2,3,4,5].map((s) => (
              <span key={s} className={s <= starRating ? "result-star filled" : "result-star"}>★</span>
            ))}
            <span className="result-star-text">
              {starRating === 1 && "다시 마시고 싶지 않아요"}
              {starRating === 2 && "별로였어요"}
              {starRating === 3 && "그저 그랬어요"}
              {starRating === 4 && "또 마시고 싶어요"}
              {starRating === 5 && "꼭 다시 마실 거예요 🍺"}
            </span>
          </div>
        </div>
      )}

      {/* 선택된 해시태그 */}
      {tagsByAxis.length > 0 && (
        <div className="result-section">
          <p className="result-section-label">맛 태그</p>
          <div className="result-tags-groups">
            {tagsByAxis.map(({ axis, tags }) => (
              <div key={axis} className="result-tag-group">
                <p className="result-tag-axis">{axis}</p>
                <div className="result-tag-chips">
                  {tags.map((tag) => (
                    <span key={tag.id} className="result-tag-chip">
                      {tag.icon} {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 하단 여백 (고정 버튼 높이만큼) */}
      <div style={{ height: 100 }} />

      {/* 하단 고정 버튼 */}
      <div className="result-bottom-bar">
        <button className="result-home-btn" onClick={onHome}>
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

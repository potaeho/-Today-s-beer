import { useState, useEffect } from "react";
import FlavorRadar from "../components/FlavorRadar";
import WaitlistModal from "../components/WaitlistModal"; // 출시 알림 모달
import { HASHTAG_MAP, AXES, PROFILE_AXES } from "../data/beerData";
import { logEvent } from "../lib/track";
import { useScreenTime } from "../hooks/useScreenTime";

const TAG_PREFIX = {
  단맛: "sweet_", 산미: "sour_", 홉향: "hop_", 몰트: "malt_",
  로스팅: "roast_", 발효: "ferment_", 질감: "tex_",
};

export default function ResultPage({ beer, profile, selected, starRating, onHome }) {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  useScreenTime("result", { beer_id: beer?.id, beer_name: beer?.name });
  const showImg = beer.image && !imgErr;
  const resolvedTags = selected.map((id) => HASHTAG_MAP[id]).filter(Boolean);
  const profileAxes = PROFILE_AXES[beer?.category] || PROFILE_AXES["에일"];

  const tagsByAxis = AXES.reduce((acc, axis) => {
    const prefix = TAG_PREFIX[axis];
    const axisTags = resolvedTags.filter((tag) => tag.id.startsWith(prefix));
    if (axisTags.length > 0) acc.push({ axis, tags: axisTags });
    return acc;
  }, []);

  // 결과 페이지 진입 기록
  useEffect(() => {
    logEvent("ResultPage", "view", { targetId: beer?.id, targetType: "beer", meta: { name: beer?.name, star: starRating } });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function openRecommend() {
    logEvent("ResultPage", "tap_recommend_cta", { targetId: beer?.id, targetType: "beer", meta: { name: beer?.name } });
    setShowWaitlist(true);
  }

  return (
    <div className="page result-page">

      {/* 상단 네비 */}
      <div className="result-top-nav">
        <button className="back-btn" onClick={onHome}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          홈으로
        </button>
        <div className="result-saved-badge">✓ 저장 완료</div>
      </div>

      {/* 맥주 정보 */}
      <div className="result-header">
        <div className="result-beer-info">
          <div className="result-img" style={{ background: showImg ? "transparent" : beer.srmColor + "20" }}>
            {showImg ? (
              <img
                src={beer.image}
                alt={beer.name}
                className="result-img-photo"
                loading="lazy"
                onError={() => setImgErr(true)}
              />
            ) : (
              <span>🍺</span>
            )}
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
                <div className="result-axis-fill" style={{ transform: `scaleX(${(profile[axis] ?? 0) / 5})` }} />
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
            {[1,2,3,4,5].map((s) => {
              const filled = starRating >= s;
              const half   = !filled && starRating >= s - 0.5;
              return (
                <span key={s} className={`result-star${filled ? " filled" : half ? " half" : ""}`}>★</span>
              );
            })}
            <span className="result-star-text">
              {{
                0.5: "정말 별로였어요", 1: "다시 마시고 싶지 않아요",
                1.5: "별로였어요",      2: "그냥 그랬어요",
                2.5: "나쁘지 않아요",  3: "무난했어요",
                3.5: "꽤 맛있었어요",  4: "또 마시고 싶어요",
                4.5: "거의 완벽했어요",5: "꼭 다시 마실 거예요 🍺",
              }[starRating]}
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
      <div style={{ height: 130 }} />

      {/* 하단 고정 버튼 */}
      <div className="result-bottom-bar">
        <button className="result-save-btn result-recommend-btn" onClick={openRecommend}>
          ✨ 내 취향 추천 맥주 받기
        </button>
        <button className="result-home-link" onClick={onHome}>
          다음에 볼게요
        </button>
      </div>

      {showWaitlist && (
        <WaitlistModal beerName={beer?.name} onClose={() => setShowWaitlist(false)} />
      )}
    </div>
  );
}

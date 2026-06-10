import FlavorRadar from "../components/FlavorRadar";
import { HASHTAG_MAP, PROFILE_AXES } from "../data/beerData";
import { REVIEWS } from "../data/reviewsData";

function StarRow({ value }) {
  return (
    <span className="star-row">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= value ? "#F59E0B" : "#E5E7EB", fontSize: 14 }}>★</span>
      ))}
    </span>
  );
}

function avgProfile(reviews, axes) {
  if (!reviews || reviews.length === 0) return null;
  const sum = {};
  axes.forEach((a) => { sum[a] = 0; });
  reviews.forEach((r) => axes.forEach((a) => { sum[a] += r.profile[a] ?? 0; }));
  const result = {};
  axes.forEach((a) => { result[a] = Math.round((sum[a] / reviews.length) * 10) / 10; });
  return result;
}

export default function BeerDetailPage({ beer, onBack, onRate }) {
  const axes = PROFILE_AXES[beer.category] || PROFILE_AXES["에일"];
  const allReviews = REVIEWS[beer.id] || [];
  const myReview = allReviews.find((r) => r.isMe) || null;
  const reviews = allReviews;
  const avg = avgProfile(reviews, axes);
  const avgStar = reviews.length
    ? Math.round((reviews.reduce((s, r) => s + r.star, 0) / reviews.length) * 10) / 10
    : null;

  return (
    <div className="detail-page-wrap">
      {/* 헤더 */}
      <div className="input-header">
        <button className="back-btn" onClick={onBack}>← 맥주 탐색</button>
        <span style={{ width: 36 }} />
      </div>

      <div className="beer-detail-scroll">

        {/* 맥주 기본 정보 */}
        <div className="beer-detail-hero">
          <div className="beer-detail-img" style={{ background: beer.srmColor + "22" }}>
            <span style={{ fontSize: 48 }}>🍺</span>
            <div className="beer-detail-srm-dot" style={{ background: beer.srmColor }} />
          </div>
          <div className="beer-detail-meta">
            <p className="beer-detail-category">{beer.category}</p>
            <p className="beer-detail-name">{beer.name}</p>
            <p className="beer-detail-type">{beer.type}</p>
            <p className="beer-detail-abv">ABV {beer.abv}</p>
            <div className="beer-detail-tags">
              {beer.tags.map((t) => <span key={t} className="beer-detail-tag">{t}</span>)}
            </div>
          </div>
        </div>

        {reviews.length > 0 ? (
          <>
            {/* 평균 맛 프로파일 */}
            <div className="beer-detail-section">
              <div className="beer-detail-section-header">
                <h3 className="beer-detail-section-title">평균 맛 프로파일</h3>
                <span className="beer-detail-review-count">{reviews.length}명 평가</span>
              </div>
              <div className="beer-detail-avg-row">
                <div className="beer-detail-avg-star">
                  <span className="beer-detail-avg-star-num">{avgStar}</span>
                  <span style={{ color: "#F59E0B", fontSize: 18 }}>★</span>
                </div>
              </div>
              {avg && (
                <FlavorRadar
                  profile={avg}
                  axes={axes}
                  myProfile={myReview ? myReview.profile : null}
                />
              )}
              {/* 축별 비교 바 */}
              <div className="beer-detail-axis-bars">
                {/* 헤더 */}
                {myReview && (
                  <div className="beer-detail-axis-legend">
                    <span />
                    <span className="beer-detail-axis-legend-mine">내 평가</span>
                    <span className="beer-detail-axis-legend-avg">전체 평균</span>
                  </div>
                )}
                {axes.map((axis) => (
                  <div key={axis} className="beer-detail-axis-row">
                    <span className="beer-detail-axis-label">{axis}</span>
                    <div className="beer-detail-axis-bars-col">
                      {/* 내 평가 바 */}
                      {myReview && (
                        <div className="beer-detail-axis-bar-bg">
                          <div
                            className="beer-detail-axis-bar-fill beer-detail-axis-bar-mine"
                            style={{ width: `${((myReview.profile[axis] ?? 0) / 5) * 100}%` }}
                          />
                        </div>
                      )}
                      {/* 전체 평균 바 */}
                      <div className="beer-detail-axis-bar-bg">
                        <div
                          className="beer-detail-axis-bar-fill"
                          style={{ width: `${(avg[axis] / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="beer-detail-axis-vals">
                      {myReview && (
                        <span className="beer-detail-axis-val beer-detail-axis-val-mine">
                          {myReview.profile[axis] ?? 0}
                        </span>
                      )}
                      <span className="beer-detail-axis-val">{avg[axis]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 리뷰 목록 */}
            <div className="beer-detail-section">
              <h3 className="beer-detail-section-title">리뷰 {reviews.length}개</h3>
              <div className="beer-detail-reviews">
                {reviews.map((rev) => (
                  <div key={rev.id} className="beer-review-card">
                    <div className="beer-review-top">
                      <span className="beer-review-avatar">{rev.avatar}</span>
                      <div className="beer-review-user-info">
                        <span className="beer-review-username">{rev.user}</span>
                        <StarRow value={rev.star} />
                      </div>
                      <span className="beer-review-date">{rev.date}</span>
                    </div>
                    <p className="beer-review-comment">"{rev.comment}"</p>
                    <div className="beer-review-hashtags">
                      {rev.hashtags.map((id) => {
                        const tag = HASHTAG_MAP[id];
                        return tag ? (
                          <span key={id} className="beer-review-tag">
                            {tag.icon} {tag.label}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="beer-detail-section">
            <div className="empty-state">
              <p className="empty-icon">📝</p>
              <p className="empty-msg">아직 평가가 없어요</p>
              <p className="empty-sub">첫 번째로 평가해보세요!</p>
            </div>
          </div>
        )}

        <div style={{ height: 120 }} />
      </div>

      {/* 하단 평가하기 버튼 */}
      <div className="beer-detail-footer">
        <button className="beer-detail-rate-btn" onClick={onRate}>
          🍺 나도 평가하기
        </button>
      </div>
    </div>
  );
}

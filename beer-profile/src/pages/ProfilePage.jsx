import LevelCard from "../components/LevelCard";
import { REVIEWS } from "../data/reviewsData";
import { BEER_LIST, HASHTAG_MAP } from "../data/beerData";

// 내 리뷰 모으기 (isMe: true)
function getMyReviews() {
  const result = [];
  Object.entries(REVIEWS).forEach(([beerId, reviews]) => {
    const mine = reviews.find((r) => r.isMe);
    if (mine) {
      const beer = BEER_LIST.find((b) => b.id === Number(beerId));
      if (beer) result.push({ ...mine, beer });
    }
  });
  return result.sort((a, b) => b.id - a.id);
}

// 가장 많이 쓴 해시태그
function getTopHashtags(myReviews, limit = 6) {
  const count = {};
  myReviews.forEach((r) => {
    r.hashtags.forEach((h) => { count[h] = (count[h] || 0) + 1; });
  });
  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => id);
}

// 선호 카테고리
function getTopCategory(myReviews) {
  const count = {};
  myReviews.forEach((r) => { count[r.beer.category] = (count[r.beer.category] || 0) + 1; });
  return Object.entries(count).sort((a, b) => b[1] - a[1]).map(([cat]) => cat);
}

function StarRow({ value }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= value ? "#F59E0B" : "#E5E7EB", fontSize: 13 }}>★</span>
      ))}
    </span>
  );
}

export default function ProfilePage({ ratedCount }) {
  const myReviews = getMyReviews();
  const topHashtags = getTopHashtags(myReviews);
  const topCategories = getTopCategory(myReviews);
  const avgStar = myReviews.length
    ? (myReviews.reduce((s, r) => s + r.star, 0) / myReviews.length).toFixed(1)
    : "-";

  return (
    <div className="profile-page">

      {/* ── 헤더 배경 ── */}
      <div className="profile-header-bg">
        <div className="profile-avatar-wrap">
          <div className="profile-avatar">🍺</div>
          <button className="profile-edit-btn">편집</button>
        </div>
        <h2 className="profile-name">홉덕후</h2>
        <p className="profile-handle">@hop_lover</p>
        <p className="profile-bio">홉 향에 진심인 크래프트 맥주 탐험가 🌿 IPA 전도사</p>

        {/* 통계 */}
        <div className="profile-stats-row">
          <div className="profile-stat">
            <span className="profile-stat-num">{ratedCount}</span>
            <span className="profile-stat-label">평가</span>
          </div>
          <div className="profile-stat-divider" />
          <div className="profile-stat">
            <span className="profile-stat-num">128</span>
            <span className="profile-stat-label">팔로워</span>
          </div>
          <div className="profile-stat-divider" />
          <div className="profile-stat">
            <span className="profile-stat-num">47</span>
            <span className="profile-stat-label">팔로잉</span>
          </div>
          <div className="profile-stat-divider" />
          <div className="profile-stat">
            <span className="profile-stat-num">{avgStar}</span>
            <span className="profile-stat-label">평균 별점</span>
          </div>
        </div>
      </div>

      <div className="profile-scroll">

        {/* ── 레벨 카드 ── */}
        <div className="profile-section">
          <LevelCard ratedCount={ratedCount} />
        </div>

        {/* ── 취향 카테고리 ── */}
        <div className="profile-section">
          <h3 className="profile-section-title">🏅 선호 카테고리</h3>
          <div className="profile-category-row">
            {topCategories.map((cat, i) => (
              <div key={cat} className={`profile-category-chip ${i === 0 ? "profile-category-chip--top" : ""}`}>
                {i === 0 && <span className="profile-category-crown">👑</span>}
                <span>{cat}</span>
                {i === 0 && <span className="profile-category-badge">최애</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ── 자주 쓴 맛 태그 ── */}
        {topHashtags.length > 0 && (
          <div className="profile-section">
            <h3 className="profile-section-title">🏷 나의 맛 취향</h3>
            <div className="profile-tag-row">
              {topHashtags.map((id) => {
                const tag = HASHTAG_MAP[id];
                return tag ? (
                  <span key={id} className="profile-taste-tag">
                    {tag.icon} {tag.label}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* ── 최근 평가한 맥주 ── */}
        <div className="profile-section">
          <h3 className="profile-section-title">📋 내가 평가한 맥주</h3>
          <div className="profile-reviews">
            {myReviews.map((rev) => (
              <div key={rev.beer.id} className="profile-review-card">
                <div
                  className="profile-review-img"
                  style={{ background: rev.beer.srmColor + "22" }}
                >
                  <span style={{ fontSize: 22 }}>🍺</span>
                  <div
                    className="profile-review-srm"
                    style={{ background: rev.beer.srmColor }}
                  />
                </div>
                <div className="profile-review-info">
                  <div className="profile-review-top-row">
                    <span className="profile-review-category">{rev.beer.category}</span>
                    <span className="profile-review-date">{rev.date}</span>
                  </div>
                  <p className="profile-review-name">{rev.beer.name}</p>
                  <StarRow value={rev.star} />
                  <p className="profile-review-comment">"{rev.comment}"</p>
                  <div className="profile-review-tags">
                    {rev.hashtags.slice(0, 3).map((id) => {
                      const tag = HASHTAG_MAP[id];
                      return tag ? (
                        <span key={id} className="beer-review-tag">
                          {tag.icon} {tag.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}

import { useRef } from "react";
import { REVIEWS } from "../data/reviewsData";
import { BEER_LIST, HASHTAG_MAP } from "../data/beerData";
import { getCurrentLevel, formatMl } from "../data/levels";
import { LEVEL_ICONS } from "../components/LevelIcons";
import { POSTS } from "../data/communityData";

const MY_HANDLE = "@hop_lover";
const POSTING_COUNT = POSTS.filter((p) => p.handle === MY_HANDLE).length + 2; // mock

function getMyReviews() {
  const result = [];
  Object.entries(REVIEWS).forEach(([beerId, reviews]) => {
    const mine = reviews.find((r) => r.isMe);
    if (mine) {
      const beer = BEER_LIST.find((b) => b.id === Number(beerId));
      if (beer) result.push({ ...mine, beer });
    }
  });
  return result.sort((a, b) => b.beer.id - a.beer.id);
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
  const fileInputRef = useRef(null);

  const { current, next, progress, totalMl } = getCurrentLevel(ratedCount);
  const LevelIcon = LEVEL_ICONS[current.level - 1];
  const pct = Math.min(Math.round(progress * 100), 100);

  return (
    <div className="profile-page">

      {/* ── 상단 프로필 영역 ── */}
      <div className="profile-header">

        {/* 프로필 사진 */}
        <div className="profile-photo-wrap" onClick={() => fileInputRef.current?.click()}>
          <div className="profile-photo">🍺</div>
          <div className="profile-photo-edit">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} />
        </div>

        {/* 닉네임 */}
        <h2 className="profile-name">홉덕후</h2>
        <p className="profile-handle">@hop_lover</p>

        {/* 통계 4개 */}
        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-num">{ratedCount}</span>
            <span className="profile-stat-label">리뷰</span>
          </div>
          <div className="profile-stat-div" />
          <div className="profile-stat">
            <span className="profile-stat-num">{POSTING_COUNT}</span>
            <span className="profile-stat-label">포스팅</span>
          </div>
          <div className="profile-stat-div" />
          <div className="profile-stat">
            <span className="profile-stat-num">128</span>
            <span className="profile-stat-label">팔로워</span>
          </div>
          <div className="profile-stat-div" />
          <div className="profile-stat">
            <span className="profile-stat-num">47</span>
            <span className="profile-stat-label">팔로잉</span>
          </div>
        </div>
      </div>

      {/* ── 스크롤 본문 ── */}
      <div className="profile-scroll">

        {/* 레벨 + 맥주량 카드 */}
        <div className="profile-level-card" style={{ background: current.color }}>
          <div className="profile-level-left">
            <div className="profile-level-badge">Lv.{current.level}</div>
            <p className="profile-level-name">{current.name}</p>
            <p className="profile-level-name-en">{current.nameEn}</p>
            <div className="profile-level-volume">
              <span className="profile-level-volume-num">{formatMl(totalMl)}</span>
              <span className="profile-level-volume-label">총 마신 맥주량</span>
            </div>
            {next ? (
              <div className="profile-level-progress">
                <div className="profile-level-progress-row">
                  <span>다음 레벨까지</span>
                  <span>{pct}%</span>
                </div>
                <div className="profile-level-progress-track">
                  <div className="profile-level-progress-fill" style={{ width: `${pct}%` }} />
                </div>
                <p className="profile-level-next">다음: {next.name}</p>
              </div>
            ) : (
              <p className="profile-level-max">🎉 최고 레벨!</p>
            )}
          </div>
          <div className="profile-level-icon-wrap">
            {LevelIcon && <LevelIcon />}
          </div>
        </div>

        {/* 최근 리뷰 */}
        <div className="profile-section">
          <h3 className="profile-section-title">최근 리뷰</h3>
          <div className="profile-reviews">
            {myReviews.map((rev) => (
              <div key={rev.beer.id} className="profile-review-card">
                <div className="profile-review-img" style={{ background: rev.beer.srmColor + "22" }}>
                  <span style={{ fontSize: 22 }}>🍺</span>
                  <div className="profile-review-srm" style={{ background: rev.beer.srmColor }} />
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
                        <span key={id} className="beer-review-tag">{tag.icon} {tag.label}</span>
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

import { useState, useRef } from "react";
import { REVIEWS } from "../data/reviewsData";
import { HASHTAG_MAP, BEER_LIST } from "../data/beerData";
import { getCurrentLevel, formatMl } from "../data/levels";
import { LEVEL_ICONS } from "../components/LevelIcons";
import { POSTS } from "../data/communityData";
import LevelJourneyModal from "../components/LevelJourneyModal";

const MY_HANDLE = "@hop_lover";
const MY_POSTS = POSTS.filter((p) => p.handle === MY_HANDLE);
const POSTING_COUNT = MY_POSTS.length;

const FOLLOWERS_DATA = [
  { id: 1, user: "맥주여행자", handle: "@beer_traveler", avatar: "✈️", bio: "맥주 마시러 세계 여행 중 🌍", followers: 342, following: 89, reviews: 28, avgStar: "4.2" },
  { id: 2, user: "크래프트마니아", handle: "@craft_mania", avatar: "🎨", bio: "수제맥주 전도사", followers: 512, following: 124, reviews: 47, avgStar: "4.5" },
  { id: 3, user: "사워에일러", handle: "@sour_ale", avatar: "🍋", bio: "신맛 덕후. 사워 없인 못 살아요", followers: 89, following: 203, reviews: 15, avgStar: "4.0" },
  { id: 4, user: "스타우트러버", handle: "@stout_lover", avatar: "☕", bio: "다크 맥주만 마십니다 ☕", followers: 178, following: 56, reviews: 33, avgStar: "4.7" },
];

const FOLLOWING_DATA = [
  { id: 1, user: "맥주여행자", handle: "@beer_traveler", avatar: "✈️", bio: "맥주 마시러 세계 여행 중 🌍", followers: 342, following: 89, reviews: 28, avgStar: "4.2" },
  { id: 5, user: "홉탐험가", handle: "@hop_explorer", avatar: "🌿", bio: "홉의 세계를 탐험 중", followers: 201, following: 78, reviews: 22, avgStar: "3.9" },
  { id: 6, user: "필스너마스터", handle: "@pilsner_master", avatar: "🏆", bio: "라거의 정석만 마십니다", followers: 445, following: 112, reviews: 61, avgStar: "4.3" },
  { id: 7, user: "위트에일팬", handle: "@wheat_fan", avatar: "🌾", bio: "벨기에 위트에일 최고 🌾", followers: 67, following: 145, reviews: 19, avgStar: "4.1" },
];

// beers: Supabase에서 받은 맥주 목록. REVIEWS의 beerId와 매칭 시도.
// UUID 매칭 실패 시 BEER_LIST 숫자 ID로 폴백.
function getMyReviews(beers = []) {
  const result = [];
  Object.entries(REVIEWS).forEach(([beerId, reviews]) => {
    const mine = reviews.find((r) => r.isMe);
    if (mine) {
      // 1) Supabase UUID 매칭 시도
      let beer = beers.find((b) => String(b.id) === String(beerId));
      // 2) 실패하면 BEER_LIST 숫자 ID로 폴백
      if (!beer) beer = BEER_LIST.find((b) => b.id === Number(beerId));
      if (beer) result.push({ ...mine, beer });
    }
  });
  return result;
}

// 선호 카테고리: [{category, count, pct}]
function getTopCategories(myReviews) {
  const count = {};
  myReviews.forEach((r) => { count[r.beer.category] = (count[r.beer.category] || 0) + 1; });
  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  const max = sorted[0]?.[1] || 1;
  return sorted.map(([category, cnt]) => ({ category, count: cnt, pct: Math.round((cnt / max) * 100) }));
}

// 자주 쓴 해시태그: [{id, count}]
function getTopHashtags(myReviews, limit = 8) {
  const count = {};
  myReviews.forEach((r) => r.hashtags.forEach((h) => { count[h] = (count[h] || 0) + 1; }));
  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id, cnt]) => ({ id, count: cnt }));
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

/* ── 내 게시물 목록 오버레이 ── */
function PostItem({ post, onLike }) {
  return (
    <div className="post-card">
      <div className="post-left">
        <div className="post-avatar">{post.avatar}</div>
        <div className="post-thread-line" />
      </div>
      <div className="post-body">
        <div className="post-header">
          <span className="post-username">{post.user}</span>
          <span className="post-handle">{post.handle}</span>
          <span className="post-dot">·</span>
          <span className="post-time">{post.time}</span>
        </div>
        {post.content && <p className="post-content">{post.content}</p>}
        {post.beerTag && (
          <div className="post-beer-tag">
            <span className="post-beer-tag-icon">🍺</span>
            <span className="post-beer-tag-name">{post.beerTag}</span>
          </div>
        )}
        <div className="post-actions">
          <button className="post-action-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>{post.comments}</span>
          </button>
          <button className="post-action-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="17 1 21 5 17 9"/>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
              <polyline points="7 23 3 19 7 15"/>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </svg>
            <span>{post.reposts}</span>
          </button>
          <button
            className={`post-action-btn like-btn ${post.liked ? "liked" : ""}`}
            onClick={() => onLike?.(post.id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>{post.likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MyPostsModal({ onClose }) {
  const [posts, setPosts] = useState(MY_POSTS);

  function handleLike(id) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  }

  return (
    <div className="other-profile-overlay">
      <div className="other-profile-page">
        <div className="other-profile-header">
          <button className="other-profile-back" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <span className="other-profile-title">내 게시물</span>
          <span style={{ width: 36 }} />
        </div>
        <div className="my-posts-feed">
          {posts.length === 0 ? (
            <div className="my-posts-empty">
              <p style={{ fontSize: 32 }}>🍺</p>
              <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 8 }}>아직 게시물이 없어요</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostItem key={post.id} post={post} onLike={handleLike} />
            ))
          )}
          <div style={{ height: 80 }} />
        </div>
      </div>
    </div>
  );
}

/* ── 다른 유저 프로필 오버레이 ── */
function OtherUserProfile({ user, onClose }) {
  return (
    <div className="other-profile-overlay">
      <div className="other-profile-page">
        <div className="other-profile-header">
          <button className="other-profile-back" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <span className="other-profile-title">{user.handle}</span>
          <span style={{ width: 36 }} />
        </div>

        <div className="other-profile-body">
          <div className="other-profile-photo">{user.avatar}</div>
          <h3 className="other-profile-name">{user.user}</h3>
          <p className="other-profile-handle">{user.handle}</p>
          <p className="other-profile-bio">{user.bio}</p>

          <div className="profile-stats" style={{ marginTop: 16 }}>
            <div className="profile-stat">
              <span className="profile-stat-num">{user.reviews}</span>
              <span className="profile-stat-label">리뷰</span>
            </div>
            <div className="profile-stat-div" />
            <div className="profile-stat">
              <span className="profile-stat-num">{user.followers}</span>
              <span className="profile-stat-label">팔로워</span>
            </div>
            <div className="profile-stat-div" />
            <div className="profile-stat">
              <span className="profile-stat-num">{user.following}</span>
              <span className="profile-stat-label">팔로잉</span>
            </div>
            <div className="profile-stat-div" />
            <div className="profile-stat">
              <span className="profile-stat-num">{user.avgStar}</span>
              <span className="profile-stat-label">평균 별점</span>
            </div>
          </div>

          <button className="other-profile-follow-btn">팔로우</button>
        </div>
      </div>
    </div>
  );
}

/* ── 팔로워/팔로잉 목록 모달 ── */
function UserListModal({ title, users, onClose, onSelectUser }) {
  return (
    <>
      <div className="modal-dim" onClick={onClose} />
      <div className="user-list-modal">
        <div className="user-list-header">
          <span className="user-list-title">{title}</span>
          <button className="user-list-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="user-list-body">
          {users.map((u) => (
            <button key={u.id} className="user-list-item" onClick={() => onSelectUser(u)}>
              <div className="user-list-avatar">{u.avatar}</div>
              <div className="user-list-info">
                <span className="user-list-name">{u.user}</span>
                <span className="user-list-handle">{u.handle}</span>
                <span className="user-list-bio">{u.bio}</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0C4CC" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── 메인 컴포넌트 ── */
export default function ProfilePage({ beers = [], onSelectBeer, ratedCount: ratedCountProp }) {
  const myReviews = getMyReviews(beers);
  const reviewCount = myReviews.length;
  const topCategories = getTopCategories(myReviews);
  const topHashtags = getTopHashtags(myReviews);
  // ratedCount prop이 있으면 사용 (홈과 레벨 일치), 없으면 reviewCount 폴백
  const ratedCount = ratedCountProp ?? reviewCount;
  const avgStar = reviewCount
    ? (myReviews.reduce((s, r) => s + r.star, 0) / reviewCount).toFixed(1)
    : "-";

  const { current, next, progress, totalMl } = getCurrentLevel(ratedCount);
  const LevelIcon = LEVEL_ICONS[current.level - 1];
  const pct = Math.min(Math.round(progress * 100), 100);

  const fileInputRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [userListModal, setUserListModal] = useState(null); // null | "followers" | "following"
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPostingModal, setShowPostingModal] = useState(false);
  const [showJourney, setShowJourney] = useState(false);

  const visibleReviews = showAll ? myReviews : myReviews.slice(0, 3);

  function handleUserClick(u) {
    setUserListModal(null);
    setSelectedUser(u);
  }

  return (
    <div className="profile-page">

      {/* 레벨 여정 오버레이 */}
      {showJourney && (
        <LevelJourneyModal ratedCount={ratedCount} onClose={() => setShowJourney(false)} />
      )}

      {/* 내 게시물 오버레이 */}
      {showPostingModal && (
        <MyPostsModal onClose={() => setShowPostingModal(false)} />
      )}

      {/* 다른 유저 프로필 오버레이 */}
      {selectedUser && (
        <OtherUserProfile user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      {/* 팔로워/팔로잉 목록 모달 */}
      {userListModal && (
        <UserListModal
          title={userListModal === "followers" ? `팔로워 ${FOLLOWERS_DATA.length}명` : `팔로잉 ${FOLLOWING_DATA.length}명`}
          users={userListModal === "followers" ? FOLLOWERS_DATA : FOLLOWING_DATA}
          onClose={() => setUserListModal(null)}
          onSelectUser={handleUserClick}
        />
      )}

      {/* ── 상단 헤더 ── */}
      <div className="profile-header">
        {/* 우측 상단 프로필 수정 버튼 */}
        <div className="profile-appbar">
          <button className="profile-edit-btn" onClick={() => alert("프로필 수정 기능 준비 중입니다 ✏️")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </button>
        </div>

        <div className="profile-photo-wrap">
          <div className="profile-photo">🍺</div>
        </div>

        <h2 className="profile-name">홉덕후</h2>
        <p className="profile-handle">@hop_lover</p>

        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-num">{reviewCount}</span>
            <span className="profile-stat-label">리뷰</span>
          </div>
          <div className="profile-stat-div" />
          <button className="profile-stat profile-stat--btn" onClick={() => setShowPostingModal(true)}>
            <span className="profile-stat-num">{POSTING_COUNT}</span>
            <span className="profile-stat-label">포스팅</span>
          </button>
          <div className="profile-stat-div" />
          <button className="profile-stat profile-stat--btn" onClick={() => setUserListModal("followers")}>
            <span className="profile-stat-num">{FOLLOWERS_DATA.length}</span>
            <span className="profile-stat-label">팔로워</span>
          </button>
          <div className="profile-stat-div" />
          <button className="profile-stat profile-stat--btn" onClick={() => setUserListModal("following")}>
            <span className="profile-stat-num">{FOLLOWING_DATA.length}</span>
            <span className="profile-stat-label">팔로잉</span>
          </button>
        </div>

        {/* 평균 별점 */}
        <div className="profile-avg-star">
          <span style={{ color: "#F59E0B", fontSize: 16 }}>★</span>
          <span className="profile-avg-star-num">{avgStar}</span>
          <span className="profile-avg-star-label">평균 별점</span>
        </div>
      </div>

      {/* ── 스크롤 본문 ── */}
      <div className="profile-scroll">

        {/* 레벨 카드 */}
        <div className="profile-level-card" style={{ background: current.color, cursor: "pointer" }} onClick={() => setShowJourney(true)}>
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

        {/* 선호 맥주 종류 */}
        <div className="profile-section">
          <h3 className="profile-section-title">🍺 선호 맥주 종류</h3>
          <div className="profile-category-list">
            {topCategories.map(({ category, count, pct }, i) => (
              <div key={category} className="profile-cat-row">
                <div className="profile-cat-label-wrap">
                  {i === 0 && <span className="profile-cat-crown">👑</span>}
                  <span className="profile-cat-name">{category}</span>
                  <span className="profile-cat-count">{count}회</span>
                </div>
                <div className="profile-cat-bar-bg">
                  <div
                    className="profile-cat-bar-fill"
                    style={{
                      width: `${pct}%`,
                      background: i === 0 ? "var(--accent)" : "#D1D5DB",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 자주 쓴 맛 태그 */}
        {topHashtags.length > 0 && (
          <div className="profile-section">
            <h3 className="profile-section-title">🏷 나의 맛 취향</h3>
            <div className="profile-tag-row">
              {topHashtags.map(({ id, count }) => {
                const tag = HASHTAG_MAP[id];
                return tag ? (
                  <span key={id} className="profile-taste-tag">
                    {tag.icon} {tag.label}
                    <span className="profile-taste-tag-count">{count}</span>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* 최근 리뷰 */}
        <div className="profile-section">
          <div className="profile-section-header">
            <h3 className="profile-section-title">내가 평가한 맥주</h3>
            <span className="profile-section-count">{reviewCount}개</span>
          </div>
          <div className="profile-reviews">
            {visibleReviews.map((rev) => (
              <button
                key={rev.beer.id}
                className="profile-review-card"
                onClick={() => onSelectBeer?.(rev.beer)}
              >
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
              </button>
            ))}
          </div>

          {/* 전체보기 / 접기 */}
          {reviewCount > 3 && (
            <button
              className="profile-show-all-btn"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? (
                <>접기 <span className="profile-show-all-arrow">↑</span></>
              ) : (
                <>전체보기 <span className="profile-show-all-arrow">↓</span> ({reviewCount - 3}개 더)</>
              )}
            </button>
          )}
        </div>

        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { POSTS } from "../data/communityData";

function BeerSearchComposeModal({ beers = [], initialBeer, onClose, onPost }) {
  const [step, setStep] = useState(initialBeer ? 2 : 1);
  const [query, setQuery] = useState("");
  const [selectedBeer, setSelectedBeer] = useState(initialBeer || null);
  const [text, setText] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]); // { url, type: 'image'|'video', name }
  const textareaRef = useRef(null);
  const searchRef = useRef(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    if (step === 1) searchRef.current?.focus();
    if (step === 2) textareaRef.current?.focus();
  }, [step]);

  const q = query.trim();
  const filtered = q
    ? beers.filter(
        (b) =>
          b.name.includes(q) ||
          (b.type ?? "").includes(q) ||
          b.category.includes(q) ||
          (b.tags ?? []).some((t) => t.includes(q)) ||
          (b.brewery ?? "").includes(q)
      )
    : beers;

  function handleSelectBeer(beer) {
    setSelectedBeer(beer);
    setQuery("");
    setStep(2);
  }

  function handleSkip() {
    setSelectedBeer(null);
    setStep(2);
  }

  function handleBack() {
    if (step === 2) setStep(1);
  }

  function handleMediaAdd(e, type) {
    const files = Array.from(e.target.files);
    const newMedia = files.map((f) => ({
      url: URL.createObjectURL(f),
      type,
      name: f.name,
    }));
    setMediaFiles((prev) => [...prev, ...newMedia].slice(0, 4)); // 최대 4개
    e.target.value = "";
  }

  function handleMediaRemove(idx) {
    setMediaFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleSubmit() {
    if (!text.trim() && mediaFiles.length === 0) return;
    onPost({
      id: Date.now(),
      user: "나",
      handle: "@me",
      avatar: "😄",
      time: "방금",
      content: text.trim(),
      beerTag: selectedBeer?.name || null,
      media: mediaFiles,
      likes: 0,
      comments: 0,
      reposts: 0,
      liked: false,
    });
    onClose();
  }

  return (
    <div className="compose-overlay" onClick={onClose}>
      <div
        className={`compose-modal${step === 1 ? " compose-modal--search" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {step === 1 ? (
          <>
            <div className="compose-header">
              <button className="compose-close" onClick={onClose}>✕</button>
              <span className="compose-title">어떤 맥주인가요?</span>
              <button className="compose-skip" onClick={handleSkip}>건너뛰기</button>
            </div>

            <div className="beer-search-bar">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="10.5" cy="10.5" r="6.5"/>
                <line x1="15.5" y1="15.5" x2="21" y2="21"/>
              </svg>
              <input
                ref={searchRef}
                className="beer-search-input"
                placeholder="맥주 이름, 스타일, 카테고리 검색"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button className="beer-search-clear" onClick={() => setQuery("")}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>

            <div className="beer-search-list">
              {filtered.length === 0 ? (
                <div className="beer-search-empty">
                  <p className="empty-icon">🍺</p>
                  <p className="empty-msg">검색 결과가 없어요</p>
                </div>
              ) : (
                filtered.map((beer) => (
                  <button
                    key={beer.id}
                    className="beer-search-item"
                    onClick={() => handleSelectBeer(beer)}
                  >
                    <div className="beer-search-item-img" style={{ background: beer.srmColor + "22" }}>
                      <span>🍺</span>
                      <div className="beer-search-item-srm" style={{ background: beer.srmColor }} />
                    </div>
                    <div className="beer-search-item-info">
                      <div className="beer-search-item-row">
                        <span className="beer-search-item-category">{beer.category}</span>
                        <span className="beer-search-item-abv">{beer.abv}</span>
                      </div>
                      <p className="beer-search-item-name">{beer.name}</p>
                      <p className="beer-search-item-type">{beer.type}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0C4CC" strokeWidth="2" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                ))
              )}
              <div style={{ height: 32 }} />
            </div>
          </>
        ) : (
          <>
            <div className="compose-header">
              <button className="compose-close" onClick={handleBack}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <span className="compose-title">새 게시물</span>
              <button
                className="compose-submit"
                onClick={handleSubmit}
                disabled={!text.trim()}
              >
                게시
              </button>
            </div>

            <div className="compose-body">
              <div className="compose-avatar">😄</div>
              <div className="compose-text-area">
                {selectedBeer && (
                  <div className="compose-beer-chip">
                    <span>🍺</span>
                    <span className="compose-beer-chip-name">{selectedBeer.name}</span>
                    <button
                      className="compose-beer-chip-remove"
                      onClick={() => { setSelectedBeer(null); setStep(1); }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                )}
                <textarea
                  ref={textareaRef}
                  className="compose-textarea"
                  placeholder={
                    selectedBeer
                      ? `${selectedBeer.name}에 대한 생각을 공유해보세요!`
                      : "지금 어떤 맥주 마시고 있나요?"
                  }
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={280}
                />
                {/* 미디어 미리보기 */}
                {mediaFiles.length > 0 && (
                  <div className={`compose-media-grid compose-media-grid--${Math.min(mediaFiles.length, 2)}`}>
                    {mediaFiles.map((m, i) => (
                      <div key={i} className="compose-media-item">
                        {m.type === "image" ? (
                          <img src={m.url} alt="" className="compose-media-thumb" />
                        ) : (
                          <video src={m.url} className="compose-media-thumb" muted />
                        )}
                        <button
                          className="compose-media-remove"
                          onClick={() => handleMediaRemove(i)}
                        >✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* hidden file inputs */}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => handleMediaAdd(e, "image")}
            />
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={(e) => handleMediaAdd(e, "video")}
            />

            <div className="compose-footer">
              <div className="compose-media-btns">
                {/* 사진 */}
                <button
                  className="compose-media-btn"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={mediaFiles.length >= 4}
                  title="사진 추가"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </button>
                {/* 동영상 */}
                <button
                  className="compose-media-btn"
                  onClick={() => videoInputRef.current?.click()}
                  disabled={mediaFiles.length >= 4}
                  title="동영상 추가"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"/>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                </button>
              </div>
              <span className="compose-count">{text.length} / 280</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PostCard({ post, onLike }) {
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
        {/* 미디어 */}
        {post.media && post.media.length > 0 && (
          <div className={`post-media-grid post-media-grid--${Math.min(post.media.length, 2)}`}>
            {post.media.map((m, i) => (
              <div key={i} className="post-media-item">
                {m.type === "image" ? (
                  <img src={m.url} alt="" className="post-media-thumb" />
                ) : (
                  <video src={m.url} className="post-media-thumb" controls muted />
                )}
              </div>
            ))}
          </div>
        )}
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
            onClick={() => onLike(post.id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>{post.likes}</span>
          </button>
          <button className="post-action-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage({ beers = [], composeBeer, onComposeClear }) {
  const [posts, setPosts] = useState(POSTS);
  const [showCompose, setShowCompose] = useState(false);
  const [activeFilter, setActiveFilter] = useState("추천");

  useEffect(() => {
    if (composeBeer) setShowCompose(true);
  }, [composeBeer]);

  function handleLike(id) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  }

  function handlePost(newPost) {
    setPosts((prev) => [newPost, ...prev]);
  }

  function handleComposeClose() {
    setShowCompose(false);
    onComposeClear?.();
  }

  return (
    <div className="community-page">
      <div className="community-header">
        <span className="community-title">커뮤니티</span>
        <div className="community-filters">
          {["추천", "팔로잉"].map((f) => (
            <button
              key={f}
              className={`community-filter ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 글쓰기 입력창 */}
      <button className="community-compose-bar" onClick={() => setShowCompose(true)}>
        <div className="community-compose-avatar">😄</div>
        <span className="community-compose-placeholder">지금 어떤 맥주 마시고 있나요?</span>
        <span className="community-compose-btn">게시</span>
      </button>

      <div className="community-feed">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLike} />
        ))}
        <div style={{ height: 100 }} />
      </div>

      {showCompose && (
        <BeerSearchComposeModal
          beers={beers}
          initialBeer={composeBeer}
          onClose={handleComposeClose}
          onPost={handlePost}
        />
      )}
    </div>
  );
}

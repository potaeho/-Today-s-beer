import { useState, useRef } from "react";

export const ONBOARD_KEY = "omac_onboarding_v1";

// ── Slide 1: Radar Chart ───────────────────────────────
function RadarIllustration() {
  const cx = 120, cy = 112, maxR = 72;
  const N = 5;
  const step = (2 * Math.PI) / N;
  const start = -Math.PI / 2;

  const pt = (r, i) => [
    cx + r * Math.cos(start + i * step),
    cy + r * Math.sin(start + i * step),
  ];
  const poly = (vals) => vals.map((v, i) => pt(maxR * v, i).join(",")).join(" ");
  const gridPoly = (s) => Array.from({ length: N }, (_, i) => pt(maxR * s, i).join(",")).join(" ");

  const myVals  = [0.74, 0.28, 0.62, 0.22, 0.80];
  const avgVals = [0.52, 0.60, 0.44, 0.58, 0.50];
  const labels  = ["단맛", "신맛", "쓴맛", "몰티함", "아로마"];

  return (
    <div className="onboard-visual-card">
      <div className="onboard-radar-header">
        <div className="onboard-radar-score-block">
          <span className="onboard-score-label">내 평점</span>
          <span className="onboard-score-my">4.3 ★</span>
        </div>
        <div className="onboard-radar-sep" />
        <div className="onboard-radar-score-block">
          <span className="onboard-score-label">전체 평균</span>
          <span className="onboard-score-avg">3.7 ★</span>
        </div>
      </div>
      <div className="onboard-legend">
        <span className="onboard-legend-item"><em className="onboard-dot-my" />내 평가</span>
        <span className="onboard-legend-item"><em className="onboard-dot-avg" />전체 평균</span>
      </div>
      <svg viewBox="0 0 240 224" style={{ width: "100%", display: "block" }}>
        {[0.25, 0.5, 0.75, 1].map((s) => (
          <polygon key={s} points={gridPoly(s)} fill="none" stroke="#E2DDD8" strokeWidth="1" />
        ))}
        {Array.from({ length: N }, (_, i) => {
          const [x, y] = pt(maxR, i);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#E2DDD8" strokeWidth="1" />;
        })}
        <polygon points={poly(avgVals)} fill="rgba(99,102,241,0.18)" stroke="#6366F1" strokeWidth="1.5" />
        <polygon points={poly(myVals)} fill="rgba(184,110,0,0.28)" stroke="#B86E00" strokeWidth="1.5" />
        {labels.map((label, i) => {
          const angle = start + i * step;
          const cos = Math.cos(angle);
          const [x, y] = pt(maxR + 20, i);
          const anchor = cos > 0.15 ? "start" : cos < -0.15 ? "end" : "middle";
          return (
            <text key={i} x={x} y={y} textAnchor={anchor} dominantBaseline="middle"
              fontSize="11" fontFamily="Pretendard, sans-serif" fill="#948E89">{label}</text>
          );
        })}
      </svg>
      <div className="onboard-radar-footer">
        <span className="onboard-footer-my">내 평가</span>
        <span className="onboard-footer-avg">전체 평균</span>
      </div>
    </div>
  );
}

// ── Slide 2: AI Recommendation ─────────────────────────
function RecommendIllustration() {
  return (
    <div className="onboard-visual-card onboard-rec-wrap">
      <div className="onboard-rec-header">
        <span className="onboard-rec-user">홈덕후 님을 위한 추천</span>
        <span className="onboard-rec-badge">AI 맞춤</span>
      </div>
      <div className="onboard-rec-beer-card">
        <div className="onboard-rec-hint">✨ 시트러스 · 솔잎 취향과 잘 맞아요</div>
        <div className="onboard-rec-row">
          <div className="onboard-rec-img">🍺</div>
          <div className="onboard-rec-text">
            <div className="onboard-rec-type">IPA</div>
            <div className="onboard-rec-name">클라우드 크래프트 IPA</div>
            <div className="onboard-rec-abv">ABV 6.5%</div>
            <div className="onboard-rec-tags">
              <span>#시트러스</span>
              <span>#홉향</span>
              <span className="onboard-rec-pager">1 / 3</span>
            </div>
          </div>
        </div>
      </div>
      <div className="onboard-rec-ghost-list">
        <div className="onboard-rec-ghost-item" style={{ opacity: 0.55 }}>
          <span className="onboard-rec-ghost-emoji">🍺</span>
          <div className="onboard-rec-ghost-info">
            <span className="onboard-rec-ghost-name">다크 나이트 스타우트</span>
            <span className="onboard-rec-ghost-sub">스타우트 · ABV 5.2%</span>
          </div>
          <span className="onboard-rec-ghost-match">92% 일치</span>
        </div>
        <div className="onboard-rec-ghost-item" style={{ opacity: 0.35 }}>
          <span className="onboard-rec-ghost-emoji">🍺</span>
          <div className="onboard-rec-ghost-info">
            <span className="onboard-rec-ghost-name">선셋 위트 에일</span>
            <span className="onboard-rec-ghost-sub">위트 에일 · ABV 4.5%</span>
          </div>
          <span className="onboard-rec-ghost-match">88% 일치</span>
        </div>
      </div>
      <div className="onboard-rec-footer-hint">취향 맞는 맥주 3개 더 →</div>
    </div>
  );
}

// ── Slide 3: Community ─────────────────────────────────
function CommunityIllustration() {
  return (
    <div className="onboard-visual-community">
      <div className="onboard-post">
        <div className="onboard-post-top">
          <div className="onboard-post-avatar">✈️</div>
          <div className="onboard-post-meta">
            <span className="onboard-post-name">맥주여행자</span>
            <span className="onboard-post-handle"> @beer_traveler · 18분 전</span>
          </div>
        </div>
        <p className="onboard-post-body">
          오늘 수제맥주 페스티벌 다녀왔는데 망고 사워 에일이 제일 인상적이었어요. 근데 줄이 너무 길어서 한 잔밖에 못 마심 😭
        </p>
        <div className="onboard-post-beer-tag">🍺 망고 사워 에일</div>
        <div className="onboard-post-actions">
          <span>💬 12</span>
          <span>↩ 8</span>
          <span>❤️ 51</span>
        </div>
      </div>
      <div className="onboard-post">
        <div className="onboard-post-top">
          <div className="onboard-post-avatar">🎨</div>
          <div className="onboard-post-meta">
            <span className="onboard-post-name">크래프트마니아</span>
            <span className="onboard-post-handle"> @craft_mania · 1시간 전</span>
          </div>
        </div>
        <p className="onboard-post-body">
          치맥 할 때 IPA 마시는 사람 저만인가요? 주변에서 이상하게 보는데 제 생각엔 치킨 기름이랑 홉 쓴맛이 진짜 잘 어울리거든요
        </p>
      </div>
    </div>
  );
}

// ── Slide titles ───────────────────────────────────────
function SlideTitle({ page }) {
  const cls = "onboard-title";
  if (page === 0) return (
    <h2 className={cls}>
      5가지 지표로<br />
      <span className="onboard-hl">간편하게 </span>기록해요
    </h2>
  );
  if (page === 1) return (
    <h2 className={cls}>
      나와 <span className="onboard-hl">비슷한 취향</span>의<br />
      맥덕이 좋아한 맥주
    </h2>
  );
  return (
    <h2 className={cls}>
      맥덕들과<br />
      <span className="onboard-hl">맥주 라이프 </span>공유
    </h2>
  );
}

// ── Slide data ─────────────────────────────────────────
const SLIDES = [
  {
    step: "01", category: "테이스팅 노트",
    desc: "단맛·신맛·쓴맛·몰티함·아로마를 슬라이더로 평가하고 해시태그로 향미를 기록해요. 기록이 쌓일수록 내 취향 프로파일이 완성돼요.",
    Visual: RadarIllustration,
  },
  {
    step: "02", category: "취향 추천",
    desc: "평점이 아니라 맛 프로파일이 비슷한 사람들의 데이터로 다음 맥주를 추천해요. AI 맞춤 추천으로 실패 없는 맥주 탐색.",
    Visual: RecommendIllustration,
  },
  {
    step: "03", category: "커뮤니티",
    desc: "새로운 맥주를 탐색하고 같은 취향의 맥덕들과 테이스팅 경험을 나눠요. 당신의 다음 맥주를 여기서 발견하세요.",
    Visual: CommunityIllustration,
  },
];

// ── Main ───────────────────────────────────────────────
export default function OnboardingPopup({ onClose }) {
  const [page, setPage] = useState(0);
  const touchStartX = useRef(null);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -60 && page < SLIDES.length - 1) setPage((p) => p + 1);
    if (dx > 60 && page > 0) setPage((p) => p - 1);
    touchStartX.current = null;
  }

  function handleClose() {
    localStorage.setItem(ONBOARD_KEY, "1");
    onClose();
  }

  const { step, category, desc, Visual } = SLIDES[page];
  const isLast = page === SLIDES.length - 1;

  return (
    <div className="onboard-overlay">
      <div className="onboard-modal" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="onboard-pill">
          <span className="onboard-pill-num">{step} · </span>
          <span className="onboard-pill-cat">{category}</span>
        </div>

        <SlideTitle page={page} />

        <p className="onboard-desc">{desc}</p>

        <div className="onboard-visual-area">
          <Visual />
        </div>

        <div className="onboard-bottom">
          <div className="onboard-dots">
            {SLIDES.map((_, i) => (
              <button key={i} className={`onboard-dot${i === page ? " active" : ""}`} onClick={() => setPage(i)} />
            ))}
          </div>
          {isLast && (
            <button className="onboard-cta" onClick={handleClose}>시작하기</button>
          )}
        </div>
      </div>
    </div>
  );
}

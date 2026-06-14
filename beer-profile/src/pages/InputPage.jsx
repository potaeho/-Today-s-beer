import { useState, useRef, useEffect } from "react";
import BeerHeader from "../components/BeerHeader";
import FlavorSliders from "../components/FlavorSliders";
import WaitlistModal from "../components/WaitlistModal";
import { PROFILE_AXES, HASHTAGS } from "../data/beerData";
import { track } from "../utils/analytics";
import { useScreenTime } from "../hooks/useScreenTime";

const REACTIONS = [
  { label: "좋아요", emoji: "👍", star: 4 },
  { label: "보통이에요", emoji: "😐", star: 3 },
  { label: "별로예요", emoji: "👎", star: 2 },
];

const HASHTAG_QUESTION = {
  "좋아요": "어떤 점이 좋았나요?",
  "보통이에요": "어떤 느낌이었나요?",
  "별로예요": "어떤 점이 아쉬웠나요?",
};

export default function InputPage({ beer, profile, onProfileChange, onConfirm, onBack, onStarChange }) {
  const axes = PROFILE_AXES[beer?.category] || PROFILE_AXES["에일"];
  const [stage, setStage] = useState("reaction");
  const [reaction, setReaction] = useState(null);
  const [hashtagOpen, setHashtagOpen] = useState(false);
  const [slidersOpen, setSlidersOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [reanalyzing, setReanalyzing] = useState(false);
  const [needsReanalysis, setNeedsReanalysis] = useState(false);
  const [analysisReady, setAnalysisReady] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const timerRef = useRef(null);
  const readyTimerRef = useRef(null);
  const statusRef = useRef(null);
  const flavorEngagedRef = useRef(false); // 맛 강도 슬라이더 첫 조작 1회만 기록
  useScreenTime("rating-input", { beer_id: beer?.id, beer_name: beer?.name });

  function handleReaction(r) {
    setReaction(r);
    setSelectedTags([]);
    setHashtagOpen(false);
    setSlidersOpen(false);
    setNeedsReanalysis(false);
    setReanalyzing(false);
    setAnalysisReady(false);
    flavorEngagedRef.current = false;
    onStarChange(r.star);
    track.ratingReaction(beer, r);          // 어떤 반응(좋아요/보통/별로)을 눌렀나
    track.ratingStepEnter("analyzing", beer);
    setStage("analyzing");
    clearTimeout(readyTimerRef.current);
    readyTimerRef.current = setTimeout(() => setAnalysisReady(true), 3000);
  }

  useEffect(() => () => {
    clearTimeout(timerRef.current);
    clearTimeout(readyTimerRef.current);
  }, []);

  function toggleTag(id) {
    const willSelect = !selectedTags.includes(id);
    track.ratingHashtagToggle(beer, id, willSelect); // 어떤 해시태그를 선택/해제했나
    setSelectedTags((prev) => {
      const next = prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id];
      setNeedsReanalysis(next.length > 0);
      return next;
    });
  }

  function toggleHashtagSection() {
    const next = !hashtagOpen;
    track.ratingHashtagSection(beer, next);
    setHashtagOpen(next);
  }

  function toggleSlidersSection() {
    const next = !slidersOpen;
    track.ratingFlavorSection(beer, next);
    setSlidersOpen(next);
  }

  function handleProfileChangeWithFlag(axis, value) {
    onProfileChange(axis, value);
    setNeedsReanalysis(true);
    if (!flavorEngagedRef.current) {
      flavorEngagedRef.current = true;
      track.ratingFlavorAdjust(beer, axis, value); // 맛 강도를 "실제로 조작"한 사람 집계
    }
  }

  function handleReanalyze() {
    setNeedsReanalysis(false);
    setReanalyzing(true);
    setAnalysisReady(false);
    // 상단 분석 상태로 스크롤 — 사용자가 다시 도는 스피너를 보도록
    statusRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    clearTimeout(timerRef.current);
    clearTimeout(readyTimerRef.current);
    timerRef.current = setTimeout(() => {
      setReanalyzing(false);
      setAnalysisReady(true);
    }, 3000);
  }

  function handleConfirm() {
    track.ratingComplete(beer, reaction?.star, selectedTags);
    setShowWaitlist(true);
  }

  function handleWaitlistClose() {
    // 다운로드 팝업을 닫으면 결과 페이지로 넘어가지 않고
    // 이 평가 입력 화면(분석 완료 상태)에 그대로 머문다.
    setShowWaitlist(false);
  }

  const confirmLabel = selectedTags.length > 0
    ? `${selectedTags.length}개 태그로 추천 맥주 보기`
    : "추천 맥주 보기";

  const isAnalyzing = !analysisReady || reanalyzing;

  return (
    <div className="page input-page-wrap">
      {showWaitlist && (
        <WaitlistModal beerName={beer?.name} onClose={handleWaitlistClose} />
      )}
      <button className="back-btn" onClick={() => { track.ratingAbandon("input", beer); onBack(); }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        맥주 정보
      </button>

      <BeerHeader beer={beer} />

      {stage === "reaction" && (
        <div className="reaction-stage">
          <p className="reaction-question">이 맥주, 마셔보니 어땠나요?</p>
          <div className="reaction-buttons">
            {REACTIONS.map((r) => (
              <button
                key={r.label}
                className="reaction-btn"
                onClick={() => handleReaction(r)}
              >
                <span className="reaction-emoji">{r.emoji}</span>
                <span className="reaction-label">{r.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {stage === "analyzing" && (
        <div className="analyzing-stage">
          <div className="analyzing-selected">
            <span className="analyzing-emoji">{reaction?.emoji}</span>
            <span className="analyzing-label">{reaction?.label}</span>
            <button className="analyzing-change-btn" onClick={() => setStage("reaction")}>
              다시 선택
            </button>
          </div>

          <div className="analyzing-status" ref={statusRef}>
            {isAnalyzing ? (
              <>
                <div className="analyzing-spinner" />
                <p className="analyzing-title">
                  {reanalyzing ? "상세 취향 분석 중..." : "취향 분석 중..."}
                </p>
              </>
            ) : (
              <p className="analyzing-title analyzing-title--done">✓ 분석 완료</p>
            )}
          </div>

          {/* 해시태그 토글 */}
          <button
            className="sliders-toggle-btn"
            onClick={toggleHashtagSection}
          >
            <span>
              {HASHTAG_QUESTION[reaction?.label] ?? "어떤 느낌이었나요?"}
              {selectedTags.length > 0 && (
                <span className="sliders-optional-badge" style={{ marginLeft: 6 }}>
                  {selectedTags.length}개 선택
                </span>
              )}
            </span>
            <span className="sliders-toggle-right">
              {selectedTags.length === 0 && <span className="sliders-optional-badge">선택</span>}
              <span className="sliders-toggle-arrow">{hashtagOpen ? "▲" : "▼"}</span>
            </span>
          </button>

          {hashtagOpen && (
            <div className="hashtag-section">
              {Object.entries(HASHTAGS).map(([axis, tags]) => (
                <div key={axis} className="hashtag-group">
                  <span className="hashtag-axis-label">{axis}</span>
                  <div className="hashtag-chips">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        className={`hashtag-chip${selectedTags.includes(tag.id) ? " hashtag-chip--selected" : ""}`}
                        onClick={() => toggleTag(tag.id)}
                      >
                        {tag.icon} {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 맛 강도 토글 */}
          <button
            className="sliders-toggle-btn"
            onClick={toggleSlidersSection}
          >
            <span>맛 강도 직접 입력</span>
            <span className="sliders-toggle-right">
              <span className="sliders-optional-badge">선택</span>
              <span className="sliders-toggle-arrow">{slidersOpen ? "▲" : "▼"}</span>
            </span>
          </button>
          {slidersOpen && (
            <FlavorSliders
              profile={profile}
              onChange={handleProfileChangeWithFlag}
              axes={axes}
            />
          )}

          <div className="confirm-actions">
            {needsReanalysis && (
              <button
                className="confirm-btn confirm-btn--reanalyze"
                onClick={handleReanalyze}
                disabled={isAnalyzing}
              >
                🔄 다시 분석하기
              </button>
            )}
            <button className="confirm-btn" onClick={handleConfirm} disabled={isAnalyzing}>
              {isAnalyzing ? "분석 중..." : confirmLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

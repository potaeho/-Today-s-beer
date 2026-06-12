import { useState, useEffect } from "react";
import FlavorRadar from "../components/FlavorRadar";
import { HASHTAG_MAP, AXES, PROFILE_AXES } from "../data/beerData";
import { supabase } from "../lib/supabase";
import { logEvent } from "../lib/track";
import { useScreenTime } from "../hooks/useScreenTime";

const TAG_PREFIX = {
  단맛: "sweet_", 산미: "sour_", 홉향: "hop_", 몰트: "malt_",
  로스팅: "roast_", 발효: "ferment_", 질감: "tex_",
};

function WaitlistModal({ beerName, onClose }) {
  // stage: intro(추천 팝업) → choose(이메일/전화 선택) → input(연락처 입력) → done
  const [stage, setStage] = useState("intro");
  const [contactType, setContactType] = useState(null); // "email" | "phone"
  const [contact, setContact] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | error

  // 각 단계 진입을 추적 (퍼널 분석용) — intro_view / choose_view / input_view / done_view
  useEffect(() => {
    logEvent("download_popup", `${stage}_view`, { meta: { beer_name: beerName, contact_type: contactType } });
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  // 닫기 = 해당 단계에서 이탈 (완료 단계 제외)
  function handleClose() {
    if (stage !== "done") {
      logEvent("download_popup", "abandon", { meta: { stage, beer_name: beerName } });
    }
    onClose();
  }

  function pickType(type) {
    logEvent("download_popup", "pick_contact", { meta: { contact_type: type, beer_name: beerName } });
    setContactType(type);
    setContact("");
    setStatus("idle");
    setStage("input");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!contact.trim() || !agreed) return;
    setStatus("loading");
    logEvent("download_popup", "submit", { meta: { contact_type: contactType, beer_name: beerName } });

    // fake door test — 연락처가 반드시 저장되어야 데이터 수집 의미가 있음
    if (!supabase) {
      console.error("[waitlist] Supabase 미설정 — 연락처 저장 불가");
      setStatus("error");
      logEvent("download_popup", "submit_error", { meta: { reason: "no_supabase" } });
      return;
    }
    try {
      const { error } = await supabase
        .from("waitlist")
        .insert({ contact: contact.trim(), contact_type: contactType, beer_name: beerName });
      if (error) {
        console.error("[waitlist] insert 실패:", error.message);
        setStatus("error");
        logEvent("download_popup", "submit_error", { meta: { reason: error.message } });
        return;
      }
      setStage("done");
      logEvent("download_popup", "submit_success", { meta: { contact_type: contactType, beer_name: beerName } });
    } catch (err) {
      console.error("[waitlist] 네트워크 오류:", err);
      setStatus("error");
      logEvent("download_popup", "submit_error", { meta: { reason: "network" } });
    }
  }

  function goDownload() {
    logEvent("download_popup", "download_click", { meta: { beer_name: beerName } });
    setStage("choose");
  }

  const isEmail = contactType === "email";

  return (
    <div className="waitlist-overlay" onClick={handleClose}>
      <div className="waitlist-modal" onClick={(e) => e.stopPropagation()}>

        {/* ① 추천 팝업 — 다운로드 유도 */}
        {stage === "intro" && (
          <>
            <button className="waitlist-x" onClick={handleClose}>✕</button>
            <div className="waitlist-icon">🍺</div>
            <p className="waitlist-title">취향 맞춤 추천이 준비됐어요!</p>
            <p className="waitlist-sub">회원님 취향에 꼭 맞는 추천 맥주는<br />앱에서 확인할 수 있어요.</p>
            <button className="waitlist-submit" onClick={goDownload}>
              ⬇️ 다운로드 하기
            </button>
          </>
        )}

        {/* ② 연락 수단 선택 */}
        {stage === "choose" && (
          <>
            <button className="waitlist-x" onClick={handleClose}>✕</button>
            <div className="waitlist-icon">🙏</div>
            <p className="waitlist-title">관심 가져주셔서 감사해요!</p>
            <p className="waitlist-sub">아직 정식 출시 전이에요.<br />어떻게 알림을 받으실래요?</p>
            <div className="waitlist-choice-group">
              <button className="waitlist-choice-btn" onClick={() => pickType("email")}>
                <span className="waitlist-choice-icon">📧</span>
                이메일로 받기
              </button>
              <button className="waitlist-choice-btn" onClick={() => pickType("phone")}>
                <span className="waitlist-choice-icon">📱</span>
                전화번호로 받기
              </button>
            </div>
          </>
        )}

        {/* ③ 연락처 입력 (fake door) */}
        {stage === "input" && (
          <>
            <button className="waitlist-back" onClick={() => setStage("choose")}>‹ 뒤로</button>
            <button className="waitlist-x" onClick={handleClose}>✕</button>
            <div className="waitlist-icon">{isEmail ? "📧" : "📱"}</div>
            <p className="waitlist-title">{isEmail ? "이메일을 입력해주세요" : "전화번호를 입력해주세요"}</p>
            <p className="waitlist-sub">출시했을 때 가장 먼저 알려드릴게요.</p>
            <form onSubmit={handleSubmit} className="waitlist-form">
              <input
                className="waitlist-input"
                type={isEmail ? "email" : "tel"}
                inputMode={isEmail ? "email" : "tel"}
                placeholder={isEmail ? "example@email.com" : "010-1234-5678"}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                autoFocus
              />
              <label className="waitlist-agree">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <span>출시 알림 목적으로만 사용하고 즉시 삭제합니다.</span>
              </label>
              {status === "error" && <p className="waitlist-error">오류가 발생했어요. 다시 시도해주세요.</p>}
              <button
                type="submit"
                className="waitlist-submit"
                disabled={!contact.trim() || !agreed || status === "loading"}
              >
                {status === "loading" ? "저장 중..." : "알림 신청하기"}
              </button>
            </form>
          </>
        )}

        {/* ④ 완료 */}
        {stage === "done" && (
          <div className="waitlist-done">
            <div className="waitlist-done-icon">🎉</div>
            <p className="waitlist-done-title">신청 완료!</p>
            <p className="waitlist-done-sub">출시되면 가장 먼저 알려드릴게요.</p>
            <button className="waitlist-close-btn" onClick={onClose}>닫기</button>
          </div>
        )}

      </div>
    </div>
  );
}

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
      <div style={{ height: 130 }} />

      {/* 하단 고정 버튼 */}
      <div className="result-bottom-bar">
        <button className="result-save-btn result-recommend-btn" onClick={openRecommend}>
          ✨ 추천 맥주 보기
        </button>
        <button className="result-home-btn" onClick={onHome}>
          홈으로 돌아가기
        </button>
      </div>

      {showWaitlist && (
        <WaitlistModal beerName={beer?.name} onClose={() => setShowWaitlist(false)} />
      )}
    </div>
  );
}

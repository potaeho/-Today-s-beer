import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { logEvent, trackIds } from "../lib/track";
import { isValidEmail, isValidPhone } from "../lib/sanitize";

export default function WaitlistModal({ beerName, onClose }) {
  const [stage, setStage] = useState("intro");
  const [contactType, setContactType] = useState(null);
  const [contact, setContact] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    logEvent("download_popup", `${stage}_view`, { meta: { beer_name: beerName, contact_type: contactType } });
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const isContactValid = contactType === "email"
    ? isValidEmail(contact)
    : isValidPhone(contact);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!contact.trim() || !agreed || !isContactValid) return;
    setStatus("loading");
    logEvent("download_popup", "submit", { meta: { contact_type: contactType, beer_name: beerName } });

    if (!supabase) {
      console.error("[waitlist] Supabase 미설정 — 연락처 저장 불가");
      setStatus("error");
      logEvent("download_popup", "submit_error", { meta: { reason: "no_supabase" } });
      return;
    }
    try {
      const { error } = await supabase
        .from("waitlist")
        .insert({
          contact: contact.trim(),
          contact_type: contactType,
          beer_name: beerName,
          visitor_id: trackIds.getVisitorId(),
        });
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
    if (supabase) {
      supabase.from("download_clicks").insert({
        visitor_id: trackIds.getVisitorId(),
        session_id: trackIds.getSessionId(),
        beer_name: beerName,
      }).then(({ error }) => {
        if (error) console.warn("[download_clicks] insert:", error.message);
      });
    }
    setStage("choose");
  }

  const isEmail = contactType === "email";

  return (
    <div className="waitlist-overlay" onClick={handleClose}>
      <div className="waitlist-modal" onClick={(e) => e.stopPropagation()}>

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
                type={isEmail ? "email" : "text"}
                inputMode={isEmail ? "email" : "numeric"}
                placeholder={isEmail ? "이메일 주소를 입력해주세요" : "전화번호를 입력해주세요"}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                autoFocus
              />
              <label className="waitlist-agree">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <span>출시 알림 목적으로만 사용하고 즉시 삭제합니다.</span>
              </label>
              {contact.trim() && !isContactValid && (
                <p className="waitlist-error">
                  {contactType === "email" ? "올바른 이메일 형식이 아니에요." : "올바른 전화번호 형식이 아니에요."}
                </p>
              )}
              {status === "error" && <p className="waitlist-error">오류가 발생했어요. 다시 시도해주세요.</p>}
              <button
                type="submit"
                className="waitlist-submit"
                disabled={!contact.trim() || !agreed || !isContactValid || status === "loading"}
              >
                {status === "loading" ? "저장 중..." : "알림 신청하기"}
              </button>
            </form>
          </>
        )}

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

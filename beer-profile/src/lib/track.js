// ================================================
// 오늘의 맥주 — 사용자 행동 로깅 (Supabase user_events)
// ================================================
// 모든 화면 진입 / 클릭 / 이탈을 Supabase에 적재해
// 퍼널 · 이탈 지점을 분석한다. 익명 사용자도 추적.
//
// - visitor_id : 브라우저 단위 영구 식별자 (localStorage)
// - session_id : 탭/세션 단위 식별자 (sessionStorage)
// 둘 다 익명 — 개인정보(PII) 아님.

import { supabase } from "./supabase";

const VISITOR_KEY = "omac_visitor_id";
const SESSION_KEY = "omac_session_id";

function uid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getVisitorId() {
  try {
    let v = localStorage.getItem(VISITOR_KEY);
    if (!v) { v = uid(); localStorage.setItem(VISITOR_KEY, v); }
    return v;
  } catch { return "no-storage"; }
}

function getSessionId() {
  try {
    let s = sessionStorage.getItem(SESSION_KEY);
    if (!s) { s = uid(); sessionStorage.setItem(SESSION_KEY, s); }
    return s;
  } catch { return "no-storage"; }
}

/**
 * 행동 이벤트 1건 기록 (fire-and-forget, UX를 절대 막지 않음)
 * @param {string} screen  화면/영역 이름 (예: "ResultPage", "download_popup")
 * @param {string} action  행동 (예: "view", "click", "abandon", "submit_success")
 * @param {{ targetId?: string|number, targetType?: string, meta?: object }} [opts]
 */
export async function logEvent(screen, action, opts = {}) {
  if (!supabase) return;
  const { targetId, targetType, meta } = opts;
  // visitor_id 는 meta 안에 둔다 → 기존 user_events 테이블(스키마 변경 없이) 그대로 사용.
  const payload = {
    session_id:  getSessionId(),
    screen,
    action,
    target_id:   targetId != null ? String(targetId) : null,
    target_type: targetType ?? null,
    meta: {
      ...(meta || {}),
      visitor_id: getVisitorId(),
      path: typeof location !== "undefined" ? location.pathname + location.search : null,
      ts_client: new Date().toISOString(),
    },
  };
  try {
    const { error } = await supabase.from("user_events").insert(payload);
    if (error) console.warn("[track] insert 실패:", error.message);
  } catch (err) {
    console.warn("[track] 네트워크 오류:", err);
  }
}

/** 세션 식별자 확인용 (디버깅) */
export const trackIds = { getVisitorId, getSessionId };

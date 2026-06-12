import { useEffect, useRef } from "react";
import { track } from "../utils/analytics";

/**
 * 화면 체류 시간 측정 훅
 * @param {string} screenName  화면 이름 ("home" | "explore" | "beer-detail" | ...)
 * @param {object} [meta]      추가 컨텍스트 (예: { beer_id, beer_name })
 */
export function useScreenTime(screenName, meta = {}) {
  const enterAt = useRef(Date.now());

  useEffect(() => {
    enterAt.current = Date.now();
    return () => {
      const durationMs = Date.now() - enterAt.current;
      track.screenTime(screenName, durationMs, meta);
    };
    // meta는 렌더마다 바뀔 수 있으므로 의도적으로 deps 제외
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenName]);
}

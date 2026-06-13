import { useRef } from "react";

const DESCS = {
  0:   "별점을 선택해주세요",
  0.5: "정말 별로였어요",
  1:   "다시 마시고 싶지 않아요",
  1.5: "별로였어요",
  2:   "그냥 그랬어요",
  2.5: "나쁘지 않아요",
  3:   "무난했어요",
  3.5: "꽤 맛있었어요",
  4:   "또 마시고 싶어요",
  4.5: "거의 완벽했어요",
  5:   "꼭 다시 마실 거예요 🍺",
};

export default function StarRating({ value, onChange }) {
  const starsRef = useRef(null);
  const dragging = useRef(false);

  function valueFromX(clientX) {
    const rect = starsRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width - 0.1));
    const raw = (x / rect.width) * 5;          // 0 ~ 5
    return Math.max(0.5, Math.round(raw * 2) / 2); // 0.5 단위 스냅
  }

  function handlePointerDown(e) {
    dragging.current = true;
    starsRef.current?.setPointerCapture(e.pointerId); // 영역 밖 이탈해도 추적
    const val = valueFromX(e.clientX);
    if (val !== null) onChange(val);
  }

  function handlePointerMove(e) {
    if (!dragging.current) return;
    const val = valueFromX(e.clientX);
    if (val !== null && val !== value) onChange(val);
  }

  function handlePointerUp() {
    dragging.current = false;
  }

  return (
    <div className="star-rating-wrap">
      <p className="star-rating-label">재구매 의사</p>
      <div
        ref={starsRef}
        className="star-rating-stars"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ touchAction: "none", cursor: "pointer" }}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = value >= star;
          const half   = !filled && value >= star - 0.5;
          return (
            <div key={star} className="star-btn-wrap">
              <span className={`star-icon${filled ? " filled" : half ? " half" : ""}`}>★</span>
            </div>
          );
        })}
      </div>
      <p className="star-rating-desc">{DESCS[value] ?? ""}</p>
    </div>
  );
}

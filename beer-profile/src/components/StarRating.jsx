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
  return (
    <div className="star-rating-wrap">
      <p className="star-rating-label">재구매 의사</p>
      <div className="star-rating-stars">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = value >= star;
          const half   = !filled && value >= star - 0.5;
          return (
            <div key={star} className="star-btn-wrap">
              {/* 왼쪽 절반 클릭 → 0.5점 단위 */}
              <button
                className="star-half-zone star-half-zone--left"
                onClick={() => onChange(value === star - 0.5 ? 0 : star - 0.5)}
                aria-label={`${star - 0.5}점`}
              />
              {/* 오른쪽 절반 클릭 → 정수 */}
              <button
                className="star-half-zone star-half-zone--right"
                onClick={() => onChange(value === star ? 0 : star)}
                aria-label={`${star}점`}
              />
              <span className={`star-icon${filled ? " filled" : half ? " half" : ""}`}>★</span>
            </div>
          );
        })}
      </div>
      <p className="star-rating-desc">{DESCS[value] ?? ""}</p>
    </div>
  );
}

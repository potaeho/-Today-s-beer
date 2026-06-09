export default function StarRating({ value, onChange }) {
  return (
    <div className="star-rating-wrap">
      <p className="star-rating-label">재구매 의사</p>
      <div className="star-rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`star-btn ${star <= value ? "filled" : ""}`}
            onClick={() => onChange(star === value ? 0 : star)}
          >
            ★
          </button>
        ))}
      </div>
      <p className="star-rating-desc">
        {value === 0 && "별점을 선택해주세요"}
        {value === 1 && "다시 마시고 싶지 않아요"}
        {value === 2 && "별로였어요"}
        {value === 3 && "그저 그랬어요"}
        {value === 4 && "또 마시고 싶어요"}
        {value === 5 && "꼭 다시 마실 거예요 🍺"}
      </p>
    </div>
  );
}

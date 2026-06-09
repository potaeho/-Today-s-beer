export default function BarrelProgress({ count, total = 20 }) {
  const pct = Math.min(count / total, 1);
  const fillHeight = 120 * pct;

  return (
    <div className="barrel-wrap">
      <svg viewBox="0 0 160 160" className="barrel-svg">
        {/* 배럴 외곽 */}
        <ellipse cx="80" cy="28" rx="60" ry="16" fill="#E8D5B0" stroke="#B8976A" strokeWidth="3"/>
        <rect x="20" y="28" width="120" height="108" rx="8" fill="#F5E6C8" stroke="#B8976A" strokeWidth="3"/>
        <ellipse cx="80" cy="136" rx="60" ry="16" fill="#E8D5B0" stroke="#B8976A" strokeWidth="3"/>

        {/* 맥주 채움 (클립) */}
        <clipPath id="barrelClip">
          <rect x="22" y={136 - fillHeight} width="116" height={fillHeight}/>
        </clipPath>
        <rect x="22" y="28" width="116" height="108" fill="#F59E0B" opacity="0.55" clipPath="url(#barrelClip)"/>

        {/* 배럴 띠 */}
        <rect x="14" y="58"  width="132" height="8" rx="3" fill="#B8976A" opacity="0.7"/>
        <rect x="14" y="96"  width="132" height="8" rx="3" fill="#B8976A" opacity="0.7"/>

        {/* 세로 나무결 */}
        {[40, 60, 80, 100, 120].map((x) => (
          <line key={x} x1={x} y1="30" x2={x} y2="134" stroke="#C9A96E" strokeWidth="1.5" opacity="0.4"/>
        ))}
      </svg>

      <p className="barrel-count">
        <span className="barrel-num">{count}</span>
        <span className="barrel-unit">종</span>
      </p>
      <p className="barrel-label">지금까지 마신 맥주</p>
      <div className="barrel-progress-bar">
        <div className="barrel-progress-fill" style={{ width: `${pct * 100}%` }}/>
      </div>
      <p className="barrel-progress-hint">{count} / {total}종 달성 시 배럴 완성 🎉</p>
    </div>
  );
}

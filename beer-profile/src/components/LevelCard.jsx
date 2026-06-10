import { getCurrentLevel, formatMl } from "../data/levels";
import { LEVEL_ICONS } from "./LevelIcons";

export default function LevelCard({ ratedCount }) {
  const { current, next, progress, totalMl } = getCurrentLevel(ratedCount);
  const pct = Math.min(Math.round(progress * 100), 100);
  const LevelIcon = LEVEL_ICONS[current.level - 1];

  return (
    <div className="level-card" style={{ background: current.color }}>
      <div className="level-badge">Lv.{current.level}</div>

      {/* 아이콘 + 이름 */}
      <div className="level-hero">
        <div className="level-icon">
          {LevelIcon && <LevelIcon />}
        </div>
        <div className="level-name-wrap">
          <p className="level-name">{current.name}</p>
          <p className="level-name-en">{current.nameEn}</p>
        </div>
      </div>

      <p className="level-desc">{current.desc}</p>

      {/* 누적 용량 */}
      <div className="level-volume">
        <span className="level-volume-label">지금까지 마신 총량</span>
        <span className="level-volume-value">{formatMl(totalMl)}</span>
        <span className="level-volume-count">({ratedCount}종)</span>
      </div>

      {/* 다음 레벨 진행 바 */}
      {next ? (
        <div className="level-progress-wrap">
          <div className="level-progress-row">
            <span className="level-progress-label">다음 레벨까지</span>
            <span className="level-progress-pct">{pct}%</span>
          </div>
          <div className="level-progress-track">
            <div
              className="level-progress-fill"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      ) : (
        <p className="level-max">🎉 최고 레벨 달성!</p>
      )}
    </div>
  );
}

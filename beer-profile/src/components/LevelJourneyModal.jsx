import { LEVELS, getCurrentLevel, formatMl } from "../data/levels";
import { LEVEL_ICONS } from "./LevelIcons";

export default function LevelJourneyModal({ ratedCount, onClose }) {
  const { current, totalMl } = getCurrentLevel(ratedCount);

  return (
    <div className="level-journey-overlay">
      <div className="level-journey-page">

        {/* 헤더 */}
        <div className="level-journey-header">
          <button className="level-journey-back" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <span className="level-journey-title">나의 맥주 여정</span>
          <span style={{ width: 36 }} />
        </div>

        {/* 총 마신 양 요약 */}
        <div className="level-journey-summary">
          <span className="level-journey-summary-vol">{formatMl(totalMl)}</span>
          <span className="level-journey-summary-label">총 마신 맥주량 · {ratedCount}종 평가</span>
        </div>

        {/* 레벨 타임라인 */}
        <div className="level-journey-body">
          {LEVELS.map((lv, i) => {
            const Icon = LEVEL_ICONS[i];
            const isUnlocked = totalMl >= lv.minMl;
            const isCurrent = lv.level === current.level;
            const next = LEVELS[i + 1] || null;
            const pct =
              isCurrent && next
                ? Math.min(
                    Math.round(((totalMl - lv.minMl) / (next.minMl - lv.minMl)) * 100),
                    100
                  )
                : null;

            return (
              <div key={lv.level} className="journey-row">
                {/* 타임라인 선 + 점 */}
                <div className="journey-timeline">
                  <div
                    className={`journey-dot ${
                      isCurrent
                        ? "journey-dot--current"
                        : isUnlocked
                        ? "journey-dot--done"
                        : "journey-dot--locked"
                    }`}
                  >
                    {isUnlocked && !isCurrent ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      <span className="journey-dot-num">{lv.level}</span>
                    )}
                  </div>
                  {i < LEVELS.length - 1 && (
                    <div className={`journey-connector ${isUnlocked ? "journey-connector--done" : ""}`} />
                  )}
                </div>

                {/* ── 잠긴 레벨: ? + 용량만 표시 ── */}
                {!isUnlocked ? (
                  <div className="journey-card journey-card--locked">
                    <div className="journey-card-icon-wrap">
                      <div className="journey-lock-placeholder">?</div>
                    </div>
                    <div className="journey-card-content">
                      <div className="journey-card-top">
                        <span className="journey-lv-badge journey-lv-badge--locked">
                          Lv.{lv.level}
                        </span>
                        <span className="journey-lock-icon">🔒</span>
                      </div>
                      <p className="journey-card-name journey-card-name--hidden">???</p>
                      <p className="journey-card-unlock-hint">
                        {formatMl(lv.minMl)} 달성 시 해제
                      </p>
                    </div>
                  </div>
                ) : (
                  /* ── 해제된 레벨 (달성 or 현재) ── */
                  <div
                    className={`journey-card ${isCurrent ? "journey-card--current" : ""}`}
                    style={isCurrent ? { background: lv.color } : {}}
                  >
                    <div className="journey-card-icon-wrap">
                      {Icon && <Icon />}
                    </div>
                    <div className="journey-card-content">
                      <div className="journey-card-top">
                        <div className="journey-card-badges">
                          <span className={`journey-lv-badge ${isCurrent ? "journey-lv-badge--current" : "journey-lv-badge--done"}`}>
                            Lv.{lv.level}
                          </span>
                          {isCurrent && <span className="journey-now-badge">현재</span>}
                          {!isCurrent && <span className="journey-done-badge">달성 ✓</span>}
                        </div>
                      </div>
                      <p className="journey-card-name">{lv.name}</p>
                      <p className="journey-card-name-en">{lv.nameEn}</p>
                      <p className="journey-card-desc">{lv.desc}</p>

                      {/* 현재 레벨 진행 바 */}
                      {isCurrent && next && (
                        <div className="journey-progress-wrap">
                          <div className="journey-progress-track">
                            <div className="journey-progress-fill" style={{ width: `${pct}%` }} />
                          </div>
                          <div className="journey-progress-labels">
                            <span>다음까지</span>
                            <span className="journey-progress-pct">{pct}%</span>
                          </div>
                        </div>
                      )}
                      {isCurrent && !next && (
                        <p className="journey-max-label">🎉 최고 레벨 달성!</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div style={{ height: 80 }} />
        </div>
      </div>
    </div>
  );
}

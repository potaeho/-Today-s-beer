import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const MY_COLOR  = "#F59E0B"; // 내 평가 — 앰버 옐로
const AVG_COLOR = "#6366F1"; // 전체 평균 — 인디고 블루

export default function FlavorRadar({ profile, axes, myProfile }) {
  const data = axes.map((axis) => ({
    subject: axis,
    avg:  profile[axis]   ?? 0,
    mine: myProfile ? (myProfile[axis] ?? 0) : undefined,
    fullMark: 5,
  }));

  return (
    <div className="radar-wrapper">
      {/* 범례 */}
      {myProfile && (
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 8 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6B7280" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: MY_COLOR, display: "inline-block" }} />
            내 평가
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6B7280" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: AVG_COLOR, display: "inline-block" }} />
            전체 평균
          </span>
        </div>
      )}

      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data}>
          {/* 5점 기준 오각형 격자 5개 */}
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#374151", fontSize: 13, fontWeight: 600 }}
          />
          {/* tickCount={6} → 0,1,2,3,4,5 → 5개 격자 링 */}
          <PolarRadiusAxis domain={[0, 5]} tickCount={6} tick={false} axisLine={false} />

          {/* 전체 평균 — 뒤에 깔리는 레이어 */}
          <Radar
            name="전체 평균"
            dataKey="avg"
            stroke={AVG_COLOR}
            fill={AVG_COLOR}
            fillOpacity={0.15}
            strokeWidth={1.5}
            dot={{ r: 3, fill: AVG_COLOR, strokeWidth: 0 }}
          />

          {/* 내 평가 — 위에 올라오는 레이어 */}
          {myProfile && (
            <Radar
              name="내 평가"
              dataKey="mine"
              stroke={MY_COLOR}
              fill={MY_COLOR}
              fillOpacity={0.35}
              strokeWidth={2}
              dot={{ r: 4, fill: MY_COLOR, strokeWidth: 0 }}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

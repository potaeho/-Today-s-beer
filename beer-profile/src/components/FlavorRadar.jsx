import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function FlavorRadar({ profile, axes, myProfile }) {
  const data = axes.map((axis) => ({
    subject: axis,
    avg: profile[axis] ?? 0,
    mine: myProfile ? (myProfile[axis] ?? 0) : undefined,
    fullMark: 5,
  }));

  return (
    <div className="radar-wrapper">
      {/* 범례 */}
      {myProfile && (
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 8 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6B7280" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#6366F1", display: "inline-block" }} />
            내 평가
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6B7280" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />
            전체 평균
          </span>
        </div>
      )}
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#374151", fontSize: 13, fontWeight: 600 }}
          />
          <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
          <Radar
            dataKey="avg"
            stroke="#F59E0B"
            fill="#F59E0B"
            fillOpacity={0.25}
            dot={{ r: 4, fill: "#F59E0B", strokeWidth: 0 }}
          />
          {myProfile && (
            <Radar
              dataKey="mine"
              stroke="#6366F1"
              fill="#6366F1"
              fillOpacity={0.2}
              dot={{ r: 4, fill: "#6366F1", strokeWidth: 0 }}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { AXES } from "../data/beerData";

export default function FlavorRadar({ profile }) {
  const data = AXES.map((axis) => ({
    subject: axis,
    value: profile[axis] ?? 0,
    fullMark: 5,
  }));

  return (
    <div className="radar-wrapper">
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#374151", fontSize: 13, fontWeight: 600 }}
          />
          <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
          <Radar
            dataKey="value"
            stroke="#F59E0B"
            fill="#F59E0B"
            fillOpacity={0.25}
            dot={{ r: 4, fill: "#F59E0B", strokeWidth: 0 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

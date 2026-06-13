export default function FlavorSliders({ profile, onChange, axes }) {
  return (
    <div className="sliders-section">
      {axes.map((axis) => {
        const raw = profile[axis] ?? 0;
        const snapped = Math.round(raw * 2) / 2;
        return (
          <div key={axis} className="slider-row">
            <span className="slider-label">{axis}</span>
            <input
              type="range"
              min={0}
              max={5}
              step={0.5}
              value={snapped}
              onChange={(e) => onChange(axis, parseFloat(e.target.value))}
              className="slider"
            />
            <span className="slider-value">{snapped.toFixed(1)}</span>
          </div>
        );
      })}
    </div>
  );
}

import { useState } from "react";
import { AXES } from "../data/beerData";

export default function FlavorSliders({ profile, onChange }) {
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState("");

  function handleValueClick(axis) {
    setEditing(axis);
    setDraft(profile[axis].toFixed(1));
  }

  function handleInputChange(e) {
    setDraft(e.target.value);
  }

  function commitEdit(axis) {
    const parsed = parseFloat(draft);
    if (!isNaN(parsed)) {
      onChange(axis, Math.min(5, Math.max(0, parsed)));
    }
    setEditing(null);
  }

  function handleKeyDown(e, axis) {
    if (e.key === "Enter") commitEdit(axis);
    if (e.key === "Escape") setEditing(null);
  }

  return (
    <div className="sliders-section">
      {AXES.map((axis) => (
        <div key={axis} className="slider-row">
          <span className="slider-label">{axis}</span>
          <input
            type="range"
            min={0}
            max={5}
            step={0.1}
            value={profile[axis]}
            onChange={(e) => onChange(axis, parseFloat(e.target.value))}
            className="slider"
          />
          {editing === axis ? (
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={draft}
              onChange={handleInputChange}
              onBlur={() => commitEdit(axis)}
              onKeyDown={(e) => handleKeyDown(e, axis)}
              className="slider-value slider-value-input"
              autoFocus
            />
          ) : (
            <span
              className="slider-value"
              onClick={() => handleValueClick(axis)}
              title="눌러서 수정"
            >
              {profile[axis].toFixed(1)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

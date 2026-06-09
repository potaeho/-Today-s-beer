import { AXES, HASHTAGS } from "../data/beerData";

export default function HashtagSection({ selected, onToggle }) {
  return (
    <div className="hashtag-section">
      {AXES.map((axis) => (
        <div key={axis} className="hashtag-group">
          <h3 className="hashtag-axis-title">{axis}</h3>
          <div className="hashtag-chips">
            {HASHTAGS[axis].map((tag) => {
              const isSelected = selected.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  className={`hashtag-chip ${isSelected ? "selected" : ""}`}
                  onClick={() => onToggle(tag.id)}
                >
                  <span className="chip-icon">{tag.icon}</span>
                  <span className="chip-label">#{tag.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

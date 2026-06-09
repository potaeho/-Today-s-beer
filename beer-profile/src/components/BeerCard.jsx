import { HASHTAG_MAP } from "../data/beerData";

export default function BeerCard({ beer, onClick }) {
  const resolvedHashtags = (beer.hashtags || [])
    .map((id) => HASHTAG_MAP[id])
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="beer-card" onClick={() => onClick(beer)}>
      <div className="beer-card-img" style={{ background: beer.srmColor + "18" }}>
        <span>🍺</span>
        <div className="beer-card-srm" style={{ background: beer.srmColor }} />
      </div>
      <div className="beer-card-body">
        <p className="beer-card-type">{beer.type}</p>
        <p className="beer-card-name">{beer.name}</p>
        <div className="beer-card-meta">
          <span className="beer-card-abv">{beer.abv}</span>
          {beer.tags.map((t) => (
            <span key={t} className="beer-card-tag">{t}</span>
          ))}
        </div>
        {resolvedHashtags.length > 0 && (
          <div className="beer-card-hashtags">
            {resolvedHashtags.map((tag) => (
              <span key={tag.id} className="beer-card-hashtag">
                {tag.icon} #{tag.label}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="beer-card-mini-bars">
        {Object.entries(beer.profile).slice(0, 3).map(([k, v]) => (
          <div key={k} className="mini-profile-row">
            <span className="mini-profile-key">{k[0]}</span>
            <div className="mini-profile-track">
              <div className="mini-profile-fill" style={{ width: `${(v / 5) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

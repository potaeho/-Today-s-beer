export default function BeerHeader({ beer }) {
  return (
    <div className="beer-header">
      <div className="beer-image">
        {beer.image ? (
          <img src={beer.image} alt={beer.name} />
        ) : (
          <div className="beer-image-placeholder">🍺</div>
        )}
      </div>
      <div className="beer-info">
        <p className="beer-label">이름 :</p>
        <p className="beer-value">{beer.name}</p>
        <p className="beer-label">타입 :</p>
        <p className="beer-value">{beer.type}</p>
        <p className="beer-label">ABV :</p>
        <p className="beer-value">{beer.abv}</p>
      </div>
    </div>
  );
}

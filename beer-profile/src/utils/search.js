// 맥주 검색 필터 — 대소문자 무시 부분일치
// HomePage / SearchBeerModal 공용

export function filterBeers(beers = [], query = "") {
  const q = query.trim().toLowerCase();
  if (!q) return beers;
  return beers.filter(
    (b) =>
      (b.name ?? "").toLowerCase().includes(q) ||
      (b.type ?? "").toLowerCase().includes(q) ||
      (b.category ?? "").toLowerCase().includes(q) ||
      (b.brewery ?? "").toLowerCase().includes(q) ||
      (b.tags ?? []).some((t) => (t ?? "").toLowerCase().includes(q))
  );
}

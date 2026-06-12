export function summarizeReviews(reviews) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return { count: 0, avgStar: 0, avgProfile: {} };
  }
  const count = reviews.length;
  const round1 = (n) => Math.round(n * 10) / 10;
  const avgStar = round1(reviews.reduce((s, r) => s + r.star, 0) / count);

  const sums = {};
  reviews.forEach((r) => {
    Object.entries(r.profile || {}).forEach(([axis, v]) => {
      sums[axis] = (sums[axis] || 0) + v;
    });
  });
  const avgProfile = {};
  Object.entries(sums).forEach(([axis, total]) => {
    avgProfile[axis] = round1(total / count);
  });

  return { count, avgStar, avgProfile };
}

export function starDistribution(reviews) {
  const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (!Array.isArray(reviews)) return dist;
  reviews.forEach((r) => {
    const s = r?.star;
    if (Number.isInteger(s) && s >= 1 && s <= 5) {
      dist[s] += 1;
    }
  });
  return dist;
}

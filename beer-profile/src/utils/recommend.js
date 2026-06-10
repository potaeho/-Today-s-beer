import { REVIEWS } from "../data/reviewsData";
import { BEER_LIST, HASHTAG_MAP } from "../data/beerData";

/** isMe 리뷰 전체 수집 */
export function getMyReviews() {
  return Object.entries(REVIEWS).flatMap(([beerId, reviews]) => {
    const mine = reviews.find((r) => r.isMe);
    return mine ? [{ ...mine, beerId: Number(beerId) }] : [];
  });
}

/** 내가 평가한 맥주 수 */
export function getMyRatedCount() {
  return getMyReviews().length;
}

/**
 * 개인화 추천 — isMe 리뷰를 기반으로 취향 분석 후 상위 N개 반환
 * @returns Array<{ beer, score, reason }>
 */
export function getPersonalizedRecommendations(count = 3) {
  const myReviews = getMyReviews();

  if (myReviews.length === 0) {
    return BEER_LIST.slice(0, count).map((beer) => ({
      beer,
      score: 0,
      reason: "지금 인기 맥주예요",
    }));
  }

  const ratedIds = new Set(myReviews.map((r) => r.beerId));

  // ── 취향 가중치 계산 (별점 반영) ──────────────────
  const hashtagWeight = {};
  const categoryWeight = {};

  myReviews.forEach(({ beerId, hashtags, star }) => {
    const beer = BEER_LIST.find((b) => b.id === beerId);
    if (!beer) return;

    hashtags.forEach((tag) => {
      hashtagWeight[tag] = (hashtagWeight[tag] || 0) + star;
    });
    categoryWeight[beer.category] = (categoryWeight[beer.category] || 0) + star;
  });

  // ── 평가 안 한 맥주만 추천 (전부 했으면 전체 대상) ──
  const pool = BEER_LIST.filter((b) => !ratedIds.has(b.id));
  const candidates = pool.length > 0 ? pool : BEER_LIST;

  // ── 각 맥주 점수 계산 ──────────────────────────────
  const scored = candidates.map((beer) => {
    let score = 0;
    const matchedTags = [];

    beer.hashtags.forEach((tag) => {
      if (hashtagWeight[tag]) {
        score += hashtagWeight[tag] * 2;
        matchedTags.push(tag);
      }
    });
    score += categoryWeight[beer.category] || 0;

    // ── 추천 이유 문구 ─────────────────────────────
    let reason;
    if (matchedTags.length > 0) {
      const labels = matchedTags
        .slice(0, 2)
        .map((id) => HASHTAG_MAP[id]?.label)
        .filter(Boolean);
      reason =
        labels.length > 0
          ? `${labels.join(" · ")} 취향과 잘 맞아요`
          : `즐겨 마시는 ${beer.category} 스타일`;
    } else if (categoryWeight[beer.category]) {
      reason = `즐겨 마시는 ${beer.category} 스타일`;
    } else {
      reason = "새로운 스타일에 도전해보세요";
    }

    return { beer, score, reason };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count);
}

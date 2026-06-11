import { REVIEWS } from "../data/reviewsData";
import { HASHTAG_MAP, TRENDING_OVERRIDES } from "../data/beerData";

/** isMe 리뷰 전체 수집 */
export function getMyReviews() {
  return Object.entries(REVIEWS).flatMap(([beerId, reviews]) => {
    const mine = reviews.find((r) => r.isMe);
    return mine ? [{ ...mine, beerId }] : [];
  });
}

/** 내가 평가한 맥주 수 */
export function getMyRatedCount() {
  return getMyReviews().length;
}

/**
 * 트렌딩 맥주 — TRENDING_OVERRIDES(이름 기반) 또는 beer.trending 필드로 식별
 */
export function getTrendingBeers(beerList = [], count = 6) {
  const resolve = (beer) => beer.trending ?? TRENDING_OVERRIDES[beer.name] ?? null;

  const trending = beerList.filter((b) => resolve(b));
  const rest     = beerList.filter((b) => !resolve(b));
  const combined = [...trending, ...rest];

  return combined.slice(0, count).map((beer) => {
    const t = resolve(beer);
    return {
      beer,
      trendType:  t?.type  ?? null,
      trendLabel: t?.label ?? null,
      reason:     t?.reason ?? null,
    };
  });
}

/**
 * 개인화 추천 — isMe 리뷰를 기반으로 취향 분석 후 상위 N개 반환
 * @param {Array}  beerList  Supabase에서 받아온 맥주 목록
 * @param {number} count     반환 개수
 * @returns Array<{ beer, score, reason }>
 */
export function getPersonalizedRecommendations(beerList = [], count = 3) {
  if (beerList.length === 0) return [];

  const myReviews = getMyReviews();

  if (myReviews.length === 0) {
    return beerList.slice(0, count).map((beer) => ({
      beer,
      score: 0,
      reason: "지금 인기 맥주예요",
    }));
  }

  // ── 취향 가중치 계산 (해시태그 + 카테고리 기반) ──────
  const hashtagWeight  = {};
  const categoryWeight = {};

  myReviews.forEach(({ hashtags, star, beerId }) => {
    // 리뷰의 beerId와 beer.id가 일치하는 맥주 찾기
    const beer = beerList.find((b) => String(b.id) === String(beerId));

    (hashtags ?? []).forEach((tag) => {
      hashtagWeight[tag] = (hashtagWeight[tag] || 0) + (star ?? 3);
    });
    if (beer) {
      categoryWeight[beer.category] =
        (categoryWeight[beer.category] || 0) + (star ?? 3);
    }
  });

  const ratedIds = new Set(myReviews.map((r) => String(r.beerId)));

  const pool = beerList.filter((b) => !ratedIds.has(String(b.id)));
  const candidates = pool.length > 0 ? pool : beerList;

  // ── 점수 계산 ─────────────────────────────────────────
  const scored = candidates.map((beer) => {
    let score = 0;
    const matchedTags = [];

    (beer.hashtags ?? []).forEach((tag) => {
      if (hashtagWeight[tag]) {
        score += hashtagWeight[tag] * 2;
        matchedTags.push(tag);
      }
    });
    score += categoryWeight[beer.category] || 0;

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

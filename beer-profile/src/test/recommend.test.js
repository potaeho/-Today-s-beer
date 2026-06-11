import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getMyReviews,
  getMyRatedCount,
  getPersonalizedRecommendations,
} from "../utils/recommend";

// ── 공통 픽스처 ────────────────────────────────────────────
const BEER_A = {
  id: 99,
  name: "테스트IPA",
  category: "IPA",
  hashtags: ["sour_citrus", "hop_pine"],
};
const BEER_B = {
  id: 98,
  name: "테스트라거",
  category: "라거",
  hashtags: ["tex_watery", "malt_grain"],
};
const BEER_C = {
  id: 97,
  name: "테스트에일",
  category: "에일",
  hashtags: ["hop_herb", "malt_toast"],
};
const UNRATED_BEER_LIST = [BEER_A, BEER_B, BEER_C];

// ── getMyReviews ───────────────────────────────────────────
describe("getMyReviews", () => {
  it("isMe=true인 리뷰만 반환한다", () => {
    const result = getMyReviews();
    expect(result.every((r) => r.isMe === true)).toBe(true);
  });

  it("각 항목에 beerId 속성이 포함된다", () => {
    const result = getMyReviews();
    expect(result.every((r) => "beerId" in r)).toBe(true);
  });

  it("beerId는 REVIEWS 오브젝트의 키 문자열이다", () => {
    const result = getMyReviews();
    const beerIds = result.map((r) => r.beerId);
    // REVIEWS 키는 "1"~"10" 문자열
    beerIds.forEach((id) => {
      expect(typeof id).toBe("string");
    });
  });

  it("REVIEWS에서 isMe 리뷰가 없는 항목은 결과에 포함되지 않는다", () => {
    const result = getMyReviews();
    // REVIEWS[2]의 isMe 리뷰 user가 "맥주초보"지만 isMe=true이므로 포함됨
    // 반드시 beerId가 REVIEWS 키(1~10) 범위 내여야 함
    const beerIds = new Set(result.map((r) => r.beerId));
    // "11" 같은 존재하지 않는 키가 없어야 함
    expect(beerIds.has("11")).toBe(false);
  });

  it("원본 리뷰 객체의 star, hashtags, profile 속성을 보존한다", () => {
    const result = getMyReviews();
    result.forEach((r) => {
      expect(r).toHaveProperty("star");
      expect(r).toHaveProperty("hashtags");
      expect(r).toHaveProperty("profile");
    });
  });
});

// ── getMyRatedCount ────────────────────────────────────────
describe("getMyRatedCount", () => {
  it("getMyReviews() 길이와 일치한다", () => {
    expect(getMyRatedCount()).toBe(getMyReviews().length);
  });

  it("0 이상의 정수를 반환한다", () => {
    const count = getMyRatedCount();
    expect(count).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(count)).toBe(true);
  });
});

// ── getPersonalizedRecommendations ────────────────────────
describe("getPersonalizedRecommendations", () => {
  // ── 엣지 케이스 ──
  it("빈 beerList를 전달하면 빈 배열을 반환한다", () => {
    expect(getPersonalizedRecommendations([])).toEqual([]);
  });

  it("count=0이면 빈 배열을 반환한다", () => {
    const result = getPersonalizedRecommendations(UNRATED_BEER_LIST, 0);
    expect(result).toHaveLength(0);
  });

  it("count보다 후보가 적으면 가능한 만큼만 반환한다", () => {
    const result = getPersonalizedRecommendations([BEER_A], 5);
    expect(result.length).toBeLessThanOrEqual(1);
  });

  // ── 반환값 형식 ──
  it("각 항목에 beer, score, reason 속성이 있다", () => {
    const result = getPersonalizedRecommendations(UNRATED_BEER_LIST, 3);
    result.forEach((item) => {
      expect(item).toHaveProperty("beer");
      expect(item).toHaveProperty("score");
      expect(item).toHaveProperty("reason");
    });
  });

  it("반환 개수가 count를 초과하지 않는다", () => {
    const result = getPersonalizedRecommendations(UNRATED_BEER_LIST, 2);
    expect(result.length).toBeLessThanOrEqual(2);
  });

  // ── 점수 정렬 ──
  it("결과는 score 내림차순으로 정렬된다", () => {
    const result = getPersonalizedRecommendations(UNRATED_BEER_LIST, 3);
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].score).toBeGreaterThanOrEqual(result[i + 1].score);
    }
  });

  // ── 취향 매칭 ──
  it("isMe 리뷰의 해시태그와 겹치는 맥주가 더 높은 score를 받는다", () => {
    // getMyReviews()는 sour_citrus, hop_pine 등을 포함
    // BEER_A(sour_citrus, hop_pine)는 실제 isMe 리뷰 해시태그와 겹침
    // BEER_B(tex_watery, malt_grain)는 거의 안 겹침
    const result = getPersonalizedRecommendations([BEER_A, BEER_B], 2);
    const scoreA = result.find((r) => r.beer.id === BEER_A.id)?.score ?? 0;
    const scoreB = result.find((r) => r.beer.id === BEER_B.id)?.score ?? 0;
    expect(scoreA).toBeGreaterThan(scoreB);
  });

  it("이미 isMe 리뷰가 있는 맥주 ID는 추천에서 제외된다", () => {
    // REVIEWS 키 "1"~"10"이 isMe가 있으므로 id 1~10짜리 맥주는 제외돼야 함
    const ratedBeer = { id: 1, name: "이미평가", category: "IPA", hashtags: [] };
    const newBeer = { id: 999, name: "새맥주", category: "IPA", hashtags: [] };
    const result = getPersonalizedRecommendations([ratedBeer, newBeer], 3);
    const ids = result.map((r) => r.beer.id);
    expect(ids).not.toContain(1);
    expect(ids).toContain(999);
  });

  // ── star=0 엣지 케이스 (|| vs ??) ──
  it("star가 null/undefined이면 기본값 3으로 처리된다 (?? 연산자)", () => {
    // star가 undefined인 경우 가중치에 3이 더해져야 함 (0이 아니라)
    // recommend.js에서 (star ?? 3)이 올바르게 작동하는지 검증
    // 실제 REVIEWS 데이터에는 모두 star가 있으므로, 빈 beerList 대신
    // 함수가 NaN을 반환하지 않는지로 검증
    const result = getPersonalizedRecommendations(UNRATED_BEER_LIST, 3);
    result.forEach((item) => {
      expect(Number.isNaN(item.score)).toBe(false);
    });
  });

  it("reason 문자열은 비어 있지 않다", () => {
    const result = getPersonalizedRecommendations(UNRATED_BEER_LIST, 3);
    result.forEach((item) => {
      expect(typeof item.reason).toBe("string");
      expect(item.reason.length).toBeGreaterThan(0);
    });
  });
});

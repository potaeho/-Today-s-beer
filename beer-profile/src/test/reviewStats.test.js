import { describe, it, expect } from "vitest";
import { summarizeReviews, starDistribution } from "../data/reviewStats";

describe("summarizeReviews", () => {
  it("빈 배열·잘못된 입력은 0 요약을 반환한다", () => {
    const empty = { count: 0, avgStar: 0, avgProfile: {} };
    expect(summarizeReviews([])).toEqual(empty);
    expect(summarizeReviews(null)).toEqual(empty);
    expect(summarizeReviews(undefined)).toEqual(empty);
  });

  it("count와 avgStar(소수1자리 반올림)를 계산한다", () => {
    const r = summarizeReviews([
      { star: 4, profile: {} },
      { star: 4, profile: {} },
      { star: 3, profile: {} },
    ]);
    expect(r.count).toBe(3);
    expect(r.avgStar).toBe(3.7); // (4+4+3)/3 = 3.666... → 3.7
  });

  it("avgProfile를 축별 평균(소수1자리)으로 계산한다", () => {
    const r = summarizeReviews([
      { star: 4, profile: { 단맛: 2, 쓴맛: 4 } },
      { star: 5, profile: { 단맛: 3, 쓴맛: 5 } },
    ]);
    expect(r.avgProfile).toEqual({ 단맛: 2.5, 쓴맛: 4.5 });
  });
});

describe("starDistribution", () => {
  const ZERO = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  it("빈 배열·잘못된 입력은 모든 버킷이 0이다", () => {
    expect(starDistribution([])).toEqual(ZERO);
    expect(starDistribution(null)).toEqual(ZERO);
    expect(starDistribution(undefined)).toEqual(ZERO);
  });

  it("각 별점을 해당 버킷에 집계한다", () => {
    const r = starDistribution([
      { star: 5 }, { star: 5 }, { star: 4 }, { star: 3 }, { star: 3 }, { star: 3 },
    ]);
    expect(r).toEqual({ 1: 0, 2: 0, 3: 3, 4: 1, 5: 2 });
  });

  it("1~5 범위를 벗어난 별점은 무시한다 (0, 6, 음수)", () => {
    const r = starDistribution([
      { star: 0 }, { star: 6 }, { star: -2 }, { star: 4 },
    ]);
    expect(r).toEqual({ 1: 0, 2: 0, 3: 0, 4: 1, 5: 0 });
  });

  it("정수가 아닌 별점은 무시한다 (3.5, NaN, undefined)", () => {
    const r = starDistribution([
      { star: 3.5 }, { star: NaN }, { star: undefined }, {}, { star: 2 },
    ]);
    expect(r).toEqual({ 1: 0, 2: 1, 3: 0, 4: 0, 5: 0 });
  });
});

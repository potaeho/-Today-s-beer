import { describe, it, expect } from "vitest";
import { generateDummyReviews } from "../data/dummyReviews";
import { HASHTAG_MAP } from "../data/beerData";

const BEER = {
  id: 1,
  name: "테스트 IPA",
  category: "IPA",
  brewery: "테스트 브루어리",
  abv: "6.5%",
  profile: { 단맛: 2, 신맛: 1.5, 쓴맛: 4, 바디: 2.5, 향: 4 },
  hashtags: Object.keys(HASHTAG_MAP).slice(0, 3),
};

describe("generateDummyReviews", () => {
  it("이름 없는 맥주에는 빈 배열을 반환한다", () => {
    expect(generateDummyReviews({})).toEqual([]);
    expect(generateDummyReviews(null)).toEqual([]);
  });

  it("같은 맥주는 항상 동일한 리뷰를 생성한다 (시드 결정론)", () => {
    const a = generateDummyReviews(BEER);
    const b = generateDummyReviews(BEER);
    expect(a).toEqual(b);
  });

  it("이름이 다르면 일반적으로 다른 결과를 만든다", () => {
    const a = generateDummyReviews(BEER);
    const b = generateDummyReviews({ ...BEER, name: "완전히 다른 라거" });
    expect(a).not.toEqual(b);
  });

  it("리뷰 개수는 2~4개다", () => {
    const r = generateDummyReviews(BEER);
    expect(r.length).toBeGreaterThanOrEqual(2);
    expect(r.length).toBeLessThanOrEqual(4);
  });

  it("별점은 2~5 정수 범위다", () => {
    generateDummyReviews(BEER).forEach((rev) => {
      expect(Number.isInteger(rev.star)).toBe(true);
      expect(rev.star).toBeGreaterThanOrEqual(2);
      expect(rev.star).toBeLessThanOrEqual(5);
    });
  });

  it("해시태그는 HASHTAG_MAP에 존재하는 ID만 사용한다", () => {
    generateDummyReviews(BEER).forEach((rev) => {
      rev.hashtags.forEach((id) => {
        expect(HASHTAG_MAP[id]).toBeDefined();
      });
    });
  });

  it("프로파일 값은 0~5 범위로 클램프된다", () => {
    generateDummyReviews(BEER).forEach((rev) => {
      Object.values(rev.profile).forEach((v) => {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(5);
      });
    });
  });

  it("같은 리뷰 안에서 유저는 중복되지 않는다", () => {
    const r = generateDummyReviews(BEER);
    const users = r.map((rev) => rev.user);
    expect(new Set(users).size).toBe(users.length);
  });
});

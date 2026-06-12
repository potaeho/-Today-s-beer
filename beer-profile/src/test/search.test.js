import { describe, it, expect } from "vitest";
import { filterBeers } from "../utils/search";

const BEERS = [
  { id: 1, name: "Cloud IPA",   type: "Hazy IPA",  category: "IPA",   brewery: "Jeju Brew", tags: ["#시트러스", "#홉향"] },
  { id: 2, name: "테라 라거",    type: "Pale Lager", category: "라거",  brewery: "하이트",    tags: ["#청량", "#깔끔"] },
  { id: 3, name: "흑맥주 스타우트", type: "Stout",      category: "스타우트", brewery: null,        tags: null },
];

describe("filterBeers", () => {
  it("쿼리가 비어 있으면 원본 배열을 그대로 반환한다", () => {
    expect(filterBeers(BEERS, "")).toBe(BEERS);
    expect(filterBeers(BEERS, "   ")).toBe(BEERS);
  });

  it("대소문자를 구분하지 않는다 (ipa → IPA 매칭)", () => {
    const r = filterBeers(BEERS, "ipa");
    expect(r.map((b) => b.id)).toContain(1);
  });

  it("이름·타입·카테고리·브루어리·태그 전부에서 검색된다", () => {
    expect(filterBeers(BEERS, "테라").map((b) => b.id)).toEqual([2]);     // name
    expect(filterBeers(BEERS, "stout").map((b) => b.id)).toEqual([3]);    // type
    expect(filterBeers(BEERS, "라거").map((b) => b.id)).toEqual([2]);     // category
    expect(filterBeers(BEERS, "하이트").map((b) => b.id)).toEqual([2]);   // brewery
    expect(filterBeers(BEERS, "시트러스").map((b) => b.id)).toEqual([1]); // tag
  });

  it("brewery·tags가 null이어도 크래시하지 않는다", () => {
    expect(() => filterBeers(BEERS, "흑맥주")).not.toThrow();
    expect(filterBeers(BEERS, "흑맥주").map((b) => b.id)).toEqual([3]);
  });

  it("매칭이 없으면 빈 배열을 반환한다", () => {
    expect(filterBeers(BEERS, "존재하지않는맥주")).toEqual([]);
  });

  it("앞뒤 공백을 무시한다", () => {
    expect(filterBeers(BEERS, "  테라  ").map((b) => b.id)).toEqual([2]);
  });

  it("인자가 없어도 안전하다", () => {
    expect(filterBeers()).toEqual([]);
    expect(filterBeers(undefined, "x")).toEqual([]);
  });
});

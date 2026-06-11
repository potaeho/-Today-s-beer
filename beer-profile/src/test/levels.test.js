import { describe, it, expect } from "vitest";
import {
  getCurrentLevel,
  formatMl,
  formatNextMl,
  ML_PER_BEER,
  LEVELS,
} from "../data/levels";

// ── ML_PER_BEER 상수 ───────────────────────────────────────
describe("ML_PER_BEER", () => {
  it("500 이다", () => {
    expect(ML_PER_BEER).toBe(500);
  });
});

// ── getCurrentLevel ────────────────────────────────────────
describe("getCurrentLevel", () => {
  it.each([
    [0,   1, "식당 맥주잔"],
    [1,   2, "500ml 캔"],
    [2,   3, "마스"],
    [40,  4, "수제맥주 케그"],
    [60,  5, "호프집 케그"],
    [200, 6, "헥토리터"],
  ])("%i잔 → 레벨 %i (%s)", (count, expectedLevel) => {
    const { current } = getCurrentLevel(count);
    expect(current.level).toBe(expectedLevel);
  });

  it("최고 레벨(레벨9)이면 next가 null이다", () => {
    const { next } = getCurrentLevel(2000000); // 500,000,000ml 이상
    // level 9 threshold = 500,000,000ml → 1,000,000잔 필요
    const maxCount = LEVELS[LEVELS.length - 1].minMl / ML_PER_BEER;
    const { next: nextMax } = getCurrentLevel(maxCount);
    expect(nextMax).toBeNull();
  });

  it("최고 레벨이면 progress가 1이다", () => {
    const maxCount = LEVELS[LEVELS.length - 1].minMl / ML_PER_BEER;
    const { progress } = getCurrentLevel(maxCount);
    expect(progress).toBe(1);
  });

  it("totalMl = ratedCount * ML_PER_BEER", () => {
    const { totalMl } = getCurrentLevel(7);
    expect(totalMl).toBe(7 * ML_PER_BEER);
  });

  it("progress는 0 이상 1 이하이다", () => {
    [0, 1, 5, 10, 100].forEach((n) => {
      const { progress } = getCurrentLevel(n);
      expect(progress).toBeGreaterThanOrEqual(0);
      expect(progress).toBeLessThanOrEqual(1);
    });
  });

  it("next는 현재 레벨보다 높은 레벨 객체다", () => {
    const { current, next } = getCurrentLevel(0);
    if (next) {
      expect(next.level).toBeGreaterThan(current.level);
    }
  });

  it("레벨 경계값 바로 직전에는 이전 레벨이다", () => {
    // 레벨 2 threshold = 500ml → 0잔(0ml)은 레벨1
    const { current } = getCurrentLevel(0);
    expect(current.level).toBe(1);
  });

  it("레벨 경계값 정확히 도달하면 해당 레벨로 올라간다", () => {
    // 레벨 3 threshold = 1000ml → 2잔 정확히
    const { current } = getCurrentLevel(2);
    expect(current.level).toBe(3);
  });
});

// ── formatMl ──────────────────────────────────────────────
describe("formatMl", () => {
  it("999ml 이하는 'Nml' 형식이다", () => {
    expect(formatMl(0)).toBe("0ml");
    expect(formatMl(500)).toBe("500ml");
    expect(formatMl(999)).toBe("999ml");
  });

  it("1000ml → '1L'", () => {
    expect(formatMl(1000)).toBe("1L");
  });

  it("1500ml → '1.5L'", () => {
    expect(formatMl(1500)).toBe("1.5L");
  });

  it("2000ml → '2L' (소수점 없음)", () => {
    expect(formatMl(2000)).toBe("2L");
  });

  it("1000000ml → 천 단위 구분자 포함 'N,NNNL' 형식", () => {
    const result = formatMl(1000000);
    expect(result).toContain("L");
    expect(result).toContain(",");
  });

  it("소수점 둘째 자리는 버린다 (1666ml → 1.7L 가 아닌 1.7L)", () => {
    // 1666ml = 1.666L → toFixed(1) = "1.7L"
    const result = formatMl(1666);
    expect(result).toBe("1.7L");
  });
});

// ── formatNextMl ──────────────────────────────────────────
describe("formatNextMl", () => {
  it("formatMl과 동일한 형식을 반환한다", () => {
    [0, 500, 1000, 1500, 20000].forEach((ml) => {
      expect(formatNextMl(ml)).toBe(formatMl(ml));
    });
  });
});

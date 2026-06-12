import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import BeerRecommendSlider from "../components/BeerRecommendSlider";

// 자동 넘김 setInterval이 current를 바꾸지 않도록 타이머를 고정한다.
function makeItems(n) {
  return Array.from({ length: n }, (_, i) => ({
    beer: { id: i + 1, name: `맥주${i + 1}`, srmColor: "#caa", image: null },
    score: n - i,
    reason: "",
  }));
}

afterEach(cleanup);

describe("BeerRecommendSlider — 더 보기 토글", () => {
  it("항목이 3개 초과면 '더 보기' 버튼에 (전체-3) 개수가 표시되고, 접힌 상태에선 others 2개만 보인다", () => {
    vi.useFakeTimers();
    try {
      const { container } = render(<BeerRecommendSlider items={makeItems(5)} onSelect={() => {}} />);
      // current=0 고정. others = slice(0,2) → 행 2개
      expect(container.querySelectorAll(".rec-list-row")).toHaveLength(2);
      expect(screen.getByText("취향 맞는 맥주 2개 더 →")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("'더 보기'를 누르면 버튼이 사라지고 current를 제외한 전체 항목이 펼쳐진다", () => {
    vi.useFakeTimers();
    try {
      const { container } = render(<BeerRecommendSlider items={makeItems(5)} onSelect={() => {}} />);
      fireEvent.click(screen.getByText("취향 맞는 맥주 2개 더 →"));
      // current(0) 제외한 4개 모두 표시, 버튼 제거
      expect(container.querySelectorAll(".rec-list-row")).toHaveLength(4);
      expect(screen.queryByText(/개 더 →/)).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

  it("항목이 3개 이하이면 '더 보기' 버튼을 보이지 않는다", () => {
    vi.useFakeTimers();
    try {
      render(<BeerRecommendSlider items={makeItems(3)} onSelect={() => {}} />);
      expect(screen.queryByText(/개 더 →/)).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });
});
